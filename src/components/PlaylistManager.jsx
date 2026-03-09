// PlaylistManager.jsx — Task 8, Part D: Dynamic List Rendering
// Demonstrates:
//   - Add / Remove songs from playlist
//   - Move Up / Move Down (reorder) — key importance is CRITICAL here
//   - WHY keys matter: without proper keys, React re-uses wrong DOM nodes on reorder
//   - Visual demo comparing correct key (id) vs wrong key (index)

import { useState } from "react";

const initialSongs = [
  { id: "song-1", title: "Blinding Lights",    artist: "The Weeknd",    duration: "3:20", genre: "Pop"   },
  { id: "song-2", title: "Shape of You",        artist: "Ed Sheeran",    duration: "3:53", genre: "Pop"   },
  { id: "song-3", title: "Levitating",          artist: "Dua Lipa",      duration: "3:23", genre: "Dance" },
  { id: "song-4", title: "Tum Hi Ho",           artist: "Arijit Singh",  duration: "4:22", genre: "Bollywood" },
  { id: "song-5", title: "Kesariya",            artist: "Arijit Singh",  duration: "4:34", genre: "Bollywood" },
];

const genreColors = {
  Pop:       { color: "#6366f1", bg: "#ede9fe" },
  Dance:     { color: "#0891b2", bg: "#e0f2fe" },
  Bollywood: { color: "#db2777", bg: "#fce7f3" },
  Rock:      { color: "#d97706", bg: "#fef3c7" },
  Jazz:      { color: "#16a34a", bg: "#dcfce7" },
};

const PlaylistManager = () => {
  const [songs, setSongs] = useState(initialSongs);
  const [newSong, setNewSong] = useState({ title: "", artist: "", duration: "", genre: "Pop" });
  const [showAdd, setShowAdd] = useState(false);
  const [playing, setPlaying] = useState("song-1");

  // ── ADD SONG ──────────────────────────────────────────────────────────────
  const handleAdd = () => {
    if (!newSong.title.trim() || !newSong.artist.trim()) return;
    const id = `song-${Date.now()}`;   // unique id using timestamp
    setSongs((prev) => [...prev, { id, ...newSong, duration: newSong.duration || "3:00" }]);
    setNewSong({ title: "", artist: "", duration: "", genre: "Pop" });
    setShowAdd(false);
  };

  // ── REMOVE SONG ───────────────────────────────────────────────────────────
  const handleRemove = (id) => {
    setSongs((prev) => prev.filter((s) => s.id !== id));
    if (playing === id) setPlaying(null);
  };

  // ── MOVE UP ───────────────────────────────────────────────────────────────
  // Swaps element at index with element at index-1
  // Creates a NEW array — never mutates state
  const moveUp = (index) => {
    if (index === 0) return;
    setSongs((prev) => {
      const arr = [...prev];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      return arr;
    });
  };

  // ── MOVE DOWN ─────────────────────────────────────────────────────────────
  const moveDown = (index) => {
    if (index === songs.length - 1) return;
    setSongs((prev) => {
      const arr = [...prev];
      [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      return arr;
    });
  };

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 100%)",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
      color: "#e2e8f0",
    },
    container: { maxWidth: "780px", margin: "0 auto" },
    partBadge: {
      display: "inline-block",
      background: "rgba(99,102,241,0.2)",
      color: "#a5b4fc",
      fontSize: "11px",
      fontWeight: "800",
      padding: "4px 14px",
      borderRadius: "20px",
      marginBottom: "8px",
      letterSpacing: "1px",
      border: "1px solid rgba(99,102,241,0.3)",
    },
    pageTitle: { fontSize: "clamp(20px, 4vw, 26px)", fontWeight: "900", color: "#fff", marginBottom: "4px" },
    subtitle: { color: "#64748b", fontSize: "13px", marginBottom: "24px" },
    // Now playing bar
    nowPlaying: {
      background: "rgba(99,102,241,0.15)",
      border: "1px solid rgba(99,102,241,0.3)",
      borderRadius: "16px",
      padding: "14px 20px",
      display: "flex",
      alignItems: "center",
      gap: "14px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    nowPlayingText: { fontSize: "13px", color: "#a5b4fc", flex: 1 },
    // Controls bar
    controlsBar: {
      display: "flex",
      gap: "10px",
      marginBottom: "16px",
      flexWrap: "wrap",
      alignItems: "center",
    },
    countBadge: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#94a3b8",
      borderRadius: "10px",
      padding: "8px 14px",
      fontSize: "13px",
      fontWeight: "700",
      flex: 1,
    },
    addBtn: {
      padding: "10px 18px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(90deg, #6366f1, #4f46e5)",
      color: "#fff",
      fontSize: "13px",
      fontWeight: "700",
      cursor: "pointer",
      whiteSpace: "nowrap",
    },
    // Add form
    addForm: {
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(99,102,241,0.3)",
      borderRadius: "16px",
      padding: "20px",
      marginBottom: "16px",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "10px",
      marginBottom: "14px",
    },
    formInput: {
      padding: "9px 12px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.1)",
      background: "rgba(255,255,255,0.07)",
      color: "#e2e8f0",
      fontSize: "13px",
      outline: "none",
      fontFamily: "'Segoe UI', sans-serif",
      width: "100%",
      boxSizing: "border-box",
    },
    // Song list
    songList: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginBottom: "24px",
    },
    songCard: (isPlaying) => ({
      background: isPlaying
        ? "rgba(99,102,241,0.2)"
        : "rgba(255,255,255,0.04)",
      border: isPlaying
        ? "1px solid rgba(99,102,241,0.5)"
        : "1px solid rgba(255,255,255,0.07)",
      borderRadius: "14px",
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      transition: "all 0.2s",
      flexWrap: "wrap",
    }),
    trackNum: { color: "#475569", fontSize: "12px", fontWeight: "700", minWidth: "22px", textAlign: "center" },
    playBtn: (isPlaying) => ({
      width: "36px", height: "36px",
      borderRadius: "50%",
      border: "none",
      background: isPlaying ? "#6366f1" : "rgba(255,255,255,0.1)",
      color: "#fff",
      fontSize: "14px",
      cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }),
    songInfo: { flex: 1, minWidth: "120px" },
    songTitle: { fontSize: "14px", fontWeight: "700", color: "#f1f5f9", marginBottom: "3px" },
    songArtist: { fontSize: "12px", color: "#64748b" },
    genreBadge: (color, bg) => ({
      fontSize: "10px", fontWeight: "700",
      color, background: `${color}25`,
      padding: "2px 8px", borderRadius: "20px",
      border: `1px solid ${color}30`,
    }),
    duration: { fontSize: "12px", color: "#475569", fontFamily: "monospace" },
    reorderBtns: { display: "flex", flexDirection: "column", gap: "3px" },
    reorderBtn: (disabled) => ({
      width: "26px", height: "26px",
      borderRadius: "6px",
      border: "1px solid rgba(255,255,255,0.1)",
      background: "transparent",
      color: disabled ? "#1e293b" : "#94a3b8",
      cursor: disabled ? "default" : "pointer",
      fontSize: "11px",
      display: "flex", alignItems: "center", justifyContent: "center",
    }),
    removeBtn: {
      width: "30px", height: "30px",
      borderRadius: "8px",
      border: "1px solid rgba(239,68,68,0.3)",
      background: "rgba(239,68,68,0.1)",
      color: "#f87171",
      cursor: "pointer",
      fontSize: "13px",
    },
    keyLabel: { fontSize: "10px", color: "#334155", fontFamily: "monospace", width: "100%", paddingLeft: "70px" },
    // Key importance section
    keyBox: {
      background: "#0f172a",
      borderRadius: "16px",
      padding: "clamp(16px, 4vw, 24px)",
      border: "1px solid #1e293b",
    },
    keyBoxTitle: { fontSize: "14px", fontWeight: "800", color: "#f1f5f9", marginBottom: "14px" },
    keyPoint: (color) => ({
      display: "flex", alignItems: "flex-start", gap: "10px",
      padding: "10px 0",
      borderBottom: "1px solid #1e293b",
      fontSize: "13px", color: "#94a3b8", lineHeight: "1.5",
    }),
    dot: (color) => ({
      width: "8px", height: "8px", borderRadius: "50%",
      background: color, marginTop: "6px", flexShrink: 0,
    }),
  };

  const currentSong = songs.find((s) => s.id === playing);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.partBadge}>PART D — DYNAMIC LIST RENDERING</div>
        <h2 style={styles.pageTitle}>🎵 Playlist Manager</h2>
        <p style={styles.subtitle}>
          Add · Remove · Reorder — demonstrating WHY keys must be stable IDs
        </p>

        {/* Now Playing */}
        <div style={styles.nowPlaying}>
          <span style={{ fontSize: "24px" }}>
            {currentSong ? "▶️" : "⏸️"}
          </span>
          <span style={styles.nowPlayingText}>
            {currentSong
              ? `Now Playing: ${currentSong.title} — ${currentSong.artist}`
              : "Nothing playing. Click ▶ on a song!"}
          </span>
          <span style={{ fontSize: "12px", color: "#475569", fontFamily: "monospace" }}>
            {songs.length} tracks
          </span>
        </div>

        {/* Controls */}
        <div style={styles.controlsBar}>
          <span style={styles.countBadge}>
            🎵 {songs.length} songs in playlist
          </span>
          <button style={styles.addBtn} onClick={() => setShowAdd((p) => !p)}>
            {showAdd ? "✕ Cancel" : "+ Add Song"}
          </button>
        </div>

        {/* Add Form */}
        {showAdd && (
          <div style={styles.addForm}>
            <p style={{ fontSize: "13px", fontWeight: "800", color: "#a5b4fc", marginBottom: "12px" }}>
              ➕ Add New Song
            </p>
            <div style={styles.formGrid}>
              <input
                placeholder="Song Title"
                value={newSong.title}
                onChange={(e) => setNewSong((p) => ({ ...p, title: e.target.value }))}
                style={styles.formInput}
              />
              <input
                placeholder="Artist Name"
                value={newSong.artist}
                onChange={(e) => setNewSong((p) => ({ ...p, artist: e.target.value }))}
                style={styles.formInput}
              />
              <input
                placeholder="Duration (e.g. 3:45)"
                value={newSong.duration}
                onChange={(e) => setNewSong((p) => ({ ...p, duration: e.target.value }))}
                style={styles.formInput}
              />
              <select
                value={newSong.genre}
                onChange={(e) => setNewSong((p) => ({ ...p, genre: e.target.value }))}
                style={styles.formInput}
              >
                {Object.keys(genreColors).map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button style={{ ...styles.addBtn, padding: "9px 20px" }} onClick={handleAdd}>✅ Add Song</button>
              <button
                onClick={() => setShowAdd(false)}
                style={{ padding: "9px 20px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#64748b", cursor: "pointer", fontFamily: "'Segoe UI', sans-serif", fontSize: "13px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Song List */}
        <div style={styles.songList}>
          {songs.map((song, index) => {
            const isPlaying = playing === song.id;
            const genre = genreColors[song.genre] || genreColors.Pop;

            return (
              // KEY = song.id (stable unique ID)
              // When songs reorder, React matches components by id correctly
              // If we used key={index}, React would think song at position 0
              // is always the "same" component → wrong DOM reuse → bugs!
              <div key={song.id} style={styles.songCard(isPlaying)}>
                <span style={styles.trackNum}>{index + 1}</span>

                {/* Play button */}
                <button
                  style={styles.playBtn(isPlaying)}
                  onClick={() => setPlaying(isPlaying ? null : song.id)}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>

                {/* Song info */}
                <div style={styles.songInfo}>
                  <div style={styles.songTitle}>{song.title}</div>
                  <div style={styles.songArtist}>{song.artist}</div>
                </div>

                <span style={styles.genreBadge(genre.color, genre.bg)}>{song.genre}</span>
                <span style={styles.duration}>{song.duration}</span>

                {/* Reorder buttons */}
                <div style={styles.reorderBtns}>
                  <button
                    style={styles.reorderBtn(index === 0)}
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    aria-label="Move up"
                  >▲</button>
                  <button
                    style={styles.reorderBtn(index === songs.length - 1)}
                    onClick={() => moveDown(index)}
                    disabled={index === songs.length - 1}
                    aria-label="Move down"
                  >▼</button>
                </div>

                {/* Delete */}
                <button style={styles.removeBtn} onClick={() => handleRemove(song.id)}>✕</button>

                {/* Key label shown for learning */}
                <div style={styles.keyLabel}>key="{song.id}"</div>
              </div>
            );
          })}
        </div>

        {/* WHY KEYS MATTER explanation */}
        <div style={styles.keyBox}>
          <p style={styles.keyBoxTitle}>🔑 Why Keys Matter for Reordering</p>

          {[
            {
              color: "#34d399",
              text: `key={song.id} ✅ — When you reorder, React matches each component to its stable ID. The component for "Blinding Lights" always stays with "Blinding Lights" regardless of position.`,
            },
            {
              color: "#f87171",
              text: `key={index} ❌ — When you reorder, React thinks position 0 is always the "same" component. It reuses the DOM node at position 0 for whatever song is now there — causing state/animation bugs.`,
            },
            {
              color: "#fbbf24",
              text: "Rule: Keys must be STABLE (same across renders), UNIQUE (within the list), and MEANINGFUL (tied to the data identity — like id, not position).",
            },
          ].map((p, i) => (
            <div key={i} style={styles.keyPoint(p.color)}>
              <div style={styles.dot(p.color)} />
              <span>{p.text}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PlaylistManager;
