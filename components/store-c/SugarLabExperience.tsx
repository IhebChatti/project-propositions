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
  BRAND_NAMES,
  PRO_STEPS,
  REVIEWS,
  HERO_TRUST_STRIP,
  CATEGORY_IMAGE_BY_SLUG,
  formatHt,
  getProduct,
  type Product,
} from "@/lib/mock-data";
import StoreChatbot from "@/components/chatbot/StoreChatbot";
import OrderTrackingTeaser from "@/components/pwa/OrderTrackingTeaser";
import { DemoButton } from "@/components/DemoButton";
import StoreSiteFooter from "@/components/store-shared/StoreSiteFooter";
import ProductArtFrame from "@/components/store-shared/ProductArtFrame";
import StoreCartDrawer from "@/components/store-shared/StoreCartDrawer";
import StoreSection from "@/components/store-shared/StoreSection";
import MotionReveal from "@/components/store-shared/MotionReveal";
import MotionStagger from "@/components/store-shared/MotionStagger";
import { useHeaderElevate } from "@/components/store-shared/useHeaderElevate";

const ROOT = storeRoot("c");
const HERO_CANDY = "/products/bubble-gum.svg";

type Props = { variant: StoreVariant; productId?: string };

export default function SugarLabExperience({ variant, productId }: Props) {
  const [cartCount, setCartCount] = useState(2);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [chipFilter, setChipFilter] = useState<string | null>(null);
  const product = productId ? getProduct(productId) : undefined;
  const addCart = () => {
    setCartCount((c) => c + 1);
    setCartOpen(true);
  };

  useEffect(() => {
    if (variant === "cart") setCartOpen(true);
  }, [variant]);

  const heroTops = PRODUCTS.filter((p) => p.isTop).slice(0, 2);
  const headerElevated = useHeaderElevate();

  const filtered = chipFilter ? PRODUCTS.filter((p) => p.categorySlug === chipFilter) : PRODUCTS;

  return (
    <div className="lab-root">
      <nav className={`lab-island${headerElevated ? " store-header-elevated" : ""}`} aria-label="Navigation principale">
        <Link href={ROOT} className="lab-logo">Assia Sweet</Link>
        <Link href={`${ROOT}/catalogue`}>Catalogue</Link>
        <Link href={`${ROOT}/compte-pro`}>Compte pro</Link>
        <button type="button" className="lab-cart-btn" onClick={() => setCartOpen(true)}>
          Panier ({cartCount})
        </button>
        <button type="button" className="lab-search-icon" onClick={() => setSearchOpen(true)} aria-label="Rechercher">
          ⌕
        </button>
      </nav>

      {variant === "home" && (
        <>
          <section className="lab-hero-split">
            <div className="motion-hero-glow" aria-hidden="true" />
            <MotionReveal className="lab-hero-copy" immediate>
              <p className="lab-eyebrow">Atelier · Sélection premium</p>
              <h1>Une confiserie qui ne ressemble à aucune autre</h1>
              <p className="lab-hero-lead">
                390+ références en tarifs pro — livraison 48–72 h, retrait gratuit, sélection pensée pour les vitrines
                qui comptent.
              </p>
              <Link href={`${ROOT}/catalogue`} className="lab-btn lab-btn-gold">Entrer dans le labo</Link>
            </MotionReveal>
            <MotionReveal className="lab-hero-showcase" immediate delayMs={100}>
              <div className="lab-showcase-main motion-float-on-hover">
                <Image src="/products/hero-bottles.svg" alt="" width={440} height={360} className="lab-showcase-hero-img" priority />
              </div>
              {heroTops.map((p) => (
                <Link key={p.id} href={`${ROOT}/produit/${p.id}`} className="lab-showcase-card motion-float-on-hover">
                  <ProductArtFrame src={p.image} alt={p.alt} theme="lab" size={160} />
                  <span>{p.brand}</span>
                  <strong>{p.name}</strong>
                </Link>
              ))}
            </MotionReveal>
          </section>

          <MotionReveal delayMs={60}>
          <nav className="lab-category-pills" aria-label="Rayons">
            {METIER_NAV.slice(0, 8).map((item) => (
              <Link key={item.slug} href={`${ROOT}/catalogue?cat=${item.slug}`}>
                {item.label}
              </Link>
            ))}
          </nav>
          </MotionReveal>

          <MotionReveal>
          <MotionStagger className="lab-trust-strip">
            {HERO_TRUST_STRIP.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </MotionStagger>
          </MotionReveal>

          <MotionReveal>
          <StoreSection title="Nos rayons" actionHref={`${ROOT}/catalogue`}>
            <MotionStagger className="lab-rayon-grid">
              {CATEGORY_TILES.slice(0, 6).map((cat) => {
                const thumb = CATEGORY_IMAGE_BY_SLUG[cat.slug] ?? HERO_CANDY;
                return (
                  <Link key={cat.slug} href={`${ROOT}/catalogue?cat=${cat.slug}`} className="lab-rayon-card motion-float-on-hover">
                    <ProductArtFrame src={thumb} alt="" theme="lab" size={200} />
                    <strong>{cat.label}</strong>
                    <span>{cat.count} pièces</span>
                  </Link>
                );
              })}
            </MotionStagger>
          </StoreSection>
          </MotionReveal>

          <MotionReveal>
          <StoreSection title="Sélection du labo" className="lab-section--berry" actionHref={`${ROOT}/catalogue`}>
            <MotionStagger className="lab-poster-grid">
              {PRODUCTS.filter((p) => p.isTop).map((p) => (
                <LabPosterCard key={p.id} product={p} onAdd={addCart} />
              ))}
            </MotionStagger>
          </StoreSection>
          </MotionReveal>

          <MotionReveal>
          <StoreSection title="Nouveautés" actionHref={`${ROOT}/catalogue`}>
            <MotionStagger className="lab-poster-grid">
              {PRODUCTS.filter((p) => p.isNew).map((p) => (
                <LabPosterCard key={p.id} product={p} onAdd={addCart} />
              ))}
            </MotionStagger>
          </StoreSection>
          </MotionReveal>

          <MotionReveal>
          <section className="lab-brands-static">
            <p>Marques disponibles</p>
            <ul>
              {BRAND_NAMES.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>
          </MotionReveal>

          <MotionReveal>
          <section className="lab-ritual">
            <h2>Trois gestes, accès pro en 24 h</h2>
            <ol>
              {PRO_STEPS.map((step) => (
                <li key={step.n}>
                  <span>{step.n}</span>
                  <strong>{step.title}</strong>
                  <p>{step.desc}</p>
                </li>
              ))}
            </ol>
            <Link href={`${ROOT}/compte-pro`} className="lab-btn lab-btn-gold">Créer mon compte pro</Link>
          </section>
          </MotionReveal>

          <MotionReveal>
          <section className="lab-manifesto">
            <p>“{REVIEWS[0].quote}”</p>
            <div className="lab-chips">
              {REVIEWS.slice(1).map((r) => (
                <div key={r.author} className="lab-chip">
                  <p>{r.quote}</p>
                  <span>{r.author} · {r.role}</span>
                </div>
              ))}
            </div>
          </section>
          </MotionReveal>
        </>
      )}

      {variant === "catalogue" && (
        <section className="lab-catalogue">
          <h1>Galerie</h1>
          <div className="lab-chips-filter">
            <button type="button" className={!chipFilter ? "active" : ""} onClick={() => setChipFilter(null)}>
              Tous
            </button>
            {METIER_NAV.filter((n) => n.slug !== "produits").map((n) => (
              <button
                key={n.slug}
                type="button"
                className={chipFilter === n.slug ? "active" : ""}
                onClick={() => setChipFilter(n.slug)}
              >
                {n.label}
              </button>
            ))}
          </div>
          <div className="lab-poster-grid lab-poster-grid--catalogue">
            {filtered.map((p) => (
              <LabPosterCard key={p.id} product={p} onAdd={addCart} />
            ))}
          </div>
        </section>
      )}

      {variant === "product" && product && (
        <section className="lab-theatre">
          <div className="lab-pedestal">
            <ProductArtFrame src={product.image} alt={product.alt} theme="lab" size={400} priority />
          </div>
          <div className="lab-theatre-copy">
            <span className="lab-stamp-inline">{product.brand}</span>
            <h1>{product.name}</h1>
            <p>{product.format}</p>
            <p className="lab-price">{formatHt(product.priceHt)}</p>
            <p>{product.allergens}</p>
            <button type="button" className="lab-btn lab-btn-gold" onClick={addCart}>Ajouter au plateau</button>
          </div>
          <section className="lab-related">
            <h2>En même temps</h2>
            <div className="lab-poster-grid">
              {PRODUCTS.filter((p) => p.id !== product.id)
                .slice(0, 3)
                .map((p) => (
                  <LabPosterCard key={p.id} product={p} onAdd={addCart} />
                ))}
            </div>
          </section>
        </section>
      )}

      {variant === "product" && !product && (
        <section className="lab-page">
          <p>Produit introuvable.</p>
          <Link href={`${ROOT}/catalogue`}>Retour</Link>
        </section>
      )}

      {variant === "cart" && (
        <section className="lab-page">
          <p>Votre plateau s’ouvre dans le panneau latéral.</p>
          <Link href={ROOT} className="lab-btn lab-btn-gold">Retour à l’accueil</Link>
        </section>
      )}

      {variant === "compte" && (
        <section className="lab-page lab-velvet">
          <h1>Demande d’accès atelier</h1>
          <form className="lab-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Raison sociale
              <input type="text" />
            </label>
            <label>
              SIRET
              <input type="text" />
            </label>
            <label>
              E-mail pro
              <input type="email" />
            </label>
            <DemoButton className="lab-btn lab-btn-gold">Envoyer</DemoButton>
          </form>
        </section>
      )}

      {variant === "search" && (
        <section className="lab-page">
          <button type="button" className="lab-btn lab-btn-gold" onClick={() => setSearchOpen(true)}>
            Ouvrir la recherche
          </button>
        </section>
      )}

      {variant === "app" && (
        <section className="lab-page">
          <OrderTrackingTeaser fullPage />
        </section>
      )}

      <StoreSiteFooter model="c" />

      <StoreCartDrawer
        theme="lab"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        root={ROOT}
        itemCount={cartCount}
      />

      {searchOpen ? (
        <div className="lab-search-overlay" role="dialog">
          <button type="button" onClick={() => setSearchOpen(false)} aria-label="Fermer">×</button>
          <input type="search" placeholder="Rechercher…" autoFocus />
          <div className="lab-poster-grid lab-poster-grid--catalogue">
            {PRODUCTS.slice(0, 6).map((p) => (
              <LabPosterCard key={p.id} product={p} onAdd={addCart} />
            ))}
          </div>
        </div>
      ) : null}

      <StoreChatbot theme="lab" />
    </div>
  );
}

function LabPosterCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const ROOT = storeRoot("c");
  return (
    <article className="lab-poster-card motion-float-on-hover">
      <Link href={`${ROOT}/produit/${product.id}`} className="lab-poster-card-link">
        <ProductArtFrame src={product.image} alt={product.alt} theme="lab" size={320} />
        <span className="lab-stamp-inline">{product.brand}</span>
        <h3>{product.name}</h3>
        <em>{formatHt(product.priceHt)}</em>
      </Link>
      <button type="button" className="lab-poster-add" onClick={onAdd} aria-label="Ajouter">+</button>
    </article>
  );
}
