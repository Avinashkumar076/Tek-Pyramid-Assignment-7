// src/components/ecommerce/ECommerceApp.jsx
// Root component for Task 11 — all state lives here
// Imported into main App.jsx as a tab (no naming conflicts with other tasks)
//
// State:
//   cart           → { [productId]: quantity }
//   searchQuery    → string
//   activeCategory → string
//   sortBy         → string
//   isCartOpen     → boolean
//   isLoggedIn     → boolean
//
// All React concepts demonstrated:
//   Component hierarchy, props, state, conditional rendering,
//   lists & keys, fragments, event handling, PropTypes, responsive design

import { useState, useMemo } from "react";
import products    from "./products";
import Header      from "./Header";
import FilterBar   from "./FilterBar";
import ProductList from "./ProductList";
import Cart        from "./Cart";
import Footer      from "./Footer";

const CATEGORIES = ["All", ...new Set(products.map((p) => p.category))];

const ECommerceApp = () => {
  // ── STATE ─────────────────────────────────────────────────────────────────
  const [cart,           setCart]           = useState({});
  const [searchQuery,    setSearchQuery]    = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy,         setSortBy]         = useState("default");
  const [isCartOpen,     setIsCartOpen]     = useState(false);
  const [isLoggedIn,     setIsLoggedIn]     = useState(false);

  // ── FILTERED + SORTED PRODUCTS ────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // 2. Category filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 3. Sort
    switch (sortBy) {
      case "price-asc":  result.sort((a, b) => a.price - b.price);                break;
      case "price-desc": result.sort((a, b) => b.price - a.price);                break;
      case "rating":     result.sort((a, b) => b.rating - a.rating);              break;
      case "name":       result.sort((a, b) => a.name.localeCompare(b.name));     break;
      default:           break;
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  // ── DERIVED VALUES ────────────────────────────────────────────────────────
  const cartCount  = Object.values(cart).reduce((s, q) => s + q, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((pr) => pr.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);

  // ── CART HANDLERS ─────────────────────────────────────────────────────────
  const handleAddToCart = (productId) => {
    if (!isLoggedIn) return;
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[productId] <= 1) {
        delete updated[productId];
      } else {
        updated[productId]--;
      }
      return updated;
    });
  };

  const handleClearCart = () => setCart({});

  // ── FILTER RESET ──────────────────────────────────────────────────────────
  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setSortBy("default");
  };

  // ── AUTH TOGGLE ───────────────────────────────────────────────────────────
  const handleAuthToggle = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setCart({});
      setIsCartOpen(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  // ── DERIVED STATS ─────────────────────────────────────────────────────────
  const inStockCount = products.filter((p) => p.stock > 0).length;
  const avgRating    = (products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1);
  const totalSavings = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((pr) => pr.id === Number(id));
    return sum + (p ? (p.originalPrice - p.price) * qty : 0);
  }, 0);

  const stats = [
    { label: "Products",   value: products.length,                                          color: "primary" },
    { label: "In Stock",   value: inStockCount,                                              color: "success" },
    { label: "Avg Rating", value: avgRating,                                                 color: "warning" },
    { label: "Cart Items", value: cartCount,                                                 color: "info"    },
    { label: "You Save",   value: `Rs.${totalSavings.toLocaleString("en-IN")}`,              color: "danger"  },
  ];

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">

      {/* HEADER — sticky, handles search + auth + cart */}
      <Header
        cartCount={cartCount}
        totalPrice={totalPrice}
        onCartToggle={() => setIsCartOpen((p) => !p)}
        isCartOpen={isCartOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isLoggedIn={isLoggedIn}
        onAuthToggle={handleAuthToggle}
      />

      {/* FILTER BAR — sticky below header */}
      <FilterBar
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        productCount={filteredProducts.length}
      />

      {/* MAIN CONTENT */}
      <main className="flex-grow-1">
        <div className="container-fluid px-3 px-md-4 py-4">

          {/* Welcome banner — conditional: NOT logged in */}
          {!isLoggedIn && (
            <div
              className="rounded-4 p-4 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3"
              style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 8px 32px rgba(99,102,241,0.3)" }}
            >
              <div className="text-white">
                <div className="fw-black fs-5 mb-1">Welcome to ShopReact!</div>
                <div style={{ fontSize: 14, color: "#c7d2fe" }}>
                  Login to add products to your cart and checkout.
                </div>
              </div>
              <button
                className="btn btn-light fw-bold px-4"
                onClick={handleAuthToggle}
              >
                Login to Shop
              </button>
            </div>
          )}

          {/* Stats bar — conditional: logged in only */}
          {isLoggedIn && (
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3 mb-4">
              {stats.map(({ label, value, color }) => (
                <div className="col" key={label}>
                  <div className={`card border-${color} border-opacity-25 shadow-sm h-100`}>
                    <div className="card-body p-3">
                      <div className={`fw-black fs-5 text-${color}`}>{value}</div>
                      <div className="text-muted fw-semibold text-uppercase" style={{ fontSize: 10, letterSpacing: 1 }}>
                        {label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PRODUCT LIST */}
          <ProductList
            products={filteredProducts}
            cart={cart}
            onAdd={handleAddToCart}
            onRemove={handleRemoveFromCart}
            isLoggedIn={isLoggedIn}
            onClearFilters={handleClearFilters}
          />
        </div>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* CART PANEL — conditional: only when isCartOpen */}
      {isCartOpen && (
        <Cart
          cart={cart}
          products={products}
          onAdd={handleAddToCart}
          onRemove={handleRemoveFromCart}
          onClear={handleClearCart}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
};

export default ECommerceApp;
