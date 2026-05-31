const db = require("../../../config/db");

const getPharmacyDashboardProfile = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      u.id,
      u.public_user_id,
      u.name,
      u.email,
      u.phone,
      u.role,

      p.pharmacy_name,
      p.pharmacy_type,
      p.owner_name,
      p.pharmacist_in_charge,
      p.drug_license_number,
      p.gst_number,
      p.operating_hours,
      p.home_delivery,
      p.availability_24x7
    FROM users u
    LEFT JOIN pharmacy_profiles p
      ON p.user_id = u.id
    WHERE u.id = ?
      AND u.role = 'pharmacy'
    LIMIT 1
    `,
    [userId]
  );

  return rows[0];
};

const searchPharmacyInventory = async (search = "") => {
  const query = `%${search}%`;

  const [rows] = await db.execute(
    `
    SELECT
      id,
      medicine_name,
      medicine_type,
      price,
      stock_quantity,
      requires_prescription
    FROM pharmacy_medicines
    WHERE medicine_name LIKE ?
       OR medicine_type LIKE ?
    ORDER BY medicine_name ASC
    LIMIT 100
    `,
    [query, query]
  );

  return rows.map((row) => ({
    id: row.id,
    medicineName: row.medicine_name,
    medicineType: row.medicine_type,
    price: Number(row.price || 0),
    stockQuantity: Number(row.stock_quantity || 0),
    requiresPrescription: Boolean(row.requires_prescription),
  }));
};

const getAllPharmacyOrders = async () => {
  const [orders] = await db.execute(
    `
    SELECT
      id,
      public_order_id,
      order_mode,
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
    ORDER BY created_at DESC
    `
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
      quantity: Number(item.quantity),
      unitPrice: Number(item.unit_price),
      totalPrice: Number(item.total_price),
    });
  });

  return orders.map((order) => ({
    id: order.id,
    publicOrderId: order.public_order_id,
    orderMode: order.order_mode,
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

const updatePharmacyOrderStatus = async (orderId, status) => {
  const [result] = await db.execute(
    `
    UPDATE pharmacy_orders
    SET status = ?
    WHERE id = ?
    `,
    [status, orderId]
  );

  return result.affectedRows > 0;
};

module.exports = {
  getPharmacyDashboardProfile,
  searchPharmacyInventory,
  getAllPharmacyOrders,
  updatePharmacyOrderStatus,
};