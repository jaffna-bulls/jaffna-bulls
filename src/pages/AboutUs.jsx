import PageHero from "../components/PageHero";
import "./aboutUs.css";
import Tarinda from "../assets/Coaches/Tarinda.webp";
import Dhovika from "../assets/Leadership/Dhovika.webp";
import Prad from "../assets/Leadership/Prad.webp";

const VALUES = [
  "Excellence",
  "Integrity",
  "Respect",
  "Teamwork",
  "Innovation",
  "Leadership",
];

const LEADERSHIP = [
  {
    initials: "PN",
    name: "Prad Navaratnam",
    role: "Co-Owner",
    image: Prad,
    bio: "Prad Navaratnam is a Co-Owner of the Jaffna Bulls with extensive experience in elite sport. A former Head of Performance Analytics at Sri Lanka Cricket, he was part of the strategic team behind Sri Lanka’s 2022 Asia Cup triumph. His sporting experience also includes roles across the LPL, NRL and Cricket NSW, bringing a strong background in high-performance strategy and analytics to the Bulls.",
  },
  {
    initials: "UD",
    name: "Udesh Dharmadasa",
    role: "Co-Owner",
    // image: Udesh, // Add when the image is available
    bio: "Udesh Dharmadasa is a Co-Owner of the Jaffna Bulls and also Executive Director of the Nawaloka Group. From a strong sporting family and a lifelong passion for sport, Udesh brings a strong combination of business leadership, commercial experience and sporting perspective to the Bulls, with a focus on building a sustainable and successful sporting franchise.",
  },
  {
    initials: "DS",
    name: "Dhovika Seneviratne",
    role: "Co-Owner & Director – Operations",
    image: Dhovika,
    bio: "Dhovika Seneviratne is the Co-Owner and Director – Operations of the Jaffna Bulls, bringing experience across business management, finance, sales and strategy. A graduate in Accounting & Finance from the University of London, Dhovika currently holds roles across investment analysis, strategy and consultancy in global seafood trade. He will oversee the Bulls’ day-to-day operations, helping drive the professional standards and organisational structure behind the franchise.",
  },
  {
    initials: "PR",
    name: "Pulinda Rupesinghe",
    role: "General Manager",
    // image: Pulinda, // Add when the image is available
    bio: "Pulinda Rupesinghe is the General Manager of the Jaffna Bulls, bringing a strong background in corporate management, commercial strategy and business development. With experience across multinational and Sri Lankan organisations, Pulinda will oversee the Bulls’ management and commercial activities, playing a key role in building a professional, sustainable and successful franchise.",
  },
  {
    initials: "TR",
    name: "Tarinda Ratwatte",
    role: "Head of Rugby",
    image: Tarinda,
    bio: "Tarinda Ratwatte is the Head of Rugby at the Jaffna Bulls and one of Sri Lanka’s most accomplished rugby players of his generation. A former Sri Lanka captain in both Sevens and XVs, Tarinda represented the country on the international stage while enjoying a distinguished club career with CR & FC and Kandy Sports Club. He brings a wealth of elite playing experience, leadership and rugby knowledge to the Bulls, overseeing the franchise’s rugby strategy and player development.",
  },
];

export default function AboutUs() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="Built on Pride. Driven by Ambition."
      />

      <section className="section story">
        <div className="container story__grid">
          <div>
            <p className="eyebrow">Our Story</p>
            <h2>
              A Franchise for Northern <br /> Sri Lanka
            </h2>
            <p className="story__text">
              Jaffna Bulls was formed with the ambition of building a powerful
              sporting franchise that represents pride, resilience, and
              excellence. Rooted in the identity and spirit of Northern Sri
              Lanka, the franchise has been created to bring athletes,
              supporters, partners, and communities together under one bold
              brand.
            </p>
            <p className="story__text">
              The Bulls&rsquo; long-term vision is to grow into a multi-sport
              franchise that creates opportunities across different sporting
              disciplines and builds a lasting legacy for the region.
            </p>
          </div>

          <div className="mission-card">
            <h3>Our Colours</h3>
            <p>
              Our roots run deep. Representing the North of Sri Lanka our
              colours aim to be inspired by the colours of the soil of the
              North. Aiming to unite communities, develop talent and represent
              pride, resilience and ambition of Northern Sri Lanka.
            </p>
            <span className="mission-card__rule" />
            <h3>Our Identity</h3>
            <p>
              The last kingdom. The next generation. Inspired by the legacy of
              the last kingdom of Jaffna, The Bull, isn't just our logo. It's
              our identity - a symbol of resilience, heritage and the spirit of
              the North.
            </p>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="container">
          <p className="eyebrow eyebrow--light">What Guides Us</p>
          <h2>Franchise Values</h2>

          <div className="values__grid">
            {VALUES.map((value) => (
              <div className="value-item" key={value}>
                <span className="value-item__rule" />
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section leadership">
        <div className="container leadership__head">
          <div>
            <p className="eyebrow">Our Leadership</p>
            <h2>Leading the Bull Nation</h2>
          </div>
        </div>

        <div className="container leadership__grid">
          {LEADERSHIP.map((person) => (
            <article className="person-card" key={person.name}>
              <div className="person-card__avatar">
                {person.image ? (
                  <img src={person.image} alt={person.name} />
                ) : (
                  <span>{person.initials}</span>
                )}
              </div>

              <div className="person-card__body">
                <h3>{person.name}</h3>
                <p className="person-card__role">{person.role}</p>
                <p className="person-card__bio">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
