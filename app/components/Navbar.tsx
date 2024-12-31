"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <h1 style={styles.logo}>🚆 Ticket Booker</h1>
      </div>
      <nav style={styles.navbar}>
        <div style={styles.navLinks}>
          <Link href="/" style={styles.link}>Home</Link>
          <Link href="/train" style={styles.link}>Train Seating</Link>
        </div>
        <div style={styles.authButton}>
          {session ? (
            <button onClick={() => signOut()} style={styles.button}>Sign Out</button>
          ) : (
            <button onClick={() => signIn("github")} style={styles.button}>Sign In</button>
          )}
        </div>
      </nav>
    </header>
  );
};

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#1e293b",
    color: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderBottom: "3px solid #0070f3",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    marginRight: "10px",
  },
  tagline: {
    fontSize: "14px",
    margin: 0,
    color: "#e2e8f0",
  },
  navbar: {
    display: "flex",
    alignItems: "center",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
    marginRight: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
  },
  authButton: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "white",
    color: "#0070f3",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
};

export default Navbar;
