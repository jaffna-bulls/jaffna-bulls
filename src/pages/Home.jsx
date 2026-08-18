import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import nawalokaPilingLogo from "../assets/Sponsors/nawaloka_piling.webp";
import adviceLabLogo from "../assets/Sponsors/advicelab_logo.webp";
import "./home.css";

const UPDATES = [
  {
    tag: "Franchise News",
    title: "Building a Bold New Sporting Legacy",
    text: "Follow the latest announcements from Jaffna Bulls as the franchise begins its journey.",
  },
  {
    tag: "Rugby",
    title: "Rugby Programme Takes Centre Stage",
    text: "Team and player updates will be published as official details are confirmed.",
  },
  {
    tag: "Community",
    title: "One Powerful Identity",
    text: "Connecting athletes, supporters, partners, and communities across the region.",
  },
];

const SPONSORS = [
  {
    name: "Nawaloka Piling",
    logo: nawalokaPilingLogo,
  },
  {
    name: "Advice Lab",
    logo: adviceLabLogo,
  },
];

export default function Home() {
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

      <section className="section updates">
        <div className="container updates__head">
          <div>
            <p className="eyebrow">From the Bull Nation</p>
            <h2>Latest Updates</h2>
          </div>
          {/* <p className="updates__intro">
            A dedicated hub for franchise news, rugby announcements, player
            signings, and match-related updates.
          </p> */}
        </div>

        <div className="container updates__grid">
          {UPDATES.map((item) => (
            <article className="update-card" key={item.title}>
              <span className="update-card__tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
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
            <p>
              Explore official Jaffna Bulls merchandise and show your support
              for the Bull Nation.
            </p>
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
          {SPONSORS.map((sponsor) => (
            <div className="sponsor-logo" key={sponsor.name}>
              <img src={sponsor.logo} alt={sponsor.name} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
