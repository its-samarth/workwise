// src/app/train/page.js

import TrainCoach from "../components/TrainCoach";

const TrainPage = () => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerContainer}>
        <h1 style={styles.title}>Train Seating Arrangement</h1>
        <p style={styles.description}>
          Below is the seating arrangement for a single coach:
        </p>
      </div>
      <div style={styles.coachContainer}>
        <TrainCoach />
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9", // Light grey background for contrast
    boxSizing: "border-box",
  },
  headerContainer: {
    textAlign: "center",
    marginBottom: "20px",
    padding: "0 10px",
  },
  title: {
    fontSize: "clamp(20px, 4vw, 28px)", // Adjusts based on screen width
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  description: {
    fontSize: "clamp(14px, 2.5vw, 18px)", // Responsive text size
    color: "#555",
  },
  coachContainer: {
    width: "100%",
    maxWidth: "800px", // Limits width on larger screens
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },
};

export default TrainPage;
