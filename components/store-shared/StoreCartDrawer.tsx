"use client";

import Link from "next/link";
import { PRODUCTS, formatHt } from "@/lib/mock-data";
import ProductArtFrame from "@/components/store-shared/ProductArtFrame";
import { DemoButton } from "@/components/DemoButton";

type CartTheme = "maison" | "grossiste" | "lab";

type Props = {
  theme: CartTheme;
  open: boolean;
  onClose: () => void;
  root: string;
  itemCount: number;
};

const TITLES: Record<CartTheme, string> = {
  maison: "Votre sélection",
  grossiste: "Bon de commande",
  lab: "Votre plateau",
};

export default function StoreCartDrawer({ theme, open, onClose, root, itemCount }: Props) {
  if (!open) return null;

  const lines = PRODUCTS.slice(0, Math.min(3, Math.max(1, itemCount)));
  const frameTheme = theme === "grossiste" ? "gross" : theme === "lab" ? "lab" : "maison";

  return (
    <div className="cart-drawer-root" role="presentation">
      <button type="button" className="cart-drawer-backdrop" onClick={onClose} aria-label="Fermer le panier" />
      <aside
        className={`cart-drawer cart-drawer--${theme}`}
        role="dialog"
        aria-label={TITLES[theme]}
        aria-modal="true"
      >
        <header className="cart-drawer-head">
          <div>
            <strong>{TITLES[theme]}</strong>
            <span>{itemCount} article{itemCount > 1 ? "s" : ""}</span>
          </div>
          <button type="button" className="cart-drawer-close" onClick={onClose} aria-label="Fermer">×</button>
        </header>
        <div className="cart-drawer-lines">
          {lines.map((p) => (
            <div key={p.id} className="cart-drawer-line">
              <ProductArtFrame src={p.image} alt="" theme={frameTheme} size={72} />
              <div className="cart-drawer-line-body">
                <Link href={`${root}/produit/${p.id}`} onClick={onClose}>
                  <strong>{p.name}</strong>
                </Link>
                {theme === "grossiste" ? <span className="cart-drawer-sku">{p.sku}</span> : null}
                <span>{formatHt(p.priceHt)}</span>
              </div>
              <span className="cart-drawer-qty">×2</span>
            </div>
          ))}
        </div>
        <div className="cart-drawer-summary">
          <div className="cart-drawer-row">
            <span>Sous-total HT</span>
            <strong>18,42 €</strong>
          </div>
          <p className="cart-drawer-note">
            Plus que <strong>81,58 € HT</strong> pour la livraison offerte (seuil 100 € HT).
          </p>
          <label className="cart-drawer-promo">
            Code promotionnel
            <input type="text" placeholder="ASSIA-PRO" />
          </label>
        </div>
        <footer className="cart-drawer-foot">
          <DemoButton className={`cart-drawer-checkout cart-drawer-checkout--${theme}`}>
            Passer au paiement
          </DemoButton>
          <Link href={`${root}/catalogue`} className="cart-drawer-continue" onClick={onClose}>
            Continuer mes achats
          </Link>
        </footer>
      </aside>
    </div>
  );
}
