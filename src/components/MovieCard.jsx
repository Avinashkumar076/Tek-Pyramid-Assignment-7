// MovieCard.jsx
// Displays individual movie details
// Demonstrates: prop destructuring, PropTypes, default props

import PropTypes from "prop-types";
import Button from "./Button";

// Props are DESTRUCTURED directly in the function parameter
// Instead of (props) => props.title — we destructure: ({ title, director, ... })
const MovieCard = ({
  title,
  director,
  releaseYear,
  rating,
  genre,
  isPremium,
}) => {

  // Dynamic styles based on isPremium prop (boolean)
  const cardBorderStyle = isPremium
    ? "2px solid #f59e0b"
    : "1px solid #e2e8f0";

  const styles = {
    card: {
      background: "#ffffff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: isPremium
        ? "0 8px 30px rgba(245,158,11,0.2)"
        : "0 4px 20px rgba(0,0,0,0.07)",
      border: cardBorderStyle,
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s",
      width: "100%",
    },
    // Premium gold banner at top
    premiumBanner: {
      background: "linear-gradient(90deg, #f59e0b, #d97706)",
      color: "#fff",
      fontSize: "11px",
      fontWeight: "800",
      textAlign: "center",
      padding: "5px",
      letterSpacing: "2px",
      textTransform: "uppercase",
    },
    body: {
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      flex: 1,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "8px",
    },
    title: {
      fontSize: "clamp(15px, 2.5vw, 18px)",
      fontWeight: "800",
      color: "#1e293b",
      lineHeight: "1.3",
      flex: 1,
    },
    yearBadge: {
      background: "#f1f5f9",
      color: "#475569",
      fontSize: "12px",
      fontWeight: "700",
      padding: "3px 10px",
      borderRadius: "20px",
      whiteSpace: "nowrap",
    },
    director: {
      fontSize: "13px",
      color: "#64748b",
    },
    directorName: {
      color: "#6366f1",
      fontWeight: "700",
    },
    // Star rating display
    ratingRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    stars: {
      fontSize: "15px",
    },
    ratingNum: {
      fontSize: "13px",
      fontWeight: "700",
      color: "#1e293b",
    },
    ratingMax: {
      fontSize: "12px",
      color: "#94a3b8",
    },
    // Genre tags — rendered from array prop
    genreWrap: {
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
    },
    genreTag: {
      background: "#ede9fe",
      color: "#5b21b6",
      fontSize: "11px",
      fontWeight: "700",
      padding: "3px 10px",
      borderRadius: "20px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    divider: {
      height: "1px",
      background: "#f1f5f9",
    },
    footer: {
      paddingTop: "4px",
    },
  };

  // Helper — render star icons based on rating number
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    return "⭐".repeat(fullStars) + (hasHalf ? "✨" : "");
  };

  return (
    <div style={styles.card}>

      {/* Conditionally render premium banner — based on isPremium boolean prop */}
      {isPremium && (
        <div style={styles.premiumBanner}>⭐ Premium &bull; Exclusive</div>
      )}

      <div style={styles.body}>
        {/* Title + Year */}
        <div style={styles.header}>
          {/* title — string prop */}
          <h3 style={styles.title}>{title}</h3>
          {/* releaseYear — number prop */}
          <span style={styles.yearBadge}>{releaseYear}</span>
        </div>

        {/* director — string prop */}
        <p style={styles.director}>
          🎬 Directed by <span style={styles.directorName}>{director}</span>
        </p>

        {/* rating — number prop — passed through renderStars() helper */}
        <div style={styles.ratingRow}>
          <span style={styles.stars}>{renderStars(rating)}</span>
          <span style={styles.ratingNum}>{rating}</span>
          <span style={styles.ratingMax}>/ 5.0</span>
        </div>

        <div style={styles.divider} />

        {/* genre — ARRAY prop — mapped to render individual tags */}
        <div style={styles.genreWrap}>
          {genre.map((g, index) => (
            <span key={index} style={styles.genreTag}>{g}</span>
          ))}
        </div>

        {/* Button component — reusable, receives variant + children + onClick as props */}
        <div style={styles.footer}>
          <Button
            variant={isPremium ? "primary" : "secondary"}
            onClick={() => alert(`🎬 Now playing: ${title}`)}
          >
            {isPremium ? "▶ Watch Now — Premium" : "▶ Watch Free"}
          </Button>
        </div>
      </div>
    </div>
  );
};

// ─── PropTypes Definition ───────────────────────────────────────────────────
// Defines the expected type and required status of each prop
MovieCard.propTypes = {
  title:       PropTypes.string.isRequired,    // required string
  director:    PropTypes.string.isRequired,    // required string
  releaseYear: PropTypes.number.isRequired,    // required number
  rating:      PropTypes.number.isRequired,    // required number
  genre:       PropTypes.arrayOf(PropTypes.string).isRequired, // required array of strings
  isPremium:   PropTypes.bool,                 // optional boolean
};

// ─── Default Props ──────────────────────────────────────────────────────────
// Fallback values when optional props are not passed by parent
MovieCard.defaultProps = {
  isPremium: false,   // defaults to false if not provided
};

export default MovieCard;
