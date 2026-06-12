// client/src/utils/statusConfig.js
// Single source of truth for booking status configurations across all booking tables

export const STATUS_CONFIG = {
  // Core 7 statuses
  pending: {
    label: "Pending",
    color: "Grey",
    bg: "#e2e8f0",
    text: "#475569"
  },
  accepted: {
    label: "Accepted",
    color: "Blue",
    bg: "#dbeafe",
    text: "#2563eb"
  },
  sample_collected: {
    label: "Sample Collected",
    color: "Orange",
    bg: "#ffedd5",
    text: "#ea580c"
  },
  submitted_to_lab: {
    label: "Submitted to Lab",
    color: "Yellow",
    bg: "#fef9c3",
    text: "#ca8a04"
  },
  received_by_lab: {
    label: "Received by Lab",
    color: "Purple",
    bg: "#f3e8ff",
    text: "#9333ea"
  },
  report_ready: {
    label: "Report Ready",
    color: "Teal",
    bg: "#ccfbf1",
    text: "#0d9488"
  },
  completed: {
    label: "Completed",
    color: "Green",
    bg: "#dcfce7",
    text: "#16a34a"
  },

  // Fallbacks and extra statuses from other booking types
  confirmed: {
    label: "Confirmed",
    color: "Indigo",
    bg: "#e0e7ff",
    text: "#4f46e5"
  },
  cancelled: {
    label: "Cancelled",
    color: "Red",
    bg: "#fee2e2",
    text: "#dc2626"
  },
  sample_received: {
    label: "Sample Received",
    color: "Cyan",
    bg: "#ecfeff",
    text: "#0891b2"
  },
  processing: {
    label: "Processing",
    color: "Yellow",
    bg: "#fef9c3",
    text: "#ca8a04"
  },
  sample_rejected: {
    label: "Sample Rejected",
    color: "Red",
    bg: "#fee2e2",
    text: "#dc2626"
  },
  assigned: {
    label: "Assigned",
    color: "Blue",
    bg: "#dbeafe",
    text: "#2563eb"
  }
};
