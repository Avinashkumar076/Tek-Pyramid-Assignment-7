// StudentList.jsx — Task 8, Part A: Basic List Rendering
// Demonstrates:
//   - Rendering a list using .map()
//   - Using unique id as key (NOT array index)
//   - Proper key placement on the outermost element in .map()

const students = [
  { id: 1,  name: "Avinash Kumar",    rollNumber: "BCA2019001", grade: "A+" },
  { id: 2,  name: "Priya Sharma",     rollNumber: "BCA2019002", grade: "A"  },
  { id: 3,  name: "Rahul Verma",      rollNumber: "BCA2019003", grade: "B+" },
  { id: 4,  name: "Sneha Patel",      rollNumber: "BCA2019004", grade: "A"  },
  { id: 5,  name: "Mohit Singh",      rollNumber: "BCA2019005", grade: "B"  },
  { id: 6,  name: "Anjali Gupta",     rollNumber: "BCA2019006", grade: "A+" },
  { id: 7,  name: "Rohan Das",        rollNumber: "BCA2019007", grade: "C+" },
  { id: 8,  name: "Kavya Reddy",      rollNumber: "BCA2019008", grade: "A"  },
  { id: 9,  name: "Arjun Mishra",     rollNumber: "BCA2019009", grade: "B+" },
  { id: 10, name: "Pooja Yadav",      rollNumber: "BCA2019010", grade: "A+" },
  { id: 11, name: "Vikram Joshi",     rollNumber: "BCA2019011", grade: "B"  },
  { id: 12, name: "Nisha Tiwari",     rollNumber: "BCA2019012", grade: "A"  },
];

// Grade color helper
const gradeColor = (grade) => {
  if (grade === "A+" ) return { color: "#16a34a", bg: "#dcfce7" };
  if (grade === "A"  ) return { color: "#2563eb", bg: "#dbeafe" };
  if (grade === "B+" ) return { color: "#7c3aed", bg: "#ede9fe" };
  if (grade === "B"  ) return { color: "#d97706", bg: "#fef3c7" };
  return                      { color: "#64748b", bg: "#f1f5f9" };
};

const StudentList = () => {
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
    pageTitle: {
      fontSize: "clamp(20px, 4vw, 26px)",
      fontWeight: "900",
      color: "#0f172a",
      marginBottom: "4px",
    },
    subtitle: { color: "#64748b", fontSize: "13px", marginBottom: "24px" },
    // Stats row
    statsRow: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      gap: "12px",
      marginBottom: "24px",
    },
    statBox: (color, bg) => ({
      background: bg,
      borderRadius: "14px",
      padding: "14px",
      textAlign: "center",
      border: `1px solid ${color}30`,
    }),
    statVal: (color) => ({
      fontSize: "clamp(20px, 5vw, 26px)",
      fontWeight: "900",
      color,
    }),
    statLabel: {
      fontSize: "11px",
      color: "#94a3b8",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginTop: "3px",
    },
    // Table
    tableWrap: {
      background: "#fff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
      overflowX: "auto",           // horizontal scroll on mobile
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "480px",
    },
    thead: { background: "#0f172a" },
    th: {
      padding: "14px 18px",
      textAlign: "left",
      fontSize: "11px",
      fontWeight: "800",
      color: "#94a3b8",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    tr: (i) => ({
      background: i % 2 === 0 ? "#fff" : "#f8fafc",
      borderBottom: "1px solid #f1f5f9",
      transition: "background 0.15s",
    }),
    td: {
      padding: "14px 18px",
      fontSize: "14px",
      color: "#374151",
      verticalAlign: "middle",
    },
    avatar: (color, bg) => ({
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: bg,
      color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "800",
      fontSize: "13px",
      flexShrink: 0,
    }),
    nameCell: { display: "flex", alignItems: "center", gap: "10px" },
    gradeBadge: (color, bg) => ({
      display: "inline-block",
      background: bg,
      color,
      fontSize: "12px",
      fontWeight: "800",
      padding: "3px 12px",
      borderRadius: "20px",
      border: `1px solid ${color}30`,
    }),
    codeBox: {
      marginTop: "20px",
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

  const aPlus  = students.filter((s) => s.grade === "A+").length;
  const aGrade = students.filter((s) => s.grade === "A" ).length;
  const bPlus  = students.filter((s) => s.grade === "B+").length;

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.partBadge}>PART A — BASIC LIST RENDERING</div>
        <h2 style={styles.pageTitle}>🎓 Student List</h2>
        <p style={styles.subtitle}>
          {students.length} students · Rendered with .map() · Unique id as key
        </p>

        {/* Stats */}
        <div style={styles.statsRow}>
          {[
            { label: "Total",    val: students.length, color: "#2563eb", bg: "#dbeafe" },
            { label: "A+ Grade", val: aPlus,           color: "#16a34a", bg: "#dcfce7" },
            { label: "A Grade",  val: aGrade,          color: "#7c3aed", bg: "#ede9fe" },
            { label: "B+ Grade", val: bPlus,           color: "#d97706", bg: "#fef3c7" },
          ].map((s) => (
            <div key={s.label} style={styles.statBox(s.color, s.bg)}>
              <div style={styles.statVal(s.color)}>{s.val}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                {["#", "Student Name", "Roll Number", "Grade"].map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* KEY RULE: key goes on the outermost element in .map() */}
              {/* key={student.id} — using UNIQUE id, NOT array index */}
              {students.map((student, index) => {
                const g = gradeColor(student.grade);
                return (
                  <tr
                    key={student.id}   // ✅ unique id as key
                    style={styles.tr(index)}
                  >
                    <td style={{ ...styles.td, color: "#94a3b8", fontWeight: "700" }}>
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td style={styles.td}>
                      <div style={styles.nameCell}>
                        <div style={styles.avatar(g.color, g.bg)}>
                          {student.name.charAt(0)}
                        </div>
                        <span style={{ fontWeight: "600" }}>{student.name}</span>
                      </div>
                    </td>
                    <td style={{ ...styles.td, fontFamily: "monospace", color: "#64748b" }}>
                      {student.rollNumber}
                    </td>
                    <td style={styles.td}>
                      <span style={styles.gradeBadge(g.color, g.bg)}>
                        {student.grade}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Code explanation */}
        <div style={styles.codeBox}>
          <span style={{ color: "#94a3b8" }}>{"// ✅ Correct — unique id as key:"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"students.map((student) => ("}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  <tr "}</span>
          <span style={{ color: "#fbbf24" }}>key</span>
          <span style={{ color: "#e2e8f0" }}>{"={student.id}"}</span>
          <span style={{ color: "#34d399" }}>{">  ✅"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"    ..."}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  </tr>"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"))"}</span>{"\n\n"}
          <span style={{ color: "#94a3b8" }}>{"// ❌ Wrong — index as key (avoid when list can change):"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"students.map((student, "}</span>
          <span style={{ color: "#f87171" }}>index</span>
          <span style={{ color: "#e2e8f0" }}>{") => <tr "}</span>
          <span style={{ color: "#f87171" }}>key={"{index}"}</span>
          <span style={{ color: "#e2e8f0" }}>{">  ❌"}</span>
        </div>

      </div>
    </div>
  );
};

export default StudentList;
