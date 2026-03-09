// CommentSection.jsx — Task 10, Part E: Event Delegation
// Demonstrates:
//   - Dynamic list of comments
//   - SINGLE like handler for ALL like buttons (event delegation)
//   - SINGLE delete handler for ALL delete buttons (event delegation)
//   - onClick={handleLike} vs onClick={() => handleLike(id)} difference explained

import { useState } from "react";

const initialComments = [
  { id: 1, author: "Priya Sharma",   avatar: "PS", text: "Amazing tutorial! Really helped me understand React hooks.", likes: 24, liked: false, time: "2 hrs ago",  color: "#6366f1" },
  { id: 2, author: "Rahul Verma",    avatar: "RV", text: "The explanation of state vs props was super clear. Thanks!", likes: 18, liked: false, time: "3 hrs ago",  color: "#0891b2" },
  { id: 3, author: "Sneha Patel",    avatar: "SP", text: "Could you also cover useEffect in the next video? 🙏",      likes: 9,  liked: false, time: "4 hrs ago",  color: "#d97706" },
  { id: 4, author: "Mohit Singh",    avatar: "MS", text: "Loved the coding style! Very clean and readable.",           likes: 31, liked: false, time: "5 hrs ago",  color: "#16a34a" },
  { id: 5, author: "Kavya Reddy",    avatar: "KR", text: "Subscribed! This channel deserves way more followers 🔥",   likes: 47, liked: false, time: "6 hrs ago",  color: "#db2777" },
];

const CommentSection = () => {
  const [comments,  setComments]  = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [sortBy,    setSortBy]    = useState("newest");

  // ── SINGLE LIKE HANDLER for ALL like buttons ───────────────────────────────
  // This is event delegation — one function handles clicks from ALL like buttons
  // The commentId tells us WHICH button was clicked
  const handleLike = (commentId) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
          : c
      )
    );
  };

  // ── SINGLE DELETE HANDLER for ALL delete buttons ───────────────────────────
  // One function — handles delete for any comment via its id
  const handleDelete = (commentId) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  // ── ADD COMMENT ────────────────────────────────────────────────────────────
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const newEntry = {
      id:     Date.now(),
      author: "Avinash Kumar",
      avatar: "AK",
      text:   newComment.trim(),
      likes:  0,
      liked:  false,
      time:   "Just now",
      color:  "#7c3aed",
    };
    setComments((prev) => [newEntry, ...prev]);
    setNewComment("");
  };

  // Sort comments
  const sorted = [...comments].sort((a, b) => {
    if (sortBy === "likes")  return b.likes - a.likes;
    if (sortBy === "oldest") return a.id - b.id;
    return b.id - a.id; // newest
  });

  const totalLikes = comments.reduce((s, c) => s + c.likes, 0);

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "#f8fafc",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
    },
    container: { maxWidth: "700px", margin: "0 auto" },
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
    subtitle: { color: "#64748b", fontSize: "13px", marginBottom: "24px" },

    // Stats bar
    statsBar: {
      display: "flex",
      gap: "16px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    statChip: (color, bg) => ({
      background: bg,
      color,
      padding: "6px 16px",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "700",
    }),

    // Add comment form
    addForm: {
      background: "#fff",
      borderRadius: "18px",
      padding: "clamp(16px, 4vw, 22px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      marginBottom: "20px",
      border: "1px solid #e2e8f0",
    },
    addFormTitle: {
      fontSize: "13px",
      fontWeight: "800",
      color: "#0f172a",
      marginBottom: "12px",
    },
    textarea: {
      width: "100%",
      padding: "11px 14px",
      borderRadius: "10px",
      border: "2px solid #e2e8f0",
      fontSize: "14px",
      outline: "none",
      resize: "vertical",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#1e293b",
      background: "#f8fafc",
      boxSizing: "border-box",
      marginBottom: "12px",
      minHeight: "80px",
      transition: "border 0.2s",
    },
    postBtn: {
      padding: "10px 24px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(90deg, #6366f1, #4f46e5)",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
    },

    // Sort controls
    sortRow: {
      display: "flex",
      gap: "8px",
      marginBottom: "16px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    sortLabel: { fontSize: "12px", color: "#94a3b8", fontWeight: "700" },
    sortBtn: (isActive) => ({
      padding: "5px 14px",
      borderRadius: "8px",
      border: isActive ? "2px solid #6366f1" : "2px solid #e2e8f0",
      background: isActive ? "#ede9fe" : "#fff",
      color: isActive ? "#6366f1" : "#94a3b8",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "700",
      fontFamily: "'Segoe UI', sans-serif",
    }),

    // Comment card
    commentCard: {
      background: "#fff",
      borderRadius: "16px",
      padding: "clamp(14px, 3vw, 20px)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      border: "1px solid #f1f5f9",
      marginBottom: "12px",
      transition: "box-shadow 0.2s",
    },
    commentHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "10px",
      gap: "10px",
    },
    authorRow: { display: "flex", alignItems: "center", gap: "10px" },
    avatar: (color) => ({
      width: "38px",
      height: "38px",
      borderRadius: "50%",
      background: `${color}20`,
      color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "800",
      fontSize: "13px",
      flexShrink: 0,
    }),
    authorName: { fontSize: "14px", fontWeight: "700", color: "#0f172a" },
    timeStamp: { fontSize: "12px", color: "#94a3b8" },
    commentText: { fontSize: "14px", color: "#374151", lineHeight: "1.6", marginBottom: "12px" },
    commentFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "8px",
    },
    likeBtn: (liked) => ({
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 14px",
      borderRadius: "8px",
      border: liked ? "2px solid #6366f1" : "2px solid #e2e8f0",
      background: liked ? "#ede9fe" : "transparent",
      color: liked ? "#6366f1" : "#64748b",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "700",
      transition: "all 0.15s",
      fontFamily: "'Segoe UI', sans-serif",
    }),
    deleteBtn: {
      padding: "5px 12px",
      borderRadius: "8px",
      border: "1px solid #fee2e2",
      background: "#fff5f5",
      color: "#ef4444",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "700",
      fontFamily: "'Segoe UI', sans-serif",
    },
    delegationNote: {
      fontSize: "10px",
      color: "#94a3b8",
      fontFamily: "monospace",
      marginTop: "6px",
    },
    emptyState: {
      textAlign: "center", padding: "40px",
      color: "#94a3b8", fontSize: "14px",
      background: "#fff", borderRadius: "16px",
    },

    // Code box
    codeBox: {
      background: "#0f172a",
      borderRadius: "14px",
      padding: "16px 20px",
      fontFamily: "monospace",
      fontSize: "clamp(10px, 2vw, 12px)",
      color: "#e2e8f0",
      lineHeight: "1.9",
      overflowX: "auto",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.partBadge}>PART E — EVENT DELEGATION</div>
        <h2 style={styles.pageTitle}>💬 Comment Section</h2>
        <p style={styles.subtitle}>
          Single like handler · Single delete handler · Both handle ALL buttons via delegation
        </p>

        {/* Stats */}
        <div style={styles.statsBar}>
          <span style={styles.statChip("#6366f1", "#ede9fe")}>
            💬 {comments.length} Comments
          </span>
          <span style={styles.statChip("#ef4444", "#fee2e2")}>
            ❤️ {totalLikes} Total Likes
          </span>
          <span style={styles.statChip("#16a34a", "#dcfce7")}>
            ✅ 1 Like Handler · 1 Delete Handler
          </span>
        </div>

        {/* Add Comment */}
        <div style={styles.addForm}>
          <p style={styles.addFormTitle}>✍️ Add a Comment</p>
          <form onSubmit={handleAddComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              style={styles.textarea}
            />
            <button type="submit" style={styles.postBtn}>
              📤 Post Comment
            </button>
          </form>
        </div>

        {/* Sort */}
        <div style={styles.sortRow}>
          <span style={styles.sortLabel}>SORT BY:</span>
          {["newest", "oldest", "likes"].map((s) => (
            <button key={s} style={styles.sortBtn(sortBy === s)} onClick={() => setSortBy(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Comment List */}
        {sorted.length === 0 ? (
          <div style={styles.emptyState}>
            No comments yet! Be the first to comment 👆
          </div>
        ) : (
          sorted.map((comment) => (
            <div key={comment.id} style={styles.commentCard}>
              <div style={styles.commentHeader}>
                <div style={styles.authorRow}>
                  <div style={styles.avatar(comment.color)}>{comment.avatar}</div>
                  <div>
                    <div style={styles.authorName}>{comment.author}</div>
                    <div style={styles.timeStamp}>{comment.time}</div>
                  </div>
                </div>
              </div>

              <p style={styles.commentText}>{comment.text}</p>

              <div style={styles.commentFooter}>
                {/* SINGLE handleLike function handles ALL like buttons */}
                {/* onClick={() => handleLike(comment.id)} ← passes id as parameter */}
                <button
                  style={styles.likeBtn(comment.liked)}
                  onClick={() => handleLike(comment.id)}
                  aria-label={`${comment.liked ? "Unlike" : "Like"} comment by ${comment.author}`}
                >
                  {comment.liked ? "❤️" : "🤍"} {comment.likes}
                </button>

                {/* SINGLE handleDelete function handles ALL delete buttons */}
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(comment.id)}
                  aria-label={`Delete comment by ${comment.author}`}
                >
                  🗑️ Delete
                </button>
              </div>

              {/* Shows the delegation pattern per card */}
              <div style={styles.delegationNote}>
                onClick={`{() => handleLike(${comment.id})}`} · onClick={`{() => handleDelete(${comment.id})}`}
              </div>
            </div>
          ))
        )}

        {/* Code explanation */}
        <div style={styles.codeBox}>
          <span style={{ color: "#94a3b8" }}>{"// Event Delegation — 1 handler for ALL buttons:"}</span>{"\n"}
          <span style={{ color: "#38bdf8" }}>{"const handleLike = (commentId) => {"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  setComments(prev => prev.map(c =>"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"    c.id === commentId ? { ...c, liked: !c.liked } : c"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"  ));"}</span>{"\n"}
          <span style={{ color: "#38bdf8" }}>{"}"}</span>{"\n\n"}
          <span style={{ color: "#94a3b8" }}>{"// In JSX — arrow fn passes id to shared handler:"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"<button "}</span>
          <span style={{ color: "#fbbf24" }}>onClick</span>
          <span style={{ color: "#e2e8f0" }}>{"={() => "}</span>
          <span style={{ color: "#34d399" }}>handleLike</span>
          <span style={{ color: "#e2e8f0" }}>{"(comment.id)}"}</span>{"\n\n"}
          <span style={{ color: "#94a3b8" }}>{"// ❌ Don't do this — calls immediately on render:"}</span>{"\n"}
          <span style={{ color: "#e2e8f0" }}>{"<button "}</span>
          <span style={{ color: "#fbbf24" }}>onClick</span>
          <span style={{ color: "#e2e8f0" }}>{"={"}</span>
          <span style={{ color: "#f87171" }}>{"handleLike(comment.id)"}</span>
          <span style={{ color: "#e2e8f0" }}>{"}"}</span>
          <span style={{ color: "#64748b" }}>{" ← runs on render ❌"}</span>
        </div>

      </div>
    </div>
  );
};

export default CommentSection;
