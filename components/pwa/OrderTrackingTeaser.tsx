import Link from "next/link";
import { PWA_MESSAGES } from "@/lib/mock-data";

export default function OrderTrackingTeaser({
  fullPage,
  storeBase = "/store-a",
}: {
  fullPage?: boolean;
  storeBase?: string;
}) {
  if (fullPage) {
    return (
      <div className="pwa-full">
        <h1>Application de suivi des commandes</h1>
        <p>Module B03 — offert avec le projet (PWA installable, maquette).</p>
        <div className="pwa-phone">
          <div className="pwa-phone-screen">
            <strong>Assia Sweet · Suivi</strong>
            {PWA_MESSAGES.map((m) => (
              <div key={m.time} className="pwa-msg">
                <time>{m.time}</time>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
        <button type="button" className="store-btn store-btn-primary" disabled>
          Installer sur l’écran d’accueil (démo)
        </button>
      </div>
    );
  }

  return (
    <aside className="pwa-teaser">
      <div>
        <strong>App suivi commandes</strong>
        <p>Module B03 offert — notifications à chaque étape.</p>
      </div>
      <Link href={`${storeBase}/app-suivi`} className="store-btn store-btn-ghost">
        Voir la démo
      </Link>
    </aside>
  );
}
