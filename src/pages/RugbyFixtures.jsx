import PageHero from "../components/PageHero";
import RugbySubnav from "../components/RugbySubnav";
import EmptyState from "../components/EmptyState";

export default function RugbyFixtures() {
  return (
    <>
      <PageHero
        eyebrow="Jaffna Bulls Rugby"
        title="Strength. Skill. Bull Nation."
      >
        {/* <RugbySubnav /> */}
      </PageHero>

      <section className="section">
        <div className="container">
          <EmptyState
            title="Fixtures"
            description="Await for more information"
          />
        </div>
      </section>
    </>
  );
}
