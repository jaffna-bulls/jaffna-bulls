import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import NEWS from "../data/newsData";
import "./latestUpdates.css";

function UpdateCard({ article, featured = false }) {
  return (
    <Link
      to={`/news/${article.slug}`}
      className={`latest-update-card${featured ? " latest-update-card--featured" : ""}`}
    >
      <div className="latest-update-card__meta">
        <span>{article.tag}</span>
        <span>{article.date}</span>
      </div>
      <h2>{article.title}</h2>
      <p>{article.subtitle}</p>
      <span className="latest-update-card__link">
        Read full update <ArrowUpRight size={18} aria-hidden="true" />
      </span>
    </Link>
  );
}

export default function LatestUpdates() {
  const [featured, ...otherNews] = NEWS;

  return (
    <div className="latest-updates">
      <header className="latest-updates__hero">
        <div className="container">
          <Link to="/#updates" className="latest-updates__back">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to home
          </Link>
          <p className="eyebrow eyebrow--light">Inside the Bulls</p>
          <h1>Latest Updates</h1>
        </div>
      </header>

      <main>
        {featured && (
          <section
            className="latest-updates__recent"
            aria-labelledby="recent-title"
          >
            <div className="container">
              <div className="latest-updates__section-heading">
                <p className="eyebrow">Just in</p>
                <h2 id="recent-title">Recent update</h2>
              </div>
              <UpdateCard article={featured} featured />
            </div>
          </section>
        )}

        {otherNews.length > 0 && (
          <section
            className="latest-updates__archive"
            aria-labelledby="archive-title"
          >
            <div className="container">
              <div className="latest-updates__section-heading">
                <p className="eyebrow">From the archives</p>
                <h2 id="archive-title">Other news</h2>
              </div>
              <div className="latest-updates__list">
                {otherNews.map((article) => (
                  <UpdateCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
