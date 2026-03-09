// UserDashboard.jsx — Task 7, Part D: Switch Case Pattern
// Demonstrates:
//   - Function with switch case returning different JSX per role
//   - admin / editor / viewer / guest see completely different dashboards

import { useState } from "react";

// Each role's dashboard content defined separately for clarity
const AdminDashboard = () => (
  <div>
    <div style={gridStyle}>
      {[
        { icon: "👥", value: "1,284", label: "Total Users",    color: "#6366f1", bg: "#ede9fe" },
        { icon: "💰", value: "₹4.2L", label: "Revenue",        color: "#16a34a", bg: "#dcfce7" },
        { icon: "🚨", value: "3",      label: "Open Issues",   color: "#ef4444", bg: "#fee2e2" },
        { icon: "📊", value: "98.2%",  label: "Uptime",        color: "#f59e0b", bg: "#fef3c7" },
      ].map((s, i) => <StatBox key={i} {...s} />)}
    </div>
    <ActionList actions={[
      "🛠️ Manage all users & permissions",
      "📈 View complete analytics & reports",
      "⚙️ Configure system settings",
      "🗄️ Access database & server logs",
      "🔐 Security & audit trail access",
    ]} color="#6366f1" />
  </div>
);

const EditorDashboard = () => (
  <div>
    <div style={gridStyle}>
      {[
        { icon: "📝", value: "47",   label: "My Articles",   color: "#3b82f6", bg: "#dbeafe" },
        { icon: "✅", value: "12",   label: "Published",     color: "#16a34a", bg: "#dcfce7" },
        { icon: "📋", value: "8",    label: "Drafts",        color: "#f59e0b", bg: "#fef3c7" },
        { icon: "💬", value: "234",  label: "Comments",      color: "#8b5cf6", bg: "#ede9fe" },
      ].map((s, i) => <StatBox key={i} {...s} />)}
    </div>
    <ActionList actions={[
      "✍️ Create and edit content",
      "📤 Publish & schedule posts",
      "🖼️ Upload and manage media",
      "💬 Manage article comments",
    ]} color="#3b82f6" />
  </div>
);

const ViewerDashboard = () => (
  <div>
    <div style={gridStyle}>
      {[
        { icon: "📖", value: "128",  label: "Articles Read", color: "#0ea5e9", bg: "#e0f2fe" },
        { icon: "❤️", value: "34",   label: "Liked Posts",   color: "#ef4444", bg: "#fee2e2" },
        { icon: "🔖", value: "19",   label: "Bookmarks",     color: "#f59e0b", bg: "#fef3c7" },
        { icon: "💬", value: "7",    label: "Comments",      color: "#10b981", bg: "#d1fae5" },
      ].map((s, i) => <StatBox key={i} {...s} />)}
    </div>
    <ActionList actions={[
      "📖 Read published articles",
      "❤️ Like and bookmark posts",
      "💬 Leave comments on articles",
      "👤 Update your profile",
    ]} color="#0ea5e9" />
  </div>
);

const GuestDashboard = () => (
  <div style={{ textAlign: "center", padding: "clamp(20px, 5vw, 40px)" }}>
    <div style={{ fontSize: "60px", marginBottom: "16px" }}>👋</div>
    <h3 style={{ fontSize: "clamp(18px, 4vw, 22px)", fontWeight: "800", color: "#0f172a", marginBottom: "10px" }}>
      Welcome, Guest!
    </h3>
    <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px", lineHeight: "1.6" }}>
      You have limited access. Sign up to unlock all features
      and get your personalized dashboard.
    </p>
    <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
      <button style={{ padding: "10px 24px", borderRadius: "10px", border: "none", background: "linear-gradient(90deg, #6366f1, #4f46e5)", color: "#fff", fontWeight: "700", cursor: "pointer", fontSize: "14px", fontFamily: "'Segoe UI', sans-serif" }}>
        🚀 Sign Up Free
      </button>
      <button style={{ padding: "10px 24px", borderRadius: "10px", border: "2px solid #e2e8f0", background: "transparent", color: "#64748b", fontWeight: "700", cursor: "pointer", fontSize: "14px", fontFamily: "'Segoe UI', sans-serif" }}>
        🔐 Log In
      </button>
    </div>
  </div>
);

// Shared sub-components
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
  gap: "12px",
  marginBottom: "20px",
};

const StatBox = ({ icon, value, label, color, bg }) => (
  <div style={{ background: bg, borderRadius: "14px", padding: "16px", textAlign: "center" }}>
    <div style={{ fontSize: "24px", marginBottom: "6px" }}>{icon}</div>
    <div style={{ fontSize: "clamp(18px, 4vw, 22px)", fontWeight: "900", color }}>{value}</div>
    <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "3px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
  </div>
);

const ActionList = ({ actions, color }) => (
  <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "16px" }}>
    <p style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
      Your Permissions
    </p>
    {actions.map((action, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 0", borderBottom: i < actions.length - 1 ? "1px solid #f1f5f9" : "none", fontSize: "13px", color: "#374151", fontWeight: "500" }}>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, flexShrink: 0 }} />
        {action}
      </div>
    ))}
  </div>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const UserDashboard = () => {
  const [role, setRole] = useState("guest");

  const roles = [
    { id: "admin",   label: "Admin",   icon: "👑", color: "#6366f1", bg: "#ede9fe" },
    { id: "editor",  label: "Editor",  icon: "✍️", color: "#3b82f6", bg: "#dbeafe" },
    { id: "viewer",  label: "Viewer",  icon: "👁️", color: "#0ea5e9", bg: "#e0f2fe" },
    { id: "guest",   label: "Guest",   icon: "👋", color: "#64748b", bg: "#f1f5f9" },
  ];

  const currentRole = roles.find((r) => r.id === role);

  // ── SWITCH CASE FUNCTION ─────────────────────────────────────────────────
  // Returns different JSX based on the role value
  // Much cleaner than chained ternaries for 4+ conditions
  const renderDashboard = (role) => {
    switch (role) {
      case "admin":   return <AdminDashboard />;
      case "editor":  return <EditorDashboard />;
      case "viewer":  return <ViewerDashboard />;
      case "guest":   return <GuestDashboard />;
      default:        return <GuestDashboard />;  // fallback
    }
  };

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    container: { maxWidth: "800px", margin: "0 auto" },
    partBadge: {
      display: "inline-block",
      background: "#dcfce7",
      color: "#166534",
      fontSize: "11px",
      fontWeight: "800",
      padding: "4px 14px",
      borderRadius: "20px",
      marginBottom: "8px",
      letterSpacing: "1px",
    },
    pageTitle: { fontSize: "clamp(20px, 4vw, 26px)", fontWeight: "900", color: "#0f172a", marginBottom: "4px" },
    subtitle: { color: "#64748b", fontSize: "13px", marginBottom: "24px" },
    roleGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "10px",
      marginBottom: "24px",
    },
    roleBtn: (isActive, roleData) => ({
      padding: "clamp(10px, 3vw, 14px) 8px",
      borderRadius: "14px",
      border: isActive ? `2px solid ${roleData.color}` : "2px solid #e2e8f0",
      background: isActive ? roleData.bg : "#fff",
      color: isActive ? roleData.color : "#94a3b8",
      cursor: "pointer",
      textAlign: "center",
      fontFamily: "'Segoe UI', sans-serif",
      transition: "all 0.2s",
    }),
    roleIcon: { fontSize: "clamp(20px, 5vw, 28px)", display: "block", marginBottom: "4px" },
    roleLabel: { fontSize: "clamp(10px, 2.5vw, 12px)", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" },
    dashCard: {
      background: "#fff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: `0 8px 30px ${currentRole.color}15`,
      border: `2px solid ${currentRole.bg}`,
      marginBottom: "20px",
    },
    dashHeader: {
      background: `linear-gradient(90deg, ${currentRole.color}, ${currentRole.color}cc)`,
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flexWrap: "wrap",
    },
    dashTitle: { color: "#fff", fontWeight: "800", fontSize: "clamp(15px, 3vw, 18px)" },
    dashBody: { padding: "clamp(16px, 4vw, 24px)" },
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
        <div style={styles.partBadge}>PART D — SWITCH CASE PATTERN</div>
        <h2 style={styles.pageTitle}>🎛️ Role-Based Dashboard</h2>
        <p style={styles.subtitle}>
          Different UI rendered for each role using a switch case function
        </p>

        {/* Role selector */}
        <div style={styles.roleGrid}>
          {roles.map((r) => (
            <button key={r.id} style={styles.roleBtn(role === r.id, r)} onClick={() => setRole(r.id)}>
              <span style={styles.roleIcon}>{r.icon}</span>
              <span style={styles.roleLabel}>{r.label}</span>
            </button>
          ))}
        </div>

        {/* Dashboard card */}
        <div style={styles.dashCard}>
          <div style={styles.dashHeader}>
            <span style={{ fontSize: "24px" }}>{currentRole.icon}</span>
            <span style={styles.dashTitle}>{currentRole.label} Dashboard</span>
          </div>
          <div style={styles.dashBody}>
            {/* SWITCH CASE renders different component per role */}
            {renderDashboard(role)}
          </div>
        </div>

        {/* Code explanation */}
        <div style={styles.codeBox}>
          <span style={{ color: "#94a3b8" }}>{"// Switch case function returns different JSX:"}</span>{"\n"}
          <span style={{ color: "#38bdf8" }}>{"const renderDashboard = (role) => {"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  switch (role) {"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"    case "}</span><span style={{ color: "#fbbf24" }}>"admin"</span><span style={{ color: "#e2e8f0" }}>{": return "}</span><span style={{ color: "#34d399" }}>{"<AdminDashboard />"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"    case "}</span><span style={{ color: "#fbbf24" }}>"editor"</span><span style={{ color: "#e2e8f0" }}>{": return "}</span><span style={{ color: "#34d399" }}>{"<EditorDashboard />"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"    case "}</span><span style={{ color: "#fbbf24" }}>"viewer"</span><span style={{ color: "#e2e8f0" }}>{": return "}</span><span style={{ color: "#34d399" }}>{"<ViewerDashboard />"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"    default: return "}</span><span style={{ color: "#f87171" }}>{"<GuestDashboard />"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  }"}</span>{"\n"}
          <span style={{ color: "#38bdf8" }}>{"}"}</span>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
