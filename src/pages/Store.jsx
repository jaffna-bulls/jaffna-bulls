import { useState } from "react";
import PageHero from "../components/PageHero";
import { useCart } from "../context/CartContext";
import poloTshirt from "../assets/Tshirt/polo.webp";
import "./store.css";

const PRODUCTS = [
  {
    id: 1,
    name: "Founder's Polo",
    type: "apparel",
    image: poloTshirt,
    price: 6500,
    description:
      "The official Jaffna Bulls Founder's Polo, designed for the Bull Nation.",
  },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "apparel", label: "Apparel" },
];

const SIZES = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];

export default function Store() {
  const [filter, setFilter] = useState("all");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const { addToCart } = useCart();

  const visible =
    filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.type === filter);

  return (
    <>
      <PageHero
        eyebrow="Official Merchandise"
        title="Wear the Pride."
        // description="Support the Bull Nation with official Jaffna Bulls merchandise."
      />
      //!
      <section className="section store-coming-soon">
        <div className="container">
          <div className="store-coming-soon__card">
            <span className="store-coming-soon__badge">
              Official Merchandise
            </span>

            <div className="store-coming-soon__icon">
              <img src="/header-logo.png" alt="Jaffna Bulls merchandise" />
            </div>

            <p className="eyebrow">Jaffna Bulls Online Store</p>

            <h2>Launching Soon.</h2>

            <p className="store-coming-soon__text">
              Our online store is coming soon. Stay tuned for official Jaffna
              Bulls merchandise.
            </p>

            <div className="store-coming-soon__line">
              <span></span>
              <strong>Stay Tuned</strong>
              <span></span>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="section store-catalogue">
        <div className="container store-catalogue__head">
          <div>
            <p className="eyebrow">Product Catalogue</p>
            <h2>Featured Products</h2>
          </div>

          <div
            className="store-filters"
            role="tablist"
            aria-label="Filter products"
          >
            {FILTERS.map((f) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={filter === f.key}
                className={`store-filters__btn ${
                  filter === f.key ? "is-active" : ""
                }`}
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
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-card__img"
                />
              </div>

              <div className="product-card__body">
                <span className="product-card__label">
                  Official Merchandise
                </span>

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <button
                  className="size-chart-trigger"
                  type="button"
                  onClick={() => setShowSizeChart(true)}
                  aria-haspopup="dialog"
                >
                  Size Chart <span>+</span>
                </button>

                <button
                  className="btn btn--outline-light btn--block"
                  type="button"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
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
              Shopping cart, online payment, order confirmation, and sizing
              information are built into the store experience.
            </p>
          </div>

          <button className="btn btn--outline-dark" type="button">
            View Cart · 0
          </button>
        </div>
      </section>
      
      {showSizeChart && (
        <div
          className="size-chart-overlay"
          role="presentation"
          onClick={() => setShowSizeChart(false)}
        >
          <div
            className="size-chart-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-chart-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="size-chart-close"
              type="button"
              onClick={() => setShowSizeChart(false)}
              aria-label="Close size chart"
            >
              &times;
            </button>

            <p className="eyebrow">Founder's Polo</p>
            <h2 id="size-chart-title">Size Chart</h2>

            <div className="size-chart-grid">
              {SIZES.map((size) => (
                <div className="size-chart-item" key={size}>
                  {size}
                </div>
              ))}
            </div>

            <p className="size-chart-note">
              Available sizes: S, M, L, XL, 2XL, 3XL and 4XL.
            </p>
          </div>
        </div>
      )} */}
    </>
  );
}
