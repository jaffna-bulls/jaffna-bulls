import { useState } from 'react';
import PageHero from '../components/PageHero';
import './store.css';

const PRODUCTS = [
  { id: 1, name: 'Featured Product', type: 'apparel', shape: 'shirt', color: 'bronze' },
  { id: 2, name: 'Featured Product', type: 'apparel', shape: 'shirt', color: 'black' },
  { id: 3, name: 'Featured Product', type: 'accessories', shape: 'cap', color: 'bronze' },
];

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'apparel', label: 'Apparel' },
  { key: 'accessories', label: 'Accessories' },
];

function ProductIcon({ shape, color }) {
  const fill = color === 'bronze' ? 'var(--color-bronze)' : 'var(--color-black)';
  if (shape === 'cap') {
    return (
      <svg viewBox="0 0 120 90" width="96" height="72" aria-hidden="true">
        <path
          d="M10 80c0-30 22-55 50-55s50 25 50 55Z"
          fill={fill}
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" width="90" height="90" aria-hidden="true">
      <path
        d="M30 10 L15 25 L25 38 L32 32 V90 H68 V32 L75 38 L85 25 L70 10 C70 18 61 24 50 24 C39 24 30 18 30 10Z"
        fill={fill}
      />
    </svg>
  );
}

export default function Store() {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.type === filter);

  return (
    <>
      <PageHero
        eyebrow="Official Merchandise"
        title="Wear the Pride."
        description="Support the Bull Nation with official Jaffna Bulls merchandise."
      />

      <section className="section store-catalogue">
        <div className="container store-catalogue__head">
          <div>
            <p className="eyebrow">Product Catalogue</p>
            <h2>Featured Products</h2>
          </div>
          <div className="store-filters" role="tablist" aria-label="Filter products">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={filter === f.key}
                className={`store-filters__btn ${filter === f.key ? 'is-active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="container product-grid">
          {visible.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-card__image">
                <ProductIcon shape={product.shape} color={product.color} />
              </div>
              <div className="product-card__body">
                <span className="product-card__label">Details to be published</span>
                <h3>{product.name}</h3>
                <p>Product description, pricing, and sizing information will appear here.</p>
                <button className="btn btn--outline-light btn--block" type="button">
                  View Product
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2>Secure Online Shopping</h2>
            <p>
              Shopping cart, online payment, order confirmation, and sizing information are
              built into the store experience.
            </p>
          </div>
          <button className="btn btn--outline-dark" type="button">
            View Cart · 0
          </button>
        </div>
      </section>
    </>
  );
}
