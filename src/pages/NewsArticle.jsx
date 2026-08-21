import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getNewsBySlug } from "../data/newsData";
import NewsImage from "../components/NewsImage";
import NewsQuote from "../components/NewsQuote";
import NewsTitle from "../components/NewsTitle";
import NotFound from "./NotFound";
import "./newsArticle.css";

function CompetitionGlance({ data }) {
  if (!data) {
    return null;
  }

  return (
    <section
      className="competition-glance"
      aria-labelledby="competition-glance-title"
    >
      <div className="competition-glance__intro">
        <p className="eyebrow eyebrow--light">{data.eyebrow}</p>
        <h2 id="competition-glance-title">{data.title}</h2>
      </div>
      <div className="competition-glance__stats">
        {data.stats.map((stat) => (
          <div
            className={`competition-stat${stat.value === "U20" ? " competition-stat--pathway" : ""}`}
            key={`${stat.value}-${stat.label}`}
          >
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function NewsArticle() {
  const { slug } = useParams();
  const article = getNewsBySlug(slug);

  if (!article) {
    return <NotFound />;
  }

  return (
    <article className="news-article">
      <header className="news-article__hero">
        <div className="container">
          <Link to="/#updates" className="news-article__back">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to updates
          </Link>
          <NewsTitle article={article} />
        </div>
      </header>

      <div className="container news-article__layout">
        <main className="news-article__body">
          {article.images?.filter((image) => image?.src).length > 0 && (
            <div
              className={`news-gallery news-gallery--${Math.min(
                article.images.filter((image) => image?.src).length,
                3,
              )}`}
            >
              {article.images
                .filter((image) => image?.src)
                .map((image, index) => (
                  <NewsImage
                    key={`${image.src}-${index}`}
                    image={image}
                    featured={
                      article.images.filter((item) => item?.src).length === 1
                    }
                  />
                ))}
            </div>
          )}

          <CompetitionGlance data={article.competitionAtAGlance} />

          <div className="news-article__content">
            {article.blocks.map((block, index) => {
              if (block.type === "heading") {
                return <h2 key={`${block.text}-${index}`}>{block.text}</h2>;
              }

              if (block.type === "quote") {
                return <NewsQuote key={`${block.text}-${index}`} {...block} />;
              }

              const content = block.parts
                ? block.parts.map((part, partIndex) =>
                    typeof part === "string" ? (
                      part
                    ) : (
                      <strong key={`${part.text}-${partIndex}`}>
                        {part.text}
                      </strong>
                    ),
                  )
                : block.text;

              return (
                <p
                  key={`${block.text}-${index}`}
                  className={
                    block.emphasis === "bold" ? "news-article__bold" : ""
                  }
                >
                  {content}
                </p>
              );
            })}
          </div>
          <div className="news-article__footer">
            <span>Jaffna Bulls</span>
            <Link to="/contact-us">
              Connect with us <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </main>
      </div>
    </article>
  );
}
