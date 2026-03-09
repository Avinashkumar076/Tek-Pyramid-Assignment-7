// EventDemo.jsx — Task 10, Part A: Basic Events
// Demonstrates:
//   - onClick    → button click counter
//   - onChange   → input value display
//   - onSubmit   → form submission with preventDefault
//   - onFocus    → input focus state
//   - onBlur     → input blur state
//   - onMouseEnter / onMouseLeave → hover effects

import { useState } from "react";

const EventDemo = () => {
  // ── STATE ─────────────────────────────────────────────────────────────────
  const [clickCount,    setClickCount]    = useState(0);
  const [inputValue,    setInputValue]    = useState("");
  const [submitted,     setSubmitted]     = useState(null);
  const [focusedField,  setFocusedField]  = useState(null);
  const [hoveredBtn,    setHoveredBtn]    = useState(null);
  const [lastEvent,     setLastEvent]     = useState("No events yet...");

  // ── HANDLERS ──────────────────────────────────────────────────────────────

  // onClick — increments counter on every click
  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    setLastEvent("onClick fired! ✅");
  };

  // onChange — syncs input value to state on every keystroke
  const handleChange = (e) => {
    setInputValue(e.target.value);
    setLastEvent(`onChange fired! value: "${e.target.value}"`);
  };

  // onSubmit — prevents default browser reload, captures form data
  const handleSubmit = (e) => {
    e.preventDefault();   // ← prevents page reload (default form behavior)
    setSubmitted(inputValue || "(empty)");
    setLastEvent("onSubmit fired! preventDefault() called ✅");
  };

  // onFocus — fires when input gains focus (user clicks/tabs into it)
  const handleFocus = (field) => {
    setFocusedField(field);
    setLastEvent(`onFocus fired! field: "${field}"`);
  };

  // onBlur — fires when input loses focus (user clicks away)
  const handleBlur = () => {
    setFocusedField(null);
    setLastEvent("onBlur fired! Input lost focus");
  };

  // onMouseEnter / onMouseLeave — hover detection
  const handleMouseEnter = (btn) => {
    setHoveredBtn(btn);
    setLastEvent(`onMouseEnter fired! hovered: "${btn}"`);
  };
  const handleMouseLeave = () => {
    setHoveredBtn(null);
    setLastEvent("onMouseLeave fired! Cursor left button");
  };

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    container: { maxWidth: "860px", margin: "0 auto" },
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
    pageTitle: { fontSize: "clamp(20px, 4vw, 26px)", fontWeight: "900", color: "#0f172a", marginBottom: "4px" },
    subtitle: { color: "#64748b", fontSize: "13px", marginBottom: "24px" },

    // Live event log
    eventLog: {
      background: "#0f172a",
      borderRadius: "14px",
      padding: "14px 20px",
      marginBottom: "24px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flexWrap: "wrap",
    },
    logDot: { width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", flexShrink: 0, boxShadow: "0 0 6px #22c55e" },
    logText: { fontFamily: "monospace", fontSize: "13px", color: "#34d399", flex: 1 },

    // Cards grid
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "16px",
    },
    card: (color, bg) => ({
      background: "#fff",
      borderRadius: "18px",
      padding: "clamp(16px, 3vw, 22px)",
      boxShadow: `0 4px 20px ${color}15`,
      border: `1px solid ${color}25`,
    }),
    cardLabel: (color) => ({
      fontSize: "11px",
      fontWeight: "800",
      color,
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "14px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    }),
    // onClick styles
    counterDisplay: {
      fontSize: "clamp(48px, 12vw, 72px)",
      fontWeight: "900",
      color: "#6366f1",
      textAlign: "center",
      lineHeight: 1,
      marginBottom: "16px",
    },
    clickBtn: (hovered) => ({
      width: "100%",
      padding: "12px",
      borderRadius: "12px",
      border: "none",
      background: hovered
        ? "linear-gradient(90deg, #4f46e5, #3730a3)"
        : "linear-gradient(90deg, #6366f1, #4f46e5)",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      transform: hovered ? "scale(1.02)" : "scale(1)",
      transition: "all 0.15s",
      boxShadow: hovered ? "0 8px 24px rgba(99,102,241,0.4)" : "0 4px 14px rgba(99,102,241,0.25)",
    }),
    resetBtn: {
      width: "100%",
      padding: "9px",
      borderRadius: "10px",
      border: "2px solid #e2e8f0",
      background: "transparent",
      color: "#64748b",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "8px",
    },
    // onChange styles
    inputBase: (focused, color) => ({
      width: "100%",
      padding: "11px 14px",
      borderRadius: "10px",
      border: `2px solid ${focused ? color : "#e2e8f0"}`,
      background: focused ? `${color}08` : "#f8fafc",
      fontSize: "14px",
      outline: "none",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#1e293b",
      transition: "border 0.2s, background 0.2s",
      boxSizing: "border-box",
      marginBottom: "10px",
    }),
    livePreview: (color) => ({
      background: `${color}10`,
      border: `1px dashed ${color}40`,
      borderRadius: "8px",
      padding: "10px 14px",
      fontSize: "13px",
      color,
      fontFamily: "monospace",
      wordBreak: "break-all",
      minHeight: "40px",
    }),
    // onSubmit styles
    submitBtn: {
      width: "100%",
      padding: "11px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(90deg, #16a34a, #15803d)",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      marginTop: "10px",
    },
    submittedBadge: {
      marginTop: "12px",
      background: "#dcfce7",
      border: "1px solid #86efac",
      borderRadius: "8px",
      padding: "10px 14px",
      fontSize: "13px",
      color: "#166534",
      fontWeight: "600",
    },
    // Focus/Blur styles
    focusBadge: (isFocused, color) => ({
      display: "inline-block",
      padding: "3px 12px",
      borderRadius: "20px",
      background: isFocused ? `${color}15` : "#f1f5f9",
      color: isFocused ? color : "#94a3b8",
      fontSize: "12px",
      fontWeight: "700",
      marginBottom: "10px",
      transition: "all 0.2s",
    }),
    // Hover buttons
    hoverBtnRow: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },
    hoverBtn: (id, hovered, color) => ({
      flex: 1,
      minWidth: "80px",
      padding: "12px",
      borderRadius: "12px",
      border: "none",
      background: hovered === id ? color : `${color}20`,
      color: hovered === id ? "#fff" : color,
      fontSize: "13px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.2s",
      transform: hovered === id ? "scale(1.05)" : "scale(1)",
    }),
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.partBadge}>PART A — BASIC EVENTS</div>
        <h2 style={styles.pageTitle}>⚡ Event Demo</h2>
        <p style={styles.subtitle}>
          onClick · onChange · onSubmit · onFocus · onBlur · onMouseEnter · onMouseLeave
        </p>

        {/* Live Event Log */}
        <div style={styles.eventLog}>
          <div style={styles.logDot} />
          <span style={styles.logText}>
            📡 Live: {lastEvent}
          </span>
        </div>

        <div style={styles.grid}>

          {/* ── onClick ── */}
          <div style={styles.card("#6366f1")}>
            <div style={styles.cardLabel("#6366f1")}>🖱️ onClick</div>
            <div style={styles.counterDisplay}>{clickCount}</div>
            <button
              // onClick — fires every time button is clicked
              onClick={handleClick}
              onMouseEnter={() => handleMouseEnter("click-btn")}
              onMouseLeave={handleMouseLeave}
              style={styles.clickBtn(hoveredBtn === "click-btn")}
            >
              Click Me! ({clickCount} times)
            </button>
            <button style={styles.resetBtn} onClick={() => setClickCount(0)}>
              ↺ Reset Counter
            </button>
          </div>

          {/* ── onChange ── */}
          <div style={styles.card("#0891b2")}>
            <div style={styles.cardLabel("#0891b2")}>⌨️ onChange</div>
            <input
              type="text"
              placeholder="Type anything..."
              value={inputValue}
              // onChange — fires on every single keystroke
              onChange={handleChange}
              onFocus={() => handleFocus("onChange-input")}
              onBlur={handleBlur}
              style={styles.inputBase(focusedField === "onChange-input", "#0891b2")}
            />
            <div style={styles.livePreview("#0891b2")}>
              {inputValue
                ? `value: "${inputValue}" (${inputValue.length} chars)`
                : "Start typing to see onChange..."}
            </div>
          </div>

          {/* ── onSubmit ── */}
          <div style={styles.card("#16a34a")}>
            <div style={styles.cardLabel("#16a34a")}>📤 onSubmit</div>
            {/* onSubmit on the <form> element — fires when form is submitted */}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter something to submit..."
                onFocus={() => handleFocus("submit-input")}
                onBlur={handleBlur}
                style={styles.inputBase(focusedField === "submit-input", "#16a34a")}
              />
              {/* type="submit" triggers the form's onSubmit */}
              <button type="submit" style={styles.submitBtn}>
                Submit Form (preventDefault) →
              </button>
            </form>
            {submitted && (
              <div style={styles.submittedBadge}>
                ✅ Submitted: "{submitted}" — page did NOT reload!
              </div>
            )}
          </div>

          {/* ── onFocus / onBlur ── */}
          <div style={styles.card("#d97706")}>
            <div style={styles.cardLabel("#d97706")}>🎯 onFocus / onBlur</div>
            <div style={styles.focusBadge(focusedField === "focus-demo", "#d97706")}>
              {focusedField === "focus-demo" ? "🟢 Input is FOCUSED" : "⚪ Input is BLURRED"}
            </div>
            {["Name", "Email", "Phone"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={`${field} field...`}
                // onFocus fires when this specific input is clicked/tabbed into
                onFocus={() => handleFocus("focus-demo")}
                // onBlur fires when user leaves the input
                onBlur={handleBlur}
                style={{
                  ...styles.inputBase(focusedField === "focus-demo", "#d97706"),
                  marginBottom: "8px",
                }}
              />
            ))}
          </div>

          {/* ── onMouseEnter / onMouseLeave ── */}
          <div style={styles.card("#7c3aed")}>
            <div style={styles.cardLabel("#7c3aed")}>🖱️ onMouseEnter / Leave</div>
            <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "14px" }}>
              Hover over each button to trigger enter/leave events:
            </p>
            <div style={styles.hoverBtnRow}>
              {[
                { id: "hover-1", label: "🔴 Red",   color: "#ef4444" },
                { id: "hover-2", label: "🟢 Green",  color: "#16a34a" },
                { id: "hover-3", label: "🔵 Blue",   color: "#3b82f6" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  // onMouseEnter — fires when cursor enters the element
                  onMouseEnter={() => handleMouseEnter(btn.id)}
                  // onMouseLeave — fires when cursor exits the element
                  onMouseLeave={handleMouseLeave}
                  style={styles.hoverBtn(btn.id, hoveredBtn, btn.color)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <div style={{
              marginTop: "14px",
              padding: "10px 14px",
              background: "#faf5ff",
              borderRadius: "8px",
              fontSize: "13px",
              color: "#7c3aed",
              fontFamily: "monospace",
            }}>
              Hovered: {hoveredBtn || "none"}
            </div>
          </div>

          {/* ── Event object properties ── */}
          <div style={styles.card("#0f172a")}>
            <div style={styles.cardLabel("#94a3b8")}>📦 Synthetic Event Object</div>
            <div style={{
              background: "#0f172a",
              borderRadius: "10px",
              padding: "14px",
              fontFamily: "monospace",
              fontSize: "clamp(10px, 2vw, 11px)",
              color: "#e2e8f0",
              lineHeight: "1.9",
            }}>
              <span style={{ color: "#94a3b8" }}>{"// Event object properties:"}</span>{"\n"}
              <span style={{ color: "#38bdf8" }}>e.target</span>
              <span style={{ color: "#64748b" }}>{" → DOM element that fired"}</span>{"\n"}
              <span style={{ color: "#38bdf8" }}>e.target.value</span>
              <span style={{ color: "#64748b" }}>{" → input value"}</span>{"\n"}
              <span style={{ color: "#38bdf8" }}>e.type</span>
              <span style={{ color: "#64748b" }}>{" → 'click'|'change'|..."}</span>{"\n"}
              <span style={{ color: "#38bdf8" }}>e.preventDefault()</span>
              <span style={{ color: "#64748b" }}>{" → stop default"}</span>{"\n"}
              <span style={{ color: "#38bdf8" }}>e.stopPropagation()</span>
              <span style={{ color: "#64748b" }}>{" → stop bubbling"}</span>{"\n"}
              <span style={{ color: "#38bdf8" }}>e.nativeEvent</span>
              <span style={{ color: "#64748b" }}>{" → original DOM event"}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDemo;
