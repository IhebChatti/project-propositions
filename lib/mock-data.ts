export type StoreModel = "a" | "b" | "c";

export const METIER_NAV = [
  { label: "Produits", slug: "produits" },
  { label: "Bonbon en Vrac", slug: "vrac" },
  { label: "Sucettes", slug: "sucettes" },
  { label: "Chewing-Gum", slug: "chewing" },
  { label: "Gadgets & Sprays", slug: "gadgets" },
  { label: "Tubos & Présentoirs", slug: "tubos" },
  { label: "Jumbos & Ceintures", slug: "jumbos" },
  { label: "Snacking", slug: "snacking" },
  { label: "Déstockage", slug: "destockage" },
  { label: "Promotions", slug: "promotions", icon: "🔥" },
] as const;

export const USP_TICKER = [
  "Livraison 48–72h",
  "Retrait gratuit sur place",
  "Dès 100 € HT — remises dès 6 colis",
  "Produits halal certifiés",
  "390+ références en stock",
];

export const BRAND_NAMES = [
  "HARIBO",
  "FINI",
  "DAMEL",
  "TROLLI",
  "CHUPA CHUPS",
  "CARAMBAR",
  "MALABAR",
  "HITSCHLER",
  "HOLLYWOOD",
  "MENTOS",
];

export type Product = {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  badge?: string;
  format: string;
  priceHt: number;
  priceTtcHint: number;
  image: string;
  alt: string;
  allergens: string;
  stock: "En stock" | "Stock faible" | "Rupture";
  isNew?: boolean;
  isTop?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "1",
    sku: "AS-BG-250",
    name: "Bouteilles bubble gum",
    brand: "DAMEL",
    category: "Bonbon en Vrac",
    categorySlug: "vrac",
    badge: "TOP VENTE",
    format: "Sachet 250 g · Carton 12",
    priceHt: 3.25,
    priceTtcHint: 3.9,
    image: "/products/bubble-gum.svg",
    alt: "Bouteilles bubble gum",
    allergens: "Peut contenir des traces de gluten",
    stock: "En stock",
    isTop: true,
  },
  {
    id: "2",
    sku: "AS-FR-250",
    name: "Fraises sauvages",
    brand: "FINI",
    category: "Bonbon en Vrac",
    categorySlug: "vrac",
    format: "Sachet 250 g",
    priceHt: 2.92,
    priceTtcHint: 3.5,
    image: "/products/strawberries.svg",
    alt: "Fraises sauvages",
    allergens: "Sans allergène majeur déclaré",
    stock: "En stock",
    isNew: true,
  },
  {
    id: "3",
    sku: "AS-RB-250",
    name: "Rubans arc-en-ciel",
    brand: "TROLLI",
    category: "Bonbon en Vrac",
    categorySlug: "vrac",
    badge: "ACIDULÉ",
    format: "Sachet 250 g",
    priceHt: 3.25,
    priceTtcHint: 3.9,
    image: "/products/rainbow.svg",
    alt: "Rubans acidulés",
    allergens: "Contient des colorants",
    stock: "Stock faible",
    isTop: true,
  },
  {
    id: "4",
    sku: "AS-OR-250",
    name: "Oursons fruités",
    brand: "HARIBO",
    category: "Bonbon en Vrac",
    categorySlug: "vrac",
    format: "Sachet 250 g",
    priceHt: 2.92,
    priceTtcHint: 3.5,
    image: "/products/bears.svg",
    alt: "Oursons fruités",
    allergens: "Gélatine porcine",
    stock: "En stock",
    isTop: true,
  },
  {
    id: "5",
    sku: "AS-SU-100",
    name: "Sucettes cœur",
    brand: "CHUPA CHUPS",
    category: "Sucettes",
    categorySlug: "sucettes",
    format: "Boîte 100 unités",
    priceHt: 8.4,
    priceTtcHint: 10.08,
    image: "/products/mood-strawberry.svg",
    alt: "Sucettes cœur",
    allergens: "Sans allergène majeur",
    stock: "En stock",
    isNew: true,
  },
  {
    id: "6",
    sku: "AS-CG-200",
    name: "Chewing menthe",
    brand: "HOLLYWOOD",
    category: "Chewing-Gum",
    categorySlug: "chewing",
    format: "Paquet 200 pièces",
    priceHt: 12.5,
    priceTtcHint: 15.0,
    image: "/products/mood-bananas.svg",
    alt: "Chewing menthe",
    allergens: "Contient sorbitol",
    stock: "En stock",
  },
  {
    id: "7",
    sku: "AS-TB-24",
    name: "Tubo présentoir mix",
    brand: "FINI",
    category: "Tubos & Présentoirs",
    categorySlug: "tubos",
    format: "Présentoir 24 tubos",
    priceHt: 45.0,
    priceTtcHint: 54.0,
    image: "/products/hero-bottles.svg",
    alt: "Tubo présentoir",
    allergens: "Voir fiche produit",
    stock: "En stock",
    isTop: true,
  },
  {
    id: "8",
    sku: "AS-PR-500",
    name: "Dragibus vrac promo",
    brand: "HARIBO",
    category: "Promotions",
    categorySlug: "promotions",
    badge: "−15 %",
    format: "Sachet 500 g",
    priceHt: 5.95,
    priceTtcHint: 7.14,
    image: "/products/bubble-gum.svg",
    alt: "Dragibus promo",
    allergens: "Gélatine",
    stock: "Stock faible",
  },
];

export const CATEGORY_TILES = METIER_NAV.filter((n) => n.slug !== "produits" && n.slug !== "promotions").map(
  (n) => ({
    ...n,
    count: PRODUCTS.filter((p) => p.categorySlug === n.slug).length + (n.slug === "vrac" ? 120 : 12),
  }),
);

export const REVIEWS = [
  {
    quote: "Depuis que je me fournis chez Assia Sweet, mes marges sur les fêtes foraines ont décollé.",
    author: "Karim B.",
    role: "Forain · Mantes-la-Jolie",
    date: "02/06/2026",
  },
  {
    quote: "Commandé le lundi, livré le mercredi. Je ne suis plus en rupture sur les bonbons de caisse.",
    author: "Sophie L.",
    role: "Snack · Saint-Denis",
    date: "17/05/2026",
  },
  {
    quote: "Haribo, Fini, Damel… tout au même endroit, avec des tarifs pro clairs.",
    author: "Rachid M.",
    role: "Épicerie · Argenteuil",
    date: "29/04/2026",
  },
];

export const STATS = [
  { value: "390+", label: "Références en stock" },
  { value: "1 200+", label: "Clients professionnels" },
  { value: "4,9/5", label: "Note moyenne vérifiée" },
  { value: "48–72h", label: "Délai de livraison" },
];

export const DASHBOARD_KPIS = [
  { label: "Chiffre d'affaires", value: "42 860 €", delta: "+12,4 %", tone: "up" as const, hint: "30 j · TTC" },
  { label: "Commandes", value: "186", delta: "+8,2 %", tone: "up" as const, hint: "Pro + B2C" },
  { label: "Panier moyen", value: "230,43 €", delta: "+3,1 %", tone: "up" as const, hint: "HT pro" },
  { label: "Remboursements", value: "420 €", delta: "−2,0 %", tone: "down" as const, hint: "2 dossiers" },
];

export const OVERVIEW_SECONDARY_STATS = [
  { label: "Taux de conversion", value: "3,8 %", delta: "+0,4 pt", tone: "up" as const },
  { label: "Comptes pro validés", value: "14", delta: "7 j", tone: "neutral" as const },
  { label: "Stock faible / DLC", value: "8", delta: "lots alertés", tone: "neutral" as const },
  { label: "Satisfaction clients", value: "4,9/5", delta: "104 avis", tone: "up" as const },
];

export const OVERVIEW_WEEKLY_SALES = [
  { label: "Lun", amount: 5200 },
  { label: "Mar", amount: 6100 },
  { label: "Mer", amount: 4800 },
  { label: "Jeu", amount: 7200 },
  { label: "Ven", amount: 8900 },
  { label: "Sam", amount: 5400 },
  { label: "Dim", amount: 3100 },
];

export const OVERVIEW_ORDER_SPLIT = [
  { label: "Professionnels", value: 72, color: "#ff4f8a" },
  { label: "B2C", value: 18, color: "#7c6cf0" },
  { label: "CSE / collectivités", value: 10, color: "#f7d95e" },
];

export const OVERVIEW_ACTIVITY = [
  { time: "09:14", message: "Paiement Stripe reçu — Snack Le Palmiers", tag: "Paiement" },
  { time: "08:45", message: "Commande CMD-2026-1841 en attente de virement", tag: "Alerte" },
  { time: "08:02", message: "Nouveau compte pro — Épicerie Rachid", tag: "Compte" },
  { time: "Hier", message: "Lot LOT-240812 — DLC proche (Dragibus promo)", tag: "Stock" },
  { time: "Hier", message: "Expédition confirmée — CSE Vaujours", tag: "Logistique" },
];

export const OVERVIEW_TOP_PRODUCTS = [
  { name: "Bouteilles bubble gum", sku: "AS-BG-250", revenue: "4 280 € HT", units: "842 u." },
  { name: "Rubans arc-en-ciel", sku: "AS-RA-250", revenue: "3 120 € HT", units: "620 u." },
  { name: "Oursons d’or vrac", sku: "AS-OR-250", revenue: "2 890 € HT", units: "510 u." },
];

export type OrderStatus = {
  payment: "Reçu" | "En attente" | "Échec";
  prep: "À préparer" | "En préparation" | "Contrôlé" | "Expédié";
  delivery: "Non expédié" | "En transit" | "Livré" | "Retrait prêt";
};

export const ORDERS = [
  {
    id: "CMD-2026-1842",
    client: "Snack Le Palmiers",
    profile: "Pro",
    total: "412,50 € HT",
    date: "15/09/2026 09:14",
    status: { payment: "Reçu", prep: "En préparation", delivery: "Non expédié" } as OrderStatus,
  },
  {
    id: "CMD-2026-1841",
    client: "Épicerie Rachid",
    profile: "Pro",
    total: "189,00 € HT",
    date: "15/09/2026 08:02",
    status: { payment: "En attente", prep: "À préparer", delivery: "Non expédié" } as OrderStatus,
  },
  {
    id: "CMD-2026-1839",
    client: "Marie Dupont",
    profile: "B2C",
    total: "47,80 € TTC",
    date: "14/09/2026 18:44",
    status: { payment: "Reçu", prep: "Expédié", delivery: "En transit" } as OrderStatus,
  },
  {
    id: "CMD-2026-1835",
    client: "CSE Vaujours",
    profile: "Pro",
    total: "1 240,00 € HT",
    date: "14/09/2026 11:20",
    status: { payment: "Reçu", prep: "Expédié", delivery: "Livré" } as OrderStatus,
  },
];

export const PRIORITIES = [
  { label: "Commandes à préparer", count: 12, href: "/dashboard/preparation" },
  { label: "Paiements en attente", count: 3, href: "/dashboard/commandes" },
  { label: "Stocks faibles", count: 8, href: "/dashboard/stocks" },
  { label: "Demandes SAV ouvertes", count: 5, href: "/dashboard/clients" },
];

export const STOCK_LOTS = [
  { lot: "LOT-240891", product: "Rubans arc-en-ciel", dlc: "28/10/2026", qty: 48, alert: "Stock faible" },
  { lot: "LOT-240812", product: "Dragibus vrac promo", dlc: "05/10/2026", qty: 22, alert: "DLC proche" },
  { lot: "LOT-240701", product: "Bouteilles bubble gum", dlc: "15/01/2027", qty: 320, alert: "OK" },
];

export const CLIENTS = [
  { name: "Snack Le Palmiers", type: "Pro", status: "Validé", spend: "12 400 €", last: "15/09/2026" },
  { name: "Épicerie Rachid", type: "Pro", status: "En attente", spend: "—", last: "—" },
  { name: "Marie Dupont", type: "B2C", status: "Actif", spend: "890 €", last: "14/09/2026" },
];

export const ROLES = [
  { role: "Administrateur", access: "Accès complet, utilisateurs, paramètres" },
  { role: "Gestionnaire commercial", access: "Commandes, clients, catalogue, prix" },
  { role: "Préparateur", access: "Préparation, stocks, expéditions" },
  { role: "Marketing", access: "Contenus, mises en avant, campagnes" },
  { role: "Lecture comptable", access: "Consultation et exports factures" },
];

export const PAYMENT_KPIS = [
  { label: "Encaissé (30 j)", value: "42 860 €", hint: "TTC · toutes sources", tone: "up" as const, delta: "+12,4 %" },
  { label: "En attente", value: "3 240 €", hint: "3 virements · 1 CB", tone: "neutral" as const, delta: "À valider" },
  { label: "Remboursements", value: "420 €", hint: "2 dossiers ouverts", tone: "down" as const, delta: "−2,0 %" },
  { label: "Factures émises", value: "186", hint: "Dont 12 avoirs", tone: "neutral" as const, delta: "Période en cours" },
];

export const PAYMENT_CHANNELS = [
  { id: "stripe", name: "Stripe", amount: "38 420 €", share: 78, status: "Connecté", lastSync: "15/09/2026 09:12" },
  { id: "paypal", name: "PayPal", amount: "4 440 €", share: 14, status: "Connecté", lastSync: "15/09/2026 08:45" },
  { id: "wire", name: "Virement", amount: "3 240 €", share: 8, status: "3 en attente", lastSync: "14/09/2026 17:30" },
];

export const PAYMENT_TRANSACTIONS = [
  {
    id: "PAY-8842",
    orderId: "CMD-2026-1842",
    client: "Snack Le Palmiers",
    method: "Stripe",
    amount: "495,00 € TTC",
    status: "Reçu" as const,
    date: "15/09/2026 09:14",
  },
  {
    id: "PAY-8841",
    orderId: "CMD-2026-1841",
    client: "Épicerie Rachid",
    method: "Virement",
    amount: "226,80 € TTC",
    status: "En attente" as const,
    date: "15/09/2026 08:02",
  },
  {
    id: "PAY-8839",
    orderId: "CMD-2026-1839",
    client: "Marie Dupont",
    method: "PayPal",
    amount: "47,80 € TTC",
    status: "Reçu" as const,
    date: "14/09/2026 18:44",
  },
  {
    id: "PAY-8835",
    orderId: "CMD-2026-1835",
    client: "CSE Vaujours",
    method: "Stripe",
    amount: "1 488,00 € TTC",
    status: "Reçu" as const,
    date: "14/09/2026 11:20",
  },
  {
    id: "PAY-8830",
    orderId: "CMD-2026-1828",
    client: "Forain Karim B.",
    method: "Virement",
    amount: "892,50 € TTC",
    status: "En attente" as const,
    date: "13/09/2026 16:05",
  },
];

export const PAYMENT_INVOICES = [
  { id: "FAC-2026-1842", client: "Snack Le Palmiers", amount: "412,50 € HT", status: "Payée", date: "15/09/2026" },
  { id: "FAC-2026-1841", client: "Épicerie Rachid", amount: "189,00 € HT", status: "En attente", date: "15/09/2026" },
  { id: "AVO-2026-0042", client: "Marie Dupont", amount: "−12,00 € TTC", status: "Avoir émis", date: "14/09/2026" },
];

export const MODULES_B = [
  { id: "B01", title: "Administration du site", days: "25 j" },
  { id: "B02", title: "Campagnes e-mail et SMS", days: "25 j" },
  { id: "B03", title: "Application mobile de suivi", days: "Offert", offered: true },
  { id: "B04", title: "Point de vente — caisse", days: "22 j" },
  { id: "B05", title: "Livraison & transporteurs", days: "25 j" },
  { id: "B06", title: "Entrepôt avancé FEFO", days: "18 j" },
  { id: "B07", title: "Achats fournisseurs", days: "15 j" },
  { id: "B08", title: "Finance & comptabilité", days: "18 j" },
  { id: "B09", title: "Service client & FAQ", days: "12 j" },
  { id: "B10", title: "Analytics & origine ventes", days: "18 j" },
  { id: "B11", title: "Sécurité renforcée 2FA", days: "8 j" },
  { id: "B12", title: "Segmentation RFM", days: "10 j" },
];

export const CHAT_SCRIPTS: Record<string, string> = {
  default:
    "Bonjour ! Je suis l’assistant Assia Sweet (démonstration). Posez-moi une question sur les délais, les allergènes ou une commande.",
  allergenes:
    "Les allergènes sont indiqués sur chaque fiche produit. Exemple : les oursons contiennent de la gélatine porcine. Souhaitez-vous des références sans gélatine ?",
  delai:
    "Livraison 48–72h partout en France. Retrait gratuit disponible sous 2 h après notification de préparation.",
  panier:
    "Voici un panier suggéré (maquette) : 2× Bouteilles bubble gum, 1× Tubo présentoir mix — environ 94 € HT. Connectez un compte pro pour valider.",
};

export const PWA_MESSAGES = [
  { time: "15/09 09:15", text: "Commande CMD-2026-1842 confirmée. Merci !" },
  { time: "15/09 10:02", text: "Paiement reçu. Préparation en cours." },
  { time: "15/09 11:30", text: "Votre commande est en préparation." },
];

export const HERO_CAROUSEL_SLIDES = [
  {
    brand: "DAMEL",
    tagline: "Bouteilles bubble gum — format vrac",
    priceLabel: "À partir de 3,25 € HT",
    image: "/products/bubble-gum.svg",
  },
  {
    brand: "FINI",
    tagline: "Fraises sauvages acidulées",
    priceLabel: "À partir de 3,45 € HT",
    image: "/products/strawberries.svg",
  },
  {
    brand: "HARIBO",
    tagline: "Oursons d’or — classique grossiste",
    priceLabel: "À partir de 2,95 € HT",
    image: "/products/bears.svg",
  },
  {
    brand: "CHUPA CHUPS",
    tagline: "Sucettes tubo présentoir",
    priceLabel: "À partir de 18,90 € HT",
    image: "/products/rainbow.svg",
  },
] as const;

export const HERO_TRUST_STRIP = [
  { value: "1 200+", label: "Clients professionnels" },
  { value: "48–72 h", label: "Délai de livraison" },
  { value: "CB / virement", label: "Paiement sécurisé" },
  { value: "Retrait 2 h", label: "Sur place gratuit" },
] as const;

export const PRO_STEPS = [
  {
    n: 1,
    title: "Créez votre compte pro",
    desc: "Inscription en 2 minutes avec votre numéro SIRET. Réservé aux professionnels.",
  },
  {
    n: 2,
    title: "Validez votre dossier",
    desc: "Notre équipe vérifie votre activité sous 24 h ouvrées. Accès aux tarifs HT.",
  },
  {
    n: 3,
    title: "Commandez en ligne",
    desc: "Catalogue complet, remises volume et suivi de commande depuis votre espace.",
  },
] as const;

/** Thumbnail for home rayon tiles (slug → image path). */
export const CATEGORY_IMAGE_BY_SLUG: Record<string, string> = {
  vrac: "/products/bubble-gum.svg",
  sucettes: "/products/rainbow.svg",
  chewing: "/products/mood-bananas.svg",
  gadgets: "/products/mood-strawberry.svg",
  tubos: "/products/hero-bottles.svg",
  jumbos: "/products/bears.svg",
  snacking: "/products/acid-ribbons.svg",
  destockage: "/products/mood-bears.svg",
  promotions: "/products/mood-strawberry.svg",
  produits: "/products/bears.svg",
};

export function formatHt(price: number): string {
  return `${price.toFixed(2).replace(".", ",")} € HT`;
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
