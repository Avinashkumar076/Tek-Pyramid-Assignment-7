// SubscriptionStatus.jsx — Task 7, Part B: Ternary Operator
// Demonstrates:
//   - Ternary operator for inline conditional rendering
//   - Nested ternaries for 3+ conditions
//   - Different UI elements based on subscription type

import { useState } from "react";

const SubscriptionStatus = () => {
  // State for subscription type
  const [plan, setPlan] = useState("free");

  // Plan config — features and styling per plan
  const planConfig = {
    free: {
      icon: "🆓",
      label: "Free Plan",
      color: "#64748b",
      bg: "#f8fafc",
      border: "#e2e8f0",
      btnBg: "#f1f5f9",
      btnColor: "#64748b",
      features: [
        { text: "5 Projects",          available: true  },
        { text: "1 GB Storage",         available: true  },
        { text: "Community Support",    available: true  },
        { text: "Advanced Analytics",   available: false },
        { text: "Priority Support",     available: false },
        { text: "Custom Domain",        available: false },
        { text: "Team Collaboration",   available: false },
        { text: "API Access",           available: false },
      ],
    },
    premium: {
      icon: "⭐",
      label: "Premium Plan",
      color: "#6366f1",
      bg: "#ede9fe",
      border: "#a78bfa",
      btnBg: "linear-gradient(90deg, #6366f1, #4f46e5)",
      btnColor: "#ffffff",
      features: [
        { text: "Unlimited Projects",   available: true },
        { text: "50 GB Storage",        available: true },
        { text: "Priority Support",     available: true },
        { text: "Advanced Analytics",   available: true },
        { text: "Custom Domain",        available: true },
        { text: "API Access",           available: true },
        { text: "Team Collaboration",   available: false },
        { text: "Dedicated Manager",    available: false },
      ],
    },
    enterprise: {
      icon: "🏢",
      label: "Enterprise Plan",
      color: "#f59e0b",
      bg: "#fffbeb",
      border: "#fbbf24",
      btnBg: "linear-gradient(90deg, #f59e0b, #d97706)",
      btnColor: "#ffffff",
      features: [
        { text: "Unlimited Projects",   available: true },
        { text: "1 TB Storage",         available: true },
        { text: "24/7 Priority Support",available: true },
        { text: "Advanced Analytics",   available: true },
        { text: "Custom Domain",        available: true },
        { text: "API Access",           available: true },
        { text: "Team Collaboration",   available: true },
        { text: "Dedicated Manager",    available: true },
      ],
    },
  };

  const current = planConfig[plan];

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    container: { maxWidth: "700px", margin: "0 auto" },
    partBadge: {
      display: "inline-block",
      background: "#dbeafe",
      color: "#1d4ed8",
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

    // Plan selector tabs
    planTabs: {
      display: "flex",
      gap: "10px",
      marginBottom: "24px",
      flexWrap: "wrap",
    },
    planTab: (isActive, config) => ({
      flex: "1",
      minWidth: "100px",
      padding: "10px 16px",
      borderRadius: "12px",
      border: isActive ? `2px solid ${config.color}` : "2px solid #e2e8f0",
      background: isActive ? config.bg : "#fff",
      color: isActive ? config.color : "#94a3b8",
      cursor: "pointer",
      fontSize: "clamp(12px, 2.5vw, 14px)",
      fontWeight: "700",
      transition: "all 0.2s",
      fontFamily: "'Segoe UI', sans-serif",
    }),

    // Main plan card
    planCard: {
      background: "#fff",
      borderRadius: "20px",
      padding: "clamp(20px, 5vw, 32px)",
      boxShadow: `0 8px 30px ${current.color}20`,
      border: `2px solid ${current.border}`,
      transition: "all 0.3s",
      marginBottom: "20px",
    },
    planHeader: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    planIcon: {
      width: "56px",
      height: "56px",
      borderRadius: "16px",
      background: current.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "28px",
      flexShrink: 0,
    },
    planName: {
      fontSize: "clamp(18px, 4vw, 22px)",
      fontWeight: "900",
      color: "#0f172a",
    },
    planBadge: {
      display: "inline-block",
      background: current.bg,
      color: current.color,
      fontSize: "11px",
      fontWeight: "700",
      padding: "3px 12px",
      borderRadius: "20px",
      border: `1px solid ${current.border}`,
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "10px",
      marginBottom: "24px",
    },
    featureItem: (available) => ({
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 12px",
      borderRadius: "10px",
      background: available ? "#f0fdf4" : "#fafafa",
      border: available ? "1px solid #bbf7d0" : "1px solid #f1f5f9",
    }),
    featureText: (available) => ({
      fontSize: "13px",
      fontWeight: "600",
      color: available ? "#166534" : "#94a3b8",
      textDecoration: available ? "none" : "line-through",
    }),
    upgradeBtn: {
      width: "100%",
      padding: "13px",
      borderRadius: "12px",
      border: "none",
      background: current.btnBg,
      color: current.btnColor,
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
    },
    ternaryBox: {
      background: "#0f172a",
      borderRadius: "14px",
      padding: "16px 20px",
      fontFamily: "monospace",
      fontSize: "clamp(10px, 2vw, 12px)",
      color: "#e2e8f0",
      lineHeight: "1.8",
      overflowX: "auto",
    },
    codeTitle: {
      fontSize: "12px",
      fontWeight: "700",
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.partBadge}>PART B — TERNARY OPERATOR</div>
        <h2 style={styles.pageTitle}>💎 Subscription Status</h2>
        <p style={styles.subtitle}>
          Different UI elements rendered based on subscription type using ternary operator
        </p>

        {/* Plan selector */}
        <div style={styles.planTabs}>
          {Object.keys(planConfig).map((key) => (
            <button
              key={key}
              style={styles.planTab(plan === key, planConfig[key])}
              onClick={() => setPlan(key)}
            >
              {planConfig[key].icon} {planConfig[key].label}
            </button>
          ))}
        </div>

        {/* Plan card — content changes via ternary */}
        <div style={styles.planCard}>
          <div style={styles.planHeader}>
            <div style={styles.planIcon}>{current.icon}</div>
            <div>
              <div style={styles.planName}>{current.label}</div>
              {/* TERNARY: show "Active" badge only for paid plans */}
              <span style={styles.planBadge}>
                {plan === "free" ? "Free Forever" : "✅ Active Subscription"}
              </span>
            </div>
          </div>

          {/* Features — available/locked rendered via ternary on each item */}
          <div style={styles.featuresGrid}>
            {current.features.map((feature, i) => (
              <div key={i} style={styles.featureItem(feature.available)}>
                {/* TERNARY: ✅ or ❌ based on feature.available */}
                <span>{feature.available ? "✅" : "❌"}</span>
                <span style={styles.featureText(feature.available)}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* NESTED TERNARY: Different button text per plan */}
          <button style={styles.upgradeBtn}>
            {plan === "free"
              ? "⬆️ Upgrade to Premium"
              : plan === "premium"
              ? "🏢 Upgrade to Enterprise"
              : "✅ You're on the Best Plan!"}
          </button>
        </div>

        {/* Code explanation */}
        <p style={styles.codeTitle}>💻 Ternary Syntax Used</p>
        <div style={styles.ternaryBox}>
          <span style={{ color: "#94a3b8" }}>{"// Simple ternary:"}</span>{"\n"}
          <span style={{ color: "#38bdf8" }}>condition</span>
          <span style={{ color: "#e2e8f0" }}> ? </span>
          <span style={{ color: "#34d399" }}>"JSX if true"</span>
          <span style={{ color: "#e2e8f0" }}> : </span>
          <span style={{ color: "#f87171" }}>"JSX if false"</span>{"\n\n"}
          <span style={{ color: "#94a3b8" }}>{"// Nested ternary (3 conditions):"}</span>{"\n"}
          <span style={{ color: "#38bdf8" }}>plan === "free"</span>
          <span style={{ color: "#e2e8f0" }}> ? </span>
          <span style={{ color: "#34d399" }}>"Upgrade to Premium"</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  : "}</span>
          <span style={{ color: "#38bdf8" }}>plan === "premium"</span>
          <span style={{ color: "#e2e8f0" }}> ? </span>
          <span style={{ color: "#34d399" }}>"Upgrade to Enterprise"</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  : "}</span>
          <span style={{ color: "#f87171" }}>"You're on the Best Plan!"</span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionStatus;
