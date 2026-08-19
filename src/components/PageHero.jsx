import "./pageHero.css";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  compact = false,
}) {
  return (
    <section className={`page-hero ${compact ? "page-hero--compact" : ""}`}>
      <div className="page-hero__diagonal" aria-hidden="true">
        <span className="page-hero__circle" />
      </div>
      <div className="container page-hero__content">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className="page-hero__desc">{description}</p>}
        {children}
      </div>
    </section>
  );
}
