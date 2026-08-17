import PageHero from '../components/PageHero';
import RugbySubnav from '../components/RugbySubnav';
import EmptyState from '../components/EmptyState';

export default function RugbySquad() {
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
            title="Squad"
            description="Player information will be added after the player draft"
          />
        </div>
      </section>
    </>
  );
}
