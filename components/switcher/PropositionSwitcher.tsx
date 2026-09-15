"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/store-a", label: "Maison" },
  { href: "/store-b", label: "Grossiste" },
  { href: "/store-c", label: "Atelier" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function PropositionSwitcher() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <nav className="prop-switcher" aria-label="Changer de proposition">
      {LINKS.map((link) => {
        const active =
          link.href === "/dashboard"
            ? pathname.startsWith("/dashboard")
            : pathname.startsWith(link.href);
        return (
          <Link key={link.href} href={link.href} className={active ? "is-active" : undefined}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
