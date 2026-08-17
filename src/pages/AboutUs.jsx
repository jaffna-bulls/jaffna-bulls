import PageHero from '../components/PageHero';
import './aboutUs.css';

const VALUES = ['Excellence', 'Integrity', 'Respect', 'Teamwork', 'Innovation', 'Leadership'];

const LEADERSHIP = [
  { initials: 'PN', name: 'Prad Navaratnam', role: 'Co-Owner' },
  { initials: 'UD', name: 'Udesh Dharmadasa', role: 'Co-Owner' },
  { initials: 'DS', name: 'Dhovika Seneviratne', role: 'Co-Owner & Director – Operations' },
  { initials: 'PR', name: 'Pulinda Rupesinghe', role: 'General Manager' },
];

export default function AboutUs() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="Built on Pride. Driven by Ambition."
        description="A broader sporting franchise created to unite athletes, supporters, partners, and communities under one bold brand."
      />

      <section className="section story">
        <div className="container story__grid">
          <div>
            <p className="eyebrow">Our Story</p>
            <h2>A Franchise for Northern Sri Lanka</h2>
            <p className="story__text">
              Jaffna Bulls was formed with the ambition of building a powerful sporting
              franchise that represents pride, resilience, and excellence. Rooted in the
              identity and spirit of Northern Sri Lanka, the franchise has been created to
              bring athletes, supporters, partners, and communities together under one bold
              brand.
            </p>
            <p className="story__text">
              The Bulls&rsquo; long-term vision is to grow into a multi-sport franchise that
              creates opportunities across different sporting disciplines and builds a
              lasting legacy for the region.
            </p>
          </div>

          <div className="mission-card">
            <h3>Our Mission</h3>
            <p>
              To build an inspiring sporting franchise that unites communities, develops
              talent, and represents the pride, resilience, and ambition of Northern Sri
              Lanka.
            </p>
            <span className="mission-card__rule" />
            <h3>Our Vision</h3>
            <p>
              To become one of Sri Lanka&rsquo;s most respected sporting franchises through
              excellence, innovation, and community impact across multiple sporting
              disciplines.
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
          <p className="leadership__intro">
            Meet the team responsible for shaping the Jaffna Bulls franchise.
          </p>
        </div>

        <div className="container leadership__grid">
          {LEADERSHIP.map((person) => (
            <article className="person-card" key={person.name}>
              <div className="person-card__avatar">
                <span>{person.initials}</span>
              </div>
              <div className="person-card__body">
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
