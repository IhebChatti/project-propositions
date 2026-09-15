import Link from "next/link";

export default function NotFound() {
  return (
    <main className="hub" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      <div>
        <h1>Page introuvable</h1>
        <p>
          <Link href="/">Retour aux propositions</Link>
        </p>
      </div>
    </main>
  );
}
