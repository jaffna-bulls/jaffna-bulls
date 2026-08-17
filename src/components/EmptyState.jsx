import './emptyState.css';

export default function EmptyState({ title, description }) {
  return (
    <div className="empty-state">
      <span className="empty-state__rule" aria-hidden="true" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
