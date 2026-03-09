// RegistrationForm.jsx — Task 10, Part D: Form Events
// Demonstrates:
//   - Multiple input types: text, email, password, checkbox, radio, select
//   - Real-time validation feedback on every onChange
//   - Prevent form submission on validation failure
//   - onSubmit with e.preventDefault()

import { useState } from "react";

const RegistrationForm = () => {
  const [form, setForm] = useState({
    fullName:  "",
    email:     "",
    password:  "",
    gender:    "",
    role:      "",
    terms:     false,
    newsletter: false,
  });

  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPass,  setShowPass]  = useState(false);

  // ── VALIDATION RULES ─────────────────────────────────────────────────────
  const validate = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value.trim())           return "Full name is required";
        if (value.trim().length < 3) return "Name must be at least 3 characters";
        return "";
      case "email":
        if (!value.trim())                       return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address";
        return "";
      case "password":
        if (!value)           return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        if (!/[A-Z]/.test(value)) return "Include at least one uppercase letter";
        if (!/[0-9]/.test(value)) return "Include at least one number";
        return "";
      case "gender":
        if (!value) return "Please select your gender";
        return "";
      case "role":
        if (!value) return "Please select your role";
        return "";
      case "terms":
        if (!value) return "You must accept the terms";
        return "";
      default:
        return "";
    }
  };

  // ── onChange HANDLER ─────────────────────────────────────────────────────
  // Handles ALL input types — text, email, password, checkbox, radio, select
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    // Update form state
    setForm((prev) => ({ ...prev, [name]: newValue }));

    // Real-time validation — validate on every change
    const error = validate(name, newValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ── onSubmit HANDLER ──────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();   // prevents browser default page reload

    // Validate ALL fields before submitting
    const allErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validate(key, form[key]);
      if (error) allErrors[key] = error;
    });

    // If any errors — set them and PREVENT submission
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;   // ← stops submission
    }

    // All valid — submit!
    setSubmitted(true);
  };

  const isFormValid = Object.keys(form).every((key) => !validate(key, form[key]));

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    container: { maxWidth: "680px", margin: "0 auto" },
    partBadge: {
      display: "inline-block",
      background: "#dcfce7",
      color: "#166534",
      fontSize: "11px",
      fontWeight: "800",
      padding: "4px 14px",
      borderRadius: "20px",
      marginBottom: "8px",
      letterSpacing: "1px",
    },
    pageTitle: { fontSize: "clamp(20px, 4vw, 26px)", fontWeight: "900", color: "#0f172a", marginBottom: "4px" },
    subtitle: { color: "#64748b", fontSize: "13px", marginBottom: "24px" },
    card: {
      background: "#fff",
      borderRadius: "24px",
      padding: "clamp(24px, 5vw, 36px)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
    },
    // Success screen
    successCard: {
      background: "#fff",
      borderRadius: "24px",
      padding: "clamp(24px, 5vw, 48px)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
      textAlign: "center",
    },
    // Form groups
    formGroup: { marginBottom: "20px" },
    label: (hasError) => ({
      display: "block",
      fontSize: "12px",
      fontWeight: "700",
      color: hasError ? "#dc2626" : "#374151",
      marginBottom: "6px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    }),
    input: (hasError, focused) => ({
      width: "100%",
      padding: "11px 14px",
      borderRadius: "10px",
      border: `2px solid ${hasError ? "#fca5a5" : "#e2e8f0"}`,
      background: hasError ? "#fff5f5" : "#f8fafc",
      color: "#1e293b",
      fontSize: "14px",
      outline: "none",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
      transition: "border 0.2s",
    }),
    select: (hasError) => ({
      width: "100%",
      padding: "11px 14px",
      borderRadius: "10px",
      border: `2px solid ${hasError ? "#fca5a5" : "#e2e8f0"}`,
      background: hasError ? "#fff5f5" : "#f8fafc",
      color: "#1e293b",
      fontSize: "14px",
      outline: "none",
      cursor: "pointer",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    }),
    errorMsg: {
      color: "#dc2626",
      fontSize: "11px",
      fontWeight: "600",
      marginTop: "5px",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    radioRow: { display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "4px" },
    radioLabel: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "14px",
      color: "#374151",
      cursor: "pointer",
    },
    checkboxRow: {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      marginBottom: "12px",
    },
    checkbox: { width: "18px", height: "18px", cursor: "pointer", accentColor: "#16a34a", marginTop: "2px", flexShrink: 0 },
    checkboxLabel: { fontSize: "13px", color: "#374151", lineHeight: "1.5" },
    pwWrapper: { position: "relative" },
    showPwBtn: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      padding: "0",
    },
    // Strength bar
    strengthBar: (strength) => ({
      height: "4px",
      background: strength < 2 ? "#ef4444" : strength < 4 ? "#f59e0b" : "#16a34a",
      width: `${(strength / 4) * 100}%`,
      borderRadius: "2px",
      transition: "all 0.3s",
      marginTop: "6px",
    }),
    submitBtn: (valid) => ({
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      border: "none",
      background: valid
        ? "linear-gradient(90deg, #16a34a, #15803d)"
        : "#e2e8f0",
      color: valid ? "#fff" : "#94a3b8",
      fontSize: "15px",
      fontWeight: "700",
      cursor: valid ? "pointer" : "not-allowed",
      marginTop: "8px",
      transition: "all 0.3s",
      boxShadow: valid ? "0 4px 14px rgba(22,163,74,0.3)" : "none",
    }),
  };

  // Password strength calculator
  const getPasswordStrength = (pw) => {
    let score = 0;
    if (pw.length >= 6)     score++;
    if (/[A-Z]/.test(pw))  score++;
    if (/[0-9]/.test(pw))  score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  if (submitted) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.successCard}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 26px)", fontWeight: "900", color: "#0f172a", marginBottom: "8px" }}>
              Registration Successful!
            </h2>
            <p style={{ color: "#64748b", marginBottom: "24px" }}>
              Welcome, <strong>{form.fullName}</strong>!
            </p>
            <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "16px", textAlign: "left", marginBottom: "20px" }}>
              {[
                ["Name",  form.fullName],
                ["Email", form.email],
                ["Gender", form.gender],
                ["Role",   form.role],
                ["Newsletter", form.newsletter ? "Subscribed ✅" : "Not subscribed"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e2e8f0", fontSize: "13px" }}>
                  <span style={{ color: "#64748b", fontWeight: "600" }}>{k}</span>
                  <span style={{ color: "#0f172a", fontWeight: "700" }}>{v}</span>
                </div>
              ))}
            </div>
            <button
              style={{ ...styles.submitBtn(true) }}
              onClick={() => { setSubmitted(false); setForm({ fullName: "", email: "", password: "", gender: "", role: "", terms: false, newsletter: false }); setErrors({}); }}
            >
              ← Register Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  const pwStrength = getPasswordStrength(form.password);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.partBadge}>PART D — FORM EVENTS</div>
        <h2 style={styles.pageTitle}>📝 Registration Form</h2>
        <p style={styles.subtitle}>
          All input types · Real-time validation · Prevent submit on failure
        </p>

        <div style={styles.card}>
          {/* onSubmit on the form element */}
          <form onSubmit={handleSubmit} noValidate>

            {/* TEXT — Full Name */}
            <div style={styles.formGroup}>
              <label htmlFor="fullName" style={styles.label(!!errors.fullName)}>
                👤 Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                placeholder="e.g. Avinash Kumar"
                style={styles.input(!!errors.fullName)}
              />
              {errors.fullName && <p style={styles.errorMsg}>⚠️ {errors.fullName}</p>}
            </div>

            {/* EMAIL */}
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label(!!errors.email)}>
                📧 Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. avinash@email.com"
                style={styles.input(!!errors.email)}
              />
              {errors.email && <p style={styles.errorMsg}>⚠️ {errors.email}</p>}
            </div>

            {/* PASSWORD */}
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label(!!errors.password)}>
                🔒 Password *
              </label>
              <div style={styles.pwWrapper}>
                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min 6 chars, 1 uppercase, 1 number"
                  style={{ ...styles.input(!!errors.password), paddingRight: "44px" }}
                />
                <button type="button" style={styles.showPwBtn} onClick={() => setShowPass((p) => !p)}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
              {form.password && (
                <>
                  <div style={{ height: "4px", background: "#e2e8f0", borderRadius: "2px", marginTop: "6px" }}>
                    <div style={styles.strengthBar(pwStrength)} />
                  </div>
                  <p style={{ fontSize: "11px", color: pwStrength < 2 ? "#ef4444" : pwStrength < 4 ? "#d97706" : "#16a34a", marginTop: "4px" }}>
                    Strength: {pwStrength < 2 ? "Weak" : pwStrength < 4 ? "Medium" : "Strong"} 💪
                  </p>
                </>
              )}
              {errors.password && <p style={styles.errorMsg}>⚠️ {errors.password}</p>}
            </div>

            {/* RADIO — Gender */}
            <div style={styles.formGroup}>
              <label style={styles.label(!!errors.gender)}>⚧️ Gender *</label>
              <div style={styles.radioRow}>
                {["Male", "Female", "Other", "Prefer not to say"].map((g) => (
                  <label key={g} style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={handleChange}
                      style={{ accentColor: "#16a34a" }}
                    />
                    {g}
                  </label>
                ))}
              </div>
              {errors.gender && <p style={styles.errorMsg}>⚠️ {errors.gender}</p>}
            </div>

            {/* SELECT — Role */}
            <div style={styles.formGroup}>
              <label htmlFor="role" style={styles.label(!!errors.role)}>
                💼 Role *
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                style={styles.select(!!errors.role)}
              >
                <option value="">-- Select your role --</option>
                <option value="Developer">👨‍💻 Developer</option>
                <option value="Designer">🎨 Designer</option>
                <option value="Manager">📊 Manager</option>
                <option value="Student">🎓 Student</option>
                <option value="Other">🌟 Other</option>
              </select>
              {errors.role && <p style={styles.errorMsg}>⚠️ {errors.role}</p>}
            </div>

            {/* CHECKBOXES */}
            <div style={styles.formGroup}>
              <label style={styles.label(!!errors.terms)}>☑️ Agreements</label>

              {/* Terms checkbox — required */}
              <div style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                <label htmlFor="terms" style={styles.checkboxLabel}>
                  I agree to the <strong>Terms & Conditions</strong> and <strong>Privacy Policy</strong> *
                </label>
              </div>
              {errors.terms && <p style={styles.errorMsg}>⚠️ {errors.terms}</p>}

              {/* Newsletter checkbox — optional */}
              <div style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={form.newsletter}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                <label htmlFor="newsletter" style={styles.checkboxLabel}>
                  Subscribe to newsletter for updates (optional)
                </label>
              </div>
            </div>

            {/* Validation summary */}
            {Object.values(errors).some(Boolean) && (
              <div style={{
                background: "#fff5f5", border: "1px solid #fca5a5",
                borderRadius: "10px", padding: "12px 16px",
                fontSize: "13px", color: "#991b1b", marginBottom: "16px",
              }}>
                ⚠️ Please fix {Object.values(errors).filter(Boolean).length} error(s) before submitting.
              </div>
            )}

            {/* Submit button — disabled visually when form invalid */}
            <button type="submit" style={styles.submitBtn(isFormValid)}>
              {isFormValid ? "✅ Create Account" : "⚠️ Fix errors to submit"}
            </button>

            <p style={{ fontSize: "11px", color: "#94a3b8", textAlign: "center", marginTop: "12px" }}>
              e.preventDefault() stops page reload · All fields validated in real-time
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default RegistrationForm;
