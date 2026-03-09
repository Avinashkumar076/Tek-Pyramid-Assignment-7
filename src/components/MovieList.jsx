// MovieList.jsx
// Maintains the movies array and passes each movie's data to MovieCard as props
// Demonstrates: array of objects, .map(), prop spreading, prop destructuring in child

import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import Button from "./Button";

// ─── Movies Data Array ───────────────────────────────────────────────────────
// Each object matches the props expected by MovieCard
const movies = [
  {
    id: 1,
    title: "Interstellar",
    director: "Christopher Nolan",
    releaseYear: 2014,
    rating: 4.9,
    genre: ["Sci-Fi", "Drama", "Adventure"],
    isPremium: true,
  },
  {
    id: 2,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    releaseYear: 2008,
    rating: 5.0,
    genre: ["Action", "Crime", "Thriller"],
    isPremium: true,
  },
  {
    id: 3,
    title: "Inception",
    director: "Christopher Nolan",
    releaseYear: 2010,
    rating: 4.8,
    genre: ["Sci-Fi", "Thriller", "Mystery"],
    isPremium: false,
  },
  {
    id: 4,
    title: "3 Idiots",
    director: "Rajkumar Hirani",
    releaseYear: 2009,
    rating: 4.7,
    genre: ["Comedy", "Drama"],
    isPremium: false,
  },
  {
    id: 5,
    title: "RRR",
    director: "S. S. Rajamouli",
    releaseYear: 2022,
    rating: 4.6,
    genre: ["Action", "Drama", "Historical"],
    isPremium: true,
  },
  {
    id: 6,
    title: "Dangal",
    director: "Nitesh Tiwari",
    releaseYear: 2016,
    rating: 4.8,
    genre: ["Biography", "Drama", "Sport"],
    isPremium: false,
  },
];

const MovieList = () => {

  const styles = {
    section: {
      padding: "clamp(20px, 5vw, 40px)",
      background: "#f8fafc",
      minHeight: "80vh",
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
      flexWrap: "wrap",
      gap: "12px",
    },
    heading: {
      fontSize: "clamp(20px, 4vw, 28px)",
      fontWeight: "800",
      color: "#1e293b",
      margin: 0,
    },
    meta: {
      color: "#64748b",
      fontSize: "13px",
      marginBottom: "24px",
    },
    // Responsive CSS grid — auto-fit fills available space
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "24px",
    },
    btnRow: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },
    btnWrap: {
      width: "auto",
      minWidth: "140px",
    },
  };

  return (
    <section style={styles.section}>

      {/* Header */}
      <div style={styles.topBar}>
        <h2 style={styles.heading}>🎬 Movie Catalog</h2>

        {/* Button component demo — variant prop usage */}
        <div style={styles.btnRow}>
          <div style={styles.btnWrap}>
            <Button variant="primary" onClick={() => alert("Filter applied!")}>
              🔍 Filter
            </Button>
          </div>
          <div style={styles.btnWrap}>
            <Button variant="danger" onClick={() => alert("List cleared!")}>
              🗑️ Clear
            </Button>
          </div>
          <div style={styles.btnWrap}>
            {/* disabled prop demo */}
            <Button variant="secondary" disabled>
              ⬇️ Export
            </Button>
          </div>
        </div>
      </div>

      <p style={styles.meta}>
        Showing {movies.length} movies &bull;{" "}
        {movies.filter((m) => m.isPremium).length} Premium &bull;{" "}
        {movies.filter((m) => !m.isPremium).length} Free
      </p>

      {/* Movie Grid — maps each movie object → passes as props to MovieCard */}
      <div style={styles.grid}>
        {movies.map((movie) => (
          // Each movie's data is passed as individual named props to MovieCard
          // This demonstrates props data flow: MovieList → MovieCard
          <MovieCard
            key={movie.id}
            title={movie.title}
            director={movie.director}
            releaseYear={movie.releaseYear}
            rating={movie.rating}
            genre={movie.genre}
            isPremium={movie.isPremium}
          />
        ))}
      </div>
    </section>
  );
};

// PropTypes for MovieList (no props received from parent in this case)
MovieList.propTypes = {};

export default MovieList;
