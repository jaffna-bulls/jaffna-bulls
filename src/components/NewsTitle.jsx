export default function NewsTitle({ article }) {
  return (
    <>
      <div className="news-article__meta">
        <span>{article.tag}</span>
        <span>{article.date}</span>
      </div>
      <h1>{article.fullTitle || article.title}</h1>
      {(article.fullSubtitle || article.subtitle) && (
        <p className="news-article__subtitle">
          {article.fullSubtitle || article.subtitle}
        </p>
      )}
    </>
  );
}
