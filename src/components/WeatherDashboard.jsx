// WeatherDashboard.jsx — Task 5, Part D: Multiple State Variables
// Demonstrates:
//   - Multiple SEPARATE useState calls for independent values
//   - Each state variable is updated independently
//   - Reset All button resets all states at once

import { useState } from "react";

const WeatherDashboard = () => {

  // ─── MULTIPLE STATE VARIABLES ─────────────────────────────────────────────
  // Each piece of data has its OWN useState — they are fully independent
  // Updating temperature does NOT re-render humidity (React optimizes this)
  const [temperature, setTemperature]   = useState("");
  const [humidity, setHumidity]         = useState("");
  const [windSpeed, setWindSpeed]       = useState("");
  const [location, setLocation]         = useState("");

  // ─── RESET ALL ───────────────────────────────────────────────────────────
  // Calls all 4 setters to reset every state variable to empty
  const handleResetAll = () => {
    setTemperature("");
    setHumidity("");
    setWindSpeed("");
    setLocation("");
  };

  // ─── DERIVED VALUES ───────────────────────────────────────────────────────
  const temp = parseFloat(temperature);
  const hum  = parseFloat(humidity);
  const wind = parseFloat(windSpeed);

  const getWeatherMood = () => {
    if (!temperature && !humidity && !windSpeed) return { icon: "🌤️", label: "Enter data below", color: "#64748b" };
    if (temp > 35)   return { icon: "🔥", label: "Extreme Heat",   color: "#dc2626" };
    if (temp > 25)   return { icon: "☀️", label: "Sunny & Warm",   color: "#f59e0b" };
    if (temp > 15)   return { icon: "🌤️", label: "Pleasant",       color: "#3b82f6" };
    if (temp > 5)    return { icon: "🌥️", label: "Cool & Cloudy",  color: "#64748b" };
    return              { icon: "❄️", label: "Cold",              color: "#0ea5e9" };
  };

  const getHumidityLabel = (h) => {
    if (!h) return "—";
    if (h < 30) return "Dry 🏜️";
    if (h < 60) return "Comfortable 😊";
    if (h < 80) return "Humid 💧";
    return "Very Humid 🌊";
  };

  const getWindLabel = (w) => {
    if (!w) return "—";
    if (w < 10)  return "Calm 🍃";
    if (w < 30)  return "Breezy 💨";
    if (w < 60)  return "Windy 🌬️";
    return "Stormy ⛈️";
  };

  const mood = getWeatherMood();
  const hasData = temperature || humidity || windSpeed || location;

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)",
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
      color: "#e2e8f0",
    },
    container: {
      maxWidth: "800px",
      margin: "0 auto",
    },
    pageTitle: {
      fontSize: "clamp(20px, 4vw, 28px)",
      fontWeight: "900",
      color: "#ffffff",
      marginBottom: "4px",
    },
    subtitle: {
      color: "#64748b",
      fontSize: "13px",
      marginBottom: "28px",
    },
    // Big weather mood card
    moodCard: {
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "24px",
      padding: "clamp(24px, 5vw, 36px)",
      textAlign: "center",
      marginBottom: "24px",
      backdropFilter: "blur(10px)",
    },
    moodIcon: {
      fontSize: "clamp(50px, 12vw, 72px)",
      marginBottom: "12px",
    },
    moodTemp: {
      fontSize: "clamp(40px, 10vw, 64px)",
      fontWeight: "900",
      color: mood.color,
      lineHeight: 1,
    },
    moodLabel: {
      fontSize: "16px",
      color: "#94a3b8",
      marginTop: "8px",
    },
    moodLocation: {
      fontSize: "14px",
      color: "#475569",
      marginTop: "4px",
    },
    // Grid layout for stat cards
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "14px",
      marginBottom: "24px",
    },
    statCard: (accent) => ({
      background: "rgba(255,255,255,0.05)",
      border: `1px solid ${accent}30`,
      borderRadius: "16px",
      padding: "18px",
      textAlign: "center",
    }),
    statIcon: {
      fontSize: "24px",
      marginBottom: "8px",
    },
    statValue: (color) => ({
      fontSize: "clamp(18px, 4vw, 24px)",
      fontWeight: "900",
      color,
    }),
    statLabel: {
      fontSize: "12px",
      color: "#64748b",
      marginTop: "4px",
    },
    statSub: (color) => ({
      fontSize: "11px",
      color,
      marginTop: "4px",
      fontWeight: "600",
    }),
    // Input section
    inputCard: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "20px",
      padding: "clamp(20px, 4vw, 28px)",
    },
    inputCardTitle: {
      fontSize: "13px",
      fontWeight: "700",
      color: "#94a3b8",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "18px",
    },
    inputGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "14px",
      marginBottom: "18px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    inputLabel: {
      fontSize: "11px",
      fontWeight: "700",
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    input: {
      padding: "11px 14px",
      borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.1)",
      background: "rgba(255,255,255,0.07)",
      color: "#e2e8f0",
      fontSize: "14px",
      outline: "none",
      fontFamily: "'Segoe UI', sans-serif",
    },
    btnRow: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
    },
    applyBtn: {
      flex: 1,
      padding: "12px",
      borderRadius: "12px",
      border: "none",
      background: "linear-gradient(90deg, #3b82f6, #2563eb)",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      minWidth: "120px",
      boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
    },
    resetBtn: {
      padding: "12px 22px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.15)",
      background: "transparent",
      color: "#94a3b8",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.pageTitle}>🌤️ Weather Dashboard</h2>
        <p style={styles.subtitle}>
          Part D — Multiple State Variables · Independent Updates · Reset All
        </p>

        {/* ── WEATHER MOOD CARD ── */}
        <div style={styles.moodCard}>
          <div style={styles.moodIcon}>{mood.icon}</div>
          <div style={styles.moodTemp}>
            {temperature ? `${temperature}°C` : "—°C"}
          </div>
          <div style={styles.moodLabel}>{mood.label}</div>
          {location && (
            <div style={styles.moodLocation}>📍 {location}</div>
          )}
        </div>

        {/* ── STATS GRID ── */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard("#f59e0b")}>
            <div style={styles.statIcon}>🌡️</div>
            <div style={styles.statValue("#f59e0b")}>
              {temperature ? `${temperature}°` : "—"}
            </div>
            <div style={styles.statLabel}>Temperature</div>
          </div>

          <div style={styles.statCard("#3b82f6")}>
            <div style={styles.statIcon}>💧</div>
            <div style={styles.statValue("#3b82f6")}>
              {humidity ? `${humidity}%` : "—"}
            </div>
            <div style={styles.statLabel}>Humidity</div>
            <div style={styles.statSub("#3b82f6")}>{getHumidityLabel(hum)}</div>
          </div>

          <div style={styles.statCard("#10b981")}>
            <div style={styles.statIcon}>💨</div>
            <div style={styles.statValue("#10b981")}>
              {windSpeed ? `${windSpeed}` : "—"}
            </div>
            <div style={styles.statLabel}>Wind (km/h)</div>
            <div style={styles.statSub("#10b981")}>{getWindLabel(wind)}</div>
          </div>

          <div style={styles.statCard("#a855f7")}>
            <div style={styles.statIcon}>📍</div>
            <div style={{
              fontSize: "clamp(12px, 3vw, 16px)",
              fontWeight: "700",
              color: "#a855f7",
              wordBreak: "break-word",
            }}>
              {location || "—"}
            </div>
            <div style={styles.statLabel}>Location</div>
          </div>
        </div>

        {/* ── INPUT SECTION ── */}
        <div style={styles.inputCard}>
          <p style={styles.inputCardTitle}>⚙️ Update Weather Data</p>

          <div style={styles.inputGrid}>

            {/* Each input has its OWN state setter — fully independent */}

            {/* Temperature state */}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>🌡️ Temperature (°C)</label>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="e.g. 32"
                style={styles.input}
              />
            </div>

            {/* Humidity state */}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>💧 Humidity (%)</label>
              <input
                type="number"
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
                placeholder="e.g. 65"
                min="0"
                max="100"
                style={styles.input}
              />
            </div>

            {/* Wind speed state */}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>💨 Wind Speed (km/h)</label>
              <input
                type="number"
                value={windSpeed}
                onChange={(e) => setWindSpeed(e.target.value)}
                placeholder="e.g. 18"
                min="0"
                style={styles.input}
              />
            </div>

            {/* Location state */}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>📍 Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Ramgarh, Jharkhand"
                style={styles.input}
              />
            </div>

          </div>

          <div style={styles.btnRow}>
            <button
              style={styles.applyBtn}
              onClick={() => alert("✅ Weather data updated!")}
            >
              ✅ Apply Data
            </button>

            {/* RESET ALL — calls all 4 setters to clear every state */}
            <button style={styles.resetBtn} onClick={handleResetAll}>
              ↺ Reset All
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WeatherDashboard;
