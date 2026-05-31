const asyncHandler = require("../../../shared/utils/asyncHandler");
const AppError = require("../../../shared/utils/AppError");
const { successResponse } = require("../../../shared/utils/response");

const {
  getPharmacyDashboardProfile,
  searchPharmacyInventory,
  getAllPharmacyOrders,
  updatePharmacyOrderStatus,
} = require("../models/pharmacyDashboard.model");

function ensurePharmacyUser(req) {
  if (!req.user) {
    throw new AppError("User not authenticated", 401);
  }

  if (req.user.role !== "pharmacy") {
    throw new AppError("Only pharmacy users can access this dashboard", 403);
  }
}

const getPharmacyDashboardProfileController = asyncHandler(async (req, res) => {
  ensurePharmacyUser(req);

  const profile = await getPharmacyDashboardProfile(req.user.id);

  if (!profile) {
    throw new AppError("Pharmacy profile not found", 404);
  }

  return successResponse({
    res,
    status: 200,
    message: "Pharmacy profile retrieved successfully",
    data: {
      publicUserId: profile.public_user_id,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      role: profile.role,

      pharmacyName: profile.pharmacy_name || "",
      pharmacyType: profile.pharmacy_type || "",
      ownerName: profile.owner_name || "",
      pharmacistInCharge: profile.pharmacist_in_charge || "",
      drugLicenseNumber: profile.drug_license_number || "",
      gstNumber: profile.gst_number || "",
      operatingHours: profile.operating_hours || "",
      homeDelivery: Boolean(profile.home_delivery),
      availability24x7: Boolean(profile.availability_24x7),
    },
  });
});

const getPharmacyInventoryController = asyncHandler(async (req, res) => {
  ensurePharmacyUser(req);

  const search = String(req.query.search || "")
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, 100);

  const inventory = await searchPharmacyInventory(search);

  return successResponse({
    res,
    status: 200,
    message: "Inventory retrieved successfully",
    data: inventory,
  });
});

const getPharmacyOrdersController = asyncHandler(async (req, res) => {
  ensurePharmacyUser(req);

  const orders = await getAllPharmacyOrders();

  return successResponse({
    res,
    status: 200,
    message: "Pharmacy orders retrieved successfully",
    data: orders,
  });
});

const updatePharmacyOrderStatusController = asyncHandler(async (req, res) => {
  ensurePharmacyUser(req);

  const orderId = Number(req.params.orderId);
  const status = String(req.body.status || "").trim().toLowerCase();

  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw new AppError("Invalid order ID", 400);
  }

  if (status !== "completed" && status !== "cancelled") {
    throw new AppError("Invalid order status", 400);
  }

  const updated = await updatePharmacyOrderStatus(orderId, status);

  if (!updated) {
    throw new AppError("Order not found", 404);
  }

  return successResponse({
    res,
    status: 200,
    message:
      status === "completed"
        ? "Order marked as completed"
        : "Order cancelled successfully",
    data: {
      orderId,
      status,
    },
  });
});

module.exports = {
  getPharmacyDashboardProfileController,
  getPharmacyInventoryController,
  getPharmacyOrdersController,
  updatePharmacyOrderStatusController,
};