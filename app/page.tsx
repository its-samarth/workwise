// app/home.js (or the relevant page file)
"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Train App</h1>
      {session ? (
        <>
          <p>Signed in as <strong>{session?.user?.email}</strong></p>
          <button onClick={() => signOut()} style={styles.button}>Sign out</button>
        </>
      ) : (
        <>
          <p>You are not signed in.</p>
          <button onClick={() => signIn("github")} style={styles.button}>Sign in with GitHub</button>
        </>
      )}
      <hr style={{ margin: "20px 0" }} />
      <p>Click below to view the seating arrangement for the train:</p>
      <Link href="/train" style={styles.link}>
        View Train Seating
      </Link>
    </div>
  );
}

const styles = {
  link: {
    color: "#0070f3",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
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
