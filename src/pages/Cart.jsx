import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useCart } from "../context/CartContext";
import "./cart.css";

const formatPrice = (price) => `LKR ${price.toLocaleString("en-LK")}`;

export default function Cart() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();

  return (
    <>
      <PageHero eyebrow="Official Merchandise" title="Your Cart." />
      <section className="section cart-page">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p className="eyebrow">Nothing here yet</p>
              <h2>Your cart is waiting.</h2>
              <Link className="btn btn--outline-dark" to="/store">
                Continue shopping
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item__details">
                      <p className="eyebrow">Official Merchandise</p>
                      <h2>{item.name}</h2>
                      <p>{formatPrice(item.price)} each</p>
                      <div className="cart-item__controls">
                        <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`}>
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`}>
                            +
                          </button>
                        </div>
                        <button className="cart-item__remove" type="button" onClick={() => removeFromCart(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </article>
                ))}
              </div>

              <aside className="cart-summary">
                <p className="eyebrow">Order Summary</p>
                <div className="cart-summary__row">
                  <span>Total</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
                <Link className="btn btn--outline-dark btn--block" to="/checkout">
                  Buy now
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
