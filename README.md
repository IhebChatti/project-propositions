# Assia Sweet — proposition e-commerce & dashboard

Maquette de présentation Next.js : **trois modèles de boutique** (v8 §13) et un **dashboard de pilotage** partagé. Aucune vente réelle, aucune API connectée.

## Parcours démo

| URL | Contenu |
|-----|---------|
| `/` | Choix des propositions |
| `/store-a` | Modèle 1 — Maison Assia (10 j) |
| `/store-b` | Modèle 2 — Atelier grossiste (16 j) |
| `/store-c` | Modèle 3 — Sugar Lab (24 j) |
| `/dashboard` | Espace admin (commandes, stocks, IA…) |

Un **switcher flottant** en bas de page permet de changer de vue sans repasser par l’accueil.

Chaque boutique inclut des écrans maquette : catalogue, fiche produit, panier, compte pro, recherche, app suivi (B03), chatbot IA (scripté).

## Développement local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Build & déploiement Netlify

Le projet est configuré en **export statique** (`out/`).

```bash
npm run build
```

Sur [Netlify](https://www.netlify.com/) :

1. Connecter le dépôt Git (ou glisser-déposer le dossier).
2. Build command : `npm run build`
3. Publish directory : `out`

Le fichier `netlify.toml` à la racine reprend ces réglages.

## Stack

- Next.js 15 (App Router, static export)
- React 19, TypeScript
- CSS custom (pas de Tailwind)

© Proposition de design — Web Works Rise / client Assia Sweet.
