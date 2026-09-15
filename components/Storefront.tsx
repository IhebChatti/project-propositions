"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { PRODUCT_IMAGES } from "@/lib/product-images";

type Product = {
  id: number;
  name: string;
  badge: string;
  flavor: string;
  price: string;
  image: string;
  category: "Incontournables" | "Acidulés" | "Gélifiés";
  alt: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Bouteilles bubble gum",
    badge: "LE GOÛT DE L’ENFANCE",
    flavor: "Bubble gum · Sachet de 250 g",
    price: "3,90 €",
    image: PRODUCT_IMAGES.bubbleGum,
    category: "Incontournables",
    alt: "Bouteilles de bonbon rose et bleu au bubble gum",
  },
  {
    id: 2,
    name: "Fraises sauvages",
    badge: "FRUITÉ",
    flavor: "Fraise · Sachet de 250 g",
    price: "3,50 €",
    image: PRODUCT_IMAGES.wildStrawberries,
    category: "Gélifiés",
    alt: "Bonbons fraises sauvages rouges",
  },
  {
    id: 3,
    name: "Rubans arc-en-ciel",
    badge: "ÇA PÉTILLE",
    flavor: "Multifruits · Sachet de 250 g",
    price: "3,90 €",
    image: PRODUCT_IMAGES.rainbowBelts,
    category: "Acidulés",
    alt: "Rubans de bonbons acidulés arc-en-ciel",
  },
  {
    id: 4,
    name: "Oursons fruités",
    badge: "LES INTEMPORELS",
    flavor: "Multifruits · Sachet de 250 g",
    price: "3,50 €",
    image: PRODUCT_IMAGES.gummyBears,
    category: "Gélifiés",
    alt: "Oursons fruités colorés",
  },
];

const categories = ["Incontournables", "Acidulés", "Gélifiés"] as const;

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" /></svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21a8 8 0 0 0-16 0m12-13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" /></svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l1 13H5L6 8Zm3 0V6a3 3 0 0 1 6 0v2" /></svg>
  );
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Storefront() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("Incontournables");
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const first = products.filter((product) => product.category === activeCategory);
    return [...first, ...products.filter((product) => product.category !== activeCategory)];
  }, [activeCategory]);

  const addToCart = (product: Product) => {
    setCart((current) => [...current, product]);
    setCartOpen(true);
  };

  return (
    <main>
      <div className="announcement">Un petit bonheur se prépare. Découvrez la nouvelle boutique Assia Sweet.</div>

      <header className="site-header">
        <a href="#top" className="brand" aria-label="Assia Sweet, accueil">
          <span className="brand-assia">Assia</span><span className="brand-sweet">Sweet</span>
          <small>LA VIE CÔTÉ SUCRÉ</small>
        </a>

        <nav className={menuOpen ? "desktop-nav is-open" : "desktop-nav"} aria-label="Navigation principale">
          <a href="#selection">Tous les bonbons</a>
          <a href="#acidules">Les acidulés</a>
          <a href="#selection">Les gélifiés</a>
          <a href="#maison">La maison Assia</a>
        </nav>

        <div className="header-actions">
          <button className="icon-button" aria-label="Rechercher"><SearchIcon /></button>
          <button className="icon-button hide-small" aria-label="Mon compte"><UserIcon /></button>
          <button className="cart-button" aria-label={`Panier, ${cart.length} articles`} onClick={() => setCartOpen(true)}>
            <BagIcon /><span>{cart.length}</span>
          </button>
          <button className="menu-button" onClick={() => setMenuOpen((v) => !v)} aria-label="Ouvrir le menu">{menuOpen ? "×" : "☰"}</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">LA VIE CÔTÉ SUCRÉ</p>
          <h1>LES PETITS BONHEURS,<br />À PORTÉE DE MAIN</h1>
          <p className="hero-lead">Un peu. Beaucoup. À la folie.<br />Les bonbons qu’on aime, les goûts qu’on n’oublie pas.<br />Trouvez votre prochaine envie sucrée.</p>
          <a className="pill-button dark" href="#selection">Explorer la boutique <ArrowIcon /></a>
        </div>
        <div className="hero-visual">
          <div className="hero-splash splash-one" />
          <div className="hero-splash splash-two" />
          <Image src={PRODUCT_IMAGES.bubbleGum} alt="Bouteilles rose et bleu au bubble gum, enrobées de sucre" width={780} height={720} priority />
          <div className="hero-caption">
            <span>À partager. Ou pas.</span>
            <a href="#selection">Découvrir les bouteilles bubble gum <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <section className="manifesto">
        <p className="eyebrow">BONHEUR 100 % SUCRÉ</p>
        <h2>Bouteilles bubble gum</h2>
        <div className="manifesto-grid">
          <p>Un classique qui a du caractère</p>
          <p>Des formats pour toutes les envies</p>
          <p>Les incontournables de la confiserie</p>
          <p>À retrouver chez vous</p>
        </div>
      </section>

      <section className="selection" id="selection">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">LA SÉLECTION ASSIA</p>
            <h2>Difficile de n’en choisir qu’un.</h2>
          </div>
          <a href="#selection" className="text-link">Tout découvrir <ArrowIcon /></a>
        </div>

        <div className="category-tabs" role="tablist" aria-label="Catégories de bonbons">
          {categories.map((category) => (
            <button
              role="tab"
              aria-selected={activeCategory === category}
              className={activeCategory === category ? "active" : ""}
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              {category === "Acidulés" ? "Acidulés" : category}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-media">
                <Image src={product.image} alt={product.alt} width={540} height={560} />
                <span className="product-view">Voir</span>
              </div>
              <div className="product-meta">
                <div>
                  <p className="product-badge">{product.badge}</p>
                  <h3>{product.name}</h3>
                  <p className="product-flavor">{product.flavor}</p>
                  <strong>{product.price}</strong>
                </div>
                <button className="add-button" onClick={() => addToCart(product)} aria-label={`Ajouter ${product.name}, 250 grammes, au panier`}>+</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="acid-section" id="acidules">
        <div className="acid-image">
          <Image src={PRODUCT_IMAGES.rainbowBelts} alt="Rubans arc-en-ciel acidulés" width={900} height={760} />
        </div>
        <div className="acid-copy">
          <p className="eyebrow">POUR LES AMOUREUX DE L’ACIDULÉ</p>
          <h2>Le petit frisson<br />qui fait sourire.</h2>
          <p>Ça pique un peu. Ça plaît beaucoup. Bouteilles, rubans, anneaux… découvrez les bonbons qui réveillent les papilles.</p>
          <a href="#selection" className="pill-button light">Je veux que ça pétille <ArrowIcon /></a>
        </div>
      </section>

      <section className="moods">
        <div className="section-heading centered">
          <p className="eyebrow">À CHAQUE ENVIE, SON BONBON</p>
          <h2>Quel est votre côté sucré ?</h2>
        </div>
        <div className="mood-grid">
          <a className="mood-card pink" href="#selection">
            <div><h3>La vie en fraise.</h3><p>Fruitée, tendre, irrésistible.</p><span>Bonbons fraises <ArrowIcon /></span></div>
            <Image src={PRODUCT_IMAGES.candyStrawberry} alt="Bonbons fraises" width={560} height={460} />
          </a>
          <a className="mood-card blue" href="#selection">
            <div><h3>Les classiques ont tout bon.</h3><p>Le plaisir de les retrouver.</p><span>Oursons fruités <ArrowIcon /></span></div>
            <Image src={PRODUCT_IMAGES.royalGummy} alt="Oursons fruités" width={560} height={460} />
          </a>
          <a className="mood-card yellow" href="#selection">
            <div><h3>Une touche de soleil.</h3><p>Les petits bonheurs jaunes.</p><span>Bonbons bananes <ArrowIcon /></span></div>
            <Image src={PRODUCT_IMAGES.sugarBananas} alt="Bonbons bananes" width={560} height={460} />
          </a>
        </div>
      </section>

      <section className="newsletter" id="maison">
        <div>
          <p className="eyebrow">UN PEU PLUS DE DOUCEUR ?</p>
          <h2>Gardons une place<br />pour la gourmandise.</h2>
          <p>Les nouveautés et les petites attentions d’Assia Sweet.</p>
        </div>
        <form onSubmit={(event) => event.preventDefault()} className="newsletter-form">
          <label htmlFor="email">Votre adresse e-mail</label>
          <div><input id="email" type="email" placeholder="bonjour@exemple.fr" /><button>Je m’inscris <ArrowIcon /></button></div>
        </form>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <div className="brand footer-logo"><span className="brand-assia">Assia</span><span className="brand-sweet">Sweet</span></div>
          <p>LA VIE CÔTÉ SUCRÉ</p>
          <span>Des bonbons pour les petites envies et les grandes occasions.</span>
        </div>
        <div className="footer-links">
          <div><h4>La boutique</h4><a href="#selection">Tous les bonbons</a><a href="#acidules">Les acidulés</a><a href="#selection">Les gélifiés</a><button onClick={() => setCartOpen(true)}>Mon panier</button></div>
          <div><h4>À votre écoute</h4><a href="#">Livraison & commandes</a><a href="#">Mon compte</a><a href="#">Nous contacter</a><a href="#">Vous êtes professionnel ?</a></div>
          <div><h4>La maison</h4><a href="#">Notre histoire</a><a href="#">Informations & confidentialité</a><a href="#">Espace de gestion</a></div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Assia Sweet. Maquette de présentation : prix, formats, livraison et données de gestion illustratifs. Aucune vente réelle.</span>
          <span className="payments">VISA &nbsp; Mastercard &nbsp; PayPal</span>
        </div>
      </footer>

      {cartOpen && (
        <div className="cart-layer" role="dialog" aria-modal="true" aria-label="Panier">
          <button className="cart-backdrop" aria-label="Fermer le panier" onClick={() => setCartOpen(false)} />
          <aside className="cart-drawer">
            <div className="cart-head"><h2>Mon panier <span>{cart.length}</span></h2><button onClick={() => setCartOpen(false)}>×</button></div>
            {cart.length === 0 ? (
              <div className="cart-empty"><p>Votre panier attend son petit bonheur.</p><button onClick={() => setCartOpen(false)}>Continuer mes envies</button></div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div className="cart-item" key={`${item.id}-${index}`}>
                      <Image src={item.image} alt="" width={76} height={76} />
                      <div><strong>{item.name}</strong><span>{item.flavor}</span><b>{item.price}</b></div>
                      <button aria-label={`Retirer ${item.name}`} onClick={() => setCart((current) => current.filter((_, i) => i !== index))}>×</button>
                    </div>
                  ))}
                </div>
                <div className="cart-checkout"><p><span>Sous-total</span><strong>{(cart.length * 3.7).toFixed(2).replace(".", ",")} €</strong></p><button>Passer au paiement</button><small>Maquette : le paiement n’est pas connecté.</small></div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
