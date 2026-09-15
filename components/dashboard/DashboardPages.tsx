"use client";

import Link from "next/link";
import {
  DASHBOARD_KPIS,
  OVERVIEW_SECONDARY_STATS,
  OVERVIEW_WEEKLY_SALES,
  OVERVIEW_ORDER_SPLIT,
  OVERVIEW_ACTIVITY,
  OVERVIEW_TOP_PRODUCTS,
  ORDERS,
  PRIORITIES,
  PRODUCTS,
  STOCK_LOTS,
  CLIENTS,
  ROLES,
  MODULES_B,
  PAYMENT_KPIS,
  PAYMENT_CHANNELS,
  PAYMENT_TRANSACTIONS,
  PAYMENT_INVOICES,
} from "@/lib/mock-data";
import { DemoButton } from "@/components/DemoButton";

export function DashboardOverview() {
  const maxSale = Math.max(...OVERVIEW_WEEKLY_SALES.map((d) => d.amount));

  return (
    <div className="dash-page dash-overview-page">
      <header className="dash-overview-head">
        <div>
          <h1>Vue d’ensemble</h1>
          <p className="dash-overview-sub">
            Activité boutique et entrepôt — semaine du 8 au 15 septembre 2026 (maquette).
          </p>
        </div>
        <div className="dash-overview-head-actions">
          <DemoButton className="dash-btn dash-btn-ghost">Actualiser</DemoButton>
          <DemoButton className="dash-btn">Rapport PDF</DemoButton>
        </div>
      </header>

      <div className="dash-pay-filters" role="group" aria-label="Période">
        {["Aujourd’hui", "7 jours", "30 jours", "Année"].map((label, i) => (
          <DemoButton key={label} className={i === 2 ? "dash-chip active" : "dash-chip"}>
            {label}
          </DemoButton>
        ))}
      </div>

      <div className="dash-kpis dash-overview-kpis">
        {DASHBOARD_KPIS.map((k) => (
          <div key={k.label} className={`dash-kpi dash-overview-kpi dash-overview-kpi--${k.tone}`}>
            <span className="dash-kpi-label">{k.label}</span>
            <strong>{k.value}</strong>
            <em className={k.tone === "up" ? "up" : "down"}>{k.delta}</em>
            <small>{k.hint}</small>
            <div className="dash-kpi-spark" aria-hidden="true">
              {[40, 55, 48, 62, 58, 70, 65].map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="dash-overview-secondary">
        {OVERVIEW_SECONDARY_STATS.map((s) => (
          <div key={s.label} className="dash-overview-stat-pill">
            <span>{s.label}</span>
            <strong>{s.value}</strong>
            <em className={s.tone === "up" ? "up" : ""}>{s.delta}</em>
          </div>
        ))}
      </div>

      <div className="dash-overview-grid">
        <section className="dash-overview-panel dash-overview-chart">
          <div className="dash-pay-section-head">
            <h2>Chiffre d’affaires · 7 jours</h2>
            <span className="dash-overview-panel-meta">42 860 € · +12,4 % vs période précédente</span>
          </div>
          <div className="dash-overview-bars" role="img" aria-label="Graphique des ventes sur 7 jours">
            {OVERVIEW_WEEKLY_SALES.map((d) => (
              <div key={d.label} className="dash-overview-bar-col">
                <div className="dash-overview-bar-track">
                  <span className="dash-overview-bar-fill" style={{ height: `${(d.amount / maxSale) * 100}%` }} />
                </div>
                <span className="dash-overview-bar-label">{d.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="dash-overview-panel dash-overview-split">
          <div className="dash-pay-section-head">
            <h2>Mix commandes</h2>
          </div>
          <ul className="dash-overview-split-list">
            {OVERVIEW_ORDER_SPLIT.map((seg) => (
              <li key={seg.label}>
                <span className="dash-overview-split-dot" style={{ background: seg.color }} />
                <span>{seg.label}</span>
                <strong>{seg.value} %</strong>
              </li>
            ))}
          </ul>
          <div className="dash-overview-split-bar" aria-hidden="true">
            {OVERVIEW_ORDER_SPLIT.map((seg) => (
              <span key={seg.label} style={{ width: `${seg.value}%`, background: seg.color }} />
            ))}
          </div>
        </section>

        <section className="dash-overview-panel dash-priorities dash-overview-priorities">
          <div className="dash-pay-section-head">
            <h2>Priorités du jour</h2>
            <Link href="/dashboard/commandes" className="dash-link">
              Tout voir
            </Link>
          </div>
          <ul>
            {PRIORITIES.map((p) => (
              <li key={p.label}>
                <Link href={p.href}>
                  {p.label} <span>{p.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="dash-overview-panel dash-overview-activity">
          <div className="dash-pay-section-head">
            <h2>Activité récente</h2>
          </div>
          <ul className="dash-overview-activity-list">
            {OVERVIEW_ACTIVITY.map((a) => (
              <li key={`${a.time}-${a.message}`}>
                <time>{a.time}</time>
                <p>{a.message}</p>
                <span className="dash-overview-activity-tag">{a.tag}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="dash-overview-panel dash-overview-orders">
        <div className="dash-pay-section-head">
          <h2>Dernières commandes</h2>
          <DemoButton className="dash-btn dash-btn-ghost">Exporter</DemoButton>
        </div>
        <table className="dash-table">
          <thead>
            <tr>
              <th>N°</th>
              <th>Client</th>
              <th>Total</th>
              <th>Paiement</th>
              <th>Préparation</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.client}</td>
                <td>{o.total}</td>
                <td>
                  <span className="dash-badge">{o.status.payment}</span>
                </td>
                <td>
                  <span className="dash-badge">{o.status.prep}</span>
                </td>
                <td>
                  <DemoButton className="dash-link">Ouvrir</DemoButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="dash-overview-panel">
        <div className="dash-pay-section-head">
          <h2>Top produits (30 j)</h2>
          <Link href="/dashboard/catalogue" className="dash-link">
            Catalogue
          </Link>
        </div>
        <div className="dash-overview-top-grid">
          {OVERVIEW_TOP_PRODUCTS.map((p, i) => (
            <article key={p.sku} className="dash-overview-top-card">
              <span className="dash-overview-top-rank">#{i + 1}</span>
              <strong>{p.name}</strong>
              <code className="dash-pay-code">{p.sku}</code>
              <p>{p.revenue}</p>
              <span className="dash-overview-top-units">{p.units}</span>
            </article>
          ))}
        </div>
      </section>

      <div className="dash-note dash-overview-note">
        Données illustratives — connecteurs Stripe, transporteurs et ERP non branchés sur cette maquette.
      </div>
    </div>
  );
}

export function DashboardCommandes() {
  return (
    <div className="dash-page">
      <h1>Commandes</h1>
      <table className="dash-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Client</th>
            <th>Profil</th>
            <th>Total</th>
            <th>Paiement</th>
            <th>Préparation</th>
            <th>Livraison</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {ORDERS.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.client}</td>
              <td>{o.profile}</td>
              <td>{o.total}</td>
              <td>
                <span className="dash-badge">{o.status.payment}</span>
              </td>
              <td>
                <span className="dash-badge">{o.status.prep}</span>
              </td>
              <td>
                <span className="dash-badge">{o.status.delivery}</span>
              </td>
              <td>
                <DemoButton className="dash-link">Détail</DemoButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DashboardPreparation() {
  const docs = ["Bon de préparation", "Bon de livraison", "Facture", "Étiquette colis"];
  return (
    <div className="dash-page">
      <h1>Préparation</h1>
      <p>Statuts : à préparer → assigné → en préparation → contrôlé → prêt à expédier</p>
      <div className="dash-doc-grid">
        {docs.map((d) => (
          <div key={d} className="dash-doc-card">
            <strong>{d}</strong>
            <DemoButton className="dash-btn">Imprimer</DemoButton>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardCatalogue() {
  return (
    <div className="dash-page">
      <h1>Catalogue & tarifs</h1>
      <DemoButton className="dash-btn" message="Optionnel · maquette — non branchée">
        Rédiger avec l’IA
      </DemoButton>
      <table className="dash-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Produit</th>
            <th>Marque</th>
            <th>Prix HT pro</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {PRODUCTS.map((p) => (
            <tr key={p.id}>
              <td>{p.sku}</td>
              <td>{p.name}</td>
              <td>{p.brand}</td>
              <td>{p.priceHt.toFixed(2)} €</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DashboardStocks() {
  return (
    <div className="dash-page">
      <h1>Stocks & lots</h1>
      <Link href="/dashboard/ia" className="dash-inline-link">
        Lots à date proche (IA)
      </Link>
      <table className="dash-table">
        <thead>
          <tr>
            <th>Lot</th>
            <th>Produit</th>
            <th>DLC</th>
            <th>Qté</th>
            <th>Alerte</th>
          </tr>
        </thead>
        <tbody>
          {STOCK_LOTS.map((l) => (
            <tr key={l.lot}>
              <td>{l.lot}</td>
              <td>{l.product}</td>
              <td>{l.dlc}</td>
              <td>{l.qty}</td>
              <td>{l.alert}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DashboardClients() {
  return (
    <div className="dash-page">
      <h1>Clients & SAV</h1>
      <table className="dash-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Type</th>
            <th>Statut</th>
            <th>CA</th>
            <th>Dernière cmd</th>
          </tr>
        </thead>
        <tbody>
          {CLIENTS.map((c) => (
            <tr key={c.name}>
              <td>{c.name}</td>
              <td>{c.type}</td>
              <td>{c.status}</td>
              <td>{c.spend}</td>
              <td>{c.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DashboardPaiements() {
  return (
    <div className="dash-page dash-pay-page">
      <header className="dash-pay-head">
        <div>
          <h1>Paiements & factures</h1>
          <p className="dash-pay-sub">
            Suivi des encaissements, relances virement et export comptable — maquette illustrative.
          </p>
        </div>
        <div className="dash-pay-head-actions">
          <DemoButton className="dash-btn dash-btn-ghost">Relancer les virements</DemoButton>
          <DemoButton className="dash-btn">Export comptable CSV</DemoButton>
        </div>
      </header>

      <div className="dash-pay-filters" role="group" aria-label="Période">
        {["7 jours", "30 jours", "Trimestre", "Personnalisé"].map((label, i) => (
          <DemoButton key={label} className={i === 1 ? "dash-chip active" : "dash-chip"}>
            {label}
          </DemoButton>
        ))}
      </div>

      <div className="dash-kpis dash-pay-kpis">
        {PAYMENT_KPIS.map((k) => (
          <div key={k.label} className={`dash-kpi dash-pay-kpi dash-pay-kpi--${k.tone}`}>
            <span>{k.label}</span>
            <strong>{k.value}</strong>
            <em className={k.tone === "up" ? "up" : k.tone === "down" ? "down" : ""}>{k.delta}</em>
            <small>{k.hint}</small>
          </div>
        ))}
      </div>

      <section className="dash-pay-section">
        <div className="dash-pay-section-head">
          <h2>Canaux de paiement</h2>
          <DemoButton className="dash-link">Configurer les connecteurs</DemoButton>
        </div>
        <div className="dash-pay-channels">
          {PAYMENT_CHANNELS.map((ch) => (
            <article key={ch.id} className="dash-pay-channel">
              <div className="dash-pay-channel-top">
                <strong>{ch.name}</strong>
                <span className={`dash-pay-pill ${ch.status.includes("attente") ? "warn" : "ok"}`}>{ch.status}</span>
              </div>
              <p className="dash-pay-channel-amount">{ch.amount}</p>
              <div className="dash-pay-bar" aria-hidden="true">
                <span style={{ width: `${ch.share}%` }} />
              </div>
              <p className="dash-pay-channel-meta">Part du volume · {ch.share} % · sync {ch.lastSync}</p>
              <DemoButton className="dash-btn dash-btn-sm">Détails</DemoButton>
            </article>
          ))}
        </div>
      </section>

      <section className="dash-pay-section">
        <div className="dash-pay-section-head">
          <h2>Transactions récentes</h2>
          <div className="dash-pay-toolbar">
            <input type="search" className="dash-pay-search" placeholder="N° commande, client…" aria-label="Rechercher" />
            <DemoButton className="dash-chip">Tous statuts</DemoButton>
            <DemoButton className="dash-chip">Méthode</DemoButton>
          </div>
        </div>
        <table className="dash-table dash-pay-table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Commande</th>
              <th>Client</th>
              <th>Méthode</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {PAYMENT_TRANSACTIONS.map((t) => (
              <tr key={t.id}>
                <td>
                  <code className="dash-pay-code">{t.id}</code>
                </td>
                <td>{t.orderId}</td>
                <td>{t.client}</td>
                <td>
                  <span className="dash-pay-method">{t.method}</span>
                </td>
                <td>{t.amount}</td>
                <td>
                  <span className={`dash-badge dash-pay-status dash-pay-status--${t.status === "Reçu" ? "ok" : "pending"}`}>
                    {t.status}
                  </span>
                </td>
                <td>{t.date}</td>
                <td>
                  <DemoButton className="dash-link">Facture</DemoButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="dash-pay-section dash-pay-invoices">
        <div className="dash-pay-section-head">
          <h2>Factures & avoirs</h2>
          <DemoButton className="dash-btn dash-btn-ghost">Émettre une facture</DemoButton>
        </div>
        <div className="dash-pay-invoice-grid">
          {PAYMENT_INVOICES.map((inv) => (
            <div key={inv.id} className="dash-pay-invoice-card">
              <div className="dash-pay-invoice-top">
                <code className="dash-pay-code">{inv.id}</code>
                <span
                  className={`dash-badge dash-pay-status ${
                    inv.status === "Payée" ? "dash-pay-status--ok" : inv.status === "En attente" ? "dash-pay-status--pending" : "dash-pay-status--credit"
                  }`}
                >
                  {inv.status}
                </span>
              </div>
              <strong>{inv.client}</strong>
              <p>{inv.amount}</p>
              <span className="dash-pay-invoice-date">{inv.date}</span>
              <div className="dash-pay-invoice-actions">
                <DemoButton className="dash-link">PDF</DemoButton>
                <DemoButton className="dash-link">Envoyer</DemoButton>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function DashboardEquipe() {
  return (
    <div className="dash-page">
      <h1>Équipe & permissions</h1>
      <div className="dash-role-grid">
        {ROLES.map((r) => (
          <div key={r.role} className="dash-role-card">
            <strong>{r.role}</strong>
            <p>{r.access}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardModules() {
  return (
    <div className="dash-page">
      <h1>Modules complémentaires (Partie B)</h1>
      <div className="dash-module-grid">
        {MODULES_B.map((m) => (
          <div key={m.id} className={m.offered ? "dash-module offered" : "dash-module"}>
            <span className="dash-module-id">{m.id}</span>
            <strong className="dash-module-title">{m.title}</strong>
            <em className="dash-module-meta">{m.days}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardIA() {
  return (
    <div className="dash-page dash-ia">
      <p className="dash-note">Fonctionnalités additionnelles (Partie C) — non incluses dans le socle</p>
      <h1>IA & automatisation</h1>
      <div className="dash-copilot">
        <h2>Copilote du dashboard</h2>
        <div className="dash-copilot-demo">
          <p className="dash-q">« Quelles références ont reculé ce mois ? »</p>
          <div className="dash-a">
            <strong>Rapport commenté (maquette)</strong>
            <p>
              3 références en baisse : Rubans arc-en-ciel (−18 %), Chewing menthe (−9 %), Dragibus promo (−6 %).
              Suggestion : remise ciblée sur le lot LOT-240812 (DLC proche).
            </p>
            <DemoButton className="dash-btn">Exporter le rapport</DemoButton>
          </div>
        </div>
      </div>
      <div className="dash-ia-grid">
        {[
          "Rédaction assistée fiches produits",
          "Prévision ventes & réassort",
          "Écoulement lots à date proche",
          "Tri automatique demandes SAV",
          "Détection usages abusifs",
          "Production visuels commerciaux",
        ].map((title) => (
          <div key={title} className="dash-ia-card">
            <strong className="dash-ia-card-title">{title}</strong>
            <span className="dash-ia-card-badge">Optionnel · maquette</span>
            <DemoButton className="dash-btn dash-btn-card">Ouvrir</DemoButton>
          </div>
        ))}
      </div>
    </div>
  );
}
