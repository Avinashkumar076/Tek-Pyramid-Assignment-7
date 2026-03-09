// TodoList.jsx — Task 5, Part C: Array State
// Demonstrates:
//   - State as an array of objects
//   - Add item to array (spread operator)
//   - Toggle item in array (map to return updated copy)
//   - Delete item from array (filter)
//   - Derived values from state (completed count, pending count)

import { useState } from "react";

const TodoList = () => {

  // ─── ARRAY STATE ─────────────────────────────────────────────────────────
  // State is an array of todo objects
  // Each todo: { id, text, completed }
  const [todos, setTodos] = useState([
    { id: 1, text: "Set up Vite + React project", completed: true },
    { id: 2, text: "Build component architecture", completed: true },
    { id: 3, text: "Master JSX syntax", completed: false },
    { id: 4, text: "Implement Props with PropTypes", completed: false },
    { id: 5, text: "Complete State Management task", completed: false },
  ]);

  // Separate state for the input field
  const [inputText, setInputText] = useState("");

  // ─── ADD TODO ────────────────────────────────────────────────────────────
  // Creates a new todo object and appends it to the array
  // Uses spread to avoid mutating original array: [...todos, newTodo] ✅
  // Never: todos.push(newTodo) ❌ (mutates state directly)
  const handleAdd = () => {
    if (!inputText.trim()) return; // guard: don't add empty todos

    const newTodo = {
      id: Date.now(),         // unique id using timestamp
      text: inputText.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]); // spread existing + add new
    setInputText("");                        // clear input after adding
  };

  // ─── TOGGLE COMPLETION ───────────────────────────────────────────────────
  // Maps over array — returns a NEW array with the target item's completed toggled
  // All other items remain unchanged
  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed } // toggle this one
          : todo                                      // keep others unchanged
      )
    );
  };

  // ─── DELETE TODO ─────────────────────────────────────────────────────────
  // filter() returns new array EXCLUDING the deleted item
  // Original array is NOT mutated
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // ─── CLEAR ALL COMPLETED ─────────────────────────────────────────────────
  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // ─── DERIVED STATE VALUES ─────────────────────────────────────────────────
  // Calculated from state — no extra useState needed
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.filter((t) => !t.completed).length;
  const completionPercent = todos.length
    ? Math.round((completedCount / todos.length) * 100)
    : 0;

  // Add on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    container: {
      maxWidth: "600px",
      margin: "0 auto",
    },
    pageTitle: {
      fontSize: "clamp(20px, 4vw, 28px)",
      fontWeight: "900",
      color: "#064e3b",
      marginBottom: "4px",
    },
    subtitle: {
      color: "#059669",
      fontSize: "13px",
      marginBottom: "24px",
    },
    // Stats row
    statsRow: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "12px",
      marginBottom: "20px",
    },
    statBox: (color, bg) => ({
      background: bg,
      borderRadius: "14px",
      padding: "14px",
      textAlign: "center",
      border: `1px solid ${color}20`,
    }),
    statNum: (color) => ({
      fontSize: "clamp(20px, 5vw, 28px)",
      fontWeight: "900",
      color,
    }),
    statLabel: {
      fontSize: "11px",
      color: "#6b7280",
      marginTop: "2px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    // Progress bar
    progressWrap: {
      marginBottom: "20px",
      background: "#fff",
      borderRadius: "14px",
      padding: "16px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    },
    progressLabel: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "12px",
      fontWeight: "700",
      color: "#064e3b",
      marginBottom: "8px",
    },
    progressBar: {
      height: "10px",
      background: "#d1fae5",
      borderRadius: "5px",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      width: `${completionPercent}%`,
      background: "linear-gradient(90deg, #10b981, #059669)",
      borderRadius: "5px",
      transition: "width 0.4s ease",
    },
    // Input row
    inputRow: {
      display: "flex",
      gap: "10px",
      marginBottom: "16px",
      flexWrap: "wrap",
    },
    input: {
      flex: 1,
      padding: "12px 16px",
      borderRadius: "12px",
      border: "2px solid #a7f3d0",
      background: "#fff",
      fontSize: "14px",
      outline: "none",
      minWidth: "180px",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#1e293b",
    },
    addBtn: {
      padding: "12px 22px",
      borderRadius: "12px",
      border: "none",
      background: "linear-gradient(90deg, #10b981, #059669)",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
      whiteSpace: "nowrap",
    },
    // Todo list
    listCard: {
      background: "#fff",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      marginBottom: "16px",
    },
    todoItem: (completed) => ({
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 18px",
      borderBottom: "1px solid #f0fdf4",
      background: completed ? "#f0fdf4" : "#fff",
      transition: "background 0.2s",
    }),
    checkbox: {
      width: "20px",
      height: "20px",
      cursor: "pointer",
      accentColor: "#10b981",
      flexShrink: 0,
    },
    todoText: (completed) => ({
      flex: 1,
      fontSize: "14px",
      color: completed ? "#9ca3af" : "#1e293b",
      textDecoration: completed ? "line-through" : "none",
      transition: "all 0.2s",
    }),
    deleteBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      color: "#fca5a5",
      padding: "4px",
      borderRadius: "6px",
      flexShrink: 0,
    },
    emptyState: {
      padding: "40px",
      textAlign: "center",
      color: "#9ca3af",
      fontSize: "14px",
    },
    clearBtn: {
      width: "100%",
      padding: "11px",
      borderRadius: "12px",
      border: "2px dashed #a7f3d0",
      background: "transparent",
      color: "#059669",
      fontSize: "13px",
      fontWeight: "700",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.pageTitle}>✅ Todo List</h2>
        <p style={styles.subtitle}>
          Part C — Array State · Add · Toggle · Delete
        </p>

        {/* ── STATS ROW ── */}
        <div style={styles.statsRow}>
          <div style={styles.statBox("#6366f1", "#ede9fe")}>
            <div style={styles.statNum("#6366f1")}>{todos.length}</div>
            <div style={styles.statLabel}>Total</div>
          </div>
          <div style={styles.statBox("#10b981", "#d1fae5")}>
            <div style={styles.statNum("#10b981")}>{completedCount}</div>
            <div style={styles.statLabel}>Done ✅</div>
          </div>
          <div style={styles.statBox("#f59e0b", "#fef3c7")}>
            <div style={styles.statNum("#f59e0b")}>{pendingCount}</div>
            <div style={styles.statLabel}>Pending ⏳</div>
          </div>
        </div>

        {/* ── PROGRESS BAR ── */}
        <div style={styles.progressWrap}>
          <div style={styles.progressLabel}>
            <span>📊 Overall Progress</span>
            <span>{completionPercent}%</span>
          </div>
          <div style={styles.progressBar}>
            <div style={styles.progressFill} />
          </div>
        </div>

        {/* ── ADD TODO INPUT ── */}
        <div style={styles.inputRow}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}          // add on Enter key
            placeholder="Add a new task... (or press Enter)"
            style={styles.input}
            aria-label="New todo input"
          />
          <button style={styles.addBtn} onClick={handleAdd}>
            + Add Task
          </button>
        </div>

        {/* ── TODO LIST ── */}
        <div style={styles.listCard}>
          {todos.length === 0 ? (
            <div style={styles.emptyState}>
              🎉 All tasks done! Add a new one above.
            </div>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} style={styles.todoItem(todo.completed)}>

                {/* TOGGLE — checkbox click maps array to flip completed */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  style={styles.checkbox}
                  aria-label={`Mark "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`}
                />

                {/* Todo text — strikethrough when completed */}
                <span style={styles.todoText(todo.completed)}>
                  {todo.text}
                </span>

                {/* DELETE — filter removes this item from array */}
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(todo.id)}
                  aria-label={`Delete "${todo.text}"`}
                >
                  🗑️
                </button>

              </div>
            ))
          )}
        </div>

        {/* CLEAR COMPLETED — only shows when there are completed items */}
        {completedCount > 0 && (
          <button style={styles.clearBtn} onClick={handleClearCompleted}>
            🧹 Clear {completedCount} completed task{completedCount > 1 ? "s" : ""}
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoList;
