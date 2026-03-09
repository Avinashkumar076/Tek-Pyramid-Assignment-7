// src/components/ecommerce/Header.jsx
// Bootstrap-based responsive navbar
// - Row 1: Brand + Auth button + Cart button (always visible)
// - Row 2: Search bar (full width on all screens)
// No overlapping on mobile

import PropTypes from "prop-types";

const Header = ({
  cartCount,
  totalPrice,
  onCartToggle,
  isCartOpen,
  searchQuery,
  onSearchChange,
  isLoggedIn,
  onAuthToggle,
}) => {
  return (
    <header className="bg-dark sticky-top shadow" style={{ zIndex: 100 }}>
      {/* Top row: Brand + Auth + Cart */}
      <div className="container-fluid px-3 px-md-4">
        <div className="d-flex align-items-center justify-content-between py-2 gap-2">

          {/* Brand */}
          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            <div
              className="rounded-3 d-flex align-items-center justify-content-center"
              style={{
                width: 38,
                height: 38,
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                fontSize: 18,
              }}
            >
              🛍️
            </div>
            <span className="fw-black text-white fs-5" style={{ letterSpacing: "-0.5px" }}>
              Shop<span style={{ color: "#818cf8" }}>React</span>
            </span>
          </div>

          {/* Auth + Cart buttons */}
          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            {/* Auth button */}
            <button
              className={`btn btn-sm fw-bold ${isLoggedIn ? "btn-outline-success" : "btn-outline-secondary"}`}
              onClick={onAuthToggle}
              style={{ fontSize: 12, whiteSpace: "nowrap" }}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>

            {/* Cart button */}
            <button
              className={`btn btn-sm fw-bold position-relative ${isCartOpen ? "btn-primary" : "btn-outline-light"}`}
              onClick={onCartToggle}
              style={{ fontSize: 12, whiteSpace: "nowrap" }}
            >
              Cart
              {/* Badge — && operator, renders only when cartCount > 0 */}
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: 9 }}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
              {cartCount > 0 && (
                <span className="ms-1 text-warning fw-bold" style={{ fontSize: 11 }}>
                  Rs.{totalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar — full width row below brand row */}
        <div className="pb-2">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-secondary border-0 text-white">
              🔍
            </span>
            <input
              type="text"
              className="form-control border-0 bg-secondary text-white"
              placeholder="Search products by name, category..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{ outline: "none", boxShadow: "none" }}
              aria-label="Search products"
            />
            {/* Clear search button — conditional */}
            {searchQuery && (
              <button
                className="btn btn-secondary border-0"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
              >
                x
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  cartCount:      PropTypes.number.isRequired,
  totalPrice:     PropTypes.number.isRequired,
  onCartToggle:   PropTypes.func.isRequired,
  isCartOpen:     PropTypes.bool.isRequired,
  searchQuery:    PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  isLoggedIn:     PropTypes.bool.isRequired,
  onAuthToggle:   PropTypes.func.isRequired,
};

export default Header;
