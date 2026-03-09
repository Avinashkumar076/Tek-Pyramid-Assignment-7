// src/components/ecommerce/Cart.jsx
// Bootstrap-styled slide-in cart panel with backdrop overlay
// Tax calculation, savings, clear cart, checkout

import PropTypes from "prop-types";
import CartItem   from "./CartItem";
import EmptyState from "./EmptyState";

const TAX_RATE = 0.18; // 18% GST

const Cart = ({ cart, products, onAdd, onRemove, onClear, onClose }) => {
  // Build cart items from cart state + products array
  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({
      product:  products.find((p) => p.id === Number(id)),
      quantity: qty,
    }))
    .filter((item) => item.product);

  const totalItems   = cartItems.reduce((s, i) => s + i.quantity, 0);
  const subtotal     = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const taxAmount    = Math.round(subtotal * TAX_RATE);
  const totalWithTax = subtotal + taxAmount;
  const savings      = cartItems.reduce(
    (s, i) => s + (i.product.originalPrice - i.product.price) * i.quantity,
    0
  );

  return (
    // Fragment — overlay + panel without extra wrapper
    <>
      {/* Backdrop overlay */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{ zIndex: 200 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Cart panel */}
      <aside
        className="position-fixed top-0 end-0 h-100 bg-white shadow-lg d-flex flex-column"
        style={{ width: "min(440px, 92vw)", zIndex: 201 }}
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Panel header */}
        <div className="bg-dark d-flex align-items-center justify-content-between px-3 py-3">
          <div className="d-flex align-items-center gap-2">
            <span className="text-white fw-black fs-6">Your Cart</span>
            {/* && — badge only when items exist */}
            {totalItems > 0 && (
              <span className="badge bg-primary">{totalItems} items</span>
            )}
          </div>
          <button
            className="btn btn-sm btn-outline-light"
            onClick={onClose}
            aria-label="Close cart"
          >
            X
          </button>
        </div>

        {/* Scrollable items area */}
        <div className="flex-grow-1 overflow-auto px-3">
          {cartItems.length === 0 ? (
            <EmptyState
              emoji="🛒"
              title="Your cart is empty"
              subtitle="Add some products to your cart to see them here!"
            />
          ) : (
            <>
              {/* .map() with product.id as key */}
              {cartItems.map(({ product, quantity }) => (
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={quantity}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              ))}
            </>
          )}
        </div>

        {/* Summary — only shown when cart has items */}
        {cartItems.length > 0 && (
          <div className="border-top bg-light px-3 py-3">
            {/* Subtotal */}
            <div className="d-flex justify-content-between mb-1">
              <span className="text-muted fw-semibold" style={{ fontSize: 13 }}>
                Subtotal ({totalItems} items)
              </span>
              <span className="fw-semibold" style={{ fontSize: 13 }}>
                Rs.{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Savings — conditional && */}
            {savings > 0 && (
              <div className="d-flex justify-content-between mb-1">
                <span className="text-success fw-bold" style={{ fontSize: 13 }}>
                  You save
                </span>
                <span className="text-success fw-bold" style={{ fontSize: 13 }}>
                  - Rs.{savings.toLocaleString("en-IN")}
                </span>
              </div>
            )}

            {/* GST */}
            <div className="d-flex justify-content-between mb-1">
              <span className="text-muted fw-semibold" style={{ fontSize: 13 }}>
                GST (18%)
              </span>
              <span className="fw-semibold" style={{ fontSize: 13 }}>
                Rs.{taxAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <p className="text-muted mb-2" style={{ fontSize: 11 }}>
              * Prices inclusive of applicable taxes
            </p>

            {/* Total */}
            <div className="d-flex justify-content-between pt-2 border-top mb-3">
              <span className="fw-black text-dark">Total (incl. GST)</span>
              <span className="fw-black text-dark fs-6">
                Rs.{totalWithTax.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Checkout button */}
            <button
              className="btn btn-primary w-100 fw-bold mb-2"
              onClick={() =>
                alert(
                  `Order placed! Total: Rs.${totalWithTax.toLocaleString("en-IN")}\n\nThank you for shopping with ShopReact!`
                )
              }
            >
              Checkout — Rs.{totalWithTax.toLocaleString("en-IN")}
            </button>

            {/* Clear cart — bonus requirement */}
            <button
              className="btn btn-outline-danger w-100 btn-sm fw-bold"
              onClick={onClear}
            >
              Clear Entire Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

Cart.propTypes = {
  cart:     PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  onAdd:    PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onClear:  PropTypes.func.isRequired,
  onClose:  PropTypes.func.isRequired,
};

export default Cart;
