"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { StoreVariant } from "@/lib/store-types";
import { storeRoot } from "@/lib/store-types";
import {
  METIER_NAV,
  PRODUCTS,
  CATEGORY_TILES,
  REVIEWS,
  STATS,
  PRO_STEPS,
  formatHt,
  getProduct,
  type Product,
} from "@/lib/mock-data";
import { PRODUCT_IMAGES } from "@/lib/product-images";
import StoreChatbot from "@/components/chatbot/StoreChatbot";
import OrderTrackingTeaser from "@/components/pwa/OrderTrackingTeaser";
import { DemoButton } from "@/components/DemoButton";
import StoreSiteFooter from "@/components/store-shared/StoreSiteFooter";
import ProductArtFrame from "@/components/store-shared/ProductArtFrame";
import StoreCartDrawer from "@/components/store-shared/StoreCartDrawer";
import MotionReveal from "@/components/store-shared/MotionReveal";
import MotionStagger from "@/components/store-shared/MotionStagger";
import { useHeaderElevate } from "@/components/store-shared/useHeaderElevate";

const ROOT = storeRoot("b");

type Props = { variant: StoreVariant; productId?: string };

export default function GrossisteExperience({ variant, productId }: Props) {
  const [cartCount, setCartCount] = useState(2);
  const [cartOpen, setCartOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [qty, setQty] = useState<Record<string, number>>({});
  const product = productId ? getProduct(productId) : undefined;
  const addCart = () => {
    setCartCount((c) => c + 1);
    setCartOpen(true);
  };

  useEffect(() => {
    if (variant === "cart") setCartOpen(true);
  }, [variant]);

  const getQty = (id: string) => qty[id] ?? 1;
  const setProductQty = (id: string, n: number) => setQty((q) => ({ ...q, [id]: Math.max(1, n) }));

  const headerElevated = useHeaderElevate();

  const dealRails = [
    { title: "Déstockage", items: PRODUCTS.filter((p) => p.categorySlug === "promotions" || p.badge?.includes("−")) },
    { title: "Nouveautés", items: PRODUCTS.filter((p) => p.isNew) },
    { title: "Plus commandés", items: PRODUCTS.filter((p) => p.isTop) },
  ];

  return (
    <div className="gross-root">
      <div className="gross-status-bar">
        Seuil 100 € HT · Livraison 48–72h · Halal certifié · Retrait gratuit
      </div>

      <header className={`gross-header${headerElevated ? " store-header-elevated" : ""}`}>
        <Link href={ROOT} className="gross-logo">
          Assia <strong>Sweet</strong> <span>Grossiste</span>
        </Link>
        <form className="gross-search" onSubmit={(e) => e.preventDefault()} role="search">
          <input type="search" placeholder="SKU, marque, référence…" aria-label="Rechercher" />
          <Link href={`${ROOT}/recherche`} className="gross-search-btn">Chercher</Link>
        </form>
        <div className="gross-header-actions">
          <Link href={`${ROOT}/compte-pro`} className="gross-btn gross-btn-outline">Compte pro</Link>
          <button type="button" className="gross-btn gross-btn-solid" onClick={() => setCartOpen(true)}>
            Panier ({cartCount})
          </button>
        </div>
      </header>

      <nav className="gross-mega-wrap">
        <button
          type="button"
          className="gross-mega-toggle"
          aria-expanded={megaOpen}
          onClick={() => setMegaOpen((o) => !o)}
        >
          Tous les rayons ▾
        </button>
        <div className="gross-mega-quick">
          {METIER_NAV.slice(0, 5).map((item) => (
            <Link key={item.slug} href={`${ROOT}/catalogue?cat=${item.slug}`}>{item.label}</Link>
          ))}
        </div>
        {megaOpen ? (
          <div className="gross-mega-panel">
            {METIER_NAV.map((item) => (
              <Link key={item.slug} href={`${ROOT}/catalogue?cat=${item.slug}`} onClick={() => setMegaOpen(false)}>
                {item.label}
                {"icon" in item ? ` ${item.icon}` : ""}
              </Link>
            ))}
          </div>
        ) : null}
      </nav>

      {variant === "home" && (
        <>
          <section className="gross-command-hero">
            <MotionReveal immediate>
            <div className="gross-hero-top">
              <div>
                <h1>Le grossiste bonbons qui fait tourner votre commerce</h1>
                <p className="gross-hero-sub">390+ SKU · tarifs HT dès 100 € · livraison 48–72 h</p>
                <form className="gross-hero-search" onSubmit={(e) => e.preventDefault()}>
                  <input type="search" placeholder="Rechercher un produit, une marque, un SKU…" />
                  <Link href={`${ROOT}/catalogue`} className="gross-btn gross-btn-solid">Catalogue complet</Link>
                </form>
              </div>
              <div className="gross-hero-visual motion-float-on-hover">
                <ProductArtFrame src={PRODUCT_IMAGES.displayMix} alt="Présentoirs et tubos Assia Sweet" theme="gross" size={320} />
                <p>Présentoirs &amp; tubos — best-sellers pro</p>
              </div>
            </div>
            </MotionReveal>
            <MotionReveal delayMs={80}>
            <MotionStagger className="gross-deal-rails">
              {dealRails.map((rail) => (
                <div key={rail.title} className="gross-deal-rail motion-float-on-hover">
                  <h2>{rail.title}</h2>
                  {(rail.items.length ? rail.items : PRODUCTS.slice(0, 2)).map((p) => (
                    <Link key={p.id} href={`${ROOT}/produit/${p.id}`} className="gross-deal-card">
                      <span className="gross-sku">{p.sku}</span>
                      <strong>{p.name}</strong>
                      <em>{formatHt(p.priceHt)}</em>
                    </Link>
                  ))}
                </div>
              ))}
            </MotionStagger>
            </MotionReveal>
          </section>

          <MotionReveal>
          <section className="gross-ray-table">
            <h2>Rayons</h2>
            <MotionStagger className="gross-ray-grid">
              {CATEGORY_TILES.map((cat) => (
                <Link key={cat.slug} href={`${ROOT}/catalogue?cat=${cat.slug}`} className="gross-ray-cell motion-float-on-hover">
                  <span className="gross-ray-icon">◆</span>
                  <strong>{cat.label}</strong>
                  <span>{cat.count} refs</span>
                </Link>
              ))}
            </MotionStagger>
          </section>
          </MotionReveal>

          <MotionReveal>
          <section className="gross-list-section">
            <h2>Commande rapide — plus commandés</h2>
            <GrossProductList products={PRODUCTS.filter((p) => p.isTop)} getQty={getQty} setProductQty={setProductQty} onAdd={addCart} />
          </section>
          </MotionReveal>

          <MotionReveal>
          <section className="gross-list-section">
            <h2>Nouveautés</h2>
            <GrossProductList products={PRODUCTS.filter((p) => p.isNew)} getQty={getQty} setProductQty={setProductQty} onAdd={addCart} />
          </section>
          </MotionReveal>

          <MotionReveal>
          <MotionStagger className="gross-kpi-strip">
            {STATS.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </MotionStagger>
          </MotionReveal>

          <MotionReveal>
          <section className="gross-steps">
            <h2>Compte pro en 3 étapes</h2>
            <ol>
              {PRO_STEPS.map((step) => (
                <li key={step.n}>
                  <span>{step.n}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          </MotionReveal>

          <MotionReveal>
          <section className="gross-reviews">
            <div className="gross-score">
              <strong>4,9/5</strong>
              <span>104 avis vérifiés</span>
            </div>
            <ul>
              {REVIEWS.map((r) => (
                <li key={r.author}>
                  <p>{r.quote}</p>
                  <span>{r.author} · {r.role}</span>
                </li>
              ))}
            </ul>
          </section>
          </MotionReveal>
        </>
      )}

      {variant === "catalogue" && (
        <section className="gross-catalogue-layout">
          <aside className="gross-filters">
            <h2>Filtres</h2>
            <fieldset>
              <legend>Catégorie</legend>
              {METIER_NAV.map((n) => (
                <label key={n.slug}>
                  <input type="checkbox" readOnly /> {n.label}
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Disponibilité</legend>
              <label><input type="checkbox" readOnly checked /> En stock</label>
              <label><input type="checkbox" readOnly /> Stock faible</label>
            </fieldset>
          </aside>
          <div className="gross-catalogue-main">
            <header className="gross-catalogue-head">
              <h1>Catalogue</h1>
              <div className="gross-catalogue-tools">
                <select aria-label="Tri">
                  <option>Pertinence</option>
                  <option>Prix HT croissant</option>
                </select>
                <button type="button" className="gross-view-toggle" onClick={() => setGridView((g) => !g)}>
                  {gridView ? "Vue liste" : "Vue grille"}
                </button>
                <DemoButton className="gross-btn gross-btn-outline">Exporter la sélection</DemoButton>
              </div>
            </header>
            {gridView ? (
              <div className="gross-product-grid">
                {PRODUCTS.map((p) => (
                  <GrossGridCard key={p.id} product={p} onAdd={addCart} />
                ))}
              </div>
            ) : (
              <GrossProductList products={PRODUCTS} getQty={getQty} setProductQty={setProductQty} onAdd={addCart} />
            )}
          </div>
        </section>
      )}

      {variant === "product" && product && (
        <section className="gross-fiche">
          <div className="gross-fiche-head">
            <ProductArtFrame src={product.image} alt={product.alt} theme="gross" size={120} />
            <div>
              <p className="gross-sku">{product.sku}</p>
              <h1>{product.name}</h1>
              <p>{product.brand} · {product.format}</p>
            </div>
          </div>
          <div className="gross-fiche-spec">
            <table>
              <tbody>
                <tr><th>Prix HT</th><td>{formatHt(product.priceHt)}</td></tr>
                <tr><th>TTC indicatif</th><td>{product.priceTtcHint.toFixed(2).replace(".", ",")} €</td></tr>
                <tr><th>Stock</th><td>{product.stock}</td></tr>
                <tr><th>Allergènes</th><td>{product.allergens}</td></tr>
              </tbody>
            </table>
            <div className="gross-qty-row">
              <label>
                Quantité
                <input
                  type="number"
                  min={1}
                  value={getQty(product.id)}
                  onChange={(e) => setProductQty(product.id, Number(e.target.value))}
                />
              </label>
              <button type="button" className="gross-btn gross-btn-solid" onClick={addCart}>Ajouter au panier</button>
            </div>
          </div>
          <section>
            <h2>Souvent achetés ensemble</h2>
            <GrossProductList
              products={PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3)}
              getQty={getQty}
              setProductQty={setProductQty}
              onAdd={addCart}
            />
          </section>
        </section>
      )}

      {variant === "product" && !product && (
        <section className="gross-page">
          <p>Produit introuvable.</p>
          <Link href={`${ROOT}/catalogue`}>Retour au catalogue</Link>
        </section>
      )}

      {variant === "cart" && (
        <section className="gross-page">
          <p>Votre panier s’ouvre dans le panneau latéral.</p>
          <Link href={ROOT} className="gross-btn gross-btn-solid">Retour à l’accueil</Link>
        </section>
      )}

      {variant === "compte" && (
        <section className="gross-page gross-compte">
          <h1>Compte professionnel</h1>
          <form className="gross-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Numéro SIRET
              <input type="text" placeholder="123 456 789 00012" />
            </label>
            <label>
              Raison sociale
              <input type="text" placeholder="Snack Le Palmiers" />
            </label>
            <label>
              E-mail professionnel
              <input type="email" placeholder="contact@exemple.fr" />
            </label>
            <DemoButton className="gross-btn gross-btn-solid">Envoyer ma demande</DemoButton>
          </form>
          <p>Validation sous 24 h ouvrées.</p>
        </section>
      )}

      {variant === "search" && (
        <section className="gross-page">
          <h1>Recherche</h1>
          <input type="search" className="gross-search-large" placeholder="bonbon halal sans gélatine…" autoFocus />
          <GrossProductList products={PRODUCTS.slice(0, 4)} getQty={getQty} setProductQty={setProductQty} onAdd={addCart} />
        </section>
      )}

      {variant === "app" && (
        <section className="gross-page">
          <OrderTrackingTeaser fullPage />
        </section>
      )}

      <StoreSiteFooter model="b" />

      <StoreCartDrawer
        theme="grossiste"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        root={ROOT}
        itemCount={cartCount}
      />

      <StoreChatbot theme="grossiste" />
    </div>
  );
}

function GrossProductList({
  products,
  getQty,
  setProductQty,
  onAdd,
}: {
  products: Product[];
  getQty: (id: string) => number;
  setProductQty: (id: string, n: number) => void;
  onAdd: () => void;
}) {
  const ROOT = storeRoot("b");
  return (
    <div className="gross-lines">
      {products.map((p) => (
        <div key={p.id} className="gross-line">
          <Link href={`${ROOT}/produit/${p.id}`} className="gross-line-thumb">
            <ProductArtFrame src={p.image} alt="" theme="gross" size={56} />
          </Link>
          <div className="gross-line-info">
            <span className="gross-sku">{p.sku}</span>
            <Link href={`${ROOT}/produit/${p.id}`}><strong>{p.name}</strong></Link>
            <span>{p.format}</span>
            <span className={`gross-stock gross-stock--${p.stock === "En stock" ? "ok" : "low"}`}>{p.stock}</span>
          </div>
          <div className="gross-line-price">{formatHt(p.priceHt)}</div>
          <div className="gross-line-qty">
            <button type="button" onClick={() => setProductQty(p.id, getQty(p.id) - 1)} aria-label="Moins">−</button>
            <span>{getQty(p.id)}</span>
            <button type="button" onClick={() => setProductQty(p.id, getQty(p.id) + 1)} aria-label="Plus">+</button>
          </div>
          <button type="button" className="gross-btn gross-btn-solid gross-line-add" onClick={onAdd}>Ajouter</button>
        </div>
      ))}
    </div>
  );
}

function GrossGridCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const ROOT = storeRoot("b");
  return (
    <article className="gross-grid-card">
      <Link href={`${ROOT}/produit/${product.id}`}>
        <ProductArtFrame src={product.image} alt={product.alt} theme="gross" size={160} />
        <span className="gross-sku">{product.sku}</span>
        <strong>{product.name}</strong>
        <em>{formatHt(product.priceHt)}</em>
      </Link>
      <button type="button" className="gross-btn gross-btn-solid" onClick={onAdd}>Ajouter</button>
    </article>
  );
}
