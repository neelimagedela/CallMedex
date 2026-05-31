import React, { useEffect, useState } from "react";

import { useToast } from "../../shared/toast";

import {
  fetchPharmacyDashboardProfile,
  fetchPharmacyDashboardInventory,
  fetchPharmacyDashboardOrders,
  updatePharmacyDashboardOrderStatus,
} from "./pharmacyDashboard.api";

import "./pharmacyDashboard.css";

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

function getStatusClass(status) {
  if (status === "completed") return "pharmacy-status completed";
  if (status === "cancelled") return "pharmacy-status cancelled";
  return "pharmacy-status pending";
}

function InfoItem({ label, value }) {
  return (
    <div className="pharmacy-info-item">
      <div className="pharmacy-info-label">{label}</div>
      <div className="pharmacy-info-value">{value || "-"}</div>
    </div>
  );
}

export default function PharmacyDashboard({ setPage }) {
  const toast = useToast();

  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);

  const [inventorySearch, setInventorySearch] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingInventory, setLoadingInventory] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = getStoredUser();

    if (!token || !user) {
      toast.error("Please login first.");
      setPage?.("login");
      return;
    }

    if (user.role !== "pharmacy") {
      toast.error("Only pharmacy users can access dashboard.");
      setPage?.("home");
    }
  }, [setPage, toast]);

  useEffect(() => {
    if (activeTab !== "profile") return;

    const loadProfile = async () => {
      try {
        setLoadingProfile(true);

        const result = await fetchPharmacyDashboardProfile();

        if (!result.success) {
          throw new Error(result.message || "Unable to load profile");
        }

        setProfile(result.data);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Unable to load profile";

        toast.error(message);

        if (err.response?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          setPage?.("login");
        }

        if (err.response?.status === 403) {
          setPage?.("home");
        }
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [activeTab, setPage, toast]);

  useEffect(() => {
    if (activeTab !== "inventory") return;

    let mounted = true;

    const timer = setTimeout(async () => {
      try {
        setLoadingInventory(true);

        const result = await fetchPharmacyDashboardInventory(inventorySearch);

        if (!result.success) {
          throw new Error(result.message || "Unable to load inventory");
        }

        if (mounted) {
          setInventory(Array.isArray(result.data) ? result.data : []);
        }
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Unable to load inventory";

        toast.error(message);
      } finally {
        if (mounted) {
          setLoadingInventory(false);
        }
      }
    }, 300);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [activeTab, inventorySearch, toast]);

  useEffect(() => {
    if (activeTab !== "orders") return;

    const loadOrders = async () => {
      try {
        setLoadingOrders(true);

        const result = await fetchPharmacyDashboardOrders();

        if (!result.success) {
          throw new Error(result.message || "Unable to load orders");
        }

        setOrders(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Unable to load orders";

        toast.error(message);
      } finally {
        setLoadingOrders(false);
      }
    };

    loadOrders();
  }, [activeTab, toast]);

  const handleOrderStatus = async (orderId, status) => {
    try {
      const result = await updatePharmacyDashboardOrderStatus(orderId, status);

      if (!result.success) {
        throw new Error(result.message || "Unable to update order");
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );

      toast.success(
        status === "completed"
          ? "Order marked as completed"
          : "Order cancelled successfully"
      );
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Unable to update order";

      toast.error(message);
    }
  };

  return (
    <div className="pharmacy-dashboard-page">
      <div className="pharmacy-dashboard-container">
        <div className="pharmacy-dashboard-header">
          <h1>Pharmacy Dashboard</h1>
          <p>Manage pharmacy profile, medicine inventory, and patient orders.</p>
        </div>

        <div className="pharmacy-dashboard-tabs">
          <button
            type="button"
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>

          <button
            type="button"
            className={activeTab === "inventory" ? "active" : ""}
            onClick={() => setActiveTab("inventory")}
          >
            Inventory
          </button>

          <button
            type="button"
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
        </div>

        {activeTab === "profile" && (
          <section className="pharmacy-dashboard-card">
            <h2>Profile Details</h2>

            {loadingProfile ? (
              <p className="pharmacy-muted">Loading profile...</p>
            ) : profile ? (
              <div className="pharmacy-profile-grid">
                <InfoItem label="Name" value={profile.name} />
                <InfoItem label="Mobile" value={profile.phone} />
                <InfoItem label="Email" value={profile.email} />
                <InfoItem label="Public ID" value={profile.publicUserId} />
                <InfoItem label="Role" value={profile.role} />

                <InfoItem label="Pharmacy Name" value={profile.pharmacyName} />
                <InfoItem label="Pharmacy Type" value={profile.pharmacyType} />
                <InfoItem label="Owner Name" value={profile.ownerName} />
                <InfoItem
                  label="Pharmacist In Charge"
                  value={profile.pharmacistInCharge}
                />
                <InfoItem
                  label="Drug License Number"
                  value={profile.drugLicenseNumber}
                />
                <InfoItem label="GST Number" value={profile.gstNumber} />
                <InfoItem
                  label="Operating Hours"
                  value={profile.operatingHours}
                />
                <InfoItem
                  label="Home Delivery"
                  value={profile.homeDelivery ? "Yes" : "No"}
                />
                <InfoItem
                  label="24x7 Availability"
                  value={profile.availability24x7 ? "Yes" : "No"}
                />
              </div>
            ) : (
              <p className="pharmacy-muted">No profile details found.</p>
            )}
          </section>
        )}

        {activeTab === "inventory" && (
          <section className="pharmacy-dashboard-card">
            <h2>Medicine Inventory</h2>

            <input
              className="pharmacy-search-input"
              placeholder="Search medicine..."
              value={inventorySearch}
              onChange={(e) => setInventorySearch(e.target.value)}
            />

            {loadingInventory ? (
              <p className="pharmacy-muted">Loading inventory...</p>
            ) : (
              <div className="pharmacy-table-wrap">
                <table className="pharmacy-table">
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Type</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Prescription</th>
                    </tr>
                  </thead>

                  <tbody>
                    {inventory.map((medicine) => (
                      <tr key={medicine.id}>
                        <td>
                          <strong>{medicine.medicineName}</strong>
                        </td>
                        <td>{medicine.medicineType}</td>
                        <td>₹{medicine.price}</td>
                        <td>{medicine.stockQuantity}</td>
                        <td>{medicine.requiresPrescription ? "Yes" : "No"}</td>
                      </tr>
                    ))}

                    {inventory.length === 0 && (
                      <tr>
                        <td colSpan={5}>No medicines found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeTab === "orders" && (
          <section className="pharmacy-dashboard-card">
            <h2>Patient Orders</h2>

            {loadingOrders ? (
              <p className="pharmacy-muted">Loading orders...</p>
            ) : (
              <div className="pharmacy-table-wrap">
                <table className="pharmacy-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Patient</th>
                      <th>Mode</th>
                      <th>Medicines</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <strong>{order.publicOrderId}</strong>
                          <div className="pharmacy-small-text">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleString(
                                  "en-IN"
                                )
                              : "-"}
                          </div>
                        </td>

                        <td>
                          <strong>{order.patientName}</strong>
                          <div>{order.patientPhone}</div>
                          <div className="pharmacy-small-text">
                            {order.deliveryAddress}
                          </div>
                        </td>

                        <td>
                          {order.orderMode === "online"
                            ? "Online Delivery"
                            : "Offline Pickup"}
                        </td>

                        <td>
                          {order.items && order.items.length > 0 ? (
                            order.items.map((item) => (
                              <div key={`${order.id}-${item.medicineId}`}>
                                {item.medicineName} × {item.quantity}
                              </div>
                            ))
                          ) : (
                            <span className="pharmacy-muted">No items</span>
                          )}
                        </td>

                        <td>
                          <strong>₹{order.totalAmount}</strong>
                        </td>

                        <td>
                          <span className={getStatusClass(order.status)}>
                            {order.status}
                          </span>
                        </td>

                        <td>
                          {order.status === "completed" ||
                          order.status === "cancelled" ? (
                            <span className="pharmacy-muted">Done</span>
                          ) : (
                            <div className="pharmacy-action-buttons">
                              <button
                                type="button"
                                className="pharmacy-complete-btn"
                                title="Mark completed"
                                onClick={() =>
                                  handleOrderStatus(order.id, "completed")
                                }
                              >
                                ✓
                              </button>

                              <button
                                type="button"
                                className="pharmacy-cancel-btn"
                                title="Cancel order"
                                onClick={() =>
                                  handleOrderStatus(order.id, "cancelled")
                                }
                              >
                                ✕
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}

                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={7}>No orders found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}