// src/components/ecommerce/EmptyState.jsx
// Reusable empty state — used for no products + empty cart

import PropTypes from "prop-types";

const EmptyState = ({ emoji, title, subtitle, actionLabel, onAction }) => (
  <div className="text-center py-5">
    <div style={{ fontSize: 64 }} className="mb-3">{emoji}</div>
    <h4 className="fw-black text-dark mb-2">{title}</h4>
    <p className="text-muted mb-4 mx-auto" style={{ maxWidth: 320, fontSize: 14 }}>
      {subtitle}
    </p>
    {/* Conditional — action button only when actionLabel provided */}
    {actionLabel && onAction && (
      <button className="btn btn-primary fw-bold px-4" onClick={onAction}>
        {actionLabel}
      </button>
    )}
  </div>
);

EmptyState.propTypes = {
  emoji:       PropTypes.string.isRequired,
  title:       PropTypes.string.isRequired,
  subtitle:    PropTypes.string.isRequired,
  actionLabel: PropTypes.string,
  onAction:    PropTypes.func,
};

EmptyState.defaultProps = {
  actionLabel: null,
  onAction:    null,
};

export default EmptyState;
