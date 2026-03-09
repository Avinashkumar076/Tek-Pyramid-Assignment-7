// ProductCard.jsx
// Displays individual product details
// Receives product data via props from ProductList

const ProductCard = ({ name, price, category, image, rating, inStock }) => {
  return (
    <div style={styles.card}>
      {/* Product Image */}
      <div style={styles.imageWrapper}>
        <img src={image} alt={name} style={styles.image} />
        {/* Conditional badge for stock status */}
        <span style={inStock ? styles.badgeIn : styles.badgeOut}>
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Product Details */}
      <div style={styles.details}>
        <span style={styles.category}>{category}</span>
        <h3 style={styles.name}>{name}</h3>

        {/* Star Rating using JS expression */}
        <div style={styles.rating}>
          {"⭐".repeat(Math.round(rating))}
          <span style={styles.ratingNumber}> ({rating})</span>
        </div>

        {/* Price */}
        <div style={styles.footer}>
          <span style={styles.price}>₹{price.toLocaleString("en-IN")}</span>
          <button style={inStock ? styles.btnActive : styles.btnDisabled} disabled={!inStock}>
            {inStock ? "Add to Cart 🛒" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
    width: "280px",
    flexShrink: 0,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  badgeIn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#16a34a",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "bold",
    padding: "4px 10px",
    borderRadius: "20px",
  },
  badgeOut: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#dc2626",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "bold",
    padding: "4px 10px",
    borderRadius: "20px",
  },
  details: {
    padding: "16px",
  },
  category: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#2563eb",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  name: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "6px 0",
  },
  rating: {
    fontSize: "14px",
    marginBottom: "12px",
  },
  ratingNumber: {
    color: "#64748b",
    fontSize: "13px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#1e293b",
  },
  btnActive: {
    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 14px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
  btnDisabled: {
    background: "#e2e8f0",
    color: "#94a3b8",
    border: "none",
    borderRadius: "8px",
    padding: "8px 14px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "not-allowed",
  },
};

export default ProductCard;
