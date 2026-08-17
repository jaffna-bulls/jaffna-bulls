import PageHero from '../components/PageHero';
import RugbySubnav from '../components/RugbySubnav';
import EmptyState from '../components/EmptyState';

export default function RugbyFixtures() {
  return (
    <>
      <PageHero
        eyebrow="Jaffna Bulls Rugby"
        title="Strength. Skill. Bull Nation."
        description="The dedicated home for all Jaffna Bulls rugby content."
      >
        <RugbySubnav />
      </PageHero>

      <section className="section">
        <div className="container">
          <EmptyState
            title="Fixtures"
            description="Official fixtures will be added once confirmed by the league"
          />
        </div>
      </section>
    </>
  );
}
