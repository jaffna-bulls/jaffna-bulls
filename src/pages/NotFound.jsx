import { Link } from 'react-router-dom';
import './notFound.css';

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <p className="eyebrow">404</p>
        <h1>Off the Pitch.</h1>
        <p className="not-found__text">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or hasn&rsquo;t been
          published yet.
        </p>
        <Link to="/" className="btn btn--primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
