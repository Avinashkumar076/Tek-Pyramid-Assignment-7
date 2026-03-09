// App.jsx
// Root component — composes Header, ProductList, and Footer
// This is the top of the component tree

// import Header from "./components/Header";
// import ProductList from "./components/ProductList";
// import Footer from "./components/Footer";

// const App = () => {
//   return (
//     // React Fragment used here — avoids adding an unnecessary div to the DOM
//     <>
//       {/* Header sits at the top — nav + branding */}
//       <Header />

//       {/* Main content — ProductList renders multiple ProductCards internally */}
//       <main>
//         <ProductList />
//       </main>

//       {/* Footer sits at the bottom — copyright + links */}
//       <Footer />
//     </>
//   );
// };

// export default App;

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// App.jsx — Task 3
// Renders UserProfile and Dashboard with a tab switcher

// import { useState } from "react";
// import UserProfile from "./components/UserProfile";
// import Dashboard from "./components/Dashboard";

// const App = () => {
//   const [activeView, setActiveView] = useState("profile");

//   const styles = {
//     nav: {
//       display: "flex",
//       justifyContent: "center",
//       gap: "12px",
//       padding: "16px",
//       background: "#1e293b",
//       flexWrap: "wrap",
//     },
//     btn: (isActive) => ({
//       padding: "8px 24px",
//       borderRadius: "8px",
//       border: "none",
//       background: isActive ? "#6366f1" : "#334155",
//       color: "#fff",
//       fontWeight: "700",
//       fontSize: "14px",
//       cursor: "pointer",
//     }),
//   };

//   return (
//     <>
//       {/* Tab Navigation */}
//       <nav style={styles.nav} aria-label="Component switcher">
//         <button
//           style={styles.btn(activeView === "profile")}
//           onClick={() => setActiveView("profile")}
//           aria-pressed={activeView === "profile"}
//         >
//           👤 UserProfile
//         </button>
//         <button
//           style={styles.btn(activeView === "dashboard")}
//           onClick={() => setActiveView("dashboard")}
//           aria-pressed={activeView === "dashboard"}
//         >
//           📊 Dashboard
//         </button>
//       </nav>

//       {/* Conditional render based on tab */}
//       {activeView === "profile" ? <UserProfile /> : <Dashboard />}
//     </>
//   );
// };

// export default App;

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// App.jsx — Task 4: Props Implementation
// Root component — renders MovieList which internally renders MovieCards + Buttons

// import MovieList from "./components/MovieList";

// const App = () => {
//   return (
//     <>
//       {/* Page Header */}
//       <header style={{
//         background: "linear-gradient(90deg, #1e1b4b, #4f46e5)",
//         padding: "clamp(16px, 3vw, 24px) clamp(20px, 5vw, 40px)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         flexWrap: "wrap",
//         gap: "10px",
//       }}>
//         <div>
//           <h1 style={{
//             color: "#fff",
//             fontSize: "clamp(18px, 3vw, 24px)",
//             fontWeight: "900",
//             margin: 0,
//           }}>
//             🎬 CineReact
//           </h1>
//           <p style={{ color: "#a5b4fc", fontSize: "13px", margin: "4px 0 0" }}>
//             Task 4 — Props Implementation
//           </p>
//         </div>
//         <div style={{
//           background: "rgba(255,255,255,0.1)",
//           color: "#c7d2fe",
//           padding: "6px 16px",
//           borderRadius: "20px",
//           fontSize: "12px",
//           fontWeight: "700",
//           border: "1px solid rgba(255,255,255,0.2)",
//         }}>
//           PropTypes ✅ · Destructuring ✅ · Default Props ✅
//         </div>
//       </header>

//       {/* Main Content */}
//       <main>
//         <MovieList />
//       </main>

//       {/* Footer */}
//       <footer style={{
//         textAlign: "center",
//         padding: "20px",
//         background: "#1e293b",
//         color: "#475569",
//         fontSize: "13px",
//       }}>
//         &copy; 2025 CineReact &bull; Built by Avinash Kumar &bull; Task 4 Complete
//       </footer>
//     </>
//   );
// };

// export default App;

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// App.jsx — Task 5: State Management
// Tab navigation to switch between all 4 state components

// import { useState } from "react";
// import Counter          from "./components/Counter";
// import UserForm         from "./components/UserForm";
// import TodoList         from "./components/TodoList";
// import WeatherDashboard from "./components/WeatherDashboard";

// const tabs = [
//   { id: "counter", label: "⚡ Counter",         desc: "Part A — Simple State"   },
//   { id: "form",    label: "📋 User Form",        desc: "Part B — Object State"   },
//   { id: "todo",    label: "✅ Todo List",         desc: "Part C — Array State"    },
//   { id: "weather", label: "🌤️ Weather",          desc: "Part D — Multiple State" },
// ];

// const App = () => {
//   const [activeTab, setActiveTab] = useState("counter");

//   const styles = {
//     nav: {
//       background: "#0f172a",
//       padding: "12px clamp(12px, 3vw, 24px)",
//       display: "flex",
//       gap: "8px",
//       flexWrap: "wrap",
//       justifyContent: "center",
//       borderBottom: "1px solid #1e293b",
//     },
//     tab: (isActive) => ({
//       padding: "8px 16px",
//       borderRadius: "10px",
//       border: isActive ? "1px solid #6366f1" : "1px solid #1e293b",
//       background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
//       color: isActive ? "#818cf8" : "#475569",
//       cursor: "pointer",
//       fontSize: "clamp(11px, 2.5vw, 13px)",
//       fontWeight: "700",
//       fontFamily: "'Segoe UI', sans-serif",
//       transition: "all 0.2s",
//       textAlign: "center",
//     }),
//     tabDesc: {
//       fontSize: "10px",
//       display: "block",
//       fontWeight: "400",
//       marginTop: "2px",
//       opacity: 0.7,
//     },
//   };

//   const renderComponent = () => {
//     switch (activeTab) {
//       case "counter": return <Counter />;
//       case "form":    return <UserForm />;
//       case "todo":    return <TodoList />;
//       case "weather": return <WeatherDashboard />;
//       default:        return <Counter />;
//     }
//   };

//   return (
//     <>
//       <nav style={styles.nav} aria-label="Task 5 parts navigation">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             style={styles.tab(activeTab === tab.id)}
//             onClick={() => setActiveTab(tab.id)}
//             aria-pressed={activeTab === tab.id}
//           >
//             {tab.label}
//             <span style={styles.tabDesc}>{tab.desc}</span>
//           </button>
//         ))}
//       </nav>

//       <main>{renderComponent()}</main>
//     </>
//   );
// };

// export default App;

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// App.jsx — Task 6: State vs Props
// Tab navigation to switch between all 3 parts

// import { useState } from "react";
// import ParentChildDemo       from "./components/ParentChildDemo";
// import StatePropsComparison  from "./components/StatePropsComparison";
// import ShoppingCart          from "./components/ShoppingCart";

// const tabs = [
//   { id: "parent",   label: "🔗 Parent-Child",    desc: "Part 1 — State & Props flow"   },
//   { id: "compare",  label: "⚖️ Comparison",       desc: "Part 2 — Table & Code examples" },
//   { id: "cart",     label: "🛒 Shopping Cart",    desc: "Part 3 — Practical scenario"   },
// ];

// const App = () => {
//   const [activeTab, setActiveTab] = useState("parent");

//   const styles = {
//     nav: {
//       background: "#0f172a",
//       padding: "12px clamp(12px, 3vw, 24px)",
//       display: "flex",
//       gap: "8px",
//       flexWrap: "wrap",
//       justifyContent: "center",
//       borderBottom: "1px solid #1e293b",
//     },
//     tab: (isActive) => ({
//       padding: "8px 16px",
//       borderRadius: "10px",
//       border: isActive ? "1px solid #6366f1" : "1px solid #1e293b",
//       background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
//       color: isActive ? "#818cf8" : "#475569",
//       cursor: "pointer",
//       fontSize: "clamp(11px, 2.5vw, 13px)",
//       fontWeight: "700",
//       fontFamily: "'Segoe UI', sans-serif",
//       transition: "all 0.2s",
//       textAlign: "center",
//     }),
//     tabDesc: {
//       fontSize: "10px",
//       display: "block",
//       fontWeight: "400",
//       marginTop: "2px",
//       opacity: 0.7,
//     },
//   };

//   const renderTab = () => {
//     switch (activeTab) {
//       case "parent":  return <ParentChildDemo />;
//       case "compare": return <StatePropsComparison />;
//       case "cart":    return <ShoppingCart />;
//       default:        return <ParentChildDemo />;
//     }
//   };

//   return (
//     <>
//       <nav style={styles.nav}>
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             style={styles.tab(activeTab === tab.id)}
//             onClick={() => setActiveTab(tab.id)}
//             aria-pressed={activeTab === tab.id}
//           >
//             {tab.label}
//             <span style={styles.tabDesc}>{tab.desc}</span>
//           </button>
//         ))}
//       </nav>
//       <main>{renderTab()}</main>
//     </>
//   );
// };

// export default App;

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// App.jsx — Task 7: Conditional Rendering
// Tab navigation for all 5 parts

// import { useState } from "react";
// import LoginStatus         from "./components/LoginStatus";
// import SubscriptionStatus  from "./components/SubscriptionStatus";
// import Notification        from "./components/Notification";
// import UserDashboard       from "./components/UserDashboard";
// import PaymentStatus       from "./components/PaymentStatus";

// const tabs = [
//   { id: "login",   label: "🔐 Login",        desc: "Part A — If / Else"         },
//   { id: "sub",     label: "💎 Subscription",  desc: "Part B — Ternary"           },
//   { id: "notif",   label: "🔔 Notification",  desc: "Part C — && Operator"       },
//   { id: "dash",    label: "🎛️ Dashboard",     desc: "Part D — Switch Case"       },
//   { id: "payment", label: "📦 Payment",       desc: "Part E — Complex Condition" },
// ];

// const App = () => {
//   const [activeTab, setActiveTab] = useState("login");

//   const styles = {
//     nav: {
//       background: "#0f172a",
//       padding: "12px clamp(8px, 3vw, 20px)",
//       display: "flex",
//       gap: "6px",
//       flexWrap: "wrap",
//       justifyContent: "center",
//       borderBottom: "1px solid #1e293b",
//     },
//     tab: (isActive) => ({
//       padding: "7px 12px",
//       borderRadius: "10px",
//       border: isActive ? "1px solid #6366f1" : "1px solid #1e293b",
//       background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
//       color: isActive ? "#818cf8" : "#475569",
//       cursor: "pointer",
//       fontSize: "clamp(10px, 2.5vw, 12px)",
//       fontWeight: "700",
//       fontFamily: "'Segoe UI', sans-serif",
//       transition: "all 0.2s",
//       textAlign: "center",
//     }),
//     tabDesc: {
//       fontSize: "9px",
//       display: "block",
//       fontWeight: "400",
//       marginTop: "2px",
//       opacity: 0.7,
//     },
//   };

//   const renderTab = () => {
//     switch (activeTab) {
//       case "login":   return <LoginStatus />;
//       case "sub":     return <SubscriptionStatus />;
//       case "notif":   return <Notification />;
//       case "dash":    return <UserDashboard />;
//       case "payment": return <PaymentStatus />;
//       default:        return <LoginStatus />;
//     }
//   };

//   return (
//     <>
//       <nav style={styles.nav}>
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             style={styles.tab(activeTab === tab.id)}
//             onClick={() => setActiveTab(tab.id)}
//             aria-pressed={activeTab === tab.id}
//           >
//             {tab.label}
//             <span style={styles.tabDesc}>{tab.desc}</span>
//           </button>
//         ))}
//       </nav>
//       <main>{renderTab()}</main>
//     </>
//   );
// };

// export default App;

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// App.jsx — Task 8: Lists and Keys

// import { useState } from "react";
// import StudentList       from "./components/StudentList";
// import CategoryProducts  from "./components/CategoryProducts";
// import EmployeeDirectory from "./components/EmployeeDirectory";
// import PlaylistManager   from "./components/PlaylistManager";

// const tabs = [
//   { id: "students",   label: "🎓 Students",    desc: "Part A — Basic .map()"      },
//   { id: "categories", label: "🗂️ Categories",  desc: "Part B — Nested Lists"      },
//   { id: "employees",  label: "👔 Employees",   desc: "Part C — CRUD + Filter"     },
//   { id: "playlist",   label: "🎵 Playlist",    desc: "Part D — Reorder + Keys"    },
// ];

// const App = () => {
//   const [activeTab, setActiveTab] = useState("students");

//   const styles = {
//     nav: {
//       background: "#0f172a",
//       padding: "12px clamp(8px, 3vw, 20px)",
//       display: "flex",
//       gap: "6px",
//       flexWrap: "wrap",
//       justifyContent: "center",
//       borderBottom: "1px solid #1e293b",
//     },
//     tab: (isActive) => ({
//       padding: "8px 14px",
//       borderRadius: "10px",
//       border: isActive ? "1px solid #6366f1" : "1px solid #1e293b",
//       background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
//       color: isActive ? "#818cf8" : "#475569",
//       cursor: "pointer",
//       fontSize: "clamp(11px, 2.5vw, 13px)",
//       fontWeight: "700",
//       fontFamily: "'Segoe UI', sans-serif",
//       transition: "all 0.2s",
//       textAlign: "center",
//     }),
//     tabDesc: {
//       fontSize: "9px",
//       display: "block",
//       fontWeight: "400",
//       marginTop: "2px",
//       opacity: 0.7,
//     },
//   };

//   const renderTab = () => {
//     switch (activeTab) {
//       case "students":   return <StudentList />;
//       case "categories": return <CategoryProducts />;
//       case "employees":  return <EmployeeDirectory />;
//       case "playlist":   return <PlaylistManager />;
//       default:           return <StudentList />;
//     }
//   };

//   return (
//     <>
//       <nav style={styles.nav}>
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             style={styles.tab(activeTab === tab.id)}
//             onClick={() => setActiveTab(tab.id)}
//             aria-pressed={activeTab === tab.id}
//           >
//             {tab.label}
//             <span style={styles.tabDesc}>{tab.desc}</span>
//           </button>
//         ))}
//       </nav>
//       <main>{renderTab()}</main>
//     </>
//   );
// };

// export default App;

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// App.jsx — Task 9: React Fragments

// import { useState } from "react";
// import TableRow   from "./components/TableRow";
// import FormFields from "./components/FormFields";

// const tabs = [
//   { id: "table", label: "📊 TableRow",   desc: "React.Fragment + <> syntax" },
//   { id: "form",  label: "📋 FormFields", desc: "key on Fragment + DOM compare" },
// ];

// const App = () => {
//   const [activeTab, setActiveTab] = useState("table");

//   const styles = {
//     nav: {
//       background: "#0f172a",
//       padding: "12px clamp(8px, 3vw, 20px)",
//       display: "flex",
//       gap: "8px",
//       flexWrap: "wrap",
//       justifyContent: "center",
//       borderBottom: "1px solid #1e293b",
//     },
//     tab: (isActive) => ({
//       padding: "8px 20px",
//       borderRadius: "10px",
//       border: isActive ? "1px solid #6366f1" : "1px solid #1e293b",
//       background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
//       color: isActive ? "#818cf8" : "#475569",
//       cursor: "pointer",
//       fontSize: "clamp(11px, 2.5vw, 13px)",
//       fontWeight: "700",
//       fontFamily: "'Segoe UI', sans-serif",
//       transition: "all 0.2s",
//       textAlign: "center",
//     }),
//     tabDesc: {
//       fontSize: "9px",
//       display: "block",
//       fontWeight: "400",
//       marginTop: "2px",
//       opacity: 0.7,
//     },
//   };

//   return (
//     <>
//       <nav style={styles.nav}>
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             style={styles.tab(activeTab === tab.id)}
//             onClick={() => setActiveTab(tab.id)}
//             aria-pressed={activeTab === tab.id}
//           >
//             {tab.label}
//             <span style={styles.tabDesc}>{tab.desc}</span>
//           </button>
//         ))}
//       </nav>
//       <main>
//         {activeTab === "table" ? <TableRow /> : <FormFields />}
//       </main>
//     </>
//   );
// };

// export default App;

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// App.jsx — Task 10: Event Handling

// import { useState } from "react";
// import EventDemo        from "./components/EventDemo";
// import ProductCatalog   from "./components/ProductCatalog";
// import KeyboardEvents   from "./components/KeyboardEvents";
// import RegistrationForm from "./components/RegistrationForm";
// import CommentSection   from "./components/CommentSection";

// const tabs = [
//   { id: "events",   label: "⚡ Events",      desc: "Part A — Basic Events"        },
//   { id: "catalog",  label: "🛍️ Catalog",     desc: "Part B — Event Parameters"    },
//   { id: "keyboard", label: "⌨️ Keyboard",    desc: "Part C — Keyboard + Shortcuts" },
//   { id: "form",     label: "📝 Form",         desc: "Part D — Form Validation"     },
//   { id: "comments", label: "💬 Comments",    desc: "Part E — Event Delegation"    },
// ];

// const App = () => {
//   const [activeTab, setActiveTab] = useState("events");

//   const styles = {
//     nav: {
//       background: "#0f172a",
//       padding: "12px clamp(8px, 3vw, 20px)",
//       display: "flex",
//       gap: "6px",
//       flexWrap: "wrap",
//       justifyContent: "center",
//       borderBottom: "1px solid #1e293b",
//     },
//     tab: (isActive) => ({
//       padding: "7px 12px",
//       borderRadius: "10px",
//       border: isActive ? "1px solid #6366f1" : "1px solid #1e293b",
//       background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
//       color: isActive ? "#818cf8" : "#475569",
//       cursor: "pointer",
//       fontSize: "clamp(10px, 2.5vw, 12px)",
//       fontWeight: "700",
//       fontFamily: "'Segoe UI', sans-serif",
//       transition: "all 0.2s",
//       textAlign: "center",
//     }),
//     tabDesc: {
//       fontSize: "9px",
//       display: "block",
//       fontWeight: "400",
//       marginTop: "2px",
//       opacity: 0.7,
//     },
//   };

//   const renderTab = () => {
//     switch (activeTab) {
//       case "events":   return <EventDemo />;
//       case "catalog":  return <ProductCatalog />;
//       case "keyboard": return <KeyboardEvents />;
//       case "form":     return <RegistrationForm />;
//       case "comments": return <CommentSection />;
//       default:         return <EventDemo />;
//     }
//   };

//   return (
//     <>
//       <nav style={styles.nav}>
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             style={styles.tab(activeTab === tab.id)}
//             onClick={() => setActiveTab(tab.id)}
//             aria-pressed={activeTab === tab.id}
//           >
//             {tab.label}
//             <span style={styles.tabDesc}>{tab.desc}</span>
//           </button>
//         ))}
//       </nav>
//       <main>{renderTab()}</main>
//     </>
//   );
// };

// export default App;

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// App.jsx — Task 11: E-Commerce Product Dashboard
// ROOT COMPONENT — all state lives here, passed down as props
//
// State managed here:
//   - cart          → { [productId]: quantity } object
//   - searchQuery   → string for filtering products by name
//   - activeCategory → string for category filter
//   - sortBy        → string for sort order
//   - isCartOpen    → boolean for cart panel visibility
//   - isLoggedIn    → boolean for auth state
//
// All concepts used:
//   ✅ Component hierarchy (8 components)
//   ✅ Props — data passed to every child
//   ✅ State — useState for all 6 state variables
//   ✅ Conditional rendering — cart open, logged in, empty states
//   ✅ Lists and keys — .map() in FilterBar, ProductList, Cart
//   ✅ Fragments — used in Cart, ProductList
//   ✅ Event handling — onClick, onChange, onSubmit
//   ✅ PropTypes — on all components
//   ✅ Responsive design — clamp(), auto-fill grids
//   ✅ Empty states — no products, empty cart
//   ✅ Quantity selector, tax calculation, clear cart

import { useState, useMemo } from "react";
import products     from "./data/products";
import Header       from "./components/ecommerce/Header";
import FilterBar    from "./components/ecommerce/FilterBar";
import ProductList  from "./components/ecommerce/ProductList";
import Cart         from "./components/ecommerce/Cart";
import Footer       from "./components/ecommerce/Footer";

// Derive category list from products data — "All" + unique categories
const CATEGORIES = ["All", ...new Set(products.map((p) => p.category))];

const App = () => {
  // ── STATE ─────────────────────────────────────────────────────────────────
  const [cart,            setCart]            = useState({});
  const [searchQuery,     setSearchQuery]     = useState("");
  const [activeCategory,  setActiveCategory]  = useState("All");
  const [sortBy,          setSortBy]          = useState("default");
  const [isCartOpen,      setIsCartOpen]      = useState(false);
  const [isLoggedIn,      setIsLoggedIn]      = useState(false);

  // ── DERIVED STATE (computed from state + data) ────────────────────────────
  // useMemo so filtering/sorting only re-runs when dependencies change
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // 2. Filter by category
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 3. Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break; // keep original order for "Featured"
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  // Cart derived values
  const cartCount  = Object.values(cart).reduce((s, q) => s + q, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((pr) => pr.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);

  // ── CART HANDLERS ─────────────────────────────────────────────────────────
  const handleAddToCart = (productId) => {
    if (!isLoggedIn) return;
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    // Open cart when first item is added — nice UX touch
    if (!isCartOpen && cartCount === 0) setIsCartOpen(true);
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

  // ── FILTER / SORT HANDLERS ────────────────────────────────────────────────
  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setSortBy("default");
  };

  // ── AUTH TOGGLE ───────────────────────────────────────────────────────────
  const handleAuthToggle = () => {
    if (isLoggedIn) {
      // Log out — clear cart too
      setIsLoggedIn(false);
      setCart({});
      setIsCartOpen(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  const s = {
    app: {
      minHeight: "100vh",
      background: "#f1f5f9",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Segoe UI', sans-serif",
    },
    main: {
      flex: 1,
      maxWidth: "1280px",
      width: "100%",
      margin: "0 auto",
      padding: "clamp(20px, 4vw, 32px) clamp(16px, 4vw, 32px)",
      boxSizing: "border-box",
    },
    // Welcome banner — shown when not logged in
    banner: {
      background: "linear-gradient(135deg, #6366f1, #4f46e5)",
      borderRadius: "20px",
      padding: "clamp(20px, 4vw, 28px) clamp(20px, 5vw, 32px)",
      marginBottom: "24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px",
      boxShadow: "0 8px 32px rgba(99,102,241,0.3)",
    },
    bannerText: {
      color: "#fff",
    },
    bannerTitle: {
      fontSize: "clamp(18px, 4vw, 24px)",
      fontWeight: "900",
      marginBottom: "4px",
    },
    bannerSub: {
      fontSize: "clamp(12px, 2.5vw, 14px)",
      color: "#c7d2fe",
    },
    bannerBtn: {
      padding: "10px 24px",
      borderRadius: "12px",
      border: "2px solid rgba(255,255,255,0.4)",
      background: "rgba(255,255,255,0.15)",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      whiteSpace: "nowrap",
      backdropFilter: "blur(4px)",
      fontFamily: "'Segoe UI', sans-serif",
    },
    // Stats bar
    statsBar: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: "12px",
      marginBottom: "24px",
    },
    statCard: (color, bg) => ({
      background: "#fff",
      borderRadius: "14px",
      padding: "14px 18px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      border: `1px solid ${color}20`,
    }),
    statVal: (color) => ({
      fontSize: "clamp(20px, 5vw, 26px)",
      fontWeight: "900",
      color,
    }),
    statLabel: {
      fontSize: "11px",
      color: "#94a3b8",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginTop: "2px",
    },
  };

  // Stats derived values for display
  const inStockCount  = products.filter((p) => p.stock > 0).length;
  const avgRating     = (products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1);
  const totalSavings  = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((pr) => pr.id === Number(id));
    return sum + (p ? (p.originalPrice - p.price) * qty : 0);
  }, 0);

  return (
    <div style={s.app}>
      {/* ── HEADER — sticky, search + cart + auth ── */}
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

      {/* ── FILTER BAR — sticky below header ── */}
      <FilterBar
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        productCount={filteredProducts.length}
      />

      {/* ── MAIN CONTENT ── */}
      <main style={s.main}>

        {/* Welcome banner — conditional: only when NOT logged in */}
        {!isLoggedIn && (
          <div style={s.banner}>
            <div style={s.bannerText}>
              <div style={s.bannerTitle}>
                🛍️ Welcome to ShopReact!
              </div>
              <div style={s.bannerSub}>
                Log in to add products to your cart and checkout.
              </div>
            </div>
            <button style={s.bannerBtn} onClick={handleAuthToggle}>
              🔐 Login to Shop
            </button>
          </div>
        )}

        {/* Logged-in stats bar — conditional: only when logged in */}
        {isLoggedIn && (
          <div style={s.statsBar}>
            {[
              { label: "Products",   val: products.length,  color: "#6366f1" },
              { label: "In Stock",   val: inStockCount,     color: "#16a34a" },
              { label: "Avg Rating", val: `⭐ ${avgRating}`, color: "#f59e0b" },
              { label: "Cart Items", val: cartCount,        color: "#0891b2" },
              {
                label: "You Save",
                val: totalSavings > 0 ? `₹${totalSavings.toLocaleString("en-IN")}` : "₹0",
                color: "#ef4444",
              },
            ].map(({ label, val, color }) => (
              <div key={label} style={s.statCard(color)}>
                <div style={s.statVal(color)}>{val}</div>
                <div style={s.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── PRODUCT LIST ── */}
        <ProductList
          products={filteredProducts}
          cart={cart}
          onAdd={handleAddToCart}
          onRemove={handleRemoveFromCart}
          isLoggedIn={isLoggedIn}
          onClearFilters={handleClearFilters}
        />
      </main>

      {/* ── FOOTER ── */}
      <Footer />

      {/* ── CART PANEL — conditional rendering: only when isCartOpen ── */}
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

export default App;