import React, { createContext, useContext, useState, useCallback, useRef } from "react";

const ToastContext = createContext(null);

const COLORS = {
  success: { bg: "#f0fdf4", border: "#86efac", text: "#15803d" },
  error:   { bg: "#fef2f2", border: "#fca5a5", text: "#b91c1c" },
  info:    { bg: "#eff6ff", border: "#93c5fd", text: "#1d4ed8" },
  warning: { bg: "#fffbeb", border: "#fcd34d", text: "#92400e" },
};

function SuccessIcon() {
  return React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" },
    React.createElement("circle", { cx: 10, cy: 10, r: 10, fill: "#22c55e" }),
    React.createElement("path", { d: "M6 10.5l2.5 2.5 5-5", stroke: "#fff", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })
  );
}

function ErrorIcon() {
  return React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" },
    React.createElement("circle", { cx: 10, cy: 10, r: 10, fill: "#ef4444" }),
    React.createElement("path", { d: "M7 7l6 6M13 7l-6 6", stroke: "#fff", strokeWidth: "1.8", strokeLinecap: "round" })
  );
}

function InfoIcon() {
  return React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" },
    React.createElement("circle", { cx: 10, cy: 10, r: 10, fill: "#3b82f6" }),
    React.createElement("path", { d: "M10 9v5", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" }),
    React.createElement("circle", { cx: 10, cy: 6.5, r: 1, fill: "#fff" })
  );
}

function WarningIcon() {
  return React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" },
    React.createElement("path", { d: "M10 2L19 18H1L10 2z", fill: "#f59e0b" }),
    React.createElement("path", { d: "M10 8v4", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" }),
    React.createElement("circle", { cx: 10, cy: 14.5, r: 1, fill: "#fff" })
  );
}

const ICONS = {
  success: React.createElement(SuccessIcon),
  error:   React.createElement(ErrorIcon),
  info:    React.createElement(InfoIcon),
  warning: React.createElement(WarningIcon),
};

let _id = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 350);
  }, []);

  const toast = useCallback(
    (message, type = "info", duration = 4000) => {
      const id = ++_id;
      setToasts((prev) => [...prev, { id, message, type, exiting: false }]);
      timers.current[id] = setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  const value = {
    toast,
    success: (msg, dur) => toast(msg, "success", dur),
    error:   (msg, dur) => toast(msg, "error",   dur || 5000),
    info:    (msg, dur) => toast(msg, "info",     dur),
    warning: (msg, dur) => toast(msg, "warning",  dur),
    dismiss,
  };

  // ── Centered at top of page ──────────────────────────────────────
  const containerStyle = {
    position: "fixed",
    top: 24,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 99999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    width: "100%",
    maxWidth: 480,
    pointerEvents: "none",
    padding: "0 16px",
    boxSizing: "border-box",
  };

  const toastNodes = toasts.map((t) => {
    const c = COLORS[t.type] || COLORS.info;

    const toastStyle = {
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      background: c.bg,
      border: "1.5px solid " + c.border,
      borderRadius: 16,
      padding: "14px 18px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
      pointerEvents: "all",
      cursor: "default",
      width: "100%",
      boxSizing: "border-box",
      animation: t.exiting
        ? "toast-out 0.32s ease forwards"
        : "toast-in 0.32s ease forwards",
    };

    const textStyle = {
      flex: 1,
      fontSize: 14,
      fontWeight: 600,
      color: c.text,
      lineHeight: 1.5,
      fontFamily: "'Segoe UI', 'Plus Jakarta Sans', sans-serif",
    };

    const btnStyle = {
      flexShrink: 0,
      background: "none",
      border: "none",
      cursor: "pointer",
      color: c.text,
      opacity: 0.5,
      fontSize: 20,
      lineHeight: 1,
      padding: "0 2px",
      marginTop: -2,
      fontWeight: 700,
    };

    return React.createElement(
      "div",
      { key: t.id, style: toastStyle },
      React.createElement("span", { style: { flexShrink: 0, marginTop: 1 } }, ICONS[t.type]),
      React.createElement("span", { style: textStyle }, t.message),
      React.createElement(
        "button",
        { onClick: () => dismiss(t.id), style: btnStyle, "aria-label": "Close" },
        "\u00d7"
      )
    );
  });

  const keyframes = `
    @keyframes toast-in {
      from { opacity: 0; transform: translateY(-24px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0)     scale(1);    }
    }
    @keyframes toast-out {
      from { opacity: 1; transform: translateY(0)     scale(1);    }
      to   { opacity: 0; transform: translateY(-24px) scale(0.96); }
    }
  `;

  return React.createElement(
    ToastContext.Provider,
    { value },
    children,
    React.createElement("div", { style: containerStyle }, ...toastNodes),
    React.createElement("style", null, keyframes)
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};