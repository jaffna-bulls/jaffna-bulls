import PageHero from "../components/PageHero";
import RugbySubnav from "../components/RugbySubnav";
import "./rugbyCoachingStaff.css";
import Asela from "../assets/Coaches/Asela.webp";
import Ashane from "../assets/Coaches/Ashane.webp";
import Ruklan from "../assets/Coaches/Ruklan.webp";
import Tarinda from "../assets/Coaches/Tarinda.webp";
import Vishva from "../assets/Coaches/Vishva.webp";

const STAFF = [
  {
    initials: "TR",
    name: "Tarinda Ratwatte",
    role: "Head of Rugby",
    image: Tarinda,
  },
  {
    initials: "AD",
    name: "Asela Deshapriya",
    role: "Head Coach",
    image: Asela,
  },
  {
    initials: "AD",
    name: "Ashane Dissanayake",
    role: "Assistant Coach",
    image: Ashane,
  },
  {
    initials: "VJ",
    name: "Vishva Jayasinghe",
    role: "Strength & Conditioning Coach",
    image: Vishva,
  },
  {
    initials: "RC",
    name: "Ruklan Cabraal",
    role: "Team Manager",
    image: Ruklan,
  },
];

export default function RugbyCoachingStaff() {
  return (
    <>
      <PageHero
        eyebrow="Jaffna Bulls Rugby"
        title="Strength. Skill. Bull Nation."
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
                <img src={person.image} alt={person.name} />
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
