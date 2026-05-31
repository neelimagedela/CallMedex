const asyncHandler = require("../../../shared/utils/asyncHandler");
const AppError = require("../../../shared/utils/AppError");
const { successResponse } = require("../../../shared/utils/response");

const {
  getPatientDetailsByUserId,
  searchMedicines,
  createPharmacyOrder,
  getMyPharmacyOrders,
} = require("../models/pharmacy.model");

const {
  pharmacyOrderSchema,
  sanitizeSearch,
} = require("../validators/pharmacy.validator");

function ensureVerifiedPatient(user) {
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.role !== "patient") {
    throw new AppError("Only patient accounts can book medicines", 403);
  }

  if (!user.is_email_verified) {
    throw new AppError("Please verify your email before booking medicines", 403);
  }

  if (user.registration_status !== "PROFILE_COMPLETED") {
    throw new AppError("Please complete patient profile before booking medicines", 403);
  }
}

const getPharmacyPatientDetailsController = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  const user = await getPatientDetailsByUserId(userId);

  ensureVerifiedPatient(user);

  return successResponse({
    res,
    status: 200,
    message: "Patient details retrieved successfully",
    data: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      pincode: user.pincode || "",
      publicUserId: user.public_user_id,
    },
  });
});

const searchPharmacyMedicinesController = asyncHandler(async (req, res) => {
  const search = sanitizeSearch(req.query.search || "");

  const medicines = await searchMedicines(search);

  return successResponse({
    res,
    status: 200,
    message: "Medicines retrieved successfully",
    data: medicines,
  });
});

const createPharmacyOrderController = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  const user = await getPatientDetailsByUserId(userId);

  ensureVerifiedPatient(user);

  const validated = pharmacyOrderSchema.parse(req.body);

  const order = await createPharmacyOrder({
    userId,
    orderMode: validated.orderMode,
    patientName: validated.deliveryName.trim(),
    patientEmail: user.email,
    patientPhone: validated.deliveryPhone.trim(),
    deliveryAddress: validated.deliveryAddress.trim(),
    city: validated.city || null,
    state: validated.state || null,
    pincode: validated.pincode || null,
    items: validated.items,
  });

  return successResponse({
    res,
    status: 201,
    message:
      validated.orderMode === "online"
        ? "Medicine delivery booked successfully"
        : "Offline medicine pickup confirmed successfully",
    data: order,
  });
});

const getMyPharmacyOrdersController = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  if (req.user.role !== "patient") {
    throw new AppError("Only patients can view medicine orders", 403);
  }

  const orders = await getMyPharmacyOrders(userId);

  return successResponse({
    res,
    status: 200,
    message: "Medicine orders retrieved successfully",
    data: orders,
  });
});

module.exports = {
  getPharmacyPatientDetailsController,
  searchPharmacyMedicinesController,
  createPharmacyOrderController,
  getMyPharmacyOrdersController,
};