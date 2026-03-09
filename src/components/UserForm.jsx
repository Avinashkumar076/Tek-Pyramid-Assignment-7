// UserForm.jsx — Task 5, Part B: Object State
// Demonstrates:
//   - State as a single object containing multiple fields
//   - Controlled inputs (input value tied to state)
//   - State update WITHOUT mutating original state (spread operator)
//   - Real-time display of entered data

import { useState } from "react";

const UserForm = () => {

  // ─── OBJECT STATE ─────────────────────────────────────────────────────────
  // Single state variable holds ALL form fields as one object
  // This is different from having separate useState for each field
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    country: "",
  });

  // ─── GENERIC CHANGE HANDLER ───────────────────────────────────────────────
  // Handles ALL input changes with one function using computed property names
  // [e.target.name] dynamically sets the key matching the input's name attribute
  const handleChange = (e) => {
    const { name, value } = e.target;

    // IMPORTANT: We spread (...formData) to copy existing state
    // then override only the changed field
    // This avoids direct mutation: formData.name = value ❌ (wrong!)
    setFormData((prev) => ({
      ...prev,           // keep all existing fields unchanged
      [name]: value,     // only update the field that changed
    }));
  };

  // Reset handler — restores all fields to empty string
  const handleReset = () => {
    setFormData({ name: "", email: "", age: "", country: "" });
  };

  // Check if form has any data
  const hasData = Object.values(formData).some((v) => v.trim() !== "");

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fdf4ff, #fae8ff)",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    container: {
      maxWidth: "800px",
      margin: "0 auto",
    },
    pageTitle: {
      fontSize: "clamp(20px, 4vw, 28px)",
      fontWeight: "900",
      color: "#581c87",
      marginBottom: "6px",
    },
    pageSubtitle: {
      color: "#a855f7",
      fontSize: "13px",
      marginBottom: "28px",
    },
    // Two-column layout on large screens, single column on mobile
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px",
    },
    card: {
      background: "#ffffff",
      borderRadius: "20px",
      padding: "clamp(20px, 4vw, 28px)",
      boxShadow: "0 8px 30px rgba(168,85,247,0.1)",
      border: "1px solid #f3e8ff",
    },
    cardTitle: {
      fontSize: "14px",
      fontWeight: "800",
      color: "#581c87",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    formGroup: {
      marginBottom: "16px",
    },
    label: {
      display: "block",
      fontSize: "12px",
      fontWeight: "700",
      color: "#7c3aed",
      marginBottom: "6px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    input: {
      width: "100%",
      padding: "11px 14px",
      borderRadius: "10px",
      border: "2px solid #f3e8ff",
      background: "#faf5ff",
      color: "#1e293b",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 0.2s",
      fontFamily: "'Segoe UI', sans-serif",
    },
    select: {
      width: "100%",
      padding: "11px 14px",
      borderRadius: "10px",
      border: "2px solid #f3e8ff",
      background: "#faf5ff",
      color: "#1e293b",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box",
      cursor: "pointer",
      fontFamily: "'Segoe UI', sans-serif",
    },
    btnRow: {
      display: "flex",
      gap: "10px",
      marginTop: "20px",
      flexWrap: "wrap",
    },
    submitBtn: {
      flex: 1,
      padding: "11px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(90deg, #a855f7, #7c3aed)",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      minWidth: "100px",
    },
    resetBtn: {
      padding: "11px 20px",
      borderRadius: "10px",
      border: "2px solid #f3e8ff",
      background: "transparent",
      color: "#7c3aed",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
    },
    // Live preview card
    previewEmpty: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "200px",
      color: "#d8b4fe",
      fontSize: "14px",
      gap: "10px",
    },
    previewField: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0",
      borderBottom: "1px solid #f3e8ff",
      gap: "10px",
    },
    previewKey: {
      fontSize: "11px",
      fontWeight: "700",
      color: "#a855f7",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      minWidth: "60px",
    },
    previewValue: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#1e293b",
      textAlign: "right",
      wordBreak: "break-all",
    },
    stateBadge: {
      marginTop: "16px",
      background: "#faf5ff",
      borderRadius: "10px",
      padding: "12px",
      fontFamily: "monospace",
      fontSize: "11px",
      color: "#7c3aed",
      border: "1px dashed #d8b4fe",
      wordBreak: "break-all",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.pageTitle}>📋 User Registration Form</h2>
        <p style={styles.pageSubtitle}>
          Part B — Object State · Controlled Inputs · Real-time Preview
        </p>

        <div style={styles.grid}>

          {/* ── FORM CARD ── */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>✏️ Enter Details</div>

            {/* NAME — controlled input */}
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>Full Name</label>
              <input
                id="name"
                type="text"
                name="name"               // must match key in formData object
                value={formData.name}      // controlled: value tied to state
                onChange={handleChange}    // updates state on every keystroke
                placeholder="e.g. Avinash Kumar"
                style={styles.input}
              />
            </div>

            {/* EMAIL */}
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. avinash@email.com"
                style={styles.input}
              />
            </div>

            {/* AGE */}
            <div style={styles.formGroup}>
              <label htmlFor="age" style={styles.label}>Age</label>
              <input
                id="age"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 24"
                min="1"
                max="120"
                style={styles.input}
              />
            </div>

            {/* COUNTRY — select dropdown */}
            <div style={styles.formGroup}>
              <label htmlFor="country" style={styles.label}>Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">-- Select Country --</option>
                <option value="India">🇮🇳 India</option>
                <option value="USA">🇺🇸 United States</option>
                <option value="UK">🇬🇧 United Kingdom</option>
                <option value="Canada">🇨🇦 Canada</option>
                <option value="Australia">🇦🇺 Australia</option>
                <option value="Germany">🇩🇪 Germany</option>
              </select>
            </div>

            <div style={styles.btnRow}>
              <button
                style={styles.submitBtn}
                onClick={() => alert(`✅ Submitted!\nName: ${formData.name}\nEmail: ${formData.email}`)}
              >
                Submit Form
              </button>
              <button style={styles.resetBtn} onClick={handleReset}>
                ↺ Reset
              </button>
            </div>
          </div>

          {/* ── LIVE PREVIEW CARD ── */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>👁️ Live Preview</div>

            {!hasData ? (
              <div style={styles.previewEmpty}>
                <span style={{ fontSize: "40px" }}>✍️</span>
                <span>Start typing to see live preview...</span>
              </div>
            ) : (
              <>
                {/* Maps over formData keys to render each field dynamically */}
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key} style={styles.previewField}>
                    <span style={styles.previewKey}>{key}</span>
                    <span style={styles.previewValue}>
                      {value || <span style={{ color: "#d1d5db", fontStyle: "italic" }}>empty</span>}
                    </span>
                  </div>
                ))}
              </>
            )}

            {/* Shows the actual state object in real-time */}
            <div style={styles.stateBadge}>
              <div style={{ fontWeight: "700", marginBottom: "4px" }}>📦 State Object:</div>
              {`{ name: "${formData.name}", email: "${formData.email}", age: "${formData.age}", country: "${formData.country}" }`}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserForm;
