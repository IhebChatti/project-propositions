import Link from "next/link";
import type { StoreModel } from "@/lib/mock-data";

type Props = {
  model: StoreModel;
};

const TAGLINES: Record<StoreModel, string> = {
  a: "La vie côté sucré — grossiste confiserie pour les professionnels.",
  b: "Tarifs HT · livraison 48–72 h · maquette B2B.",
  c: "Atelier premium — sélection confiserie pour les pros.",
};

export default function StoreSiteFooter({ model }: Props) {
  const root = `/store-${model}`;
  const themeClass = model === "a" ? "site-footer--maison" : model === "b" ? "site-footer--gross" : "site-footer--lab";

  return (
    <footer className={`site-footer ${themeClass}`}>
      <div className="site-footer-grid">
        <div className="site-footer-col site-footer-brand-col">
          <strong className="site-footer-brand">Assia Sweet</strong>
          <p>{TAGLINES[model]}</p>
        </div>
        <div className="site-footer-col">
          <span className="site-footer-label">Boutique</span>
          <Link href={`${root}/catalogue`}>Catalogue</Link>
          <Link href={`${root}/recherche`}>Recherche</Link>
          <Link href={`${root}/panier`}>Panier</Link>
        </div>
        <div className="site-footer-col">
          <span className="site-footer-label">Compte pro</span>
          <Link href={`${root}/compte-pro`}>Créer un compte</Link>
          <Link href={`${root}/app-suivi`}>App suivi</Link>
        </div>
        <div className="site-footer-col">
          <span className="site-footer-label">Infos</span>
          <Link href="/dashboard">Espace de gestion</Link>
          <a href="mailto:demo@assiasweet.fr">Contact démo</a>
        </div>
      </div>
      <p className="site-footer-legal">© 2026 Assia Sweet · Maquette illustrative · aucune vente réelle</p>
    </footer>
  );
}
