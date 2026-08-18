import PageHero from "../components/PageHero";
import RugbySubnav from "../components/RugbySubnav";
import "./rugbyCoachingStaff.css";

const STAFF = [
  { initials: "TR", name: "Tarinda Ratwatte", role: "Head of Rugby" },
  { initials: "AD", name: "Asela Deshapriya", role: "Head Coach" },
  { initials: "AD", name: "Ashane Dissanayake", role: "Assistant Coach" },
  {
    initials: "VJ",
    name: "Vishva Jayasinghe",
    role: "Strength & Conditioning Coach",
  },
  { initials: "RC", name: "Ruskhan Cabraal", role: "Team Manager" },
];

export default function RugbyCoachingStaff() {
  return (
    <>
      <PageHero
        eyebrow="Jaffna Bulls Rugby"
        title="Strength. Skill. Bull Nation."
        description="The dedicated home for all Jaffna Bulls rugby content."
      >
        {/* <RugbySubnav /> */}
      </PageHero>

      <section className="section coaching">
        <div className="container coaching__head">
          <div>
            <p className="eyebrow">Rugby Leadership</p>
            <h2>Coaching Staff</h2>
          </div>
        </div>

        <div className="container coaching__grid">
          {STAFF.map((person) => (
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
