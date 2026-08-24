export default function NewsHashtags({ hashtags }) {
  const visibleHashtags = hashtags?.filter(Boolean);

  if (!visibleHashtags?.length) {
    return null;
  }

  return (
    <section className="news-hashtags" aria-label="Article hashtags">
      {/* <span className="news-hashtags__label">Keep following</span> */}
      <div className="news-hashtags__list">
        {visibleHashtags.map((hashtag) => (
          <span className="news-hashtags__tag" key={hashtag}>
            #{hashtag.replace(/^#/, "")}
          </span>
        ))}
      </div>
    </section>
  );
}
