import { useState } from "react";

const initialNotifications = [
  {
    id: 1,
    dot: "#ef4444",
    message: "New doctor registration pending approval",
    time: "10 min ago",
    isNew: true,
    category: "alert",
  },
  {
    id: 2,
    dot: "#eab308",
    message: "Medicine stock low: Paracetamol 500mg",
    time: "25 min ago",
    isNew: true,
    category: "warning",
  },
  {
    id: 3,
    dot: "#22c55e",
    message: "Monthly revenue report generated",
    time: "1 hr ago",
    isNew: true,
    category: "success",
  },
  {
    id: 4,
    dot: "#64748b",
    message: "System backup completed successfully",
    time: "3 hr ago",
    isNew: false,
    category: "info",
  },
  {
    id: 5,
    dot: "#3b82f6",
    message: "Dr. Priya Nair profile updated",
    time: "5 hr ago",
    isNew: false,
    category: "info",
  },
  {
    id: 6,
    dot: "#06b6d4",
    message: "Lab report LAB-2205 verified",
    time: "6 hr ago",
    isNew: false,
    category: "info",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [dismissed, setDismissed] = useState([]);
  const [filter, setFilter] = useState("all"); // all | new | read
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isNew: false } : n))
    );
    showToast("Marked as read");
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isNew: false })));
    showToast("All notifications marked as read");
  };

  const dismiss = (id) => {
    setDismissed((prev) => [...prev, id]);
    showToast("Notification dismissed");
  };

  const clearAll = () => {
    setDismissed(notifications.map((n) => n.id));
    showToast("All notifications cleared");
  };

  const restore = () => {
    setDismissed([]);
    setNotifications(initialNotifications);
    showToast("Notifications restored");
  };

  const visible = notifications
    .filter((n) => !dismissed.includes(n.id))
    .filter((n) => {
      if (filter === "new") return n.isNew;
      if (filter === "read") return !n.isNew;
      return true;
    });

  const newCount = notifications.filter(
    (n) => n.isNew && !dismissed.includes(n.id)
  ).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #0f1118;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        .notif-wrapper {
          background: #0f1118;
          min-height: 100vh;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 48px 16px 64px;
        }

        .notif-container { width: 100%; max-width: 640px; }

        .page-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .page-title h1 {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.5px;
        }

        .toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-tabs {
          display: flex;
          background: #161b27;
          border: 1px solid #232a3b;
          border-radius: 10px;
          padding: 3px;
          gap: 2px;
        }

        .filter-tab {
          padding: 6px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          background: transparent;
          color: #64748b;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.18s;
        }

        .filter-tab.active {
          background: #1e293b;
          color: #e2e8f0;
        }

        .toolbar-actions { display: flex; gap: 8px; }

        .action-btn {
          padding: 7px 14px;
          border-radius: 9px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          border: 1.5px solid #232a3b;
          background: transparent;
          color: #94a3b8;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.18s;
          letter-spacing: 0.2px;
          white-space: nowrap;
        }

        .action-btn:hover {
          background: #1e293b;
          color: #e2e8f0;
          border-color: #334155;
        }

        .action-btn.danger:hover {
          background: #1c0606;
          color: #f87171;
          border-color: #f87171;
        }

        .card {
          background: #161b27;
          border: 1px solid #232a3b;
          border-radius: 18px;
          overflow: hidden;
        }

        .notif-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px 22px;
          border-bottom: 1px solid #1a2032;
          position: relative;
          cursor: pointer;
          transition: background 0.15s;
          animation: fadeSlide 0.3s ease;
        }

        .notif-item:last-child { border-bottom: none; }

        .notif-item:hover { background: #1a2032; }

        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .dot-col { padding-top: 6px; flex-shrink: 0; }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: block;
        }

        .notif-content { flex: 1; min-width: 0; }

        .notif-msg {
          font-size: 14.5px;
          font-weight: 500;
          color: #cbd5e1;
          line-height: 1.45;
          margin-bottom: 4px;
        }

        .notif-item.unread .notif-msg { color: #f1f5f9; font-weight: 600; }

        .notif-time {
          font-size: 12px;
          color: #475569;
        }

        .notif-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .new-badge {
          background: #1e3a5f;
          color: #60a5fa;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 6px;
          letter-spacing: 0.5px;
        }

        .icon-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #475569;
          padding: 4px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s, background 0.15s;
          opacity: 0;
          transition: opacity 0.15s;
        }

        .notif-item:hover .icon-btn { opacity: 1; }

        .icon-btn:hover { background: #1e293b; color: #e2e8f0; }

        .icon-btn.dismiss:hover { color: #f87171; }

        .empty-state {
          padding: 56px 24px;
          text-align: center;
          color: #334155;
          font-size: 14px;
        }

        .empty-icon { font-size: 36px; margin-bottom: 12px; }

        .empty-state p { color: #475569; margin-bottom: 14px; }

        .restore-btn {
          padding: 8px 20px;
          background: transparent;
          border: 1.5px solid #334155;
          color: #94a3b8;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.18s;
        }

        .restore-btn:hover { background: #1e293b; color: #e2e8f0; }

        .toast {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          background: #1e293b;
          border: 1px solid #334155;
          color: #e2e8f0;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          padding: 12px 22px;
          border-radius: 12px;
          z-index: 9999;
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
          animation: popUp 0.28s cubic-bezier(.22,1,.36,1);
          white-space: nowrap;
        }

        @keyframes popUp {
          from { opacity: 0; transform: translateX(-50%) translateY(14px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .summary-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
          font-size: 13px;
          color: #475569;
          font-weight: 500;
        }

        .count-pill {
          background: #1e3a5f;
          color: #60a5fa;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 9px;
          border-radius: 20px;
        }
      `}</style>

      {toast && <div className="toast">✓ {toast}</div>}

      <div className="notif-wrapper">
        <div className="notif-container">

          <div className="page-title">
            <span style={{ fontSize: 26 }}>🔔</span>
            <h1>Notifications</h1>
          </div>

          <div className="toolbar">
            <div className="filter-tabs">
              {["all", "new", "read"].map((f) => (
                <button
                  key={f}
                  className={`filter-tab${filter === f ? " active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <div className="toolbar-actions">
              <button className="action-btn" onClick={markAllRead}>
                Mark all read
              </button>
              <button className="action-btn danger" onClick={clearAll}>
                Clear all
              </button>
            </div>
          </div>

          <div className="summary-bar">
            <span>
              {visible.length} notification{visible.length !== 1 ? "s" : ""}
            </span>
            {newCount > 0 && (
              <span className="count-pill">{newCount} new</span>
            )}
          </div>

          <div className="card">
            {visible.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔕</div>
                <p>No notifications to show.</p>
                <button className="restore-btn" onClick={restore}>
                  Restore notifications
                </button>
              </div>
            ) : (
              visible.map((n) => (
                <div
                  key={n.id}
                  className={`notif-item${n.isNew ? " unread" : ""}`}
                  onClick={() => n.isNew && markAsRead(n.id)}
                  title={n.isNew ? "Click to mark as read" : ""}
                >
                  <div className="dot-col">
                    <span className="dot" style={{ background: n.dot }} />
                  </div>
                  <div className="notif-content">
                    <div className="notif-msg">{n.message}</div>
                    <div className="notif-time">{n.time}</div>
                  </div>
                  <div className="notif-right">
                    {n.isNew && <span className="new-badge">New</span>}
                    <button
                      className="icon-btn"
                      title="Mark as read"
                      onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}
                    >
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      className="icon-btn dismiss"
                      title="Dismiss"
                      onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
