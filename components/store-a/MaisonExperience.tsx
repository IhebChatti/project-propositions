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
  CATEGORY_IMAGE_BY_SLUG,
  DEFAULT_PRODUCT_IMAGE,
  HERO_TRUST_STRIP,
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

const ROOT = storeRoot("a");
const HERO_FEATURE = PRODUCTS.find((p) => p.id === "7") ?? PRODUCTS[0];
const HERO_SECONDARY = PRODUCTS.filter((p) => p.isTop && p.id !== HERO_FEATURE.id).slice(0, 2);

type Props = { variant: StoreVariant; productId?: string };

export default function MaisonExperience({ variant, productId }: Props) {
  const [cartCount, setCartCount] = useState(2);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [catFilter, setCatFilter] = useState<string | null>(null);
  const product = productId ? getProduct(productId) : undefined;

  const addCart = () => {
    setCartCount((c) => c + 1);
    setCartOpen(true);
  };

  useEffect(() => {
    if (variant === "cart") setCartOpen(true);
  }, [variant]);

  const filteredProducts = catFilter
    ? PRODUCTS.filter((p) => p.categorySlug === catFilter)
    : PRODUCTS;
  const headerElevated = useHeaderElevate();

  return (
    <div className="maison-root">
      <header className={`maison-header${headerElevated ? " store-header-elevated" : ""}`}>
        <nav className="maison-nav" aria-label="Catégories">
          {METIER_NAV.slice(0, 6).map((item) => (
            <Link key={item.slug} href={`${ROOT}/catalogue?cat=${item.slug}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href={ROOT} className="maison-brand">
          <span className="maison-brand-assia">Assia</span>
          <span className="maison-brand-sweet">Sweet</span>
          <small>La vie côté sucré</small>
        </Link>
        <div className="maison-header-actions">
          <button type="button" className="maison-search-link" onClick={() => setSearchOpen(true)}>
            Rechercher
          </button>
          <Link href={`${ROOT}/compte-pro`} className="maison-pro-link">
            Compte pro
          </Link>
          <button type="button" className="maison-cart" onClick={() => setCartOpen(true)}>
            Panier <span>{cartCount}</span>
          </button>
        </div>
      </header>

      {variant === "home" && (
        <>
          <section className="maison-hero">
            <div className="motion-hero-glow" aria-hidden="true" />
            <div className="maison-hero-inner">
              <MotionReveal className="maison-hero-copy" immediate delayMs={0}>
                <p className="maison-eyebrow">Maison Assia</p>
                <h1>
                  <em>La vie</em>
                  <br />
                  côté sucré
                </h1>
                <p className="maison-hero-lead">
                  390 références choisies pour les professionnels qui veulent une vitrine aussi belle que leurs marges.
                </p>
                <div className="maison-hero-cta">
                  <Link href={`${ROOT}/catalogue`} className="maison-btn maison-btn-primary">
                    Explorer la boutique
                  </Link>
                  <Link href={`${ROOT}/compte-pro`} className="maison-btn maison-btn-ghost">
                    Créer un compte pro
                  </Link>
                </div>
                <p className="maison-trust-line">
                  Halal certifié · Livraison 48–72h · Retrait gratuit · Paiement sécurisé
                </p>
              </MotionReveal>

              <MotionReveal className="maison-hero-vitrine" immediate delayMs={120}>
                <Link href={`${ROOT}/produit/${HERO_FEATURE.id}`} className="maison-vitrine-main motion-float-on-hover">
                  <div className="maison-vitrine-badge">{HERO_FEATURE.badge ?? "Sélection maison"}</div>
                  <div className="maison-vitrine-art">
                    <Image
                      src={HERO_FEATURE.image}
                      alt={HERO_FEATURE.alt}
                      width={480}
                      height={400}
                      priority
                      className="maison-vitrine-hero-img"
                    />
                  </div>
                  <div className="maison-vitrine-caption">
                    <span>{HERO_FEATURE.brand}</span>
                    <strong>{HERO_FEATURE.name}</strong>
                    <em>{formatHt(HERO_FEATURE.priceHt)}</em>
                  </div>
                </Link>
                {HERO_SECONDARY.map((p) => (
                  <Link key={p.id} href={`${ROOT}/produit/${p.id}`} className="maison-vitrine-card motion-float-on-hover">
                    <ProductArtFrame src={p.image} alt={p.alt} theme="maison" size={280} />
                    <div>
                      <span>{p.brand}</span>
                      <strong>{p.name}</strong>
                      <em>{formatHt(p.priceHt)}</em>
                    </div>
                  </Link>
                ))}
              </MotionReveal>
            </div>
            <a href="#maison-rayons" className="maison-scroll-cue">
              Découvrir la maison ↓
            </a>
          </section>

          <div id="maison-rayons" className="maison-body">
            <MotionReveal>
              <MotionStagger className="maison-trust-cards maison-shell">
                {HERO_TRUST_STRIP.map((item) => (
                  <div key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </MotionStagger>
            </MotionReveal>

            <MotionReveal>
            <StoreSection
              title="Explorez nos rayons"
              intro="Bonbons en vrac, sucettes, présentoirs — tout pour garnir votre commerce."
              actionHref={`${ROOT}/catalogue`}
            >
              <MotionStagger className="maison-rayon-grid">
                {CATEGORY_TILES.slice(0, 6).map((cat) => {
                  const thumb = CATEGORY_IMAGE_BY_SLUG[cat.slug] ?? DEFAULT_PRODUCT_IMAGE;
                  return (
                    <Link key={cat.slug} href={`${ROOT}/catalogue?cat=${cat.slug}`} className="maison-rayon-card">
                      <ProductArtFrame src={thumb} alt="" theme="maison" size={240} />
                      <strong>{cat.label}</strong>
                      <span>{cat.count} articles</span>
                    </Link>
                  );
                })}
              </MotionStagger>
            </StoreSection>
            </MotionReveal>

            <MotionReveal>
            <StoreSection title="Les plus commandés" actionHref={`${ROOT}/catalogue`}>
              <MotionStagger className="maison-catalogue-grid">
                {PRODUCTS.filter((p) => p.isTop).map((p) => (
                  <MaisonProductTile key={p.id} product={p} onAdd={addCart} />
                ))}
              </MotionStagger>
            </StoreSection>
            </MotionReveal>

            <MotionReveal>
            <StoreSection title="Nouveautés" actionHref={`${ROOT}/catalogue`}>
              <MotionStagger className="maison-catalogue-grid">
                {PRODUCTS.filter((p) => p.isNew).map((p) => (
                  <MaisonProductTile key={p.id} product={p} onAdd={addCart} />
                ))}
              </MotionStagger>
            </StoreSection>
            </MotionReveal>

            <MotionReveal>
            <StoreSection title="Marques de la maison" className="maison-brands-section">
              <ul className="maison-brands-list">
                {BRAND_NAMES.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </StoreSection>
            </MotionReveal>

            <MotionReveal>
            <StoreSection title="Devenez client pro en trois temps" intro="Accès aux tarifs HT sous 24 h ouvrées.">
              <ol className="maison-steps-list">
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
              <Link href={`${ROOT}/compte-pro`} className="maison-btn maison-btn-primary maison-steps-cta">
                Créer mon compte pro
              </Link>
            </StoreSection>
            </MotionReveal>

            <MotionReveal>
            <blockquote className="maison-quote maison-shell">
              <p>“{REVIEWS[0].quote}”</p>
              <footer>
                {REVIEWS[0].author} · {REVIEWS[0].role}
              </footer>
            </blockquote>
            </MotionReveal>
          </div>
        </>
      )}

      {variant === "catalogue" && (
        <div className="maison-page maison-catalogue-page">
          <nav className="maison-breadcrumb" aria-label="Fil d'Ariane">
            <Link href={ROOT}>Accueil</Link>
            <span>/</span>
            <span>Catalogue</span>
          </nav>
          <header className="maison-catalogue-header">
            <h1>Catalogue</h1>
            <p>{filteredProducts.length} références · tarifs professionnels HT</p>
          </header>
          <div className="maison-catalogue-layout">
            <aside className="maison-catalogue-aside">
              <strong>Catégories</strong>
              <button type="button" className={!catFilter ? "active" : ""} onClick={() => setCatFilter(null)}>
                Tous les produits
              </button>
              {METIER_NAV.filter((n) => n.slug !== "produits").map((n) => (
                <button
                  key={n.slug}
                  type="button"
                  className={catFilter === n.slug ? "active" : ""}
                  onClick={() => setCatFilter(n.slug)}
                >
                  {n.label}
                </button>
              ))}
            </aside>
            <MotionStagger className="maison-catalogue-grid">
              {filteredProducts.map((p) => (
                <MaisonProductTile key={p.id} product={p} onAdd={addCart} />
              ))}
            </MotionStagger>
          </div>
        </div>
      )}

      {variant === "product" && product && (
        <section className="maison-page maison-fiche">
          <nav className="maison-breadcrumb">
            <Link href={ROOT}>Accueil</Link>
            <span>/</span>
            <Link href={`${ROOT}/catalogue`}>Catalogue</Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>
          <div className="maison-fiche-grid">
            <div className="maison-fiche-visual">
              <ProductArtFrame src={product.image} alt={product.alt} theme="maison" size={480} priority />
            </div>
            <div className="maison-fiche-story">
              <p className="maison-eyebrow">{product.brand}</p>
              <h1>{product.name}</h1>
              <p>{product.format}</p>
              <p className="maison-price">{formatHt(product.priceHt)}</p>
              <dl className="maison-colophon">
                <div>
                  <dt>Disponibilité</dt>
                  <dd>{product.stock}</dd>
                </div>
                <div>
                  <dt>Allergènes</dt>
                  <dd>{product.allergens}</dd>
                </div>
              </dl>
              <button type="button" className="maison-btn maison-btn-primary" onClick={addCart}>
                Ajouter au panier
              </button>
            </div>
          </div>
          <StoreSection title="Souvent achetés ensemble">
            <div className="maison-catalogue-grid">
              {PRODUCTS.filter((p) => p.id !== product.id)
                .slice(0, 3)
                .map((p) => (
                  <MaisonProductTile key={p.id} product={p} onAdd={addCart} />
                ))}
            </div>
          </StoreSection>
        </section>
      )}

      {variant === "product" && !product && (
        <section className="maison-page">
          <p>Produit introuvable.</p>
          <Link href={`${ROOT}/catalogue`}>Retour au catalogue</Link>
        </section>
      )}

      {variant === "cart" && (
        <section className="maison-page maison-cart-redirect">
          <p>Votre panier s’ouvre dans le panneau latéral.</p>
          <Link href={ROOT} className="maison-btn maison-btn-primary">Retour à l’accueil</Link>
        </section>
      )}

      {variant === "compte" && (
        <section className="maison-page maison-compte">
          <h1>Invitation compte professionnel</h1>
          <p>Ouvrez votre accès aux tarifs grossiste. Validation sous 24 h ouvrées.</p>
          <form className="maison-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Raison sociale
              <input type="text" placeholder="Snack Le Palmiers" />
            </label>
            <label>
              Numéro SIRET
              <input type="text" placeholder="123 456 789 00012" />
            </label>
            <label>
              E-mail professionnel
              <input type="email" placeholder="contact@exemple.fr" />
            </label>
            <DemoButton className="maison-btn maison-btn-primary">Envoyer ma demande</DemoButton>
          </form>
          <p className="maison-status">Statut démo : en attente de validation</p>
        </section>
      )}

      {variant === "search" && (
        <section className="maison-page">
          <h1>Recherche</h1>
          <button type="button" className="maison-btn maison-btn-primary" onClick={() => setSearchOpen(true)}>
            Ouvrir la recherche
          </button>
        </section>
      )}

      {variant === "app" && (
        <section className="maison-page">
          <OrderTrackingTeaser fullPage />
        </section>
      )}

      <StoreSiteFooter model="a" />

      <StoreCartDrawer
        theme="maison"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        root={ROOT}
        itemCount={cartCount}
      />

      {searchOpen ? (
        <div className="maison-search-overlay" role="dialog" aria-label="Recherche">
          <button type="button" className="maison-search-close" onClick={() => setSearchOpen(false)} aria-label="Fermer">
            ×
          </button>
          <input type="search" placeholder="bonbon halal, vrac, marque…" autoFocus />
          <p>Recherche par intention — démonstration (non connectée).</p>
          <div className="maison-catalogue-grid">
            {PRODUCTS.slice(0, 6).map((p) => (
              <MaisonProductTile key={p.id} product={p} onAdd={addCart} />
            ))}
          </div>
        </div>
      ) : null}

      <StoreChatbot theme="maison" />
    </div>
  );
}

function MaisonProductTile({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const ROOT = storeRoot("a");
  return (
    <article className="maison-product-card motion-float-on-hover">
      <Link href={`${ROOT}/produit/${product.id}`} className="maison-product-card-media">
        <ProductArtFrame src={product.image} alt={product.alt} theme="maison" size={320} />
      </Link>
      <div className="maison-product-card-body">
        <span className="maison-product-brand">{product.brand}</span>
        <Link href={`${ROOT}/produit/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <p className="maison-product-price">{formatHt(product.priceHt)}</p>
        <button type="button" className="maison-btn maison-btn-primary maison-product-add" onClick={onAdd}>
          Ajouter
        </button>
      </div>
    </article>
  );
}
