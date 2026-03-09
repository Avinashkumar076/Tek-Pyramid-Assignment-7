// Footer.jsx
// Displays copyright information and footer links

const Footer = () => {
  // Get current year dynamically using JS
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.top}>
        <div style={styles.brand}>
          <span style={styles.logo}>🛍️ ShopReact</span>
          <p style={styles.tagline}>Your one-stop React-powered store</p>
        </div>

        <div style={styles.links}>
          <span style={styles.linkHeading}>Quick Links</span>
          <a href="#" style={styles.link}>Home</a>
          <a href="#" style={styles.link}>Products</a>
          <a href="#" style={styles.link}>About</a>
        </div>

        <div style={styles.links}>
          <span style={styles.linkHeading}>Support</span>
          <a href="#" style={styles.link}>FAQ</a>
          <a href="#" style={styles.link}>Contact Us</a>
          <a href="#" style={styles.link}>Returns</a>
        </div>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Copyright — using HTML entity © via unicode */}
      <p style={styles.copyright}>
        &copy; {currentYear} ShopReact. All rights reserved. Built with ❤️ by Avinash Kumar.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    background: "#0f172a",
    color: "#cbd5e1",
    padding: "40px 40px 20px",
  },
  top: {
    display: "flex",
    gap: "60px",
    flexWrap: "wrap",
    marginBottom: "28px",
  },
  brand: {
    flex: 1,
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#ffffff",
  },
  tagline: {
    fontSize: "13px",
    color: "#64748b",
    marginTop: "8px",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  linkHeading: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "4px",
  },
  link: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "14px",
  },
  divider: {
    height: "1px",
    background: "#1e293b",
    marginBottom: "20px",
  },
  copyright: {
    textAlign: "center",
    fontSize: "13px",
    color: "#475569",
  },
};

export default Footer;
