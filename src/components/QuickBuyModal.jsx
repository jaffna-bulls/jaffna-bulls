import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  Building2,
  AlertCircle,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { startPayHerePayment } from "../services/payhereService";
import "./quickBuyModal.css";

const formatPrice = (price) => `LKR ${Number(price).toLocaleString("en-LK")}`;

export default function QuickBuyModal({ isOpen, onClose }) {
  const { cartItems, cartTotal, clearCart, closeCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderSummary, setOrderSummary] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("payhere");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Jaffna",
    postalCode: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleQuickOrder = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMessage("Please complete all required contact & delivery fields.");
      return;
    }

    const orderId = `JB-${Math.floor(100000 + Math.random() * 900000)}`;

    // Direct Bank Transfer -> Navigate to /checkout with prefilled details
    if (paymentMethod === "bank") {
      onClose();
      if (closeCart) closeCart();
      navigate("/checkout", {
        state: {
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            state: "Northern",
            country: "Sri Lanka",
          },
        },
      });
      return;
    }

    // Online Payment via PayHere Gateway
    if (paymentMethod === "payhere") {
      setIsSubmitting(true);

      try {
        await startPayHerePayment({
          orderId,
          amount: cartTotal,
          items: cartItems,
          customer: formData,
          onCompleted: (completedOrderId) => {
            const confirmedOrder = {
              orderId: completedOrderId || orderId,
              date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
              customer: { ...formData },
              items: [...cartItems],
              total: cartTotal,
              paymentMethod: "PayHere Online Payment (Card / Wallet)",
              paymentStatus: "Paid Online",
            };

            setOrderSummary(confirmedOrder);
            setIsSubmitted(true);
            setIsSubmitting(false);
            clearCart();
          },
          onDismissed: () => {
            setIsSubmitting(false);
            setErrorMessage(
              "PayHere payment window was closed. You can retry or choose another payment method.",
            );
          },
          onError: (error) => {
            setIsSubmitting(false);
            setErrorMessage(
              typeof error === "string"
                ? error
                : "PayHere encountered an error during payment processing.",
            );
          },
        });
      } catch (err) {
        setIsSubmitting(false);
        setErrorMessage(
          err.message || "Failed to initialize PayHere payment. Please try again.",
        );
      }
      return;
    }

    // Cash on Delivery
    setIsSubmitting(true);
    const newOrder = {
      orderId,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      customer: { ...formData },
      items: [...cartItems],
      total: cartTotal,
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Payment on Arrival",
    };

    setTimeout(() => {
      setOrderSummary(newOrder);
      setIsSubmitted(true);
      setIsSubmitting(false);
      clearCart();
    }, 700);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setOrderSummary(null);
    setErrorMessage("");
    onClose();
  };

  return (
    <div className="quickbuy-overlay" role="presentation" onClick={handleClose}>
      <div
        className="quickbuy-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickbuy-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="quickbuy-close"
          type="button"
          onClick={handleClose}
          aria-label="Close checkout"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <>
            <div className="quickbuy-header">
              <div className="quickbuy-badge">
                <ShieldCheck size={14} /> PayHere Secure Checkout
              </div>
              <h2 id="quickbuy-title">Complete Your Purchase</h2>
              <p>Enter your details and select your preferred payment method.</p>
            </div>

            <div className="quickbuy-body">
              {errorMessage && (
                <div className="quickbuy-alert" role="alert">
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Order items mini review */}
              <div className="quickbuy-items-preview">
                <span className="quickbuy-section-title">Order Items ({cartItems.length})</span>
                <div className="quickbuy-items-list">
                  {cartItems.map((item) => (
                    <div className="quickbuy-item-row" key={`${item.id}-${item.selectedSize || "L"}`}>
                      <img src={item.image} alt={item.name} className="quickbuy-item-img" />
                      <div className="quickbuy-item-info">
                        <strong>{item.name}</strong>
                        <span>
                          Size: <em>{item.selectedSize || "L"}</em> · Qty: {item.quantity}
                        </span>
                      </div>
                      <span className="quickbuy-item-price">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="quickbuy-total-row">
                  <span>Grand Total</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
              </div>

              {/* Order Form */}
              <form className="quickbuy-form" onSubmit={handleQuickOrder}>
                <span className="quickbuy-section-title">Delivery & Contact Details</span>

                <div className="quickbuy-form-grid">
                  <div className="quickbuy-field">
                    <label htmlFor="qb-name">Full Name *</label>
                    <input
                      id="qb-name"
                      name="name"
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="quickbuy-field">
                    <label htmlFor="qb-phone">Phone Number *</label>
                    <input
                      id="qb-phone"
                      name="phone"
                      type="tel"
                      placeholder="e.g. 077 123 4567"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="quickbuy-field">
                  <label htmlFor="qb-email">Email Address *</label>
                  <input
                    id="qb-email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="quickbuy-field">
                  <label htmlFor="qb-address">Delivery Street Address *</label>
                  <input
                    id="qb-address"
                    name="address"
                    type="text"
                    placeholder="Street name, premises or building"
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="quickbuy-form-grid">
                  <div className="quickbuy-field">
                    <label htmlFor="qb-city">City / District *</label>
                    <input
                      id="qb-city"
                      name="city"
                      type="text"
                      placeholder="e.g. Jaffna"
                      required
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="quickbuy-field">
                    <label htmlFor="qb-postal">Postal Code</label>
                    <input
                      id="qb-postal"
                      name="postalCode"
                      type="text"
                      placeholder="e.g. 40000"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Payment Selection with PayHere highlighted */}
                <div className="quickbuy-payment-section">
                  <span className="quickbuy-section-title">Payment Method</span>
                  <div className="quickbuy-payment-options">
                    {/* PayHere Online Payment */}
                    <label
                      className={`quickbuy-payment-option ${paymentMethod === "payhere" ? "is-selected is-highlighted" : ""
                        }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="payhere"
                        checked={paymentMethod === "payhere"}
                        onChange={() => setPaymentMethod("payhere")}
                      />
                      <div className="quickbuy-payment-icon">
                        <CreditCard size={19} />
                      </div>
                      <div className="quickbuy-payment-text">
                        <div className="quickbuy-payment-title-row">
                          <strong>Online Payment (PayHere Gateway)</strong>
                          <span className="quickbuy-payhere-badge">Instant</span>
                        </div>
                        <span>Visa, Mastercard, AMEX, Genie, FriMi & eZ Cash</span>
                      </div>
                    </label>

                    {/* Cash on Delivery */}
                    {/* <label
                      className={`quickbuy-payment-option ${
                        paymentMethod === "cod" ? "is-selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                      />
                      <div className="quickbuy-payment-icon">
                        <Truck size={19} />
                      </div>
                      <div className="quickbuy-payment-text">
                        <strong>Cash on Delivery</strong>
                        <span>Pay in cash when package arrives</span>
                      </div>
                    </label> */}

                    {/* Bank Transfer */}
                    <label
                      className={`quickbuy-payment-option ${paymentMethod === "bank" ? "is-selected" : ""
                        }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={() => setPaymentMethod("bank")}
                      />
                      <div className="quickbuy-payment-icon">
                        <Building2 size={19} />
                      </div>
                      <div className="quickbuy-payment-text">
                        <strong>Direct Bank Transfer</strong>
                        <span>Manual bank transfer payment</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  className="quickbuy-submit-btn"
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0}
                >
                  {isSubmitting ? (
                    <span className="quickbuy-spinner" />
                  ) : paymentMethod === "payhere" ? (
                    <>
                      <span>Pay with PayHere · {formatPrice(cartTotal)}</span>
                      <ExternalLink size={16} />
                    </>
                  ) : paymentMethod === "bank" ? (
                    <>
                      <span>Proceed to Receipt Upload · {formatPrice(cartTotal)}</span>
                      <ArrowRight size={16} />
                    </>
                  ) : (
                    `Place Order · ${formatPrice(cartTotal)}`
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="quickbuy-success">
            <div className="quickbuy-success-icon">
              <CheckCircle size={56} />
            </div>
            <h2>Order Placed Successfully!</h2>
            <p className="quickbuy-success-sub">
              Thank you for your order. We have received your details and are preparing your Jaffna Bulls merchandise.
            </p>

            {orderSummary && (
              <div className="quickbuy-receipt">
                <div className="quickbuy-receipt-row">
                  <span>Order Reference:</span>
                  <strong>{orderSummary.orderId}</strong>
                </div>
                <div className="quickbuy-receipt-row">
                  <span>Customer:</span>
                  <strong>{orderSummary.customer.name} ({orderSummary.customer.phone})</strong>
                </div>
                <div className="quickbuy-receipt-row">
                  <span>Delivery Address:</span>
                  <strong>
                    {orderSummary.customer.address}, {orderSummary.customer.city}
                  </strong>
                </div>
                <div className="quickbuy-receipt-row">
                  <span>Payment Method:</span>
                  <strong>{orderSummary.paymentMethod}</strong>
                </div>
                <div className="quickbuy-receipt-row">
                  <span>Payment Status:</span>
                  <span className="quickbuy-paid-status">{orderSummary.paymentStatus}</span>
                </div>
                <div className="quickbuy-receipt-divider" />
                <div className="quickbuy-receipt-items">
                  {orderSummary.items.map((it) => (
                    <div className="quickbuy-receipt-item" key={`${it.id}-${it.selectedSize || "L"}`}>
                      <span>
                        {it.name} (Size: {it.selectedSize || "L"}) × {it.quantity}
                      </span>
                      <span>{formatPrice(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="quickbuy-receipt-divider" />
                <div className="quickbuy-receipt-row quickbuy-receipt-total">
                  <span>Total Paid</span>
                  <strong>{formatPrice(orderSummary.total)}</strong>
                </div>
              </div>
            )}

            <div className="quickbuy-success-actions">
              <button
                className="btn btn--primary btn--block"
                type="button"
                onClick={handleClose}
              >
                Done / Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

