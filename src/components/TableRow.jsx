// TableRow.jsx — Task 9: React Fragments
// Demonstrates:
//   1. React.Fragment syntax — <React.Fragment>...</React.Fragment>
//   2. Short syntax — <>...</>
//   3. WHY fragments are NECESSARY in a table (div inside <tr> breaks HTML!)
//   4. Fragment with key attribute (only React.Fragment supports key, NOT <>)

import React, { useState } from "react";

// ─── Sub-component using React.Fragment (long syntax) ────────────────────────
// Returns multiple <td> elements — a div wrapper here would BREAK the table!
const StudentRow = ({ student, rank }) => {
  const gradeColor = {
    "A+": { color: "#16a34a", bg: "#dcfce7" },
    "A" : { color: "#2563eb", bg: "#dbeafe" },
    "B+": { color: "#7c3aed", bg: "#ede9fe" },
    "B" : { color: "#d97706", bg: "#fef3c7" },
    "C+": { color: "#64748b", bg: "#f1f5f9" },
  };
  const g = gradeColor[student.grade] || gradeColor["C+"];

  return (
    // ✅ React.Fragment — LONG SYNTAX
    // Lets us return multiple <td> elements without wrapping in a <div>
    // A <div> inside <tr> is INVALID HTML — it would break the table layout!
    <React.Fragment>
      <td style={tdStyle}>{rank}</td>
      <td style={tdStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: g.bg, color: g.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "800", fontSize: "13px", flexShrink: 0,
          }}>
            {student.name.charAt(0)}
          </div>
          <span style={{ fontWeight: "600", color: "#0f172a" }}>{student.name}</span>
        </div>
      </td>
      <td style={{ ...tdStyle, fontFamily: "monospace", color: "#64748b" }}>
        {student.rollNo}
      </td>
      <td style={tdStyle}>
        <span style={{
          background: g.bg, color: g.color,
          fontSize: "12px", fontWeight: "800",
          padding: "3px 12px", borderRadius: "20px",
        }}>
          {student.grade}
        </span>
      </td>
      <td style={{ ...tdStyle, color: "#6366f1", fontWeight: "700" }}>
        {student.score}%
      </td>
    </React.Fragment>
    // ☝️ Without this fragment, we'd need <div> which breaks <tr> → invalid HTML
  );
};

// ─── Sub-component using short syntax <> </> ─────────────────────────────────
const SummaryRow = ({ label, value, highlight }) => (
  // ✅ Short syntax <> — cleaner, but CANNOT accept key or other props
  <>
    <td style={{
      ...tdStyle,
      fontWeight: "700",
      color: "#64748b",
      fontSize: "12px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    }}>
      {label}
    </td>
    <td style={{
      ...tdStyle,
      fontWeight: "900",
      color: highlight ? "#6366f1" : "#0f172a",
      fontSize: "16px",
      colSpan: 4,
    }}>
      {value}
    </td>
  </>
);

const tdStyle = {
  padding: "13px 16px",
  fontSize: "14px",
  color: "#374151",
  verticalAlign: "middle",
  borderBottom: "1px solid #f1f5f9",
};

const students = [
  { id: 1, name: "Avinash Kumar",  rollNo: "BCA001", grade: "A+", score: 96 },
  { id: 2, name: "Priya Sharma",   rollNo: "BCA002", grade: "A",  score: 88 },
  { id: 3, name: "Rahul Verma",    rollNo: "BCA003", grade: "B+", score: 78 },
  { id: 4, name: "Sneha Patel",    rollNo: "BCA004", grade: "A",  score: 85 },
  { id: 5, name: "Mohit Singh",    rollNo: "BCA005", grade: "B",  score: 72 },
];

const TableRow = () => {
  const [showBroken, setShowBroken] = useState(false);
  const avg = Math.round(students.reduce((s, st) => s + st.score, 0) / students.length);

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    container: { maxWidth: "900px", margin: "0 auto" },
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
    subtitle: { color: "#64748b", fontSize: "13px", marginBottom: "28px" },

    // Syntax cards
    syntaxGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "16px",
      marginBottom: "28px",
    },
    syntaxCard: (color, bg, border) => ({
      background: bg,
      borderRadius: "16px",
      padding: "18px",
      border: `2px solid ${border}`,
    }),
    syntaxTitle: (color) => ({
      fontSize: "13px", fontWeight: "800", color,
      textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px",
    }),
    codeSnippet: {
      background: "#0f172a",
      borderRadius: "10px",
      padding: "12px 14px",
      fontFamily: "monospace",
      fontSize: "clamp(10px, 2vw, 12px)",
      color: "#e2e8f0",
      lineHeight: "1.8",
      overflowX: "auto",
    },
    proTip: (color) => ({
      marginTop: "10px",
      fontSize: "11px",
      color,
      fontWeight: "600",
      lineHeight: "1.5",
    }),

    // Toggle
    toggleRow: {
      display: "flex",
      gap: "10px",
      marginBottom: "16px",
      flexWrap: "wrap",
    },
    toggleBtn: (isActive, color) => ({
      padding: "9px 18px",
      borderRadius: "10px",
      border: isActive ? `2px solid ${color}` : "2px solid #e2e8f0",
      background: isActive ? `${color}15` : "#fff",
      color: isActive ? color : "#94a3b8",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "700",
      fontFamily: "'Segoe UI', sans-serif",
    }),

    // Table
    tableWrap: {
      background: "#fff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
      marginBottom: "20px",
      overflowX: "auto",
    },
    table: { width: "100%", borderCollapse: "collapse", minWidth: "500px" },
    thead: { background: "#0f172a" },
    th: {
      padding: "14px 16px",
      textAlign: "left",
      fontSize: "11px",
      fontWeight: "800",
      color: "#94a3b8",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },

    // Broken demo
    brokenNotice: {
      background: "#fff5f5",
      border: "2px dashed #fca5a5",
      borderRadius: "14px",
      padding: "16px 20px",
      marginBottom: "16px",
      fontSize: "13px",
      color: "#991b1b",
      lineHeight: "1.6",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.partBadge}>TASK 9 — REACT FRAGMENTS</div>
        <h2 style={styles.pageTitle}>🧩 TableRow with Fragments</h2>
        <p style={styles.subtitle}>
          Multiple &lt;td&gt; returned without a wrapper div — fragments are REQUIRED here!
        </p>

        {/* Syntax Cards */}
        <div style={styles.syntaxGrid}>

          {/* Long syntax */}
          <div style={styles.syntaxCard("#2563eb", "#eff6ff", "#bfdbfe")}>
            <div style={styles.syntaxTitle("#2563eb")}>① Long Syntax</div>
            <div style={styles.codeSnippet}>
              <span style={{ color: "#38bdf8" }}>{"<React.Fragment>"}</span>{"\n"}
              <span style={{ color: "#e2e8f0" }}>{"  <td>Cell 1</td>"}</span>{"\n"}
              <span style={{ color: "#e2e8f0" }}>{"  <td>Cell 2</td>"}</span>{"\n"}
              <span style={{ color: "#38bdf8" }}>{"</React.Fragment>"}</span>
            </div>
            <p style={styles.proTip("#2563eb")}>
              ✅ Supports <code>key</code> prop — use when rendering lists of fragments
            </p>
          </div>

          {/* Short syntax */}
          <div style={styles.syntaxCard("#7c3aed", "#faf5ff", "#c4b5fd")}>
            <div style={styles.syntaxTitle("#7c3aed")}>② Short Syntax</div>
            <div style={styles.codeSnippet}>
              <span style={{ color: "#a78bfa" }}>{"<>"}</span>{"\n"}
              <span style={{ color: "#e2e8f0" }}>{"  <td>Cell 1</td>"}</span>{"\n"}
              <span style={{ color: "#e2e8f0" }}>{"  <td>Cell 2</td>"}</span>{"\n"}
              <span style={{ color: "#a78bfa" }}>{"</>"}</span>
            </div>
            <p style={styles.proTip("#7c3aed")}>
              ✅ Cleaner syntax ❌ Cannot accept <code>key</code> or any other props
            </p>
          </div>

          {/* Wrong — div wrapper */}
          <div style={styles.syntaxCard("#dc2626", "#fff5f5", "#fca5a5")}>
            <div style={styles.syntaxTitle("#dc2626")}>③ ❌ Wrong — div wrapper</div>
            <div style={styles.codeSnippet}>
              <span style={{ color: "#f87171" }}>{"<div>"}</span>
              <span style={{ color: "#64748b" }}>{" ← INVALID in <tr>"}</span>{"\n"}
              <span style={{ color: "#e2e8f0" }}>{"  <td>Cell 1</td>"}</span>{"\n"}
              <span style={{ color: "#e2e8f0" }}>{"  <td>Cell 2</td>"}</span>{"\n"}
              <span style={{ color: "#f87171" }}>{"</div>"}</span>
            </div>
            <p style={styles.proTip("#dc2626")}>
              ❌ &lt;div&gt; inside &lt;tr&gt; = invalid HTML → breaks table layout completely!
            </p>
          </div>

        </div>

        {/* Toggle to show correct vs broken */}
        <div style={styles.toggleRow}>
          <button
            style={styles.toggleBtn(!showBroken, "#16a34a")}
            onClick={() => setShowBroken(false)}
          >
            ✅ Correct — Fragment
          </button>
          <button
            style={styles.toggleBtn(showBroken, "#dc2626")}
            onClick={() => setShowBroken(true)}
          >
            ❌ Broken — div wrapper
          </button>
        </div>

        {/* Broken notice */}
        {showBroken && (
          <div style={styles.brokenNotice}>
            ⚠️ <strong>Notice below:</strong> When a &lt;div&gt; wraps &lt;td&gt; elements inside a &lt;tr&gt;,
            the browser tries to fix the invalid HTML — the table structure completely breaks.
            This is EXACTLY why React Fragments exist for table rows!
          </div>
        )}

        {/* Table — correct version uses Fragment */}
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                {["Rank", "Student", "Roll No", "Grade", "Score"].map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id} style={{ background: index % 2 === 0 ? "#fff" : "#f8fafc" }}>
                  {showBroken ? (
                    // ❌ BROKEN — div wrapper inside <tr>
                    <div style={{ color: "red", padding: "10px" }}>
                      ❌ div breaks table! Cells won't render correctly.
                    </div>
                  ) : (
                    // ✅ CORRECT — React.Fragment used in StudentRow component
                    <StudentRow student={student} rank={index + 1} />
                  )}
                </tr>
              ))}

              {/* Summary row using short syntax <> */}
              <tr style={{ background: "#f0fdf4", borderTop: "2px solid #bbf7d0" }}>
                <SummaryRow label="Class Average" value={`${avg}%`} highlight />
                <td colSpan={3} style={{ ...tdStyle, fontSize: "11px", color: "#94a3b8" }}>
                  Using &lt;&gt; short fragment syntax ✅
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default TableRow;
