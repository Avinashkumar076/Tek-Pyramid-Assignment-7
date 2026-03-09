// CategoryProducts.jsx — Task 8, Part B: Nested Lists
// Demonstrates:
//   - Rendering a nested list (categories → products)
//   - Keys on BOTH the outer list (categories) AND inner list (products)
//   - Each key must be unique within its own list level

const categories = [
  {
    id: "cat-1",
    name: "Electronics",
    icon: "💻",
    color: "#6366f1",
    bg: "#ede9fe",
    products: [
      { id: "p-101", name: "Wireless Headphones", price: 1999,  rating: 4.5 },
      { id: "p-102", name: "Mechanical Keyboard",  price: 3499,  rating: 4.8 },
      { id: "p-103", name: "Smart Watch",          price: 8999,  rating: 4.3 },
      { id: "p-104", name: "USB-C Hub",            price: 1299,  rating: 4.1 },
    ],
  },
  {
    id: "cat-2",
    name: "Clothing",
    icon: "👕",
    color: "#0891b2",
    bg: "#e0f2fe",
    products: [
      { id: "p-201", name: "Denim Jacket",     price: 2999, rating: 4.6 },
      { id: "p-202", name: "Cotton Polo Tee",  price: 699,  rating: 4.2 },
      { id: "p-203", name: "Cargo Joggers",    price: 1499, rating: 4.4 },
    ],
  },
  {
    id: "cat-3",
    name: "Books",
    icon: "📚",
    color: "#d97706",
    bg: "#fef3c7",
    products: [
      { id: "p-301", name: "You Don't Know JS",       price: 599,  rating: 4.9 },
      { id: "p-302", name: "Clean Code",              price: 699,  rating: 4.8 },
      { id: "p-303", name: "The Pragmatic Programmer",price: 749,  rating: 4.7 },
    ],
  },
  {
    id: "cat-4",
    name: "Sports",
    icon: "🏋️",
    color: "#16a34a",
    bg: "#dcfce7",
    products: [
      { id: "p-401", name: "Resistance Bands Set", price: 499,  rating: 4.3 },
      { id: "p-402", name: "Yoga Mat (6mm)",       price: 799,  rating: 4.6 },
    ],
  },
];

const CategoryProducts = () => {
  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "#f8fafc",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    container: { maxWidth: "900px", margin: "0 auto" },
    partBadge: {
      display: "inline-block",
      background: "#fef3c7",
      color: "#92400e",
      fontSize: "11px",
      fontWeight: "800",
      padding: "4px 14px",
      borderRadius: "20px",
      marginBottom: "8px",
      letterSpacing: "1px",
    },
    pageTitle: { fontSize: "clamp(20px, 4vw, 26px)", fontWeight: "900", color: "#0f172a", marginBottom: "4px" },
    subtitle: { color: "#64748b", fontSize: "13px", marginBottom: "28px" },

    // Category card
    categoryCard: (color, bg) => ({
      background: "#fff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      marginBottom: "20px",
      border: `1px solid ${color}20`,
    }),
    categoryHeader: (color, bg) => ({
      background: bg,
      padding: "16px 22px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "8px",
    }),
    categoryLeft: { display: "flex", alignItems: "center", gap: "12px" },
    categoryIcon: { fontSize: "clamp(22px, 5vw, 28px)" },
    categoryName: (color) => ({
      fontSize: "clamp(15px, 3vw, 18px)",
      fontWeight: "800",
      color,
    }),
    keyBadge: (color) => ({
      fontFamily: "monospace",
      fontSize: "11px",
      fontWeight: "700",
      color,
      background: "rgba(255,255,255,0.6)",
      padding: "2px 10px",
      borderRadius: "20px",
    }),
    productCount: (color) => ({
      fontSize: "12px",
      fontWeight: "700",
      color,
      background: "rgba(255,255,255,0.6)",
      padding: "4px 12px",
      borderRadius: "20px",
    }),

    // Products grid inside category
    productsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "14px",
      padding: "18px",
    },
    productCard: (color) => ({
      background: "#f8fafc",
      borderRadius: "14px",
      padding: "14px",
      border: `1px solid ${color}15`,
      transition: "transform 0.15s",
    }),
    productName: {
      fontSize: "13px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "8px",
      lineHeight: "1.3",
    },
    productFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    productPrice: (color) => ({
      fontSize: "15px",
      fontWeight: "900",
      color,
    }),
    productRating: {
      fontSize: "11px",
      color: "#f59e0b",
      fontWeight: "700",
    },
    productKeyBadge: {
      fontFamily: "monospace",
      fontSize: "10px",
      color: "#94a3b8",
      marginTop: "8px",
    },

    // Code section
    codeBox: {
      background: "#0f172a",
      borderRadius: "14px",
      padding: "16px 20px",
      fontFamily: "monospace",
      fontSize: "clamp(10px, 2vw, 12px)",
      color: "#e2e8f0",
      lineHeight: "1.9",
      overflowX: "auto",
      marginTop: "8px",
    },
  };

  const totalProducts = categories.reduce((sum, c) => sum + c.products.length, 0);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.partBadge}>PART B — NESTED LISTS</div>
        <h2 style={styles.pageTitle}>🗂️ Category Products</h2>
        <p style={styles.subtitle}>
          {categories.length} categories · {totalProducts} products · Keys on both levels
        </p>

        {/* OUTER LIST — categories.map() with key={category.id} */}
        {categories.map((category) => (
          <div
            key={category.id}    // ✅ KEY on outer list element
            style={styles.categoryCard(category.color, category.bg)}
          >
            {/* Category Header */}
            <div style={styles.categoryHeader(category.color, category.bg)}>
              <div style={styles.categoryLeft}>
                <span style={styles.categoryIcon}>{category.icon}</span>
                <span style={styles.categoryName(category.color)}>{category.name}</span>
                <span style={styles.keyBadge(category.color)}>
                  key="{category.id}"
                </span>
              </div>
              <span style={styles.productCount(category.color)}>
                {category.products.length} items
              </span>
            </div>

            {/* INNER LIST — products.map() with key={product.id} */}
            {/* Keys in inner list only need to be unique within THEIR category */}
            <div style={styles.productsGrid}>
              {category.products.map((product) => (
                <div
                  key={product.id}   // ✅ KEY on inner list element
                  style={styles.productCard(category.color)}
                >
                  <p style={styles.productName}>{product.name}</p>
                  <div style={styles.productFooter}>
                    <span style={styles.productPrice(category.color)}>
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span style={styles.productRating}>
                      ⭐ {product.rating}
                    </span>
                  </div>
                  <div style={styles.productKeyBadge}>
                    key="{product.id}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Code explanation */}
        <div style={styles.codeBox}>
          <span style={{ color: "#94a3b8" }}>{"// Nested lists — key required at BOTH levels:"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"categories.map((category) => ("}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  <div "}</span>
          <span style={{ color: "#fbbf24" }}>key</span>
          <span style={{ color: "#e2e8f0" }}>{"={category.id}"}  </span>
          <span style={{ color: "#34d399" }}>{"// ✅ Outer key"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  >"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"    {category.products.map((product) => ("}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"      <div "}</span>
          <span style={{ color: "#fbbf24" }}>key</span>
          <span style={{ color: "#e2e8f0" }}>{"={product.id}"}  </span>
          <span style={{ color: "#34d399" }}>{"// ✅ Inner key"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"      />"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"    ))}"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  </div>"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"))"}</span>
        </div>

      </div>
    </div>
  );
};

export default CategoryProducts;
