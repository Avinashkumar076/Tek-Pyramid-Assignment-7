// Counter.jsx — Task 5, Part A: Simple State
// Demonstrates:
//   - useState hook for a single number value
//   - Increment, Decrement, Reset operations
//   - State updates triggering re-renders

import { useState } from "react";

const Counter = () => {
  // ─── STATE DECLARATION ───────────────────────────────────────────────────
  // useState(0) → initializes count to 0
  // Returns [currentValue, setterFunction]
  const [count, setCount] = useState(0);

  // ─── EVENT HANDLERS ──────────────────────────────────────────────────────

  // Increment — adds 1 to current count
  // Uses functional form: prev => prev + 1
  // Ensures we always work with the latest state value (safe for rapid clicks)
  const handleIncrement = () => setCount((prev) => prev + 1);

  // Decrement — subtracts 1, but won't go below -10
  const handleDecrement = () => setCount((prev) => Math.max(prev - 1, -10));

  // Reset — sets count back to initial value (0)
  const handleReset = () => setCount(0);

  // Dynamic color based on count value
  const countColor =
    count > 0 ? "#16a34a" : count < 0 ? "#dc2626" : "#1e293b";

  const styles = {
    wrapper: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f0f4ff, #e8effe)",
      padding: "20px",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    card: {
      background: "#ffffff",
      borderRadius: "24px",
      padding: "clamp(28px, 6vw, 48px)",
      textAlign: "center",
      boxShadow: "0 20px 60px rgba(99,102,241,0.12)",
      width: "100%",
      maxWidth: "420px",
      border: "1px solid #e0e7ff",
    },
    label: {
      fontSize: "12px",
      fontWeight: "700",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "#94a3b8",
      marginBottom: "12px",
    },
    countDisplay: {
      fontSize: "clamp(64px, 15vw, 100px)",
      fontWeight: "900",
      color: countColor,              // dynamic color based on count
      lineHeight: 1,
      marginBottom: "8px",
      transition: "color 0.3s",
    },
    statusText: {
      fontSize: "13px",
      color: "#94a3b8",
      marginBottom: "36px",
      minHeight: "20px",
    },
    btnRow: {
      display: "flex",
      gap: "12px",
      justifyContent: "center",
      flexWrap: "wrap",
      marginBottom: "20px",
    },
    btn: (bg, shadow) => ({
      width: "clamp(60px, 18vw, 72px)",
      height: "clamp(60px, 18vw, 72px)",
      borderRadius: "50%",
      border: "none",
      background: bg,
      color: "#fff",
      fontSize: "clamp(20px, 5vw, 26px)",
      fontWeight: "900",
      cursor: "pointer",
      boxShadow: shadow,
      transition: "transform 0.1s",
    }),
    resetBtn: {
      padding: "10px 32px",
      borderRadius: "12px",
      border: "2px solid #e2e8f0",
      background: "transparent",
      color: "#64748b",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      letterSpacing: "0.5px",
    },
    progressBar: {
      height: "6px",
      background: "#f1f5f9",
      borderRadius: "3px",
      marginTop: "24px",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      width: `${Math.min(Math.abs(count) * 10, 100)}%`,
      background: count >= 0
        ? "linear-gradient(90deg, #6366f1, #818cf8)"
        : "linear-gradient(90deg, #ef4444, #f87171)",
      borderRadius: "3px",
      transition: "width 0.3s, background 0.3s",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>

        <p style={styles.label}>⚡ React State Counter</p>

        {/* COUNT DISPLAY — re-renders every time setCount is called */}
        <div style={styles.countDisplay}>{count}</div>

        <p style={styles.statusText}>
          {count === 0
            ? "Start counting! 👆"
            : count > 0
            ? `${count} above zero 📈`
            : `${Math.abs(count)} below zero 📉`}
        </p>

        {/* BUTTONS ROW */}
        <div style={styles.btnRow}>
          {/* DECREMENT — calls setCount with functional updater */}
          <button
            style={styles.btn(
              "linear-gradient(135deg, #ef4444, #dc2626)",
              "0 6px 20px rgba(239,68,68,0.35)"
            )}
            onClick={handleDecrement}
            aria-label="Decrement count"
          >
            −
          </button>

          {/* INCREMENT */}
          <button
            style={styles.btn(
              "linear-gradient(135deg, #22c55e, #16a34a)",
              "0 6px 20px rgba(34,197,94,0.35)"
            )}
            onClick={handleIncrement}
            aria-label="Increment count"
          >
            +
          </button>
        </div>

        {/* RESET — sets count back to 0 */}
        <button style={styles.resetBtn} onClick={handleReset}>
          ↺ Reset to Zero
        </button>

        {/* Visual progress indicator */}
        <div style={styles.progressBar}>
          <div style={styles.progressFill} />
        </div>

        {/* State info footer */}
        <p style={{
          fontSize: "11px",
          color: "#cbd5e1",
          marginTop: "16px",
          fontFamily: "monospace",
        }}>
          useState({"{"}count: {count}{"}"})
        </p>
      </div>
    </div>
  );
};

export default Counter;
