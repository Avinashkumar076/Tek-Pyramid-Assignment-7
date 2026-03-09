// Header.jsx
// Displays the app title and navigation links

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>🛍️ ShopReact</div>
      <nav style={styles.nav}>
        <a href="#" style={styles.navLink}>Home</a>
        <a href="#" style={styles.navLink}>Products</a>
        <a href="#" style={styles.navLink}>About</a>
        <a href="#" style={styles.navLink}>Contact</a>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    background: "linear-gradient(90deg, #1e3a5f, #2563eb)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: "1px",
  },
  nav: {
    display: "flex",
    gap: "24px",
  },
  navLink: {
    color: "#bfdbfe",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
    transition: "color 0.2s",
  },
};

export default Header;
