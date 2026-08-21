import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import NEWS from "../data/newsData";
import nawalokaPilingLogo from "../assets/Sponsors/nawaloka_piling.webp";
import nawalokaPilingBlackLogo from "../assets/Sponsors/Nawaloka_piling_black.webp";
import adviceLabLogo from "../assets/Sponsors/advicelab_logo.webp";
import adviceLabLogoWhite from "../assets/Sponsors/advicelab_logo_white.webp";
import mosguardLogo from "../assets/Sponsors/mosguard.webp";

import "./home.css";

const SPONSORS = [
  {
    name: "Nawaloka Piling",
    lightLogo: nawalokaPilingBlackLogo,
    darkLogo: nawalokaPilingLogo,
  },

  {
    name: "Advice Lab",
    lightLogo: adviceLabLogo,
    darkLogo: adviceLabLogoWhite,
  },
];

const CO_LEAD_SPONSORS = [
  {
    name: "Mosguard",
    lightLogo: mosguardLogo,
    darkLogo: mosguardLogo,
  },
];

export default function Home({ theme = "dark" }) {
  return (
    <>
      <section className="hero">
        <div className="hero__diagonal" aria-hidden="true">
          <span className="hero__watermark">BULLS</span>
        </div>
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light">
              Official Home of Jaffna Bulls
            </p>
            <h1>
              One Team.
              <br />
              One Pride.
              <br />
              <span className="hero__accent">One Bull Nation.</span>
            </h1>
            {/* <p className="hero__desc">
              Welcome to Jaffna Bulls, a bold new sporting franchise built on pride, passion,
              and ambition. Born to represent the spirit of Northern Sri Lanka, Jaffna Bulls
              brings together athletes, supporters, partners, and communities under one
              powerful identity.
            </p> */}
            <div className="hero__actions">
              <Link to="/about-us" className="btn btn--primary">
                Learn More
              </Link>
              <Link to="/store" className="btn btn--outline-dark">
                Shop Now
              </Link>
            </div>
          </div>
          <div className="hero__crest">
            <img
              src="/header-logo.png"
              alt="Jaffna Bulls crest"
              className="hero__crest-image"
            />
          </div>
        </div>
      </section>

      <section className="section updates" id="updates">
        <div className="container updates__head">
          <div>
            <p className="eyebrow">From the Bull Nation</p>
            <h2>Latest Updates</h2>
          </div>
        </div>

        <div className="container updates__grid">
          {NEWS.map((item) => (
            <Link
              to={`/news/${item.slug}`}
              className="update-card"
              key={item.slug}
            >
              <span className="update-card__tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <span className="update-card__link">
                Read full update <span aria-hidden="true">↗</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section fixtures-teaser">
        <div className="container fixtures-teaser__head">
          <div>
            <p className="eyebrow">Match Centre</p>
            <h2>Upcoming Fixtures</h2>
          </div>
          {/* <p className="fixtures-teaser__intro">
            Official league fixtures will appear here once confirmed.
          </p> */}
        </div>

        <div className="container">
          <div className="fixture-row">
            <span className="fixture-row__team">Jaffna Bulls</span>
            <span className="fixture-row__meta">
              Fixtures to be confirmed by the league
            </span>
            <span className="fixture-row__team fixture-row__team--right">
              Opponent
            </span>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2>Wear the Pride.</h2>
          </div>
          <Link to="/store" className="btn btn--outline-dark">
            Visit the Store
          </Link>
        </div>
      </section>

      <section className="section sponsors">
        <div className="container sponsors__head">
          <div>
            <p className="eyebrow">Our Partners</p>
            <h2>Our Sponsors</h2>
          </div>
        </div>

        <div className="container sponsors__logos">
          <div className="sponsors__group">
            <h3>Principal Sponsors</h3>
            <div className="sponsors__group-logos">
              {SPONSORS.map((sponsor) => (
                <div className="sponsor-logo" key={sponsor.name}>
                  <img
                    src={
                      theme === "dark" ? sponsor.darkLogo : sponsor.lightLogo
                    }
                    alt={sponsor.name}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="sponsors__group">
            <h3>Co-Lead Sponsor</h3>
            <div className="sponsors__group-logos">
              {CO_LEAD_SPONSORS.map((sponsor) => (
                <div className="sponsor-logo" key={sponsor.name}>
                  <img
                    src={
                      theme === "dark" ? sponsor.darkLogo : sponsor.lightLogo
                    }
                    alt={sponsor.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
