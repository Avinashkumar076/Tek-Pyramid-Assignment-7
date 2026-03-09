// UserProfile.jsx
// Demonstrates advanced JSX syntax and best practices
// JSX Features covered:
//   1. HTML entities
//   2. Multi-line JSX with proper indentation
//   3. Embedded JavaScript expressions using {}
//   4. Dynamic className assignment (via data-attribute trick with inline styles)
//   5. Inline styles with JavaScript objects

const UserProfile = () => {
  // --- JavaScript variables used inside JSX via {} expressions ---
  const user = {
    name: "Avinash Kumar",
    role: "Frontend Developer",
    location: "Ramgarh, Jharkhand 🇮🇳",
    experience: 1,
    skills: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    isAvailable: true,
    rating: 4.8,
    projectsDone: 12,
    bio: "Passionate MERN Stack developer who loves building clean, responsive UIs.",
    avatarInitials: "AK",
  };

  // --- Dynamic style object based on availability (dynamic className equivalent) ---
  // Since we use inline styles only, we compute style objects conditionally
  const availabilityStyle = user.isAvailable
    ? { background: "#dcfce7", color: "#16a34a", border: "1px solid #bbf7d0" }
    : { background: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca" };

  // --- Inline style objects (JavaScript objects for styling) ---
  const styles = {
    // Responsive wrapper
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      boxSizing: "border-box",
    },
    card: {
      background: "#ffffff",
      borderRadius: "24px",
      padding: "clamp(24px, 5vw, 40px)",       // responsive padding
      width: "100%",
      maxWidth: "520px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    },
    // Avatar circle with initials
    avatarWrapper: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
    },
    avatar: {
      width: "clamp(70px, 15vw, 90px)",         // responsive size
      height: "clamp(70px, 15vw, 90px)",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "clamp(24px, 5vw, 32px)",
      fontWeight: "900",
      color: "#ffffff",
      boxShadow: "0 8px 20px rgba(102,126,234,0.4)",
    },
    nameSection: {
      textAlign: "center",
      marginBottom: "20px",
    },
    name: {
      fontSize: "clamp(20px, 4vw, 26px)",       // responsive font
      fontWeight: "800",
      color: "#1e293b",
      margin: "0 0 4px 0",
    },
    role: {
      fontSize: "clamp(13px, 3vw, 15px)",
      color: "#64748b",
      margin: "0 0 10px 0",
    },
    availabilityBadge: {
      display: "inline-block",
      padding: "4px 14px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "700",
      ...availabilityStyle,                      // spread dynamic styles here
    },
    bio: {
      fontSize: "14px",
      color: "#475569",
      textAlign: "center",
      lineHeight: "1.6",
      margin: "16px 0",
      padding: "12px 16px",
      background: "#f8fafc",
      borderRadius: "10px",
      borderLeft: "4px solid #667eea",
    },
    statsRow: {
      display: "flex",
      justifyContent: "space-around",
      margin: "20px 0",
      flexWrap: "wrap",
      gap: "10px",
    },
    statBox: {
      textAlign: "center",
      flex: "1",
      minWidth: "80px",
    },
    statValue: {
      fontSize: "clamp(18px, 4vw, 24px)",
      fontWeight: "900",
      color: "#667eea",
    },
    statLabel: {
      fontSize: "11px",
      color: "#94a3b8",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    divider: {
      height: "1px",
      background: "#e2e8f0",
      margin: "16px 0",
    },
    skillsSection: {
      marginTop: "16px",
    },
    skillsTitle: {
      fontSize: "13px",
      fontWeight: "700",
      color: "#1e293b",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "10px",
    },
    skillsWrap: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    },
    skillTag: {
      background: "#ede9fe",
      color: "#5b21b6",
      padding: "5px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
    },
    footer: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "12px",
      color: "#94a3b8",
    },
  };

  return (
    // 1. MULTI-LINE JSX with proper indentation
    // Each section is clearly indented and logically grouped
    <div style={styles.wrapper}>
      <div style={styles.card}>

        {/* 2. JSX COMMENT — This is how you write comments inside JSX */}
        {/* Avatar Section — showing user initials */}
        <div style={styles.avatarWrapper}>
          <div style={styles.avatar}>
            {/* 3. EMBEDDED JS EXPRESSION — accessing object property */}
            {user.avatarInitials}
          </div>
        </div>

        {/* Name + Role + Availability Badge */}
        <div style={styles.nameSection}>
          <h1 style={styles.name}>{user.name}</h1>
          <p style={styles.role}>{user.role} &bull; {user.location}</p>

          {/* 4. DYNAMIC INLINE STYLE — availabilityStyle changes based on user.isAvailable */}
          <span style={styles.availabilityBadge}>
            {/* 5. TERNARY EXPRESSION inside JSX */}
            {user.isAvailable ? "✅ Available for Work" : "❌ Not Available"}
          </span>
        </div>

        {/* Bio section */}
        <p style={styles.bio}>
          {/* 6. JS EXPRESSION — object property rendered as text */}
          {user.bio}
        </p>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            {/* 7. JS EXPRESSION — number value from object */}
            <div style={styles.statValue}>{user.experience}+</div>
            <div style={styles.statLabel}>Years Exp.</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statValue}>{user.projectsDone}</div>
            <div style={styles.statLabel}>Projects</div>
          </div>
          <div style={styles.statBox}>
            {/* 8. JS EXPRESSION — number with emoji */}
            <div style={styles.statValue}>{user.rating}⭐</div>
            <div style={styles.statLabel}>Rating</div>
          </div>
          <div style={styles.statBox}>
            {/* 9. JS EXPRESSION — array length */}
            <div style={styles.statValue}>{user.skills.length}</div>
            <div style={styles.statLabel}>Skills</div>
          </div>
        </div>

        <div style={styles.divider} />

        {/* Skills Section */}
        <div style={styles.skillsSection}>
          <p style={styles.skillsTitle}>🛠️ Tech Stack</p>
          <div style={styles.skillsWrap}>
            {/* 10. JS EXPRESSION — .map() to render array items */}
            {user.skills.map((skill, index) => (
              <span key={index} style={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Footer with HTML entities */}
        <div style={styles.footer}>
          {/* 11. HTML ENTITIES — © copyright symbol and ™ trademark */}
          <p>&copy; 2025 Avinash Kumar &trade; All Rights Reserved</p>
          {/* &bull; = bullet point • &amp; = & */}
          <p>React &amp; MERN Stack Developer &bull; India</p>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
