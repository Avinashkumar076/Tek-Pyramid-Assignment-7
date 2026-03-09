// src/components/ecommerce/CartItem.jsx
// Single item row inside the cart panel

import PropTypes from "prop-types";

const CartItem = ({ product, quantity, onAdd, onRemove }) => {
  const lineTotal = product.price * quantity;

  return (
    <div className="d-flex align-items-center gap-2 py-3 border-bottom">
      {/* Emoji thumbnail */}
      <div
        className="bg-light rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
        style={{ width: 44, height: 44, fontSize: 24 }}
      >
        {product.emoji}
      </div>

      {/* Info */}
      <div className="flex-grow-1 overflow-hidden">
        <div className="fw-bold text-dark text-truncate" style={{ fontSize: 13 }}>
          {product.name}
        </div>
        <div className="text-muted" style={{ fontSize: 11 }}>
          Rs.{product.price.toLocaleString("en-IN")} each
        </div>
      </div>

      {/* Qty controls */}
      <div className="d-flex align-items-center gap-1 flex-shrink-0">
        <button
          className="btn btn-danger btn-sm fw-bold"
          style={{ width: 26, height: 26, padding: 0, fontSize: 14, lineHeight: 1 }}
          onClick={() => onRemove(product.id)}
          aria-label="Remove one"
        >
          -
        </button>
        <span className="fw-black text-primary" style={{ minWidth: 20, textAlign: "center", fontSize: 14 }}>
          {quantity}
        </span>
        <button
          className="btn btn-success btn-sm fw-bold"
          style={{ width: 26, height: 26, padding: 0, fontSize: 14, lineHeight: 1 }}
          onClick={() => onAdd(product.id)}
          aria-label="Add one more"
        >
          +
        </button>
      </div>

      {/* Line total */}
      <div className="fw-black text-dark flex-shrink-0 text-end" style={{ minWidth: 72, fontSize: 13 }}>
        Rs.{lineTotal.toLocaleString("en-IN")}
      </div>
    </div>
  );
};

CartItem.propTypes = {
  product:  PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  onAdd:    PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
