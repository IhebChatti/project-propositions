"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { DemoButton } from "@/components/DemoButton";

const NAV = [
  { href: "/dashboard", label: "Vue d’ensemble", exact: true },
  { href: "/dashboard/commandes", label: "Commandes" },
  { href: "/dashboard/preparation", label: "Préparation" },
  { href: "/dashboard/catalogue", label: "Catalogue" },
  { href: "/dashboard/stocks", label: "Stocks & lots" },
  { href: "/dashboard/clients", label: "Clients" },
  { href: "/dashboard/paiements", label: "Paiements" },
  { href: "/dashboard/equipe", label: "Équipe" },
  { href: "/dashboard/modules", label: "Modules" },
  { href: "/dashboard/ia", label: "IA & automatisation" },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href || pathname === `${href}/`;
  return pathname.startsWith(href);
}

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="dash-root">
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <span>Assia Sweet</span>
          <small>Pilotage</small>
        </div>
        <nav aria-label="Dashboard">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(pathname, item.href, item.exact) ? "is-active" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="dash-back">
          ← Propositions
        </Link>
      </aside>
      <div className="dash-main">
        <header className="dash-topbar">
          <div>
            <strong>Espace d’administration</strong>
            <span>Maquette — données illustratives</span>
          </div>
          <DemoButton className="dash-btn">Exporter CSV</DemoButton>
        </header>
        {children}
      </div>
    </div>
  );
}
