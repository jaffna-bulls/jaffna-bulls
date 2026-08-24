export default function NewsPersonStory({ label, name, role, text }) {
  if (!text) {
    return null;
  }

  return (
    <aside className="news-person-story" aria-label={label || "Featured story"}>
      <div className="news-person-story__content">
        <p className="news-person-story__label">{label || ""}</p>
        <div className="news-person-story__quote">
          <span className="news-person-story__mark" aria-hidden="true">
            “
          </span>
          <p className="news-person-story__text">{text}</p>
          <span
            className="news-person-story__mark news-person-story__mark--closing"
            aria-hidden="true"
          >
            ”
          </span>
        </div>
        {(name || role) && (
          <div className="news-person-story__person">
            {name && <strong>{name}</strong>}
            {role && <span>{role}</span>}
          </div>
        )}
      </div>
    </aside>
  );
}
