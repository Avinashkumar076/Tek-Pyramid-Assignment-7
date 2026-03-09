// Notification.jsx — Task 7, Part C: Logical AND (&&) Operator
// Demonstrates:
//   - && operator to conditionally show elements
//   - Element only renders when condition is true
//   - Notification badge only shown when count > 0

import { useState } from "react";

const Notification = () => {
  const [notifCount, setNotifCount]   = useState(0);
  const [msgCount, setMsgCount]       = useState(0);
  const [alertCount, setAlertCount]   = useState(0);
  const [showBanner, setShowBanner]   = useState(true);

  const totalCount = notifCount + msgCount + alertCount;

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fdf4ff, #fae8ff)",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    container: { maxWidth: "700px", margin: "0 auto" },
    partBadge: {
      display: "inline-block",
      background: "#fce7f3",
      color: "#9d174d",
      fontSize: "11px",
      fontWeight: "800",
      padding: "4px 14px",
      borderRadius: "20px",
      marginBottom: "8px",
      letterSpacing: "1px",
    },
    pageTitle: {
      fontSize: "clamp(20px, 4vw, 26px)",
      fontWeight: "900",
      color: "#0f172a",
      marginBottom: "4px",
    },
    subtitle: { color: "#64748b", fontSize: "13px", marginBottom: "24px" },

    // Announcement banner — only shows when showBanner is true
    banner: {
      background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
      borderRadius: "14px",
      padding: "14px 18px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      flexWrap: "wrap",
      gap: "10px",
    },
    bannerText: { color: "#fff", fontSize: "14px", fontWeight: "600" },
    bannerClose: {
      background: "rgba(255,255,255,0.2)",
      border: "none",
      color: "#fff",
      borderRadius: "6px",
      padding: "4px 10px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "700",
    },

    // Navbar demo
    navbar: {
      background: "#0f172a",
      borderRadius: "16px",
      padding: "14px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      flexWrap: "wrap",
      gap: "10px",
    },
    navBrand: { color: "#fff", fontWeight: "800", fontSize: "16px" },
    navIcons: { display: "flex", gap: "20px", alignItems: "center" },
    iconWrap: { position: "relative", cursor: "pointer" },
    iconEmoji: { fontSize: "22px" },
    // Badge — conditionally rendered with &&
    badge: (color) => ({
      position: "absolute",
      top: "-6px",
      right: "-8px",
      background: color,
      color: "#fff",
      fontSize: "10px",
      fontWeight: "900",
      minWidth: "18px",
      height: "18px",
      borderRadius: "9px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 4px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    }),

    // Controls card
    card: {
      background: "#fff",
      borderRadius: "20px",
      padding: "clamp(20px, 4vw, 28px)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
      marginBottom: "20px",
    },
    cardTitle: {
      fontSize: "14px",
      fontWeight: "800",
      color: "#0f172a",
      marginBottom: "18px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      color: "#6b7280",
    },
    controlRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid #f1f5f9",
      flexWrap: "wrap",
      gap: "10px",
    },
    controlLabel: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "14px",
      fontWeight: "600",
      color: "#1e293b",
    },
    countBadge: (color, bg) => ({
      background: bg,
      color,
      fontWeight: "800",
      fontSize: "13px",
      padding: "2px 10px",
      borderRadius: "20px",
    }),
    btnGroup: { display: "flex", gap: "8px" },
    btn: (color, bg) => ({
      width: "32px",
      height: "32px",
      borderRadius: "8px",
      border: "none",
      background: bg,
      color,
      fontSize: "16px",
      fontWeight: "900",
      cursor: "pointer",
    }),

    // Total notification alert — shown with && when totalCount > 0
    totalAlert: {
      background: "#fef3c7",
      border: "1px solid #fde68a",
      borderRadius: "12px",
      padding: "14px 18px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    totalAlertText: { fontSize: "14px", fontWeight: "600", color: "#92400e" },

    // Code box
    codeBox: {
      background: "#0f172a",
      borderRadius: "14px",
      padding: "16px 20px",
      fontFamily: "monospace",
      fontSize: "clamp(10px, 2vw, 12px)",
      color: "#e2e8f0",
      lineHeight: "1.9",
      overflowX: "auto",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.partBadge}>PART C — LOGICAL && OPERATOR</div>
        <h2 style={styles.pageTitle}>🔔 Notification Center</h2>
        <p style={styles.subtitle}>
          Elements only render when condition is true — using the && operator
        </p>

        {/* ANNOUNCEMENT BANNER — && renders only when showBanner is true */}
        {showBanner && (
          <div style={styles.banner}>
            <span style={styles.bannerText}>
              📢 New feature: Real-time notifications are now live!
            </span>
            <button style={styles.bannerClose} onClick={() => setShowBanner(false)}>
              ✕ Dismiss
            </button>
          </div>
        )}

        {/* NAVBAR with conditional badges */}
        <div style={styles.navbar}>
          <span style={styles.navBrand}>🚀 MyApp</span>
          <div style={styles.navIcons}>

            {/* 🔔 Bell — badge shows ONLY when notifCount > 0 */}
            <div style={styles.iconWrap}>
              <span style={styles.iconEmoji}>🔔</span>
              {/* && operator: renders badge ONLY if notifCount > 0 */}
              {notifCount > 0 && (
                <div style={styles.badge("#ef4444")}>{notifCount}</div>
              )}
            </div>

            {/* 💬 Message — badge shows ONLY when msgCount > 0 */}
            <div style={styles.iconWrap}>
              <span style={styles.iconEmoji}>💬</span>
              {msgCount > 0 && (
                <div style={styles.badge("#6366f1")}>{msgCount}</div>
              )}
            </div>

            {/* ⚠️ Alert — badge shows ONLY when alertCount > 0 */}
            <div style={styles.iconWrap}>
              <span style={styles.iconEmoji}>⚠️</span>
              {alertCount > 0 && (
                <div style={styles.badge("#f59e0b")}>{alertCount}</div>
              )}
            </div>

          </div>
        </div>

        {/* TOTAL ALERT — only shows when totalCount > 0 */}
        {totalCount > 0 && (
          <div style={styles.totalAlert}>
            <span style={{ fontSize: "24px" }}>🔴</span>
            <span style={styles.totalAlertText}>
              You have <strong>{totalCount}</strong> unread notification{totalCount > 1 ? "s" : ""}!
              Check your inbox.
            </span>
          </div>
        )}

        {/* CONTROLS */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>⚙️ Simulate Notifications</p>

          {/* Notifications control */}
          {[
            { label: "🔔 Notifications", count: notifCount, setter: setNotifCount, color: "#ef4444", bg: "#fee2e2" },
            { label: "💬 Messages",       count: msgCount,   setter: setMsgCount,   color: "#6366f1", bg: "#ede9fe" },
            { label: "⚠️ Alerts",         count: alertCount, setter: setAlertCount, color: "#f59e0b", bg: "#fef3c7" },
          ].map(({ label, count, setter, color, bg }) => (
            <div key={label} style={styles.controlRow}>
              <div style={styles.controlLabel}>
                {label}
                <span style={styles.countBadge(color, bg)}>{count}</span>
              </div>
              <div style={styles.btnGroup}>
                <button
                  style={styles.btn("#fff", color)}
                  onClick={() => setter((p) => Math.max(0, p - 1))}
                >−</button>
                <button
                  style={styles.btn("#fff", color)}
                  onClick={() => setter((p) => p + 1)}
                >+</button>
                <button
                  style={styles.btn(color, bg)}
                  onClick={() => setter(0)}
                >✕</button>
              </div>
            </div>
          ))}

          {/* Banner toggle */}
          <div style={styles.controlRow}>
            <span style={styles.controlLabel}>📢 Announcement Banner</span>
            <button
              style={styles.btn("#fff", showBanner ? "#10b981" : "#64748b")}
              onClick={() => setShowBanner((p) => !p)}
            >
              {showBanner ? "👁️" : "🚫"}
            </button>
          </div>
        </div>

        {/* Code explanation */}
        <div style={styles.codeBox}>
          <span style={{ color: "#94a3b8" }}>{"// && operator — renders ONLY when left side is true:"}</span>{"\n"}
          <span style={{ color: "#38bdf8" }}>{"notifCount > 0"}</span>
          <span style={{ color: "#e2e8f0" }}>{" && "}</span>
          <span style={{ color: "#34d399" }}>{"<Badge>{notifCount}</Badge>"}</span>{"\n\n"}
          <span style={{ color: "#94a3b8" }}>{"// ⚠️ Gotcha — never use: 0 && <div>"}</span>{"\n"}
          <span style={{ color: "#94a3b8" }}>{"// 0 renders as '0' in the DOM! Always use:"}</span>{"\n"}
          <span style={{ color: "#38bdf8" }}>{"count > 0"}</span>
          <span style={{ color: "#e2e8f0" }}>{" && "}</span>
          <span style={{ color: "#34d399" }}>{"<Badge />"}</span>
          <span style={{ color: "#94a3b8" }}>{"  // ✅ safe"}</span>
        </div>

      </div>
    </div>
  );
};

export default Notification;
