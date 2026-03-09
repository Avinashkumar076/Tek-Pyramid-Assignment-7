// KeyboardEvents.jsx — Task 10, Part C: Synthetic Events / Keyboard Events
// Demonstrates:
//   - onKeyDown event to detect specific keys
//   - Display key pressed in real-time
//   - Keyboard shortcuts: Ctrl+S, Ctrl+K, Escape, Enter, Arrow keys
//   - Log event object properties (key, code, ctrlKey, shiftKey, etc.)

import { useState, useEffect } from "react";

const KeyboardEvents = () => {
  const [lastKey,       setLastKey]       = useState(null);
  const [keyLog,        setKeyLog]        = useState([]);
  const [shortcutFired, setShortcutFired] = useState(null);
  const [inputVal,      setInputVal]      = useState("");
  const [eventProps,    setEventProps]    = useState(null);

  // Shortcut definitions
  const shortcuts = [
    { combo: "Ctrl + S", action: "💾 Document Saved!", check: (e) => e.ctrlKey && e.key === "s" },
    { combo: "Ctrl + K", action: "🔍 Search Opened!",  check: (e) => e.ctrlKey && e.key === "k" },
    { combo: "Escape",   action: "❌ Dialog Closed!",   check: (e) => e.key === "Escape"          },
    { combo: "Enter",    action: "✅ Confirmed!",        check: (e) => e.key === "Enter"           },
    { combo: "↑ Arrow",  action: "⬆️ Moved Up!",        check: (e) => e.key === "ArrowUp"         },
    { combo: "↓ Arrow",  action: "⬇️ Moved Down!",      check: (e) => e.key === "ArrowDown"       },
  ];

  // Global keyboard listener — captures shortcuts anywhere on the page
  useEffect(() => {
    const handleGlobalKey = (e) => {
      // Check shortcuts
      const matched = shortcuts.find((s) => s.check(e));
      if (matched) {
        e.preventDefault();   // prevent browser default (e.g. Ctrl+S saving page)
        setShortcutFired(matched.action);
        setTimeout(() => setShortcutFired(null), 2000);
      }
    };

    window.addEventListener("keydown", handleGlobalKey);
    // Cleanup — remove listener when component unmounts
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  // onKeyDown handler for the input field
  const handleKeyDown = (e) => {
    const keyInfo = {
      key:       e.key,
      code:      e.code,
      ctrlKey:   e.ctrlKey,
      shiftKey:  e.shiftKey,
      altKey:    e.altKey,
      metaKey:   e.metaKey,
      repeat:    e.repeat,
      timestamp: new Date().toLocaleTimeString(),
    };

    setLastKey(e.key);
    setEventProps(keyInfo);

    // Add to key log (keep last 6)
    setKeyLog((prev) => [keyInfo, ...prev].slice(0, 6));
  };

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 100%)",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
      color: "#e2e8f0",
    },
    container: { maxWidth: "860px", margin: "0 auto" },
    partBadge: {
      display: "inline-block",
      background: "rgba(99,102,241,0.2)",
      color: "#a5b4fc",
      fontSize: "11px",
      fontWeight: "800",
      padding: "4px 14px",
      borderRadius: "20px",
      marginBottom: "8px",
      letterSpacing: "1px",
      border: "1px solid rgba(99,102,241,0.3)",
    },
    pageTitle: { fontSize: "clamp(20px, 4vw, 26px)", fontWeight: "900", color: "#fff", marginBottom: "4px" },
    subtitle: { color: "#64748b", fontSize: "13px", marginBottom: "24px" },

    // Shortcut fired toast
    toast: {
      background: "linear-gradient(90deg, #6366f1, #4f46e5)",
      borderRadius: "14px",
      padding: "14px 20px",
      marginBottom: "20px",
      textAlign: "center",
      fontSize: "clamp(16px, 3vw, 20px)",
      fontWeight: "800",
      color: "#fff",
      boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
      animation: "fadeIn 0.2s ease",
    },

    // Grid
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "16px",
      marginBottom: "20px",
    },
    card: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "18px",
      padding: "clamp(16px, 3vw, 22px)",
    },
    cardTitle: {
      fontSize: "12px",
      fontWeight: "800",
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "16px",
    },

    // Key display
    keyDisplay: {
      width: "clamp(70px, 18vw, 90px)",
      height: "clamp(70px, 18vw, 90px)",
      borderRadius: "20px",
      background: lastKey
        ? "linear-gradient(135deg, #6366f1, #4f46e5)"
        : "rgba(255,255,255,0.05)",
      border: lastKey ? "2px solid #6366f1" : "2px solid rgba(255,255,255,0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: lastKey && lastKey.length === 1 ? "clamp(28px, 7vw, 40px)" : "clamp(16px, 4vw, 22px)",
      fontWeight: "900",
      color: "#fff",
      margin: "0 auto 16px",
      transition: "all 0.1s",
      boxShadow: lastKey ? "0 8px 24px rgba(99,102,241,0.4)" : "none",
    },

    // Input
    input: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "12px",
      border: "2px solid rgba(255,255,255,0.1)",
      background: "rgba(255,255,255,0.07)",
      color: "#e2e8f0",
      fontSize: "14px",
      outline: "none",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
      marginBottom: "10px",
    },

    // Shortcuts grid
    shortcutsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
      gap: "10px",
    },
    shortcutChip: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "12px",
      padding: "10px 12px",
      textAlign: "center",
    },
    shortcutCombo: {
      fontSize: "12px",
      fontWeight: "800",
      color: "#a5b4fc",
      fontFamily: "monospace",
      marginBottom: "4px",
    },
    shortcutAction: {
      fontSize: "11px",
      color: "#64748b",
    },

    // Key log
    logEntry: (i) => ({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 12px",
      borderRadius: "8px",
      background: i === 0 ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
      border: i === 0 ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
      marginBottom: "6px",
      flexWrap: "wrap",
      gap: "6px",
    }),

    // Event props box
    propsBox: {
      background: "#0a0f1e",
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
        <div style={styles.partBadge}>PART C — KEYBOARD EVENTS</div>
        <h2 style={styles.pageTitle}>⌨️ Keyboard Events</h2>
        <p style={styles.subtitle}>
          onKeyDown · Detect specific keys · Keyboard shortcuts · Event object properties
        </p>

        {/* Shortcut toast notification */}
        {shortcutFired && (
          <div style={styles.toast}>{shortcutFired}</div>
        )}

        <div style={styles.grid}>

          {/* Key detector */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>🎹 Key Detector</div>
            <div style={styles.keyDisplay}>
              {lastKey || "?"}
            </div>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              // onKeyDown fires for EVERY key press (including non-character keys)
              onKeyDown={handleKeyDown}
              placeholder="Click here & press any key..."
              style={styles.input}
              aria-label="Keyboard event detector input"
            />
            <p style={{ fontSize: "12px", color: "#475569", textAlign: "center" }}>
              Last key: <span style={{ color: "#a5b4fc", fontFamily: "monospace", fontWeight: "700" }}>
                {lastKey ? `"${lastKey}"` : "—"}
              </span>
            </p>
          </div>

          {/* Shortcuts */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>⚡ Keyboard Shortcuts (Global)</div>
            <p style={{ fontSize: "12px", color: "#475569", marginBottom: "14px" }}>
              These work anywhere on the page — no need to focus the input:
            </p>
            <div style={styles.shortcutsGrid}>
              {shortcuts.map((s) => (
                <div key={s.combo} style={styles.shortcutChip}>
                  <div style={styles.shortcutCombo}>{s.combo}</div>
                  <div style={styles.shortcutAction}>{s.action}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key log */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>📋 Key Press Log (last 6)</div>
            {keyLog.length === 0 ? (
              <p style={{ color: "#475569", fontSize: "13px" }}>
                Press keys in the input above to see the log...
              </p>
            ) : (
              keyLog.map((entry, i) => (
                <div key={i} style={styles.logEntry(i)}>
                  <span style={{
                    background: "rgba(99,102,241,0.2)",
                    color: "#a5b4fc",
                    padding: "2px 10px",
                    borderRadius: "6px",
                    fontFamily: "monospace",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}>
                    {entry.key}
                  </span>
                  <span style={{ fontSize: "11px", color: "#475569", fontFamily: "monospace" }}>
                    {entry.code}
                  </span>
                  <span style={{ fontSize: "11px", color: "#334155" }}>
                    {entry.timestamp}
                  </span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {entry.ctrlKey  && <span style={{ fontSize: "10px", background: "#1e293b", color: "#94a3b8", padding: "1px 6px", borderRadius: "4px" }}>ctrl</span>}
                    {entry.shiftKey && <span style={{ fontSize: "10px", background: "#1e293b", color: "#94a3b8", padding: "1px 6px", borderRadius: "4px" }}>shift</span>}
                    {entry.altKey   && <span style={{ fontSize: "10px", background: "#1e293b", color: "#94a3b8", padding: "1px 6px", borderRadius: "4px" }}>alt</span>}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Event object properties */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>📦 Event Object Props</div>
            {eventProps ? (
              <div style={styles.propsBox}>
                {Object.entries(eventProps).map(([k, v]) => (
                  <div key={k}>
                    <span style={{ color: "#38bdf8" }}>{k}</span>
                    <span style={{ color: "#64748b" }}>{": "}</span>
                    <span style={{ color: typeof v === "boolean" ? (v ? "#34d399" : "#f87171") : "#fbbf24" }}>
                      {String(v)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#475569", fontSize: "13px" }}>
                Press a key to see the event object properties logged here...
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default KeyboardEvents;
