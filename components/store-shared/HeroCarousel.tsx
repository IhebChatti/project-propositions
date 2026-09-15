"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_CAROUSEL_SLIDES } from "@/lib/mock-data";

type Props = {
  catalogueHref: string;
};

export default function HeroCarousel({ catalogueHref }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_CAROUSEL_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused]);

  const slide = HERO_CAROUSEL_SLIDES[index];

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + HERO_CAROUSEL_SLIDES.length) % HERO_CAROUSEL_SLIDES.length);
  };

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Sélection mise en avant"
    >
      <div className="hero-carousel-slide">
        <Image src={slide.image} alt="" width={640} height={480} priority={index === 0} className="hero-carousel-img" />
        <div className="hero-carousel-overlay">
          <span className="hero-carousel-brand">{slide.brand}</span>
          <p className="hero-carousel-tagline">{slide.tagline}</p>
          <p className="hero-carousel-price">{slide.priceLabel}</p>
          <Link href={catalogueHref} className="hero-carousel-link">
            Voir les produits
          </Link>
        </div>
      </div>
      <div className="hero-carousel-controls">
        <button type="button" className="hero-carousel-arrow" onClick={() => go(-1)} aria-label="Slide précédente">
          ‹
        </button>
        <div className="hero-carousel-dots" role="tablist">
          {HERO_CAROUSEL_SLIDES.map((s, i) => (
            <button
              key={s.brand}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}`}
              className={i === index ? "active" : ""}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button type="button" className="hero-carousel-arrow" onClick={() => go(1)} aria-label="Slide suivante">
          ›
        </button>
      </div>
    </div>
  );
}
