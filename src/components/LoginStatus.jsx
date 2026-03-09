// LoginStatus.jsx — Task 7, Part A: If-Else Rendering
// Demonstrates:
//   - Using if statement to return COMPLETELY DIFFERENT JSX blocks
//   - State toggle to switch between logged in / logged out
//   - Early return pattern (most readable for large JSX differences)

import { useState } from "react";

const LoginStatus = () => {
  // State tracks whether user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username]                   = useState("Avinash Kumar");

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    card: {
      background: "#ffffff",
      borderRadius: "24px",
      padding: "clamp(28px, 6vw, 48px)",
      width: "100%",
      maxWidth: "440px",
      textAlign: "center",
      boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
    },
    partBadge: {
      display: "inline-block",
      background: "#eff6ff",
      color: "#1d4ed8",
      fontSize: "11px",
      fontWeight: "800",
      padding: "4px 14px",
      borderRadius: "20px",
      marginBottom: "20px",
      letterSpacing: "1px",
    },
    // Logged IN styles
    avatarIn: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #22c55e, #16a34a)",
      margin: "0 auto 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "32px",
      boxShadow: "0 8px 24px rgba(34,197,94,0.3)",
    },
    welcomeText: {
      fontSize: "clamp(18px, 4vw, 24px)",
      fontWeight: "900",
      color: "#0f172a",
      marginBottom: "6px",
    },
    subText: {
      fontSize: "14px",
      color: "#64748b",
      marginBottom: "24px",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      marginBottom: "24px",
    },
    infoBox: (color, bg) => ({
      background: bg,
      borderRadius: "12px",
      padding: "14px",
      textAlign: "center",
    }),
    infoValue: (color) => ({
      fontSize: "18px",
      fontWeight: "900",
      color,
    }),
    infoLabel: {
      fontSize: "11px",
      color: "#94a3b8",
      marginTop: "2px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    logoutBtn: {
      width: "100%",
      padding: "13px",
      borderRadius: "12px",
      border: "none",
      background: "linear-gradient(90deg, #ef4444, #dc2626)",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 4px 14px rgba(239,68,68,0.3)",
    },
    // Logged OUT styles
    avatarOut: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "#f1f5f9",
      margin: "0 auto 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "36px",
      border: "3px dashed #e2e8f0",
    },
    pleaseLogin: {
      fontSize: "clamp(18px, 4vw, 22px)",
      fontWeight: "900",
      color: "#0f172a",
      marginBottom: "8px",
    },
    loginDesc: {
      fontSize: "14px",
      color: "#94a3b8",
      marginBottom: "28px",
      lineHeight: "1.6",
    },
    loginBtn: {
      width: "100%",
      padding: "13px",
      borderRadius: "12px",
      border: "none",
      background: "linear-gradient(90deg, #6366f1, #4f46e5)",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
      marginBottom: "12px",
    },
    guestBtn: {
      width: "100%",
      padding: "12px",
      borderRadius: "12px",
      border: "2px solid #e2e8f0",
      background: "transparent",
      color: "#64748b",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
    },
    codeComment: {
      marginTop: "20px",
      background: "#0f172a",
      borderRadius: "10px",
      padding: "12px 16px",
      fontFamily: "monospace",
      fontSize: "11px",
      color: "#64748b",
      textAlign: "left",
      lineHeight: "1.8",
    },
  };

  // ── IF-ELSE RENDERING ────────────────────────────────────────────────────
  // We use if statement to return completely different JSX
  // This is the most readable approach when JSX blocks are large & different

  if (isLoggedIn) {
    // ✅ LOGGED IN JSX — returned when isLoggedIn is true
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.partBadge}>PART A — IF / ELSE</div>

          {/* Avatar */}
          <div style={styles.avatarIn}>👤</div>

          {/* Welcome message */}
          <h2 style={styles.welcomeText}>Welcome, {username}! 👋</h2>
          <p style={styles.subText}>You are successfully logged in.</p>

          {/* User info grid */}
          <div style={styles.infoGrid}>
            <div style={styles.infoBox("#6366f1", "#ede9fe")}>
              <div style={styles.infoValue("#6366f1")}>12</div>
              <div style={styles.infoLabel}>Projects</div>
            </div>
            <div style={styles.infoBox("#16a34a", "#dcfce7")}>
              <div style={styles.infoValue("#16a34a")}>Active ✅</div>
              <div style={styles.infoLabel}>Status</div>
            </div>
          </div>

          {/* Logout button */}
          <button style={styles.logoutBtn} onClick={() => setIsLoggedIn(false)}>
            🚪 Log Out
          </button>

          {/* Code comment showing what's happening */}
          <div style={styles.codeComment}>
            <span style={{ color: "#64748b" }}>{"// if (isLoggedIn) {"}</span>{"\n"}
            <span style={{ color: "#34d399" }}>{"//   return <WelcomeUI /> ✅"}</span>{"\n"}
            <span style={{ color: "#64748b" }}>{"// }"}</span>
          </div>
        </div>
      </div>
    );
  }

  // ❌ LOGGED OUT JSX — returned when isLoggedIn is false (else branch)
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.partBadge}>PART A — IF / ELSE</div>

        {/* Avatar placeholder */}
        <div style={styles.avatarOut}>🔒</div>

        <h2 style={styles.pleaseLogin}>Please Log In</h2>
        <p style={styles.loginDesc}>
          You need to sign in to access your dashboard,
          projects, and all features.
        </p>

        {/* Login button */}
        <button style={styles.loginBtn} onClick={() => setIsLoggedIn(true)}>
          🔐 Login as {username}
        </button>
        <button style={styles.guestBtn}>
          👀 Continue as Guest
        </button>

        {/* Code comment */}
        <div style={styles.codeComment}>
          <span style={{ color: "#64748b" }}>{"// else {"}</span>{"\n"}
          <span style={{ color: "#f87171" }}>{"//   return <LoginUI /> ❌"}</span>{"\n"}
          <span style={{ color: "#64748b" }}>{"// }"}</span>
        </div>
      </div>
    </div>
  );
};

export default LoginStatus;
