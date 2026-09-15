import Link from "next/link";

export default function HomePage() {
  return (
    <main className="hub hub-worlds">
      <header className="hub-header">
        <p className="hub-tag">Proposition · Assia Sweet</p>
        <h1>Trois mondes. Un dashboard. Une vision.</h1>
        <p>
          Trois expériences de boutique radicalement différentes — maquette illustrative, sans vente réelle. Choisissez
          une direction et laissez-vous surprendre.
        </p>
      </header>
      <div className="hub-grid hub-grid-worlds">
        <Link href="/store-a" className="hub-world hub-world-a">
          <span className="hub-world-label">Modèle 1</span>
          <h2>Maison</h2>
          <p>Vitrine éditoriale, polaroids, lookbook — la confiserie comme une maison de luxe.</p>
          <span className="hub-world-cta">Entrer dans la maison →</span>
        </Link>
        <Link href="/store-b" className="hub-world hub-world-b">
          <span className="hub-world-label">Modèle 2</span>
          <h2>Grossiste</h2>
          <p>Centre de commande B2B : SKU, listes, filtres — l’outil du professionnel.</p>
          <span className="hub-world-cta">Ouvrir le terminal →</span>
        </Link>
        <Link href="/store-c" className="hub-world hub-world-c">
          <span className="hub-world-label">Modèle 3</span>
          <h2>Atelier</h2>
          <p>Cinéma sucré : hero 100vh, orbes, galeries poster — le Sugar Lab.</p>
          <span className="hub-world-cta">Plonger dans le labo →</span>
        </Link>
        <Link href="/dashboard" className="hub-card dash">
          <span className="hub-tag">Socle</span>
          <h2>Dashboard</h2>
          <p>Commandes, stocks, clients, modules et IA (maquette).</p>
        </Link>
      </div>
    </main>
  );
}
