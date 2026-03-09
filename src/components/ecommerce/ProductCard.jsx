// src/components/ecommerce/ProductCard.jsx
// Bootstrap card for a single product
// Props: product, cartQty, onAdd, onRemove, isLoggedIn

import PropTypes from "prop-types";

// Star rating helper
const StarRating = ({ rating }) => {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="text-warning" style={{ fontSize: 13 }} aria-label={`Rating ${rating} out of 5`}>
      {"★".repeat(full)}{half ? "⯨" : ""}{"☆".repeat(empty)}
    </span>
  );
};

const ProductCard = ({ product, cartQty, onAdd, onRemove, isLoggedIn }) => {
  const inCart     = cartQty > 0;
  const outOfStock = product.stock === 0;
  const lowStock   = product.stock > 0 && product.stock <= 5;
  const discount   = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      className={`card h-100 shadow-sm ${inCart ? "border-primary border-2" : "border"}`}
      style={{
        borderRadius: 16,
        opacity: outOfStock ? 0.8 : 1,
        transition: "box-shadow 0.2s, border 0.2s",
      }}
    >
      {/* Product image area */}
      <div
        className={`card-img-top d-flex align-items-center justify-content-center position-relative ${
          inCart ? "bg-primary bg-opacity-10" : "bg-light"
        }`}
        style={{ height: 140, borderRadius: "16px 16px 0 0" }}
      >
        <span style={{ fontSize: 58, filter: outOfStock ? "grayscale(1)" : "none" }}>
          {product.emoji}
        </span>

        {/* Product badge — conditional && */}
        {product.badge && (
          <span
            className="position-absolute top-0 start-0 m-2 badge"
            style={{ background: "#f59e0b", fontSize: 10 }}
          >
            {product.badge}
          </span>
        )}

        {/* Discount badge — conditional && */}
        {discount > 0 && (
          <span className="position-absolute top-0 end-0 m-2 badge bg-danger" style={{ fontSize: 10 }}>
            {discount}% OFF
          </span>
        )}

        {/* Cart qty pill — conditional && */}
        {inCart && (
          <span className="position-absolute bottom-0 end-0 m-2 badge bg-primary">
            x{cartQty} in cart
          </span>
        )}
      </div>

      <div className="card-body d-flex flex-column gap-2 p-3">
        {/* Category */}
        <span className="badge bg-primary bg-opacity-10 text-primary fw-bold" style={{ fontSize: 10, alignSelf: "flex-start" }}>
          {product.category}
        </span>

        {/* Name */}
        <h6 className="card-title fw-black mb-0" style={{ fontSize: 14, lineHeight: 1.3 }}>
          {product.name}
        </h6>

        {/* Description */}
        <p className="text-muted mb-0" style={{ fontSize: 12, lineHeight: 1.5 }}>
          {product.description}
        </p>

        {/* Rating row */}
        <div className="d-flex align-items-center gap-1">
          <StarRating rating={product.rating} />
          <span className="fw-bold text-dark" style={{ fontSize: 12 }}>{product.rating}</span>
          <span className="text-muted" style={{ fontSize: 11 }}>
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price row */}
        <div className="d-flex align-items-baseline gap-2">
          <span className="fw-black text-dark fs-5">
            Rs.{product.price.toLocaleString("en-IN")}
          </span>
          <span className="text-decoration-line-through text-muted" style={{ fontSize: 12 }}>
            Rs.{product.originalPrice.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Stock badge */}
        <div>
          {outOfStock ? (
            <span className="badge bg-danger-subtle text-danger fw-bold" style={{ fontSize: 11 }}>
              Out of Stock
            </span>
          ) : lowStock ? (
            <span className="badge bg-warning-subtle text-warning fw-bold" style={{ fontSize: 11 }}>
              Only {product.stock} left!
            </span>
          ) : (
            <span className="badge bg-success-subtle text-success fw-bold" style={{ fontSize: 11 }}>
              In Stock
            </span>
          )}
        </div>

        {/* Cart controls — pushed to bottom */}
        <div className="mt-auto pt-2">
          {/* Conditional: logged in vs not logged in */}
          {isLoggedIn ? (
            <>
              {/* Ternary: in cart → qty control, else → add button */}
              {inCart ? (
                <div className="d-flex align-items-center gap-2 bg-primary bg-opacity-10 rounded-3 p-2">
                  <button
                    className="btn btn-danger btn-sm fw-bold"
                    style={{ width: 30, height: 30, padding: 0, lineHeight: 1 }}
                    onClick={() => onRemove(product.id)}
                    aria-label="Remove one"
                  >
                    -
                  </button>
                  <span className="fw-black text-primary flex-grow-1 text-center fs-6">
                    {cartQty}
                  </span>
                  <button
                    className="btn btn-success btn-sm fw-bold"
                    style={{ width: 30, height: 30, padding: 0, lineHeight: 1 }}
                    onClick={() => onAdd(product.id)}
                    disabled={outOfStock}
                    aria-label="Add one more"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-primary btn-sm w-100 fw-bold"
                  onClick={() => onAdd(product.id)}
                  disabled={outOfStock}
                  aria-label={`Add ${product.name} to cart`}
                >
                  {outOfStock ? "Out of Stock" : "Add to Cart"}
                </button>
              )}
            </>
          ) : (
            <p className="text-muted text-center mb-0" style={{ fontSize: 12 }}>
              Login to add to cart
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id:            PropTypes.number.isRequired,
    name:          PropTypes.string.isRequired,
    price:         PropTypes.number.isRequired,
    originalPrice: PropTypes.number.isRequired,
    rating:        PropTypes.number.isRequired,
    reviews:       PropTypes.number.isRequired,
    category:      PropTypes.string.isRequired,
    emoji:         PropTypes.string.isRequired,
    description:   PropTypes.string.isRequired,
    stock:         PropTypes.number.isRequired,
    badge:         PropTypes.string,
  }).isRequired,
  cartQty:    PropTypes.number.isRequired,
  onAdd:      PropTypes.func.isRequired,
  onRemove:   PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

ProductCard.defaultProps = {
  cartQty: 0,
};

export default ProductCard;
