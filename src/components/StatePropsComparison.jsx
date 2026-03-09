// StatePropsComparison.jsx — Task 6, Part 2
// Visual comparison table: State vs Props
// Includes: characteristics, when to use, and code examples

const StatePropsComparison = () => {

  const comparisons = [
    {
      aspect: "Definition",
      state: "Internal data managed inside the component itself",
      props: "External data passed INTO the component from its parent",
    },
    {
      aspect: "Who owns it?",
      state: "The component that declares it with useState()",
      props: "The PARENT component — child just receives it",
    },
    {
      aspect: "Can it change?",
      state: "✅ Yes — using the setter function (setState)",
      props: "❌ No — props are READ-ONLY in the receiving component",
    },
    {
      aspect: "Where declared?",
      state: "Inside the component: const [x, setX] = useState()",
      props: "In the parent's JSX: <Child propName={value} />",
    },
    {
      aspect: "Triggers re-render?",
      state: "✅ Yes — every state update causes re-render",
      props: "✅ Yes — when parent's state changes, child re-renders with new props",
    },
    {
      aspect: "Direction",
      state: "Stays within the component (or lifted up)",
      props: "Always flows DOWN — parent → child (one-way data flow)",
    },
    {
      aspect: "Initial value",
      state: "Set inside component: useState(initialValue)",
      props: "Set by parent when rendering: <Child val={42} />",
    },
    {
      aspect: "Scope",
      state: "Private to the component",
      props: "Shared — parent gives, child uses",
    },
  ];

  const whenToUse = [
    {
      type: "state",
      icon: "🗃️",
      title: "Use STATE when...",
      color: "#6366f1",
      bg: "#ede9fe",
      points: [
        "Data changes over time (form input, count, toggle)",
        "The component itself needs to track & update the data",
        "Managing UI behavior: loading, open/close, active tab",
        "Fetching & storing API response data",
        "Cart items, filters, search query — anything interactive",
      ],
    },
    {
      type: "props",
      icon: "📦",
      title: "Use PROPS when...",
      color: "#059669",
      bg: "#d1fae5",
      points: [
        "Passing data from parent down to child",
        "Making components REUSABLE with different data",
        "Passing callback functions (onClick, onChange handlers)",
        "Configuring a component: variant, size, disabled",
        "Sharing parent's state with multiple children",
      ],
    },
  ];

  const codeExamples = [
    {
      title: "State Example — Counter",
      color: "#6366f1",
      bg: "#1e1b4b",
      code: `// STATE — data owned & managed by THIS component
const Counter = () => {
  // useState declares state INSIDE the component
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      {/* Calling setter updates state → triggers re-render */}
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};`,
    },
    {
      title: "Props Example — Display Card",
      color: "#059669",
      bg: "#064e3b",
      code: `// PROPS — data received from parent component
// Destructured directly in function parameters
const UserCard = ({ name, age, role }) => {
  // ❌ Cannot do: name = "someone else"  (read-only!)
  // ✅ Can only READ and display props
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Role: {role}</p>
    </div>
  );
};

// Parent passes data as props ↓
const App = () => (
  <UserCard name="Avinash" age={24} role="Developer" />
);`,
    },
  ];

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "#f8fafc",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    container: { maxWidth: "900px", margin: "0 auto" },
    pageTitle: {
      fontSize: "clamp(20px, 4vw, 26px)",
      fontWeight: "900",
      color: "#0f172a",
      marginBottom: "4px",
    },
    subtitle: { color: "#64748b", fontSize: "13px", marginBottom: "28px" },

    // ── Comparison Table ──
    tableWrap: {
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
      marginBottom: "28px",
      overflowX: "auto",           // horizontal scroll on small screens
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "520px",
    },
    thead: {
      background: "#0f172a",
    },
    th: (color) => ({
      padding: "14px 18px",
      textAlign: "left",
      fontSize: "13px",
      fontWeight: "800",
      color,
      textTransform: "uppercase",
      letterSpacing: "1px",
    }),
    tr: (i) => ({
      background: i % 2 === 0 ? "#ffffff" : "#f8fafc",
      borderBottom: "1px solid #f1f5f9",
    }),
    td: {
      padding: "13px 18px",
      fontSize: "13px",
      color: "#374151",
      lineHeight: "1.5",
      verticalAlign: "top",
    },
    tdAspect: {
      padding: "13px 18px",
      fontSize: "12px",
      fontWeight: "800",
      color: "#1e293b",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      background: "#f1f5f9",
      whiteSpace: "nowrap",
    },

    // ── When to Use ──
    whenGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "20px",
      marginBottom: "28px",
    },
    whenCard: (bg, color) => ({
      background: bg,
      border: `1px solid ${color}30`,
      borderRadius: "16px",
      padding: "clamp(16px, 4vw, 24px)",
    }),
    whenTitle: (color) => ({
      fontSize: "15px",
      fontWeight: "800",
      color,
      marginBottom: "14px",
    }),
    point: {
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
      marginBottom: "8px",
      fontSize: "13px",
      color: "#374151",
      lineHeight: "1.5",
    },
    dot: (color) => ({
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: color,
      marginTop: "7px",
      flexShrink: 0,
    }),

    // ── Code Examples ──
    codeGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    },
    codeCard: (bg) => ({
      background: bg,
      borderRadius: "16px",
      overflow: "hidden",
    }),
    codeHeader: (color) => ({
      padding: "12px 18px",
      fontSize: "12px",
      fontWeight: "800",
      color,
      textTransform: "uppercase",
      letterSpacing: "1px",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }),
    codePre: {
      padding: "16px 18px",
      margin: 0,
      fontFamily: "'Courier New', monospace",
      fontSize: "clamp(10px, 2vw, 12px)",
      color: "#e2e8f0",
      overflowX: "auto",
      lineHeight: "1.7",
      whiteSpace: "pre",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.pageTitle}>⚖️ State vs Props — Comparison</h2>
        <p style={styles.subtitle}>
          Part 2 — Characteristics · When to use · Code examples
        </p>

        {/* ── COMPARISON TABLE ── */}
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th("#94a3b8")}>Aspect</th>
                <th style={styles.th("#a78bfa")}>🗃️ State</th>
                <th style={styles.th("#34d399")}>📦 Props</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <tr key={i} style={styles.tr(i)}>
                  <td style={styles.tdAspect}>{row.aspect}</td>
                  <td style={styles.td}>{row.state}</td>
                  <td style={styles.td}>{row.props}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── WHEN TO USE ── */}
        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "14px" }}>
          🎯 When to Use Each
        </h3>
        <div style={styles.whenGrid}>
          {whenToUse.map((item) => (
            <div key={item.type} style={styles.whenCard(item.bg, item.color)}>
              <p style={styles.whenTitle(item.color)}>
                {item.icon} {item.title}
              </p>
              {item.points.map((point, i) => (
                <div key={i} style={styles.point}>
                  <span style={styles.dot(item.color)} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── CODE EXAMPLES ── */}
        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "14px" }}>
          💻 Code Examples
        </h3>
        <div style={styles.codeGrid}>
          {codeExamples.map((ex, i) => (
            <div key={i} style={styles.codeCard(ex.bg)}>
              <div style={styles.codeHeader(ex.color)}>{ex.title}</div>
              <pre style={styles.codePre}>{ex.code}</pre>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default StatePropsComparison;
