// ShoppingCart.jsx — Task 6, Part 3
// Practical scenario demonstrating State vs Props:
//
//   PARENT (ShoppingCart):
//     - Owns cart STATE (array of items)
//     - Passes products as PROPS to ProductItem
//     - Passes addToCart callback as PROP to ProductItem
//
//   CHILD (ProductItem):
//     - Receives product data as PROPS (read-only)
//     - Receives addToCart function as PROP
//     - Calls addToCart(product) → Parent updates its STATE

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CHILD — ProductItem
// Only receives props. Knows nothing about the cart state directly.
// ─────────────────────────────────────────────────────────────────────────────
const ProductItem = ({ product, onAddToCart, cartCount }) => {
  const { id, name, price, emoji, category } = product;

  const styles = {
    card: {
      background: "#ffffff",
      borderRadius: "18px",
      padding: "clamp(16px, 3vw, 22px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      border: cartCount > 0 ? "2px solid #6366f1" : "1px solid #e2e8f0",
      transition: "all 0.2s",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      position: "relative",
    },
    cartBadge: {
      position: "absolute",
      top: "12px",
      right: "12px",
      background: "#6366f1",
      color: "#fff",
      fontSize: "11px",
      fontWeight: "800",
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    emoji: { fontSize: "clamp(32px, 8vw, 44px)" },
    categoryTag: {
      display: "inline-block",
      background: "#f1f5f9",
      color: "#475569",
      fontSize: "10px",
      fontWeight: "700",
      padding: "2px 10px",
      borderRadius: "20px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    name: {
      fontSize: "clamp(14px, 2.5vw, 16px)",
      fontWeight: "800",
      color: "#0f172a",
      margin: 0,
    },
    price: {
      fontSize: "clamp(16px, 3vw, 20px)",
      fontWeight: "900",
      color: "#6366f1",
    },
    addBtn: {
      padding: "10px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(90deg, #6366f1, #4f46e5)",
      color: "#fff",
      fontSize: "13px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
    },
    propNote: {
      fontSize: "10px",
      color: "#94a3b8",
      fontFamily: "monospace",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.card}>
      {/* Cart count badge — shows how many of this item in cart */}
      {cartCount > 0 && <div style={styles.cartBadge}>{cartCount}</div>}

      <div style={styles.emoji}>{emoji}</div>
      <span style={styles.categoryTag}>{category}</span>
      <p style={styles.name}>{name}</p>
      <div style={styles.price}>₹{price.toLocaleString("en-IN")}</div>

      {/* Child calls parent's callback prop — this triggers parent state update */}
      <button
        style={styles.addBtn}
        onClick={() => onAddToCart(product)}   // ← calling prop function
      >
        🛒 Add to Cart
      </button>

      <p style={styles.propNote}>
        ↑ Props: product, onAddToCart, cartCount
      </p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PARENT — ShoppingCart
// Manages cart STATE. Products are defined here and passed as props.
// ─────────────────────────────────────────────────────────────────────────────
const ShoppingCart = () => {

  // Products data — defined in parent, passed as props to children
  const products = [
    { id: 1, name: "Wireless Headphones", price: 1999,  emoji: "🎧", category: "Electronics" },
    { id: 2, name: "Running Shoes",       price: 3499,  emoji: "👟", category: "Footwear"    },
    { id: 3, name: "Leather Wallet",      price: 599,   emoji: "👜", category: "Accessories" },
    { id: 4, name: "Smart Watch",         price: 8999,  emoji: "⌚", category: "Electronics" },
    { id: 5, name: "Sunglasses",          price: 1299,  emoji: "🕶️", category: "Accessories" },
    { id: 6, name: "Water Bottle",        price: 449,   emoji: "🍶", category: "Lifestyle"   },
  ];

  // ── CART STATE — lives in the parent ─────────────────────────────────────
  // cart is an array of { ...product, quantity }
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ── ADD TO CART ───────────────────────────────────────────────────────────
  // This function is passed DOWN as a prop to each ProductItem child
  // When child calls onAddToCart(product) → this runs → parent state updates
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Already in cart → increment quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // New item → add with quantity 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ── REMOVE FROM CART ──────────────────────────────────────────────────────
  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ── CLEAR CART ────────────────────────────────────────────────────────────
  const handleClearCart = () => setCart([]);

  // ── DERIVED VALUES ────────────────────────────────────────────────────────
  const totalItems    = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice    = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const getCartCount  = (id) => cart.find((i) => i.id === id)?.quantity || 0;

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "#f1f5f9",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    // Top navbar
    navbar: {
      background: "linear-gradient(90deg, #0f172a, #1e293b)",
      padding: "14px clamp(16px, 4vw, 32px)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
    },
    navTitle: {
      color: "#fff",
      fontSize: "clamp(16px, 3vw, 20px)",
      fontWeight: "900",
    },
    cartBtn: {
      background: totalItems > 0
        ? "linear-gradient(90deg, #6366f1, #4f46e5)"
        : "rgba(255,255,255,0.1)",
      border: "none",
      color: "#fff",
      padding: "9px 18px",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "700",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.2s",
    },
    cartBadge: {
      background: "#ef4444",
      color: "#fff",
      fontSize: "11px",
      fontWeight: "900",
      padding: "1px 7px",
      borderRadius: "20px",
    },
    main: {
      padding: "clamp(16px, 4vw, 32px)",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    sectionTitle: {
      fontSize: "clamp(16px, 3vw, 20px)",
      fontWeight: "800",
      color: "#0f172a",
      marginBottom: "6px",
    },
    stateNote: {
      fontSize: "12px",
      color: "#64748b",
      marginBottom: "20px",
      fontFamily: "monospace",
    },
    // Products grid — responsive
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      gap: "16px",
      marginBottom: "28px",
    },

    // ── Cart Panel ──
    cartPanel: {
      background: "#fff",
      borderRadius: "20px",
      padding: "clamp(16px, 4vw, 24px)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
      display: isCartOpen ? "block" : "none",
      marginBottom: "20px",
    },
    cartHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
      flexWrap: "wrap",
      gap: "8px",
    },
    cartTitle: {
      fontSize: "16px",
      fontWeight: "800",
      color: "#0f172a",
    },
    cartItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0",
      borderBottom: "1px solid #f1f5f9",
      gap: "8px",
      flexWrap: "wrap",
    },
    cartItemName: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#1e293b",
      flex: 1,
    },
    cartItemQty: {
      fontSize: "12px",
      color: "#6366f1",
      fontWeight: "700",
      padding: "2px 10px",
      background: "#ede9fe",
      borderRadius: "20px",
    },
    cartItemPrice: {
      fontSize: "14px",
      fontWeight: "800",
      color: "#0f172a",
      minWidth: "70px",
      textAlign: "right",
    },
    removeBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      color: "#fca5a5",
    },
    cartFooter: {
      marginTop: "16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
    },
    totalText: {
      fontSize: "18px",
      fontWeight: "900",
      color: "#0f172a",
    },
    clearBtn: {
      padding: "9px 18px",
      borderRadius: "10px",
      border: "2px solid #fecaca",
      background: "transparent",
      color: "#ef4444",
      fontSize: "13px",
      fontWeight: "700",
      cursor: "pointer",
    },
    emptyCart: {
      textAlign: "center",
      padding: "30px",
      color: "#94a3b8",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.wrapper}>

      {/* ── NAVBAR ── */}
      <nav style={styles.navbar}>
        <span style={styles.navTitle}>🛍️ ShopState</span>
        <button style={styles.cartBtn} onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒 Cart
          {totalItems > 0 && <span style={styles.cartBadge}>{totalItems}</span>}
        </button>
      </nav>

      <div style={styles.main}>
        <h2 style={styles.sectionTitle}>🛒 Shopping Cart — State vs Props Demo</h2>
        <p style={styles.stateNote}>
          Parent STATE: cart[{cart.length} items] · totalPrice: ₹{totalPrice.toLocaleString("en-IN")} · isCartOpen: {String(isCartOpen)}
        </p>

        {/* ── CART PANEL ── */}
        <div style={styles.cartPanel}>
          <div style={styles.cartHeader}>
            <span style={styles.cartTitle}>🛒 Your Cart ({totalItems} items)</span>
            <button style={styles.clearBtn} onClick={handleClearCart}>
              🗑️ Clear All
            </button>
          </div>

          {cart.length === 0 ? (
            <div style={styles.emptyCart}>Cart is empty. Add some products!</div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <span style={{ fontSize: "20px" }}>{item.emoji}</span>
                  <span style={styles.cartItemName}>{item.name}</span>
                  <span style={styles.cartItemQty}>×{item.quantity}</span>
                  <span style={styles.cartItemPrice}>
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                  <button style={styles.removeBtn} onClick={() => handleRemove(item.id)}>✕</button>
                </div>
              ))}
              <div style={styles.cartFooter}>
                <span style={styles.totalText}>
                  Total: ₹{totalPrice.toLocaleString("en-IN")}
                </span>
                <button
                  style={{ ...styles.clearBtn, borderColor: "#bbf7d0", color: "#16a34a" }}
                  onClick={() => alert(`✅ Order placed! Total: ₹${totalPrice.toLocaleString("en-IN")}`)}
                >
                  ✅ Checkout
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── PRODUCTS GRID ── */}
        {/* Parent passes product data as PROPS + addToCart callback as PROP */}
        <div style={styles.grid}>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}                         // product data → PROP
              onAddToCart={handleAddToCart}             // callback → PROP
              cartCount={getCartCount(product.id)}      // derived from STATE → PROP
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ShoppingCart;
