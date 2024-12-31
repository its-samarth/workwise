"use client";
import { useSession, signIn } from "next-auth/react";
import TrainCoach from "../components/TrainCoach";

const TrainPage = () => {
  const { data: session, status } = useSession();

  // Show a loading state while checking the session
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // If there is no session, show a message and sign-in button
  if (!session) {
    return (
      <div style={styles.pageContainer}>
        <h1 style={styles.title}>Access Denied</h1>
        <p style={styles.description}>
          You need to sign in to view this page.
        </p>
        <button onClick={() => signIn()} style={styles.button}>
          Sign in
        </button>
      </div>
    );
  }

  // If the user is signed in, show the train seating arrangement
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
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
export default TrainPage;
