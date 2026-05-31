const crypto = require("crypto");
const db = require("../../../config/db");

function generatePublicOrderId() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const random = crypto.randomBytes(3).toString("hex").toUpperCase();

  return `PH${year}${month}${day}${random}`;
}

const getPatientDetailsByUserId = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      id,
      public_user_id,
      name,
      email,
      phone,
      role,
      is_email_verified,
      is_phone_verified,
      registration_status,
      address,
      city,
      district,
      state,
      pincode,
      country
    FROM users
    WHERE id = ?
    LIMIT 1
    `,
    [userId]
  );

  return rows[0];
};

const searchMedicines = async (search) => {
  const query = `%${search}%`;

  const [rows] = await db.execute(
    `
    SELECT
      id,
      medicine_name,
      generic_name,
      brand_name,
      medicine_type,
      strength,
      price,
      stock_quantity,
      requires_prescription
    FROM pharmacy_medicines
    WHERE is_active = TRUE
      AND stock_quantity > 0
      AND (
        medicine_name LIKE ?
        OR generic_name LIKE ?
        OR brand_name LIKE ?
        OR strength LIKE ?
      )
    ORDER BY medicine_name ASC
    LIMIT 30
    `,
    [query, query, query, query]
  );

  return rows.map((row) => ({
    id: row.id,
    medicineName: row.medicine_name,
    genericName: row.generic_name,
    brandName: row.brand_name,
    medicineType: row.medicine_type,
    strength: row.strength,
    price: Number(row.price || 0),
    stockQuantity: Number(row.stock_quantity || 0),
    requiresPrescription: Boolean(row.requires_prescription),
  }));
};

const createPharmacyOrder = async ({
  userId,
  patientName,
  patientEmail,
  patientPhone,
  deliveryAddress,
  city,
  state,
  pincode,
  items,
}) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const medicineIds = items.map((item) => item.medicineId);
    const placeholders = medicineIds.map(() => "?").join(",");

    const [medicineRows] = await connection.execute(
      `
      SELECT
        id,
        medicine_name,
        price,
        stock_quantity,
        requires_prescription
      FROM pharmacy_medicines
      WHERE id IN (${placeholders})
        AND is_active = TRUE
      FOR UPDATE
      `,
      medicineIds
    );

    if (medicineRows.length !== medicineIds.length) {
      throw new Error("One or more medicines are invalid or unavailable");
    }

    const medicineMap = new Map();

    medicineRows.forEach((medicine) => {
      medicineMap.set(Number(medicine.id), medicine);
    });

    const orderItems = [];
    let subtotalAmount = 0;

    for (const item of items) {
      const medicine = medicineMap.get(Number(item.medicineId));

      if (!medicine) {
        throw new Error("Medicine not found");
      }

      const quantity = Number(item.quantity);

      if (quantity > Number(medicine.stock_quantity)) {
        throw new Error(`${medicine.medicine_name} has only ${medicine.stock_quantity} stock available`);
      }

      const unitPrice = Number(medicine.price);
      const totalPrice = unitPrice * quantity;

      subtotalAmount += totalPrice;

      orderItems.push({
        medicineId: medicine.id,
        medicineName: medicine.medicine_name,
        quantity,
        unitPrice,
        totalPrice,
      });
    }

    const deliveryCharge = subtotalAmount >= 500 ? 0 : 40;
    const totalAmount = subtotalAmount + deliveryCharge;
    const publicOrderId = generatePublicOrderId();

    const [orderResult] = await connection.execute(
      `
      INSERT INTO pharmacy_orders (
        public_order_id,
        user_id,
        patient_name,
        patient_email,
        patient_phone,
        delivery_address,
        city,
        state,
        pincode,
        subtotal_amount,
        delivery_charge,
        total_amount,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        publicOrderId,
        userId,
        patientName,
        patientEmail,
        patientPhone,
        deliveryAddress,
        city || null,
        state || null,
        pincode || null,
        subtotalAmount,
        deliveryCharge,
        totalAmount,
        "pending",
      ]
    );

    const orderId = orderResult.insertId;

    for (const orderItem of orderItems) {
      await connection.execute(
        `
        INSERT INTO pharmacy_order_items (
          order_id,
          medicine_id,
          medicine_name,
          quantity,
          unit_price,
          total_price
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          orderId,
          orderItem.medicineId,
          orderItem.medicineName,
          orderItem.quantity,
          orderItem.unitPrice,
          orderItem.totalPrice,
        ]
      );

      await connection.execute(
        `
        UPDATE pharmacy_medicines
        SET stock_quantity = stock_quantity - ?
        WHERE id = ?
        `,
        [orderItem.quantity, orderItem.medicineId]
      );
    }

    await connection.commit();

    return {
      id: orderId,
      publicOrderId,
      items: orderItems,
      subtotalAmount,
      deliveryCharge,
      totalAmount,
      status: "pending",
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const getMyPharmacyOrders = async (userId) => {
  const [orders] = await db.execute(
    `
    SELECT
      id,
      public_order_id,
      patient_name,
      patient_email,
      patient_phone,
      delivery_address,
      city,
      state,
      pincode,
      subtotal_amount,
      delivery_charge,
      total_amount,
      status,
      created_at
    FROM pharmacy_orders
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  if (orders.length === 0) {
    return [];
  }

  const orderIds = orders.map((order) => order.id);
  const placeholders = orderIds.map(() => "?").join(",");

  const [items] = await db.execute(
    `
    SELECT
      order_id,
      medicine_id,
      medicine_name,
      quantity,
      unit_price,
      total_price
    FROM pharmacy_order_items
    WHERE order_id IN (${placeholders})
    ORDER BY id ASC
    `,
    orderIds
  );

  const itemMap = new Map();

  items.forEach((item) => {
    if (!itemMap.has(item.order_id)) {
      itemMap.set(item.order_id, []);
    }

    itemMap.get(item.order_id).push({
      medicineId: item.medicine_id,
      medicineName: item.medicine_name,
      quantity: item.quantity,
      unitPrice: Number(item.unit_price),
      totalPrice: Number(item.total_price),
    });
  });

  return orders.map((order) => ({
    id: order.id,
    publicOrderId: order.public_order_id,
    patientName: order.patient_name,
    patientEmail: order.patient_email,
    patientPhone: order.patient_phone,
    deliveryAddress: order.delivery_address,
    city: order.city,
    state: order.state,
    pincode: order.pincode,
    subtotalAmount: Number(order.subtotal_amount),
    deliveryCharge: Number(order.delivery_charge),
    totalAmount: Number(order.total_amount),
    status: order.status,
    createdAt: order.created_at,
    items: itemMap.get(order.id) || [],
  }));
};

module.exports = {
  getPatientDetailsByUserId,
  searchMedicines,
  createPharmacyOrder,
  getMyPharmacyOrders,
};