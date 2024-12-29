import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Train App</h1>
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
};
