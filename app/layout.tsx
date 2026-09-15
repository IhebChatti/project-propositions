import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Outfit,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Syne,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import PropositionSwitcher from "@/components/switcher/PropositionSwitcher";
import { ToastProvider } from "@/components/ToastProvider";
import { GlobalDemoHandler } from "@/components/DemoButton";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-maison-body",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gross-body",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-gross-mono",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-lab-display",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-lab-serif",
});

export const metadata: Metadata = {
  title: "Assia Sweet — Proposition e-commerce & dashboard",
  description: "Maquette de présentation : trois modèles de boutique et dashboard de gestion.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${outfit.variable} ${plexSans.variable} ${plexMono.variable} ${syne.variable} ${instrumentSerif.variable}`}
    >
      <body suppressHydrationWarning className={body.className}>
        <ToastProvider>
          <GlobalDemoHandler />
          {children}
          <PropositionSwitcher />
        </ToastProvider>
      </body>
    </html>
  );
}
