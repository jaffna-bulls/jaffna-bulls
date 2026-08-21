export default function NewsTitle({ article }) {
  return (
    <>
      <div className="news-article__meta">
        <span>{article.tag}</span>
        <span>{article.date}</span>
      </div>
      <h1>{article.title}</h1>
      <p className="news-article__subtitle">{article.subtitle}</p>
    </>
  );
}
