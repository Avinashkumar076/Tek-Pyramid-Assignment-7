// FormFields.jsx — Task 9: React Fragments (continued)
// Demonstrates:
//   1. Returning multiple form input groups using fragments
//   2. Fragment with key attribute — MUST use React.Fragment, NOT <>
//   3. Side-by-side DOM comparison: extra div vs fragment
//   4. When fragments are NECESSARY vs just convenient

import React, { useState } from "react";

// ─── Field group component — returns multiple elements using Fragment ─────────
// key prop REQUIRES React.Fragment syntax — <> cannot accept key!
const FieldGroup = ({ field }) => {
  const [focused, setFocused] = useState(false);

  return (
    // ✅ React.Fragment with key — only long syntax supports key prop
    // This is the ONLY case where you MUST use React.Fragment over <>
    <React.Fragment key={field.id}>
      {/* Label */}
      <label
        htmlFor={field.id}
        style={{
          display: "block",
          fontSize: "12px",
          fontWeight: "700",
          color: focused ? field.color : "#64748b",
          marginBottom: "6px",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          transition: "color 0.2s",
        }}
      >
        {field.icon} {field.label}
        {field.required && <span style={{ color: "#ef4444", marginLeft: "3px" }}>*</span>}
      </label>

      {/* Input or Textarea */}
      {field.type === "textarea" ? (
        <textarea
          id={field.id}
          placeholder={field.placeholder}
          rows={3}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: "11px 14px",
            borderRadius: "10px",
            border: `2px solid ${focused ? field.color : "#e2e8f0"}`,
            background: focused ? `${field.color}08` : "#f8fafc",
            fontSize: "14px",
            outline: "none",
            resize: "vertical",
            fontFamily: "'Segoe UI', sans-serif",
            color: "#1e293b",
            transition: "border-color 0.2s, background 0.2s",
            boxSizing: "border-box",
          }}
        />
      ) : (
        <input
          id={field.id}
          type={field.type}
          placeholder={field.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: "11px 14px",
            borderRadius: "10px",
            border: `2px solid ${focused ? field.color : "#e2e8f0"}`,
            background: focused ? `${field.color}08` : "#f8fafc",
            fontSize: "14px",
            outline: "none",
            fontFamily: "'Segoe UI', sans-serif",
            color: "#1e293b",
            transition: "border-color 0.2s, background 0.2s",
            boxSizing: "border-box",
          }}
        />
      )}

      {/* Helper text — also part of the fragment, no extra wrapper! */}
      {field.helper && (
        <p style={{
          fontSize: "11px",
          color: "#94a3b8",
          marginTop: "5px",
          marginBottom: "16px",
        }}>
          {field.helper}
        </p>
      )}
    </React.Fragment>
  );
};

// ─── Fields data ─────────────────────────────────────────────────────────────
const formFields = [
  {
    id: "full-name",
    label: "Full Name",
    icon: "👤",
    type: "text",
    placeholder: "e.g. Avinash Kumar",
    required: true,
    helper: "Enter your full legal name as on ID",
    color: "#6366f1",
  },
  {
    id: "email",
    label: "Email Address",
    icon: "📧",
    type: "email",
    placeholder: "e.g. avinash@email.com",
    required: true,
    helper: "We'll send a verification link here",
    color: "#0891b2",
  },
  {
    id: "phone",
    label: "Phone Number",
    icon: "📱",
    type: "tel",
    placeholder: "e.g. +91 98765 43210",
    required: false,
    helper: "Optional — for account recovery only",
    color: "#16a34a",
  },
  {
    id: "dob",
    label: "Date of Birth",
    icon: "🎂",
    type: "date",
    placeholder: "",
    required: true,
    helper: "Must be 18+ to register",
    color: "#d97706",
  },
  {
    id: "bio",
    label: "Short Bio",
    icon: "📝",
    type: "textarea",
    placeholder: "Tell us a little about yourself...",
    required: false,
    helper: "Max 200 characters",
    color: "#7c3aed",
  },
];

const FormFields = () => {
  const [viewMode, setViewMode] = useState("fragment"); // "fragment" | "div" | "compare"

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fdf4ff, #fae8ff)",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    container: { maxWidth: "900px", margin: "0 auto" },
    partBadge: {
      display: "inline-block",
      background: "#f3e8ff",
      color: "#6b21a8",
      fontSize: "11px",
      fontWeight: "800",
      padding: "4px 14px",
      borderRadius: "20px",
      marginBottom: "8px",
      letterSpacing: "1px",
    },
    pageTitle: { fontSize: "clamp(20px, 4vw, 26px)", fontWeight: "900", color: "#0f172a", marginBottom: "4px" },
    subtitle: { color: "#64748b", fontSize: "13px", marginBottom: "24px" },

    // View mode toggle
    toggleRow: {
      display: "flex",
      gap: "8px",
      marginBottom: "24px",
      flexWrap: "wrap",
    },
    toggleBtn: (isActive, color) => ({
      padding: "8px 16px",
      borderRadius: "10px",
      border: isActive ? `2px solid ${color}` : "2px solid #e2e8f0",
      background: isActive ? `${color}12` : "#fff",
      color: isActive ? color : "#94a3b8",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "700",
      fontFamily: "'Segoe UI', sans-serif",
      transition: "all 0.2s",
    }),

    // Cards
    card: {
      background: "#fff",
      borderRadius: "20px",
      padding: "clamp(20px, 5vw, 32px)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
      marginBottom: "20px",
    },
    cardTitle: (color) => ({
      fontSize: "14px",
      fontWeight: "800",
      color,
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),

    // Compare layout
    compareGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
      marginBottom: "20px",
    },

    // DOM visualization
    domBox: {
      background: "#0f172a",
      borderRadius: "14px",
      padding: "16px 20px",
      fontFamily: "monospace",
      fontSize: "clamp(10px, 2vw, 12px)",
      color: "#e2e8f0",
      lineHeight: "1.9",
      overflowX: "auto",
      marginBottom: "20px",
    },

    // Key point callout
    keyCallout: {
      background: "#fef9c3",
      border: "2px solid #fde047",
      borderRadius: "14px",
      padding: "16px 20px",
      fontSize: "13px",
      color: "#713f12",
      lineHeight: "1.6",
      marginBottom: "20px",
    },

    // When to use section
    whenGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "14px",
    },
    whenCard: (color, bg) => ({
      background: bg,
      border: `1px solid ${color}30`,
      borderRadius: "14px",
      padding: "16px",
    }),
    whenTitle: (color) => ({
      fontSize: "13px",
      fontWeight: "800",
      color,
      marginBottom: "10px",
    }),
    whenPoint: {
      fontSize: "12px",
      color: "#374151",
      marginBottom: "6px",
      lineHeight: "1.5",
      display: "flex",
      gap: "6px",
    },
  };

  // Simulated "div wrapper" view — shows nesting problem
  const DivVersionField = ({ field }) => (
    <div style={{
      border: "2px dashed #fca5a5",
      borderRadius: "10px",
      padding: "12px",
      marginBottom: "14px",
      background: "#fff5f5",
    }}>
      <div style={{
        fontSize: "10px",
        color: "#dc2626",
        fontFamily: "monospace",
        marginBottom: "8px",
        fontWeight: "700",
      }}>
        {"<div> ← unnecessary wrapper adds extra DOM node"}
      </div>
      <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#64748b", marginBottom: "6px" }}>
        {field.icon} {field.label}
      </label>
      <input
        type={field.type === "textarea" ? "text" : field.type}
        placeholder={field.placeholder}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "13px",
          outline: "none",
          boxSizing: "border-box",
          background: "#f8fafc",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      />
      {field.helper && (
        <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "5px" }}>{field.helper}</p>
      )}
    </div>
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.partBadge}>TASK 9 — REACT FRAGMENTS</div>
        <h2 style={styles.pageTitle}>📋 FormFields with Fragments</h2>
        <p style={styles.subtitle}>
          Multiple form elements returned without extra wrappers · Fragment with key · DOM comparison
        </p>

        {/* KEY CALLOUT — most important learning */}
        <div style={styles.keyCallout}>
          ⚠️ <strong>Critical Fragment Rule:</strong> When you need to use a{" "}
          <code style={{ background: "#fde047", padding: "1px 6px", borderRadius: "4px" }}>key</code>{" "}
          prop on a fragment (e.g. inside <code>.map()</code>), you <strong>MUST</strong> use{" "}
          <code style={{ background: "#fde047", padding: "1px 6px", borderRadius: "4px" }}>
            {"<React.Fragment key={...}>"}
          </code>{" "}
          — the short <code>&lt;&gt;</code> syntax does NOT support the key prop!
        </div>

        {/* Toggle */}
        <div style={styles.toggleRow}>
          <button style={styles.toggleBtn(viewMode === "fragment", "#7c3aed")} onClick={() => setViewMode("fragment")}>
            ✅ Fragment Version
          </button>
          <button style={styles.toggleBtn(viewMode === "div", "#dc2626")} onClick={() => setViewMode("div")}>
            ❌ Div Wrapper Version
          </button>
          <button style={styles.toggleBtn(viewMode === "compare", "#0891b2")} onClick={() => setViewMode("compare")}>
            👁️ Side-by-Side
          </button>
        </div>

        {/* Fragment version */}
        {viewMode === "fragment" && (
          <div style={styles.card}>
            <div style={styles.cardTitle("#7c3aed")}>
              ✅ Fragment Version — Clean DOM
            </div>
            {/* .map() over fields — each renders using React.Fragment with key */}
            {formFields.map((field) => (
              <FieldGroup key={field.id} field={field} />
            ))}
            <button style={{
              width: "100%", padding: "13px", borderRadius: "12px",
              border: "none",
              background: "linear-gradient(90deg, #7c3aed, #6d28d9)",
              color: "#fff", fontSize: "15px", fontWeight: "700", cursor: "pointer",
            }}>
              🚀 Submit Registration
            </button>
          </div>
        )}

        {/* Div wrapper version */}
        {viewMode === "div" && (
          <div style={styles.card}>
            <div style={styles.cardTitle("#dc2626")}>
              ❌ Div Wrapper Version — Bloated DOM
            </div>
            {formFields.map((field) => (
              <DivVersionField key={field.id} field={field} />
            ))}
          </div>
        )}

        {/* Side by side compare */}
        {viewMode === "compare" && (
          <div style={styles.compareGrid}>
            <div style={styles.card}>
              <div style={styles.cardTitle("#7c3aed")}>✅ Fragment</div>
              {formFields.slice(0, 2).map((field) => (
                <FieldGroup key={field.id} field={field} />
              ))}
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle("#dc2626")}>❌ Div Wrapper</div>
              {formFields.slice(0, 2).map((field) => (
                <DivVersionField key={field.id} field={field} />
              ))}
            </div>
          </div>
        )}

        {/* DOM tree comparison */}
        <div style={styles.domBox}>
          <span style={{ color: "#94a3b8" }}>{"// Fragment DOM output — clean, no extra nodes:"}</span>{"\n"}
          <span style={{ color: "#34d399" }}>{"<form>"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  <label>Name</label>"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  <input type=\"text\" />"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  <p>Helper text</p>"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  <label>Email</label>"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  <input type=\"email\" />"}</span>{"\n"}
          <span style={{ color: "#34d399" }}>{"</form>"}</span>{"\n\n"}
          <span style={{ color: "#94a3b8" }}>{"// Div wrapper DOM — extra divs break CSS & accessibility:"}</span>{"\n"}
          <span style={{ color: "#f87171" }}>{"<form>"}</span>{"\n"}
          <span style={{ color: "#f87171" }}>{"  <div>"}</span>
          <span style={{ color: "#64748b" }}>{" ← extra node! breaks CSS nth-child selectors"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"    <label>Name</label>"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"    <input type=\"text\" />"}</span>{"\n"}
          <span style={{ color: "#f87171" }}>{"  </div>"}</span>{"\n"}
          <span style={{ color: "#f87171" }}>{"  <div>"}</span>
          <span style={{ color: "#64748b" }}>{" ← another extra node"}</span>{"\n"}
          <span style={{ color: "#f87171" }}>{"</form>"}</span>
        </div>

        {/* When to use section */}
        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "14px" }}>
          🎯 Fragment Syntax — When to Use Which
        </h3>
        <div style={styles.whenGrid}>
          {[
            {
              title: "<React.Fragment> — Long",
              color: "#2563eb", bg: "#eff6ff",
              points: [
                "✅ When you need a key prop (inside .map())",
                "✅ When you want to be explicit for clarity",
                "✅ Required: React must be imported",
              ],
            },
            {
              title: "<> </> — Short",
              color: "#7c3aed", bg: "#faf5ff",
              points: [
                "✅ Cleaner, less typing — preferred in most cases",
                "✅ When no key prop needed",
                "❌ Cannot accept key or any other prop",
              ],
            },
            {
              title: "When Fragments are NECESSARY",
              color: "#dc2626", bg: "#fff5f5",
              points: [
                "🔴 Inside <tr> — div breaks table structure",
                "🔴 Inside <ul>/<ol> — only <li> is valid child",
                "🔴 CSS flexbox/grid — extra div breaks layout",
                "🔴 CSS :nth-child selectors — div disrupts counting",
              ],
            },
          ].map((item, i) => (
            <div key={i} style={styles.whenCard(item.color, item.bg)}>
              <p style={styles.whenTitle(item.color)}>{item.title}</p>
              {item.points.map((pt, j) => (
                <div key={j} style={styles.whenPoint}>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FormFields;
