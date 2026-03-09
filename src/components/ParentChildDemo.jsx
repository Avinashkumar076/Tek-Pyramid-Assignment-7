// ParentChildDemo.jsx — Task 6, Part 1
// Demonstrates the difference between State and Props
//
// KEY CONCEPT:
//   - STATE lives in the Parent — it's mutable (can change)
//   - PROPS flow DOWN to Child — they are read-only (immutable in child)
//   - When Parent's state changes → Child automatically re-renders with new props

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CHILD COMPONENT
// Receives data as PROPS — cannot modify them directly
// Props are like "arguments passed to a function" — read only!
// ─────────────────────────────────────────────────────────────────────────────
const ChildCard = ({ username, age, theme, onThemeChangeRequest }) => {
  const isDark = theme === "dark";

  const styles = {
    card: {
      background: isDark ? "#1e293b" : "#f8fafc",
      border: `2px solid ${isDark ? "#334155" : "#e2e8f0"}`,
      borderRadius: "16px",
      padding: "clamp(16px, 4vw, 24px)",
      color: isDark ? "#e2e8f0" : "#1e293b",
      transition: "all 0.3s",
    },
    badge: {
      display: "inline-block",
      background: "#fef3c7",
      color: "#92400e",
      fontSize: "11px",
      fontWeight: "800",
      padding: "3px 12px",
      borderRadius: "20px",
      marginBottom: "14px",
      letterSpacing: "1px",
    },
    title: {
      fontSize: "clamp(14px, 3vw, 17px)",
      fontWeight: "800",
      marginBottom: "14px",
      color: isDark ? "#f1f5f9" : "#0f172a",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: `1px solid ${isDark ? "#334155" : "#f1f5f9"}`,
      fontSize: "13px",
      gap: "8px",
      flexWrap: "wrap",
    },
    propKey: {
      color: isDark ? "#94a3b8" : "#64748b",
      fontWeight: "600",
      fontFamily: "monospace",
    },
    propValue: {
      color: "#6366f1",
      fontWeight: "800",
      fontFamily: "monospace",
    },
    note: {
      marginTop: "14px",
      background: isDark ? "#0f172a" : "#fef9c3",
      border: `1px dashed ${isDark ? "#334155" : "#fde047"}`,
      borderRadius: "10px",
      padding: "10px 14px",
      fontSize: "12px",
      color: isDark ? "#94a3b8" : "#713f12",
      lineHeight: "1.5",
    },
    requestBtn: {
      marginTop: "12px",
      width: "100%",
      padding: "9px",
      borderRadius: "10px",
      border: "2px dashed #a5b4fc",
      background: "transparent",
      color: "#6366f1",
      fontSize: "12px",
      fontWeight: "700",
      cursor: "pointer",
      fontFamily: "'Segoe UI', sans-serif",
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.badge}>👶 CHILD COMPONENT</div>
      <p style={styles.title}>Displaying Parent's State via Props</p>

      {/* Rendering props passed from parent */}
      <div style={styles.row}>
        <span style={styles.propKey}>username</span>
        <span style={styles.propValue}>"{username}"</span>
      </div>
      <div style={styles.row}>
        <span style={styles.propKey}>age</span>
        <span style={styles.propValue}>{age}</span>
      </div>
      <div style={styles.row}>
        <span style={styles.propKey}>theme</span>
        <span style={styles.propValue}>"{theme}"</span>
      </div>

      <div style={styles.note}>
        🔒 Child <strong>cannot</strong> modify these props directly.
        Props are <strong>read-only</strong> in the child component.
      </div>

      {/* Child can REQUEST parent to change state via a callback prop */}
      <button style={styles.requestBtn} onClick={onThemeChangeRequest}>
        🔄 Request Theme Toggle (via callback prop)
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PARENT COMPONENT
// Owns the STATE — can read and modify it freely
// Passes state values DOWN to Child as props
// ─────────────────────────────────────────────────────────────────────────────
const ParentChildDemo = () => {
  // STATE lives here in the Parent
  const [username, setUsername] = useState("Avinash Kumar");
  const [age, setAge]           = useState(24);
  const [theme, setTheme]       = useState("light");

  // Callback passed to child as prop — child calls this to "request" state change
  // This is how child communicates UP to parent (lifting state up pattern)
  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    container: { maxWidth: "860px", margin: "0 auto" },
    pageTitle: {
      fontSize: "clamp(20px, 4vw, 26px)",
      fontWeight: "900",
      color: "#3b0764",
      marginBottom: "4px",
    },
    subtitle: { color: "#7c3aed", fontSize: "13px", marginBottom: "28px" },
    // Two column grid
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
      marginBottom: "24px",
    },
    parentCard: {
      background: "#ffffff",
      borderRadius: "16px",
      padding: "clamp(16px, 4vw, 24px)",
      boxShadow: "0 8px 30px rgba(124,58,237,0.1)",
      border: "2px solid #a78bfa",
    },
    badge: (color, bg) => ({
      display: "inline-block",
      background: bg,
      color,
      fontSize: "11px",
      fontWeight: "800",
      padding: "3px 12px",
      borderRadius: "20px",
      marginBottom: "14px",
      letterSpacing: "1px",
    }),
    title: {
      fontSize: "clamp(14px, 3vw, 17px)",
      fontWeight: "800",
      color: "#0f172a",
      marginBottom: "14px",
    },
    inputGroup: { marginBottom: "12px" },
    label: {
      display: "block",
      fontSize: "11px",
      fontWeight: "700",
      color: "#7c3aed",
      marginBottom: "5px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    input: {
      width: "100%",
      padding: "9px 12px",
      borderRadius: "8px",
      border: "2px solid #ede9fe",
      background: "#faf5ff",
      color: "#1e293b",
      fontSize: "13px",
      outline: "none",
      boxSizing: "border-box",
      fontFamily: "'Segoe UI', sans-serif",
    },
    themeBtn: {
      width: "100%",
      padding: "10px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(90deg, #7c3aed, #6d28d9)",
      color: "#fff",
      fontSize: "13px",
      fontWeight: "700",
      cursor: "pointer",
      marginTop: "4px",
    },
    arrowBox: {
      background: "#fff",
      borderRadius: "12px",
      padding: "16px",
      textAlign: "center",
      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
      fontSize: "13px",
      color: "#475569",
      lineHeight: "1.8",
    },
    arrow: {
      fontSize: "28px",
      display: "block",
      margin: "4px 0",
      color: "#7c3aed",
    },
    stateBox: {
      background: "#0f172a",
      borderRadius: "10px",
      padding: "12px 16px",
      fontFamily: "monospace",
      fontSize: "12px",
      color: "#a78bfa",
      marginTop: "12px",
      lineHeight: "1.8",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.pageTitle}>🔗 Parent → Child Demo</h2>
        <p style={styles.subtitle}>
          Part 1 — State in Parent · Props flow down · Child re-renders on state change
        </p>

        <div style={styles.grid}>

          {/* ── PARENT CARD ── */}
          <div style={styles.parentCard}>
            <div style={styles.badge("#3b0764", "#ede9fe")}>👑 PARENT COMPONENT</div>
            <p style={styles.title}>Owns & Controls the State</p>

            {/* Username input — updates parent state */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>✏️ Change Username (State)</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                placeholder="Type a username..."
              />
            </div>

            {/* Age input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>🎂 Change Age (State)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                style={styles.input}
                min="1" max="100"
              />
            </div>

            {/* Theme toggle */}
            <button style={styles.themeBtn} onClick={handleThemeToggle}>
              {theme === "light" ? "🌙 Switch to Dark Theme" : "☀️ Switch to Light Theme"}
            </button>

            {/* Shows current state object */}
            <div style={styles.stateBox}>
              <span style={{ color: "#64748b" }}>// Current State:</span>{"\n"}
              {"{"}{"\n"}
              {"  "}username: <span style={{ color: "#34d399" }}>"{username}"</span>,{"\n"}
              {"  "}age: <span style={{ color: "#fb923c" }}>{age}</span>,{"\n"}
              {"  "}theme: <span style={{ color: "#38bdf8" }}>"{theme}"</span>{"\n"}
              {"}"}
            </div>
          </div>

          {/* ── CHILD CARD ── */}
          {/* Parent passes its STATE values as PROPS to child */}
          <ChildCard
            username={username}
            age={age}
            theme={theme}
            onThemeChangeRequest={handleThemeToggle}
          />
        </div>

        {/* ── DATA FLOW EXPLANATION ── */}
        <div style={styles.arrowBox}>
          <strong style={{ color: "#3b0764" }}>📊 How Data Flows</strong>
          <span style={styles.arrow}>⬇️</span>
          <span><strong style={{ color: "#7c3aed" }}>Parent State</strong> → passed as <strong style={{ color: "#059669" }}>Props</strong> → <strong style={{ color: "#2563eb" }}>Child renders</strong></span>
          <span style={styles.arrow}>⬆️</span>
          <span><strong style={{ color: "#2563eb" }}>Child</strong> calls <strong style={{ color: "#059669" }}>callback prop</strong> → <strong style={{ color: "#7c3aed" }}>Parent updates State</strong></span>
        </div>

      </div>
    </div>
  );
};

export default ParentChildDemo;
