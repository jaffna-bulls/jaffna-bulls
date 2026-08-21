import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import QuickBuyModal from "./QuickBuyModal";
import "./cartDrawer.css";

const formatPrice = (price) => `LKR ${Number(price).toLocaleString("en-LK")}`;

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const [showQuickBuy, setShowQuickBuy] = useState(false);
  const navigate = useNavigate();

  // Prevent background scroll when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleStartShopping = () => {
    closeCart();
    navigate("/store");
  };

  const handleOpenQuickBuy = () => {
    setShowQuickBuy(true);
  };

  return (
    <>
      <div
        className="cart-drawer-backdrop"
        role="presentation"
        onClick={closeCart}
      />

      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart Drawer"
      >
        {/* Drawer Header */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__title-wrap">
            <div className="cart-drawer__icon">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="cart-drawer__title">Your Cart</h2>
              <span className="cart-drawer__count-badge">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </span>
            </div>
          </div>

          <button
            className="cart-drawer__close"
            type="button"
            onClick={closeCart}
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="cart-drawer__body">
          {cartItems.length === 0 ? (
            <div className="cart-drawer__empty">
              <div className="cart-drawer__empty-icon">
                <ShoppingBag size={48} />
              </div>
              <h3>Your cart is empty</h3>
              <p>Gear up with official Jaffna Bulls merchandise.</p>
              <button
                className="btn btn--primary"
                type="button"
                onClick={handleStartShopping}
              >
                Shop Merchandise <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="cart-drawer__items-list">
              {cartItems.map((item) => {
                const itemKey = `${item.id}-${item.selectedSize || "L"}`;
                return (
                  <article className="cart-drawer-item" key={itemKey}>
                    <div className="cart-drawer-item__img-box">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="cart-drawer-item__content">
                      <div className="cart-drawer-item__header">
                        <h4>{item.name}</h4>
                        <button
                          className="cart-drawer-item__delete"
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id, item.selectedSize)
                          }
                          aria-label={`Remove ${item.name} from cart`}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="cart-drawer-item__meta">
                        <span className="cart-drawer-item__size-pill">
                          Size: {item.selectedSize || "L"}
                        </span>
                        <span className="cart-drawer-item__unit-price">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      <div className="cart-drawer-item__bottom">
                        {/* Quantity Stepper */}
                        <div
                          className="cart-stepper"
                          aria-label={`Quantity control for ${item.name}`}
                        >
                          <button
                            type="button"
                            className="cart-stepper__btn"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1,
                                item.selectedSize,
                              )
                            }
                            aria-label="Decrease count"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="cart-stepper__value">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            className="cart-stepper__btn"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1,
                                item.selectedSize,
                              )
                            }
                            aria-label="Increase count"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <strong className="cart-drawer-item__total">
                          {formatPrice(item.price * item.quantity)}
                        </strong>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__trust-badge">
              <PackageCheck size={16} />
              <span>Official Jaffna Bulls Store · Genuine Merchandise</span>
            </div>

            <div className="cart-drawer__summary">
              <div className="cart-drawer__summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="cart-drawer__summary-row">
                <span>Standard Delivery</span>
                <span className="cart-drawer__free-shipping">Calculated at order</span>
              </div>
              <div className="cart-drawer__summary-row cart-drawer__summary-total">
                <span>Total Amount</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>
            </div>

            <div className="cart-drawer__actions">
              <button
                className="cart-drawer__buy-btn"
                type="button"
                onClick={handleOpenQuickBuy}
              >
                <span>Buy Now · {formatPrice(cartTotal)}</span>
                <ArrowRight size={18} />
              </button>

              <div className="cart-drawer__secondary-actions">
                <Link
                  to="/checkout"
                  className="cart-drawer__alt-checkout"
                  onClick={closeCart}
                >
                  Bank Transfer & Slip Upload Form
                </Link>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Quick Buy Checkout Modal */}
      <QuickBuyModal
        isOpen={showQuickBuy}
        onClose={() => setShowQuickBuy(false)}
      />
    </>
  );
}
