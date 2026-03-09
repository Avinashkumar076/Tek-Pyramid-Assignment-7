// Button.jsx
// Reusable Button component
// Demonstrates: children prop, onClick handler prop, variant prop, disabled prop

import PropTypes from "prop-types";

const Button = ({
  children,    // children prop — whatever is placed between <Button>...</Button>
  onClick,     // onClick handler passed as prop from parent
  variant,     // controls visual style: "primary" | "secondary" | "danger"
  disabled,    // boolean — disables the button when true
}) => {

  // Base styles shared across all variants
  const baseStyle = {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    fontSize: "13px",
    fontWeight: "700",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "opacity 0.2s, transform 0.1s",
    width: "100%",
    textAlign: "center",
    letterSpacing: "0.3px",
  };

  // Variant-specific styles — selected based on variant prop value
  const variantStyles = {
    primary: {
      background: "linear-gradient(90deg, #6366f1, #4f46e5)",
      color: "#ffffff",
      boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
    },
    secondary: {
      background: "#f1f5f9",
      color: "#334155",
      border: "1px solid #e2e8f0",
    },
    danger: {
      background: "linear-gradient(90deg, #ef4444, #dc2626)",
      color: "#ffffff",
      boxShadow: "0 4px 14px rgba(239,68,68,0.35)",
    },
  };

  // Merge base + variant styles
  const finalStyle = {
    ...baseStyle,
    ...(variantStyles[variant] || variantStyles.secondary), // fallback to secondary
  };

  return (
    <button
      style={finalStyle}
      onClick={onClick}       // onClick function passed as prop
      disabled={disabled}     // boolean prop — disables button natively
      // aria attributes for accessibility
      aria-disabled={disabled}
      type="button"
    >
      {/* children prop — renders whatever is placed between <Button> tags */}
      {children}
    </button>
  );
};

// ─── PropTypes ──────────────────────────────────────────────────────────────
Button.propTypes = {
  children: PropTypes.node.isRequired,    // required — any renderable content
  onClick:  PropTypes.func,               // optional — click handler function
  variant:  PropTypes.oneOf(["primary", "secondary", "danger"]), // one of 3 values
  disabled: PropTypes.bool,               // optional boolean
};

// ─── Default Props ──────────────────────────────────────────────────────────
Button.defaultProps = {
  variant:  "secondary",    // defaults to secondary style
  disabled: false,          // not disabled by default
  onClick:  () => {},       // no-op function to avoid undefined errors
};

export default Button;
