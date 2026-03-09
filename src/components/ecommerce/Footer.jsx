// src/components/ecommerce/Footer.jsx
// Bootstrap footer with brand, links, tech stack, copyright

const Footer = () => {
  const year      = new Date().getFullYear();
  const techStack = ["React 18", "Vite", "Bootstrap 5", "prop-types", "ES6+"];
  const pages     = ["Home", "Products", "Cart", "About", "Contact"];
  const support   = ["FAQ", "Returns", "Shipping", "Track Order"];

  return (
    <footer className="bg-dark text-white mt-auto pt-5 pb-4">
      <div className="container-fluid px-3 px-md-5">
        <div className="row g-4">

          {/* Brand column */}
          <div className="col-12 col-md-4">
            <div className="fw-black fs-5 mb-2">
              ShopReact
            </div>
            <p className="text-secondary mb-3" style={{ fontSize: 13, lineHeight: 1.6 }}>
              A React.js E-Commerce Dashboard built as a comprehensive
              assignment covering all core React concepts.
            </p>
            {/* Tech stack pills — .map() with tech as key */}
            <div className="d-flex flex-wrap gap-1">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="badge"
                  style={{
                    background: "rgba(99,102,241,0.2)",
                    color: "#a5b4fc",
                    border: "1px solid rgba(99,102,241,0.3)",
                    fontSize: 11,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="col-6 col-md-4">
            <div className="text-uppercase text-secondary fw-bold mb-3" style={{ fontSize: 11, letterSpacing: 1 }}>
              Quick Links
            </div>
            {pages.map((page) => (
              <div key={page} className="text-secondary mb-2" style={{ fontSize: 13, cursor: "pointer" }}>
                {page}
              </div>
            ))}
          </div>

          {/* Support */}
          <div className="col-6 col-md-4">
            <div className="text-uppercase text-secondary fw-bold mb-3" style={{ fontSize: 11, letterSpacing: 1 }}>
              Support
            </div>
            {support.map((item) => (
              <div key={item} className="text-secondary mb-2" style={{ fontSize: 13, cursor: "pointer" }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright bar */}
        <hr className="border-secondary mt-4 mb-3" />
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span className="text-secondary" style={{ fontSize: 12 }}>
            {/* HTML entity — &copy; */}
            &copy; {year} ShopReact. All rights reserved.
          </span>
          <span className="text-secondary" style={{ fontSize: 12 }}>
            Built by <span style={{ color: "#818cf8" }}>Avinash Kumar</span>
            &nbsp;&mdash;&nbsp;React.js Assignment, Task 11
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
