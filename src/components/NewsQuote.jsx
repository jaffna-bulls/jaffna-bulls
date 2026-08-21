export default function NewsQuote({ text, cite }) {
  return (
    <blockquote className="news-quote">
      <p>{text}</p>
      {cite && <cite>{cite}</cite>}
    </blockquote>
  );
}
