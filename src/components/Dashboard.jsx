// Dashboard.jsx
// Demonstrates remaining JSX best practices:
//   1. JSX comments
//   2. Self-closing tags
//   3. Proper attribute naming — className, htmlFor
//   4. Boolean attributes
//   5. aria-* attributes for accessibility

import { useState } from "react";

const Dashboard = () => {
  // State for the search input — controlled component
  const [searchValue, setSearchValue] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // --- Inline style objects ---
  const styles = {
    wrapper: {
      minHeight: "100vh",
      // 4. DYNAMIC INLINE STYLE based on darkMode boolean
      background: darkMode ? "#0f172a" : "#f1f5f9",
      color: darkMode ? "#e2e8f0" : "#1e293b",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      transition: "background 0.3s, color 0.3s",
      padding: "20px",
      boxSizing: "border-box",
    },
    container: {
      maxWidth: "800px",
      margin: "0 auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "28px",
      flexWrap: "wrap",
      gap: "12px",
    },
    title: {
      fontSize: "clamp(20px, 4vw, 28px)",
      fontWeight: "800",
    },
    toggleBtn: {
      padding: "8px 18px",
      borderRadius: "8px",
      border: "none",
      background: darkMode ? "#334155" : "#1e293b",
      color: "#fff",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "600",
    },
    card: {
      background: darkMode ? "#1e293b" : "#ffffff",
      borderRadius: "16px",
      padding: "clamp(16px, 4vw, 24px)",
      marginBottom: "20px",
      boxShadow: darkMode
        ? "0 4px 20px rgba(0,0,0,0.4)"
        : "0 4px 20px rgba(0,0,0,0.06)",
    },
    sectionTitle: {
      fontSize: "14px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "1px",
      color: darkMode ? "#94a3b8" : "#64748b",
      marginBottom: "16px",
    },
    // Form styles
    formGroup: {
      marginBottom: "16px",
    },
    label: {
      display: "block",
      fontSize: "13px",
      fontWeight: "600",
      marginBottom: "6px",
      color: darkMode ? "#cbd5e1" : "#374151",
    },
    input: {
      width: "100%",
      padding: "10px 14px",
      borderRadius: "8px",
      border: darkMode ? "1px solid #334155" : "1px solid #e2e8f0",
      background: darkMode ? "#0f172a" : "#f8fafc",
      color: darkMode ? "#e2e8f0" : "#1e293b",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box",
    },
    checkboxRow: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "12px",
      flexWrap: "wrap",
    },
    checkbox: {
      width: "18px",
      height: "18px",
      cursor: "pointer",
      accentColor: "#6366f1",
    },
    checkboxLabel: {
      fontSize: "14px",
      color: darkMode ? "#cbd5e1" : "#374151",
      cursor: "pointer",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",  // responsive grid
      gap: "14px",
    },
    statCard: {
      background: darkMode ? "#0f172a" : "#f8fafc",
      borderRadius: "12px",
      padding: "16px",
      textAlign: "center",
      border: darkMode ? "1px solid #1e293b" : "1px solid #e2e8f0",
    },
    statIcon: {
      fontSize: "28px",
      marginBottom: "8px",
    },
    statValue: {
      fontSize: "clamp(18px, 3vw, 22px)",
      fontWeight: "800",
      color: "#6366f1",
    },
    statLabel: {
      fontSize: "11px",
      color: darkMode ? "#64748b" : "#94a3b8",
      marginTop: "4px",
    },
    // Accessible image wrapper
    imgWrapper: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
    },
    img: {
      width: "clamp(60px, 15vw, 80px)",
      height: "clamp(60px, 15vw, 80px)",
      borderRadius: "12px",
      objectFit: "cover",
    },
    progressBar: {
      height: "8px",
      background: darkMode ? "#1e293b" : "#e2e8f0",
      borderRadius: "4px",
      overflow: "hidden",
      marginTop: "6px",
    },
    progressFill: {
      height: "100%",
      borderRadius: "4px",
      background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
    },
    skillRow: {
      marginBottom: "14px",
    },
    skillName: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "13px",
      fontWeight: "600",
      marginBottom: "4px",
    },
  };

  const skills = [
    { name: "React.js", level: 85 },
    { name: "Node.js", level: 75 },
    { name: "MongoDB", level: 70 },
    { name: "Tailwind CSS", level: 90 },
  ];

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>

        {/* ===== HEADER ===== */}
        {/* JSX COMMENT: This is how you write comments inside JSX — wrapped in {} */}
        <div style={styles.header}>
          <h1 style={styles.title}>📊 Developer Dashboard</h1>

          {/* Self-closing button is not valid, but all void HTML elements ARE self-closing in JSX */}
          {/* Toggle Dark Mode */}
          <button
            style={styles.toggleBtn}
            onClick={() => setDarkMode(!darkMode)}
            // aria-* attribute for accessibility — screen readers use this
            aria-label="Toggle dark mode"
            // aria-pressed is a boolean aria attribute telling screen readers button state
            aria-pressed={darkMode}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* ===== STATS SECTION ===== */}
        <div style={styles.card}>
          <p style={styles.sectionTitle}>📈 Overview</p>
          <div style={styles.statsGrid}>
            {[
              { icon: "💻", value: "12", label: "Projects" },
              { icon: "⭐", value: "4.8", label: "Rating" },
              { icon: "☕", value: "340", label: "Commits" },
              { icon: "🚀", value: "1+", label: "Years Exp." },
            ].map((stat, i) => (
              <div
                key={i}
                style={styles.statCard}
                // aria-label for accessibility on decorative cards
                role="region"
                aria-label={`${stat.label}: ${stat.value}`}
              >
                {/* Self-closing custom component equivalent — div with no children */}
                <div style={styles.statIcon}>{stat.icon}</div>
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== FORM SECTION ===== */}
        {/* Demonstrates: htmlFor, className equivalent, boolean attributes */}
        <div style={styles.card}>
          <p style={styles.sectionTitle}>⚙️ Settings</p>

          {/* Form Group 1 — Search input */}
          <div style={styles.formGroup}>
            {/* htmlFor links label to input — JSX equivalent of HTML's "for" attribute */}
            {/* In HTML: <label for="search"> — In JSX: <label htmlFor="search"> */}
            <label htmlFor="search" style={styles.label}>
              🔍 Search Projects
            </label>
            {/* Self-closing input tag — void element, always self-closing in JSX */}
            <input
              id="search"
              type="text"
              placeholder="Search by name..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={styles.input}
              // aria-label for screen readers
              aria-label="Search projects input"
              // Boolean attribute — no value needed, presence = true
              autoComplete="off"
              spellCheck={false}
            />
            {/* Show search value as live JS expression */}
            {searchValue && (
              <p style={{ fontSize: "12px", color: "#6366f1", marginTop: "6px" }}>
                🔎 Searching for: <strong>{searchValue}</strong>
              </p>
            )}
          </div>

          {/* Form Group 2 — Checkboxes with boolean attributes */}
          <div style={styles.formGroup}>
            <p style={styles.label}>🔔 Preferences</p>

            {/* Checkbox 1 */}
            <div style={styles.checkboxRow}>
              <input
                type="checkbox"
                id="notifications"
                style={styles.checkbox}
                // BOOLEAN ATTRIBUTE — checked is a boolean prop
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                // aria-checked for screen reader accessibility
                aria-checked={notifications}
              />
              {/* htmlFor connects this label to the checkbox above */}
              <label htmlFor="notifications" style={styles.checkboxLabel}>
                Enable Notifications
              </label>
            </div>

            {/* Checkbox 2 — disabled boolean attribute */}
            <div style={styles.checkboxRow}>
              <input
                type="checkbox"
                id="newsletter"
                style={styles.checkbox}
                defaultChecked={true}
                // BOOLEAN ATTRIBUTE — disabled disables the input without needing a value
                disabled
                aria-disabled={true}
              />
              <label htmlFor="newsletter" style={{ ...styles.checkboxLabel, opacity: 0.5 }}>
                Subscribe to Newsletter (disabled)
              </label>
            </div>

            {/* Radio buttons — another boolean attribute example */}
            <div style={{ marginTop: "10px" }}>
              <p style={{ ...styles.label, marginBottom: "8px" }}>🎨 Theme</p>
              {["System", "Light", "Dark"].map((option) => (
                <div key={option} style={{ ...styles.checkboxRow, marginBottom: "6px" }}>
                  <input
                    type="radio"
                    id={`theme-${option}`}
                    name="theme"
                    // BOOLEAN ATTRIBUTE — defaultChecked for default selection
                    defaultChecked={option === "System"}
                    style={{ accentColor: "#6366f1", cursor: "pointer" }}
                    aria-label={`Select ${option} theme`}
                  />
                  {/* htmlFor linking label to radio button */}
                  <label htmlFor={`theme-${option}`} style={styles.checkboxLabel}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== SKILLS SECTION with self-closing <hr /> ===== */}
        <div style={styles.card}>
          <p style={styles.sectionTitle}>🛠️ Skill Proficiency</p>

          {/* Self-closing <hr /> — horizontal rule, void element */}
          <hr style={{ border: "none", borderTop: darkMode ? "1px solid #334155" : "1px solid #e2e8f0", marginBottom: "16px" }} />

          {skills.map((skill) => (
            <div key={skill.name} style={styles.skillRow}>
              <div style={styles.skillName}>
                <span>{skill.name}</span>
                <span style={{ color: "#6366f1" }}>{skill.level}%</span>
              </div>
              <div
                style={styles.progressBar}
                // aria-* attributes for accessibility
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.name} proficiency`}
              >
                <div style={{ ...styles.progressFill, width: `${skill.level}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* ===== IMAGES SECTION — self-closing img tags ===== */}
        <div style={styles.card}>
          <p style={styles.sectionTitle}>🖼️ Project Thumbnails</p>
          <div style={styles.imgWrapper}>
            {/* Self-closing <img /> tag — all void elements must be self-closed in JSX */}
            <img
              src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop"
              alt="Mechanical keyboard project"
              style={styles.img}
              // loading="lazy" is a boolean-like attribute for performance
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop"
              alt="Shoe store project"
              style={styles.img}
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop"
              alt="Watch app project"
              style={styles.img}
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
