import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import RugbySubnav from '../components/RugbySubnav';
import './rugby.css';

const LINKS = [
  { to: '/rugby/squad', tag: 'Team', title: 'Squad' },
  { to: '/rugby/coaching-staff', tag: 'Leadership', title: 'Coaching Staff' },
  { to: '/rugby/fixtures', tag: 'Match Centre', title: 'Fixtures' },
];

export default function Rugby() {
  return (
    <>
      <PageHero
        eyebrow="Jaffna Bulls Rugby"
        title="Strength. Skill. Bull Nation."
        description="The dedicated home for all Jaffna Bulls rugby content."
      >
        <RugbySubnav />
      </PageHero>

      <section className="section rugby-overview">
        <div className="container rugby-overview__grid">
          <div className="rugby-feature">
            <span className="rugby-feature__watermark">XV</span>
            <div className="rugby-feature__content">
              <p className="eyebrow eyebrow--light">The First Active Sport</p>
              <h2>Jaffna Bulls Rugby</h2>
              <p>
                Rugby leads the first phase of the franchise, with a dedicated space for
                the squad, coaching staff, fixtures, announcements, and match-related
                updates.
              </p>
            </div>
          </div>

          <div className="rugby-links">
            {LINKS.map((link) => (
              <Link to={link.to} className="rugby-link-card" key={link.to}>
                <div>
                  <span className="rugby-link-card__tag">{link.tag}</span>
                  <h3>{link.title}</h3>
                </div>
                <span className="rugby-link-card__arrow" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
