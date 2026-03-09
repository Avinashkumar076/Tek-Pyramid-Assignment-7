// PaymentStatus.jsx — Task 7, Part E: Complex Conditional Rendering
// Demonstrates:
//   - Multiple boolean conditions (isPaid, isShipped, isDelivered)
//   - Deriving the correct message from all three conditions combined
//   - Progress tracker UI that updates based on state combinations

import { useState } from "react";

const PaymentStatus = () => {
  // Three independent boolean state variables
  const [isPaid,      setIsPaid]      = useState(false);
  const [isShipped,   setIsShipped]   = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);

  // ── COMPLEX CONDITIONAL LOGIC ────────────────────────────────────────────
  // Evaluates all three booleans together to derive status message + style
  const getOrderStatus = () => {
    // All three true — order complete
    if (isPaid && isShipped && isDelivered) {
      return {
        icon: "🎉",
        title: "Order Delivered!",
        message: "Your package has been delivered successfully. Enjoy your purchase!",
        color: "#16a34a",
        bg: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
        border: "#86efac",
        step: 3,
      };
    }
    // Paid + Shipped but not delivered
    if (isPaid && isShipped && !isDelivered) {
      return {
        icon: "🚚",
        title: "Out for Delivery",
        message: "Your package is on the way! Expected delivery today or tomorrow.",
        color: "#2563eb",
        bg: "linear-gradient(135deg, #eff6ff, #dbeafe)",
        border: "#93c5fd",
        step: 2,
      };
    }
    // Paid but not shipped
    if (isPaid && !isShipped && !isDelivered) {
      return {
        icon: "📦",
        title: "Order Confirmed & Paid",
        message: "Payment received! Your order is being packed and will ship soon.",
        color: "#7c3aed",
        bg: "linear-gradient(135deg, #faf5ff, #ede9fe)",
        border: "#c4b5fd",
        step: 1,
      };
    }
    // Shipped without payment (edge case)
    if (!isPaid && isShipped) {
      return {
        icon: "⚠️",
        title: "Payment Pending",
        message: "Your order was shipped but payment is still pending. Please pay now.",
        color: "#d97706",
        bg: "linear-gradient(135deg, #fffbeb, #fef3c7)",
        border: "#fcd34d",
        step: 0,
      };
    }
    // Delivered without payment (extreme edge case)
    if (isDelivered && !isPaid) {
      return {
        icon: "🚨",
        title: "Payment Required!",
        message: "Item delivered but payment not received. Please complete payment immediately.",
        color: "#dc2626",
        bg: "linear-gradient(135deg, #fff1f2, #fee2e2)",
        border: "#fca5a5",
        step: 0,
      };
    }
    // Nothing selected — default state
    return {
      icon: "🛒",
      title: "Order Placed",
      message: "Your order has been placed. Complete payment to proceed.",
      color: "#64748b",
      bg: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
      border: "#e2e8f0",
      step: 0,
    };
  };

  const status = getOrderStatus();

  const steps = [
    { label: "Order Placed",  icon: "🛒", done: true              },
    { label: "Payment Done",  icon: "💳", done: isPaid            },
    { label: "Shipped",       icon: "📦", done: isShipped         },
    { label: "Delivered",     icon: "🎉", done: isDelivered       },
  ];

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: status.bg,
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
      transition: "background 0.4s",
    },
    container: { maxWidth: "700px", margin: "0 auto" },
    partBadge: {
      display: "inline-block",
      background: "#fff7ed",
      color: "#c2410c",
      fontSize: "11px",
      fontWeight: "800",
      padding: "4px 14px",
      borderRadius: "20px",
      marginBottom: "8px",
      letterSpacing: "1px",
    },
    pageTitle: { fontSize: "clamp(20px, 4vw, 26px)", fontWeight: "900", color: "#0f172a", marginBottom: "4px" },
    subtitle: { color: "#64748b", fontSize: "13px", marginBottom: "24px" },

    // Main status card
    statusCard: {
      background: "#fff",
      borderRadius: "24px",
      border: `2px solid ${status.border}`,
      boxShadow: `0 12px 40px ${status.color}15`,
      overflow: "hidden",
      marginBottom: "20px",
      transition: "all 0.4s",
    },
    statusHeader: {
      padding: "clamp(20px, 4vw, 30px)",
      textAlign: "center",
      borderBottom: `1px solid ${status.border}`,
    },
    statusIcon: { fontSize: "clamp(44px, 10vw, 60px)", marginBottom: "12px" },
    statusTitle: { fontSize: "clamp(18px, 4vw, 24px)", fontWeight: "900", color: status.color, marginBottom: "8px" },
    statusMsg: { fontSize: "14px", color: "#64748b", lineHeight: "1.6", maxWidth: "400px", margin: "0 auto" },

    // Progress tracker
    progressSection: { padding: "clamp(16px, 4vw, 24px)" },
    progressTitle: { fontSize: "12px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "20px" },
    stepsRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "8px",
      position: "relative",
    },
    stepItem: { display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: "8px" },
    stepCircle: (done) => ({
      width: "clamp(36px, 8vw, 46px)",
      height: "clamp(36px, 8vw, 46px)",
      borderRadius: "50%",
      background: done ? status.color : "#f1f5f9",
      border: done ? `2px solid ${status.color}` : "2px solid #e2e8f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "clamp(14px, 3vw, 20px)",
      transition: "all 0.3s",
      boxShadow: done ? `0 4px 12px ${status.color}30` : "none",
    }),
    stepLabel: (done) => ({
      fontSize: "clamp(9px, 2vw, 11px)",
      fontWeight: "700",
      color: done ? status.color : "#94a3b8",
      textAlign: "center",
      textTransform: "uppercase",
      letterSpacing: "0.3px",
    }),
    connectorLine: (done) => ({
      position: "absolute",
      top: "clamp(18px, 4vw, 23px)",
      left: "calc(12.5% + 8px)",
      width: "75%",
      height: "3px",
      background: "#f1f5f9",
      zIndex: 0,
    }),

    // Toggle controls
    controlCard: {
      background: "#fff",
      borderRadius: "20px",
      padding: "clamp(16px, 4vw, 24px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      marginBottom: "20px",
    },
    controlTitle: { fontSize: "13px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" },
    toggleRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid #f8fafc",
      flexWrap: "wrap",
      gap: "10px",
    },
    toggleLabel: { display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: "600", color: "#1e293b" },
    toggle: (on, color) => ({
      width: "52px",
      height: "28px",
      borderRadius: "14px",
      background: on ? color : "#e2e8f0",
      border: "none",
      cursor: "pointer",
      position: "relative",
      transition: "background 0.3s",
      flexShrink: 0,
    }),
    toggleThumb: (on) => ({
      position: "absolute",
      top: "4px",
      left: on ? "28px" : "4px",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      transition: "left 0.3s",
    }),

    codeBox: {
      background: "#0f172a",
      borderRadius: "14px",
      padding: "16px 20px",
      fontFamily: "monospace",
      fontSize: "clamp(10px, 2vw, 11px)",
      color: "#e2e8f0",
      lineHeight: "1.9",
      overflowX: "auto",
    },
  };

  const toggleConfigs = [
    { label: "💳 Payment Received", state: isPaid,      setter: setIsPaid,      color: "#7c3aed" },
    { label: "📦 Order Shipped",     state: isShipped,   setter: setIsShipped,   color: "#2563eb" },
    { label: "🎉 Order Delivered",   state: isDelivered, setter: setIsDelivered, color: "#16a34a" },
  ];

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.partBadge}>PART E — COMPLEX CONDITIONAL</div>
        <h2 style={styles.pageTitle}>📦 Payment & Delivery Status</h2>
        <p style={styles.subtitle}>
          Message changes based on all 3 boolean conditions: isPaid + isShipped + isDelivered
        </p>

        {/* STATUS CARD */}
        <div style={styles.statusCard}>
          <div style={styles.statusHeader}>
            <div style={styles.statusIcon}>{status.icon}</div>
            <div style={styles.statusTitle}>{status.title}</div>
            <p style={styles.statusMsg}>{status.message}</p>
          </div>

          {/* Progress Steps */}
          <div style={styles.progressSection}>
            <p style={styles.progressTitle}>Order Progress</p>
            <div style={styles.stepsRow}>
              {/* Connector line behind steps */}
              <div style={styles.connectorLine()} />
              {steps.map((step, i) => (
                <div key={i} style={{ ...styles.stepItem, zIndex: 1 }}>
                  <div style={styles.stepCircle(step.done)}>
                    {step.done ? "✅" : step.icon}
                  </div>
                  <span style={styles.stepLabel(step.done)}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TOGGLE CONTROLS */}
        <div style={styles.controlCard}>
          <p style={styles.controlTitle}>⚙️ Toggle Order States</p>
          {toggleConfigs.map(({ label, state, setter, color }) => (
            <div key={label} style={styles.toggleRow}>
              <span style={styles.toggleLabel}>
                {label}
                <span style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  color: state ? color : "#94a3b8",
                  background: state ? `${color}15` : "#f1f5f9",
                  padding: "2px 10px",
                  borderRadius: "20px",
                }}>
                  {state ? "TRUE ✅" : "FALSE ❌"}
                </span>
              </span>
              <button style={styles.toggle(state, color)} onClick={() => setter((p) => !p)}>
                <div style={styles.toggleThumb(state)} />
              </button>
            </div>
          ))}
        </div>

        {/* Code explanation */}
        <div style={styles.codeBox}>
          <span style={{ color: "#94a3b8" }}>{"// Complex conditional — all 3 booleans:"}</span>{"\n"}
          <span style={{ color: "#38bdf8" }}>if</span>
          <span style={{ color: "#e2e8f0" }}>{" (isPaid && isShipped && isDelivered) "}</span>
          <span style={{ color: "#34d399" }}>return "Delivered 🎉"</span>{"\n"}
          <span style={{ color: "#38bdf8" }}>if</span>
          <span style={{ color: "#e2e8f0" }}>{" (isPaid && isShipped && !isDelivered) "}</span>
          <span style={{ color: "#34d399" }}>return "Out for Delivery 🚚"</span>{"\n"}
          <span style={{ color: "#38bdf8" }}>if</span>
          <span style={{ color: "#e2e8f0" }}>{" (isPaid && !isShipped) "}</span>
          <span style={{ color: "#34d399" }}>return "Order Confirmed 📦"</span>{"\n"}
          <span style={{ color: "#38bdf8" }}>{"default: "}</span>
          <span style={{ color: "#f87171" }}>return "Order Placed 🛒"</span>
        </div>

      </div>
    </div>
  );
};

export default PaymentStatus;
