"use client";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Github, Chrome } from "lucide-react";
import { CSSProperties } from "react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <section style={styles.card}>
          <h2 style={styles.greeting}>
            {session
              ? `Welcome back, ${session.user?.name || "Traveler"}!`
              : "Hello, Guest!"}
          </h2>
          <p style={styles.description}>
            {session
              ? "Access all features and manage your bookings effortlessly."
              : "Sign in to unlock a seamless ticket booking experience."}
          </p>
          {session ? null : (
            <div style={styles.buttonContainer}>
              <button
                onClick={() => {
                  console.log("Google sign-in attempt...");
                  signIn("google").catch((error) => {
                    console.error("Error during Google sign-in:", error);
                  });
                }}
                style={styles.googleButton}
                className="google-btn"
              >
                <Chrome size={18} style={styles.buttonIcon} />
                <span style={styles.buttonText}>Sign in with Google</span>
              </button>

              <button
                onClick={() => signIn("github")}
                style={styles.githubButton}
                className="github-btn"
              >
                <Github size={18} style={styles.buttonIcon} />
                <span style={styles.buttonText}>Sign in with GitHub</span>
              </button>
            </div>
          )}
        </section>

        <section style={styles.linkSection}>
          <p style={styles.text}>Ready to explore seating arrangements?</p>
          <Link href="/train" style={styles.link}>
            View Train Seating
          </Link>
        </section>
      </main>

      <style jsx global>{`
        .google-btn:hover {
          background-color: #357ae8 !important;
        }
        .github-btn:hover {
          background-color: #2c2c2c !important;
        }
      `}</style>
    </div>
  );
}


const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100vh",
    backgroundColor: "#f8fafc", // Light neutral background
    fontFamily: "'Inter', sans-serif",
    color: "#333",
    padding: "0 20px",
  },
  header: {
    width: "100%",
    padding: "20px",
    backgroundColor: "#1e293b", // Dark header background
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderBottom: "3px solid #0070f3", // Accent color underline
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  },
  tagline: {
    fontSize: "14px",
    margin: "5px 0 0",
    color: "#e2e8f0", // Light text for tagline
  },
  logoutButton: {
    backgroundColor: "#ef4444", // Red for sign-out
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px",
    width: "100%",
    maxWidth: "900px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "100%",
    marginBottom: "20px",
  },
  greeting: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    fontSize: "16px",
    marginBottom: "20px",
    color: "#4b5563", // Muted text color
  },
  signInButton: {
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0070f3",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  linkSection: {
    backgroundColor: "#f1f5f9",
    padding: "20px 30px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
    width: "100%",
  },
  text: {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#4b5563",
  },
  link: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#0070f3",
    textDecoration: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    backgroundColor: "#e0f2fe",
    transition: "background-color 0.3s ease, color 0.3s ease",
    display: "inline-block",
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    maxWidth: '280px',
    margin: '0 auto',
  },
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    height: '40px',
    backgroundColor: '#4285f4',
    border: 'none',
    borderRadius: '3px',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,.25)',
    cursor: 'pointer',
    transition: 'background-color 0.218s, border-color 0.218s, box-shadow 0.218s',
  },
  githubButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    height: '40px',
    backgroundColor: '#24292e',
    border: 'none',
    borderRadius: '3px',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,.25)',
    cursor: 'pointer',
    transition: 'background-color 0.218s',
  },
  buttonIcon: {
    width: '18px',
    height: '18px',
    color: '#ffffff',
  },
  buttonText: {
    margin: '0 0 0 10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: 'Roboto, arial, sans-serif',
    letterSpacing: '0.21px',
  },
};
