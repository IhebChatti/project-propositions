"use client";

import { useState } from "react";

const SUGGESTIONS = ["Allergènes des oursons ?", "Délai de livraison ?", "Composer un panier fête foraine"];

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m22 2-7 20-4-9-9-4 20-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

type ChatTheme = "maison" | "grossiste" | "lab";

type Props = {
  theme?: ChatTheme;
};

export default function StoreChatbot({ theme = "maison" }: Props) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"support" | "sales">("support");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    {
      role: "bot",
      text: "Bonjour. Je peux vous renseigner sur les délais, les allergènes et le suivi de commande (démonstration).",
    },
  ]);
  const [input, setInput] = useState("");

  const reply = (text: string) => {
    const lower = text.toLowerCase();
    let bot =
      "Merci pour votre message. En production, je répondrais à partir du catalogue et de vos commandes.";
    if (lower.includes("allerg") || lower.includes("gélatine")) {
      bot =
        "Les allergènes figurent sur chaque fiche. Exemple : oursons fruités — gélatine porcine. Souhaitez-vous des références sans gélatine ?";
    } else if (lower.includes("délai") || lower.includes("livraison")) {
      bot = "Livraison 48–72h en France. Retrait gratuit dès notification « prête ».";
    } else if (tab === "sales" || lower.includes("panier") || lower.includes("budget")) {
      bot =
        "Panier suggéré (maquette) : 2× Bouteilles bubble gum, 1× Tubo présentoir — env. 94 € HT. Validez avec un compte pro.";
    }
    setMessages((m) => [...m, { role: "user", text }, { role: "bot", text: bot }]);
  };

  const send = () => {
    if (!input.trim()) return;
    reply(input.trim());
    setInput("");
  };

  return (
    <>
      {!open ? (
        <button
          type="button"
          className={`chat-fab chat-fab--${theme}`}
          onClick={() => setOpen(true)}
          aria-label="Ouvrir l’assistant"
        >
          <span className="chat-fab-icon" aria-hidden="true">
            ✦
          </span>
        </button>
      ) : null}
      {open ? (
        <div className={`chat-sheet chat-sheet--${theme}`} role="dialog" aria-label="Assistant Assia Sweet">
          <header className="chat-sheet-head">
            <div className="chat-sheet-title">
              <span className="chat-avatar" aria-hidden="true">
                A
              </span>
              <div>
                <strong>Assia · assistant</strong>
                <span>Démonstration</span>
              </div>
            </div>
            <button type="button" className="chat-close" onClick={() => setOpen(false)} aria-label="Fermer">
              ×
            </button>
          </header>
          <div className="chat-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "support"}
              className={tab === "support" ? "active" : ""}
              onClick={() => setTab("support")}
            >
              Support
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "sales"}
              className={tab === "sales" ? "active" : ""}
              onClick={() => setTab("sales")}
            >
              Conseiller
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble chat-bubble--${m.role}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="chat-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => reply(s)}>
                {s}
              </button>
            ))}
          </div>
          <footer className="chat-compose">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Votre message…"
              aria-label="Message"
            />
            <button type="button" className="chat-send" onClick={send} aria-label="Envoyer">
              <SendIcon />
            </button>
          </footer>
          <p className="chat-disclaimer">Démonstration — l’IA n’est pas connectée</p>
        </div>
      ) : null}
    </>
  );
}
