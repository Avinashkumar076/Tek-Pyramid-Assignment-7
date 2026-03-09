// ProductCatalog.jsx — Task 10, Part B: Event with Parameters
// Demonstrates:
//   - Passing product id to event handler via arrow function
//   - onClick={() => handleAddToCart(product.id)} ← passing parameter
//   - Updating cart count for specific product
//   - Displaying which product was added last

import { useState } from "react";

const products = [
  { id: 1, name: "Wireless Headphones", price: 1999,  emoji: "🎧", category: "Electronics", stock: 12 },
  { id: 2, name: "Mechanical Keyboard",  price: 3499,  emoji: "⌨️", category: "Electronics", stock: 5  },
  { id: 3, name: "Running Shoes",        price: 2999,  emoji: "👟", category: "Footwear",    stock: 8  },
  { id: 4, name: "Leather Wallet",       price: 599,   emoji: "👜", category: "Accessories", stock: 20 },
  { id: 5, name: "Smart Watch",          price: 8999,  emoji: "⌚", category: "Electronics", stock: 3  },
  { id: 6, name: "Yoga Mat",             price: 799,   emoji: "🧘", category: "Sports",      stock: 15 },
];

const ProductCatalog = () => {
  // cart: { [productId]: count }
  const [cart, setCart]           = useState({});
  const [lastAdded, setLastAdded] = useState(null);
  const [lastRemoved, setLastRemoved] = useState(null);

  // ── ADD TO CART ───────────────────────────────────────────────────────────
  // productId is passed as a PARAMETER via arrow function in JSX:
  //   onClick={() => handleAddToCart(product.id)}
  // This is how you pass arguments to event handlers in React
  const handleAddToCart = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
    const product = products.find((p) => p.id === productId);
    setLastAdded(product.name);
    setLastRemoved(null);
  };

  // ── REMOVE FROM CART ──────────────────────────────────────────────────────
  const handleRemoveFromCart = (productId) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[productId] > 1) {
        updated[productId]--;
      } else {
        delete updated[productId];
      }
      return updated;
    });
    const product = products.find((p) => p.id === productId);
    setLastRemoved(product.name);
    setLastAdded(null);
  };

  // ── CLEAR CART ────────────────────────────────────────────────────────────
  const handleClearCart = () => {
    setCart({});
    setLastAdded(null);
    setLastRemoved(null);
  };

  const totalItems  = Object.values(cart).reduce((s, c) => s + c, 0);
  const totalPrice  = Object.entries(cart).reduce((sum, [id, count]) => {
    const p = products.find((pr) => pr.id === Number(id));
    return sum + (p ? p.price * count : 0);
  }, 0);

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "#f1f5f9",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    // Sticky header
    header: {
      background: "linear-gradient(90deg, #0f172a, #1e293b)",
      padding: "14px clamp(16px, 4vw, 32px)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
      position: "sticky",
      top: 0,
      zIndex: 10,
    },
    headerLeft: { color: "#fff", fontSize: "clamp(16px, 3vw, 20px)", fontWeight: "900" },
    cartSummary: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flexWrap: "wrap",
    },
    cartBadge: {
      background: totalItems > 0
        ? "linear-gradient(90deg, #6366f1, #4f46e5)"
        : "rgba(255,255,255,0.1)",
      color: "#fff",
      padding: "6px 16px",
      borderRadius: "10px",
      fontSize: "13px",
      fontWeight: "700",
    },
    main: {
      padding: "clamp(16px, 4vw, 32px)",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    // Event log banner
    eventBanner: (color, bg) => ({
      background: bg,
      border: `1px solid ${color}30`,
      borderRadius: "12px",
      padding: "12px 18px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "14px",
      color,
      fontWeight: "600",
    }),
    // Products grid
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: "16px",
    },
    card: (inCart) => ({
      background: "#fff",
      borderRadius: "18px",
      padding: "18px",
      boxShadow: inCart
        ? "0 8px 24px rgba(99,102,241,0.15)"
        : "0 4px 16px rgba(0,0,0,0.05)",
      border: inCart ? "2px solid #6366f1" : "1px solid #e2e8f0",
      transition: "all 0.2s",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }),
    emoji: { fontSize: "clamp(32px, 8vw, 42px)" },
    categoryTag: {
      display: "inline-block",
      background: "#f1f5f9",
      color: "#475569",
      fontSize: "10px",
      fontWeight: "700",
      padding: "2px 10px",
      borderRadius: "20px",
      textTransform: "uppercase",
    },
    productName: {
      fontSize: "clamp(13px, 2.5vw, 15px)",
      fontWeight: "800",
      color: "#0f172a",
    },
    priceRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    price: { fontSize: "clamp(15px, 3vw, 18px)", fontWeight: "900", color: "#0f172a" },
    stockBadge: (stock) => ({
      fontSize: "11px",
      fontWeight: "700",
      color: stock < 5 ? "#dc2626" : "#16a34a",
      background: stock < 5 ? "#fee2e2" : "#dcfce7",
      padding: "2px 8px",
      borderRadius: "20px",
    }),
    // Cart count control
    cartControl: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    qtyBtn: (color) => ({
      width: "30px",
      height: "30px",
      borderRadius: "8px",
      border: "none",
      background: color,
      color: "#fff",
      fontSize: "16px",
      fontWeight: "900",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    qtyDisplay: {
      width: "32px",
      textAlign: "center",
      fontWeight: "900",
      fontSize: "16px",
      color: "#6366f1",
    },
    addBtn: {
      flex: 1,
      padding: "10px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(90deg, #6366f1, #4f46e5)",
      color: "#fff",
      fontSize: "13px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(99,102,241,0.25)",
    },
    codeNote: {
      fontSize: "10px",
      color: "#94a3b8",
      fontFamily: "monospace",
      marginTop: "4px",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <span style={styles.headerLeft}>🛍️ Product Catalog</span>
        <div style={styles.cartSummary}>
          {totalItems > 0 && (
            <button
              style={{ ...styles.cartBadge, background: "rgba(239,68,68,0.2)", cursor: "pointer", border: "none", fontFamily: "'Segoe UI', sans-serif" }}
              onClick={handleClearCart}
            >
              🗑️ Clear
            </button>
          )}
          <div style={styles.cartBadge}>
            🛒 {totalItems} items · ₹{totalPrice.toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      <div style={styles.main}>
        {/* Event log */}
        {lastAdded && (
          <div style={styles.eventBanner("#166534", "#dcfce7")}>
            ✅ onClick fired with productId → Added: <strong>"{lastAdded}"</strong> to cart
          </div>
        )}
        {lastRemoved && (
          <div style={styles.eventBanner("#991b1b", "#fee2e2")}>
            🗑️ onClick fired with productId → Removed: <strong>"{lastRemoved}"</strong> from cart
          </div>
        )}

        <div style={styles.grid}>
          {products.map((product) => {
            const cartQty = cart[product.id] || 0;

            return (
              <div key={product.id} style={styles.card(cartQty > 0)}>
                <div style={styles.emoji}>{product.emoji}</div>
                <span style={styles.categoryTag}>{product.category}</span>
                <p style={styles.productName}>{product.name}</p>

                <div style={styles.priceRow}>
                  <span style={styles.price}>₹{product.price.toLocaleString("en-IN")}</span>
                  <span style={styles.stockBadge(product.stock)}>
                    {product.stock < 5 ? `⚠️ Only ${product.stock} left` : `✅ ${product.stock} in stock`}
                  </span>
                </div>

                {/* Cart controls */}
                {cartQty > 0 ? (
                  <div style={styles.cartControl}>
                    {/* ← Passing productId as parameter to handler via arrow fn */}
                    <button
                      style={styles.qtyBtn("#ef4444")}
                      onClick={() => handleRemoveFromCart(product.id)}
                      aria-label="Remove one"
                    >−</button>
                    <span style={styles.qtyDisplay}>{cartQty}</span>
                    <button
                      style={styles.qtyBtn("#16a34a")}
                      onClick={() => handleAddToCart(product.id)}
                      aria-label="Add one more"
                    >+</button>
                  </div>
                ) : (
                  // onClick={() => handleAddToCart(product.id)}
                  // ← Arrow function wraps handler to PASS product.id as argument
                  <button
                    style={styles.addBtn}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    🛒 Add to Cart
                  </button>
                )}

                <div style={styles.codeNote}>
                  onClick={`{() => handleAddToCart(${product.id})}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
