// EmployeeDirectory.jsx — Task 8, Part C: List with Actions
// Demonstrates:
//   - Add, Edit, Delete operations on a list
//   - Proper keys maintained when list changes
//   - Search/filter functionality
//   - Keys stay stable even when filtered list changes

import { useState } from "react";

const initialEmployees = [
  { id: 1, name: "Avinash Kumar",  department: "Frontend",   salary: 45000 },
  { id: 2, name: "Priya Sharma",   department: "Backend",    salary: 52000 },
  { id: 3, name: "Rahul Verma",    department: "DevOps",     salary: 60000 },
  { id: 4, name: "Sneha Patel",    department: "Design",     salary: 42000 },
  { id: 5, name: "Mohit Singh",    department: "Frontend",   salary: 48000 },
  { id: 6, name: "Kavya Reddy",    department: "Backend",    salary: 55000 },
  { id: 7, name: "Arjun Mishra",   department: "QA",         salary: 38000 },
];

const deptColors = {
  Frontend:  { color: "#6366f1", bg: "#ede9fe" },
  Backend:   { color: "#0891b2", bg: "#e0f2fe" },
  DevOps:    { color: "#d97706", bg: "#fef3c7" },
  Design:    { color: "#db2777", bg: "#fce7f3" },
  QA:        { color: "#16a34a", bg: "#dcfce7" },
  Marketing: { color: "#7c3aed", bg: "#f3e8ff" },
};

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: "", department: "Frontend", salary: "" });
  const nextId = Math.max(...employees.map((e) => e.id), 0) + 1;

  // ── FILTER LOGIC ──────────────────────────────────────────────────────────
  // Even when filtered, keys stay tied to employee.id — not array index
  const filtered = employees
    .filter((e) => filterDept === "All" || e.department === filterDept)
    .filter((e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // ── ADD ───────────────────────────────────────────────────────────────────
  const handleAdd = () => {
    if (!newEmployee.name.trim() || !newEmployee.salary) return;
    setEmployees((prev) => [
      ...prev,
      { id: nextId, ...newEmployee, salary: Number(newEmployee.salary) },
    ]);
    setNewEmployee({ name: "", department: "Frontend", salary: "" });
    setShowAddForm(false);
  };

  // ── EDIT ──────────────────────────────────────────────────────────────────
  const startEdit = (emp) => {
    setEditingId(emp.id);
    setEditForm({ name: emp.name, department: emp.department, salary: emp.salary });
  };
  const saveEdit = (id) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...editForm, salary: Number(editForm.salary) } : e))
    );
    setEditingId(null);
  };

  // ── DELETE ────────────────────────────────────────────────────────────────
  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const departments = ["All", ...new Set(employees.map((e) => e.department))];

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fdf4ff, #fae8ff)",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    container: { maxWidth: "960px", margin: "0 auto" },
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
    // Controls row
    controlsRow: {
      display: "flex",
      gap: "10px",
      marginBottom: "16px",
      flexWrap: "wrap",
    },
    searchInput: {
      flex: "1",
      minWidth: "180px",
      padding: "10px 14px",
      borderRadius: "10px",
      border: "2px solid #e9d5ff",
      background: "#fff",
      fontSize: "13px",
      outline: "none",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#1e293b",
    },
    filterSelect: {
      padding: "10px 14px",
      borderRadius: "10px",
      border: "2px solid #e9d5ff",
      background: "#fff",
      fontSize: "13px",
      outline: "none",
      cursor: "pointer",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#1e293b",
    },
    addBtn: {
      padding: "10px 18px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(90deg, #7c3aed, #6d28d9)",
      color: "#fff",
      fontSize: "13px",
      fontWeight: "700",
      cursor: "pointer",
      whiteSpace: "nowrap",
    },
    // Add form
    addForm: {
      background: "#fff",
      borderRadius: "16px",
      padding: "20px",
      marginBottom: "16px",
      boxShadow: "0 4px 20px rgba(124,58,237,0.1)",
      border: "2px solid #e9d5ff",
    },
    formTitle: { fontSize: "14px", fontWeight: "800", color: "#6b21a8", marginBottom: "14px" },
    formRow: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: "12px",
      marginBottom: "14px",
    },
    formInput: {
      padding: "9px 12px",
      borderRadius: "8px",
      border: "2px solid #e9d5ff",
      background: "#faf5ff",
      fontSize: "13px",
      outline: "none",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#1e293b",
      width: "100%",
      boxSizing: "border-box",
    },
    formBtns: { display: "flex", gap: "8px" },
    confirmBtn: {
      padding: "9px 20px",
      borderRadius: "8px",
      border: "none",
      background: "#7c3aed",
      color: "#fff",
      fontSize: "13px",
      fontWeight: "700",
      cursor: "pointer",
    },
    cancelBtn: {
      padding: "9px 20px",
      borderRadius: "8px",
      border: "2px solid #e2e8f0",
      background: "transparent",
      color: "#64748b",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
    },
    // Employee cards grid
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "14px",
      marginBottom: "20px",
    },
    empCard: (isEditing) => ({
      background: "#fff",
      borderRadius: "16px",
      padding: "18px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
      border: isEditing ? "2px solid #7c3aed" : "1px solid #f3e8ff",
      transition: "border 0.2s",
    }),
    empHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" },
    avatar: (color, bg) => ({
      width: "44px", height: "44px", borderRadius: "12px",
      background: bg, color, fontWeight: "900", fontSize: "18px",
      display: "flex", alignItems: "center", justifyContent: "center",
    }),
    actionBtns: { display: "flex", gap: "6px" },
    editBtn: {
      padding: "5px 12px", borderRadius: "7px", border: "1px solid #e9d5ff",
      background: "#faf5ff", color: "#7c3aed", fontSize: "12px",
      fontWeight: "700", cursor: "pointer",
    },
    deleteBtn: {
      padding: "5px 12px", borderRadius: "7px", border: "1px solid #fee2e2",
      background: "#fff5f5", color: "#ef4444", fontSize: "12px",
      fontWeight: "700", cursor: "pointer",
    },
    saveBtn: {
      padding: "5px 12px", borderRadius: "7px", border: "none",
      background: "#7c3aed", color: "#fff", fontSize: "12px",
      fontWeight: "700", cursor: "pointer",
    },
    empName: { fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "6px" },
    deptBadge: (color, bg) => ({
      display: "inline-block", background: bg, color,
      fontSize: "11px", fontWeight: "700", padding: "2px 10px",
      borderRadius: "20px", marginBottom: "8px",
    }),
    salary: { fontSize: "16px", fontWeight: "900", color: "#0f172a" },
    salaryLabel: { fontSize: "11px", color: "#94a3b8", marginLeft: "4px" },
    keyNote: { fontSize: "10px", color: "#c4b5fd", fontFamily: "monospace", marginTop: "8px" },
    emptyState: {
      textAlign: "center", padding: "40px", background: "#fff",
      borderRadius: "16px", color: "#94a3b8", fontSize: "14px",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.partBadge}>PART C — LIST WITH ACTIONS</div>
        <h2 style={styles.pageTitle}>👔 Employee Directory</h2>
        <p style={styles.subtitle}>
          Add · Edit · Delete · Search · Filter — Keys stay stable throughout
        </p>

        {/* Controls */}
        <div style={styles.controlsRow}>
          <input
            type="text"
            placeholder="🔍 Search by name or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            style={styles.filterSelect}
          >
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <button style={styles.addBtn} onClick={() => setShowAddForm((p) => !p)}>
            {showAddForm ? "✕ Cancel" : "+ Add Employee"}
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div style={styles.addForm}>
            <p style={styles.formTitle}>➕ New Employee</p>
            <div style={styles.formRow}>
              <input
                type="text"
                placeholder="Full Name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee((p) => ({ ...p, name: e.target.value }))}
                style={styles.formInput}
              />
              <select
                value={newEmployee.department}
                onChange={(e) => setNewEmployee((p) => ({ ...p, department: e.target.value }))}
                style={styles.formInput}
              >
                {Object.keys(deptColors).map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <input
                type="number"
                placeholder="Salary (₹)"
                value={newEmployee.salary}
                onChange={(e) => setNewEmployee((p) => ({ ...p, salary: e.target.value }))}
                style={styles.formInput}
              />
            </div>
            <div style={styles.formBtns}>
              <button style={styles.confirmBtn} onClick={handleAdd}>✅ Add</button>
              <button style={styles.cancelBtn} onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Employee Grid */}
        {filtered.length === 0 ? (
          <div style={styles.emptyState}>
            😕 No employees found. Try a different search.
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((emp) => {
              const dept = deptColors[emp.department] || deptColors.Frontend;
              const isEditing = editingId === emp.id;

              return (
                // KEY = emp.id — stays stable even when list is filtered/reordered
                <div key={emp.id} style={styles.empCard(isEditing)}>
                  <div style={styles.empHeader}>
                    <div style={styles.avatar(dept.color, dept.bg)}>
                      {emp.name.charAt(0)}
                    </div>
                    <div style={styles.actionBtns}>
                      {isEditing ? (
                        <>
                          <button style={styles.saveBtn} onClick={() => saveEdit(emp.id)}>💾 Save</button>
                          <button style={styles.cancelBtn} onClick={() => setEditingId(null)}>✕</button>
                        </>
                      ) : (
                        <>
                          <button style={styles.editBtn} onClick={() => startEdit(emp)}>✏️ Edit</button>
                          <button style={styles.deleteBtn} onClick={() => handleDelete(emp.id)}>🗑️</button>
                        </>
                      )}
                    </div>
                  </div>

                  {isEditing ? (
                    // Edit mode — inline form
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <input value={editForm.name} onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))} style={styles.formInput} placeholder="Name" />
                      <select value={editForm.department} onChange={(e) => setEditForm((p) => ({ ...p, department: e.target.value }))} style={styles.formInput}>
                        {Object.keys(deptColors).map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <input value={editForm.salary} onChange={(e) => setEditForm((p) => ({ ...p, salary: e.target.value }))} style={styles.formInput} type="number" placeholder="Salary" />
                    </div>
                  ) : (
                    // View mode
                    <>
                      <p style={styles.empName}>{emp.name}</p>
                      <div style={styles.deptBadge(dept.color, dept.bg)}>{emp.department}</div>
                      <div>
                        <span style={styles.salary}>₹{emp.salary.toLocaleString("en-IN")}</span>
                        <span style={styles.salaryLabel}>/mo</span>
                      </div>
                    </>
                  )}

                  <div style={styles.keyNote}>key="{emp.id}"</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats */}
        <div style={{
          background: "#fff", borderRadius: "12px", padding: "14px 18px",
          display: "flex", gap: "16px", flexWrap: "wrap",
          fontSize: "13px", color: "#64748b", boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        }}>
          <span>👔 Total: <strong>{employees.length}</strong></span>
          <span>🔍 Showing: <strong>{filtered.length}</strong></span>
          <span>💰 Avg Salary: <strong>₹{Math.round(employees.reduce((s, e) => s + e.salary, 0) / employees.length).toLocaleString("en-IN")}</strong></span>
        </div>

      </div>
    </div>
  );
};

export default EmployeeDirectory;
