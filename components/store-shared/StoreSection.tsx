import Link from "next/link";

type Props = {
  title: string;
  intro?: string;
  actionHref?: string;
  actionLabel?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

/** Consistent section chrome: title, optional intro, optional CTA, contained width. */
export default function StoreSection({
  title,
  intro,
  actionHref,
  actionLabel = "Tout voir",
  children,
  className = "",
  id,
}: Props) {
  return (
    <section className={`store-section-shell ${className}`.trim()} id={id}>
      <header className="store-section-head">
        <div>
          <h2>{title}</h2>
          {intro ? <p className="store-section-intro">{intro}</p> : null}
        </div>
        {actionHref ? (
          <Link href={actionHref} className="store-section-link">
            {actionLabel} →
          </Link>
        ) : null}
      </header>
      {children}
    </section>
  );
}
