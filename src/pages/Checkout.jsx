import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { uploadPaymentProof } from "../services/uploadService";
import "./checkout.css";

const BANK_DETAILS = [
  ["Bank", "Jaffna Bulls Bank"],
  ["Account name", "Jaffna Bulls Merchandise"],
  ["Account number", "000 123 456 789"],
  ["Branch", "Colombo Main Branch"],
];

export default function Checkout() {
  const location = useLocation();
  const prefilled = location.state?.customer || {};

  const { cartItems, cartTotal } = useCart();
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [creatingOrder, setCreatingOrder] = useState(false);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setPdfUrl(null);
    setUploading(true);
    setUploadProgress(0);
    setUploadStatus("Getting upload URL...");
    setOrderStatus("");

    try {
      setUploadStatus("Uploading payment proof...");
      const finalUrl = await uploadPaymentProof(selectedFile, setUploadProgress);
      setPdfUrl(finalUrl);
      setUploadProgress(100);
      setUploadStatus("Payment proof uploaded successfully.");
    } catch (error) {
      console.error(error);
      setUploadStatus(error.message || "Payment proof upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOrderStatus("");

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!pdfUrl || !file) {
      setOrderStatus("Upload your payment proof before placing the order.");
      return;
    }

    const formData = new FormData(form);
    const getValue = (name) => String(formData.get(name) || "").trim();
    const customerName = getValue("customerName");
    const email = getValue("email");
    const phone = getValue("phone");
    const addressFields = ["street", "city", "state", "postalCode", "country"];

    if (!customerName || !email || !phone || addressFields.some((field) => !getValue(field))) {
      setOrderStatus("Please complete all customer and shipping details.");
      return;
    }

    if (!/^\+?[0-9 ()-]{7,20}$/.test(phone)) {
      setOrderStatus("Please enter a valid phone number.");
      return;
    }

    const order = {
      customerName,
      email,
      phone,
      items: cartItems.map((item) => ({
        itemId: String(item.id),
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
        total: Number((item.price * item.quantity).toFixed(2)),
      })),
      totalAmount: Number(cartTotal.toFixed(2)),
      status: "pending",
      invoiceUrl: pdfUrl,
      shippingAddress: {
        street: getValue("street"),
        city: getValue("city"),
        state: getValue("state"),
        postalCode: getValue("postalCode"),
        country: getValue("country"),
      },
    };

    setCreatingOrder(true);

    try {
      await createOrder(order);
      setOrderStatus("Order created successfully.");
    } catch (error) {
      console.error(error);
      setOrderStatus(error.message || "The order could not be created. Please try again.");
    } finally {
      setCreatingOrder(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="section checkout-page">
        <div className="container checkout-empty">
          <p className="eyebrow">Checkout</p>
          <h1>Your cart is empty.</h1>
          <Link className="btn btn--outline-dark" to="/store">Back to store</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero eyebrow="Secure Checkout" title="Complete your order." />
      <section className="section checkout-page">
        <div className="container checkout-layout">
          <div className="checkout-details">
            <div className="bank-details">
              <p className="eyebrow">Demo bank details</p>
              <h2>Payment information</h2>
              {BANK_DETAILS.map(([label, value]) => (
                <div className="bank-details__row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
              <p className="checkout-note">Please use your order name as the payment reference.</p>
            </div>

            <form className="checkout-form" onSubmit={handleSubmit}>
              <p className="eyebrow">Delivery details</p>
              <h2>Customer information</h2>
              <label>
                Customer name
                <input
                  name="customerName"
                  defaultValue={prefilled.name || ""}
                  required
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  defaultValue={prefilled.email || ""}
                  required
                />
              </label>
              <label>
                Phone
                <input
                  name="phone"
                  type="tel"
                  defaultValue={prefilled.phone || ""}
                  required
                />
              </label>
              <label>
                Street
                <input
                  name="street"
                  defaultValue={prefilled.address || "123 Main St"}
                  required
                />
              </label>
              <div className="checkout-form__row">
                <label>
                  City
                  <input
                    name="city"
                    defaultValue={prefilled.city || "Colombo"}
                    required
                  />
                </label>
                <label>
                  State
                  <input
                    name="state"
                    defaultValue={prefilled.state || "Western"}
                    required
                  />
                </label>
              </div>
              <div className="checkout-form__row">
                <label>
                  Postal code
                  <input
                    name="postalCode"
                    defaultValue={prefilled.postalCode || "00700"}
                    required
                  />
                </label>
                <label>
                  Country
                  <input
                    name="country"
                    defaultValue={prefilled.country || "Sri Lanka"}
                    required
                  />
                </label>
              </div>
              <label>
                Payment proof
                <input
                  name="paymentProof"
                  type="file"
                  accept="image/*,.pdf"
                  required
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </label>
              {file && <p className="upload-file-name">Selected: {file.name}</p>}
              {uploading && (
                <div className="upload-progress" aria-live="polite">
                  <div className="upload-progress__bar" style={{ width: `${uploadProgress}%` }} />
                  <span>{uploadProgress}%</span>
                </div>
              )}
              {uploadStatus && <p className="upload-status" aria-live="polite">{uploadStatus}</p>}
              {pdfUrl && <a className="upload-link" href={pdfUrl} target="_blank" rel="noreferrer">View uploaded payment proof</a>}
              <button className="btn btn--primary btn--block" type="submit" disabled={uploading || creatingOrder || !pdfUrl}>
                {creatingOrder ? "Creating order..." : "Place order"}
              </button>
              {orderStatus && <p className="checkout-note" aria-live="polite">{orderStatus}</p>}
            </form>
          </div>

          <aside className="checkout-summary">
            <p className="eyebrow">Your order</p>
            {cartItems.map((item) => (
              <div className="checkout-summary__item" key={item.id}>
                <span>{item.name} x {item.quantity}</span>
                <strong>LKR {(item.price * item.quantity).toLocaleString("en-LK")}</strong>
              </div>
            ))}
            <div className="checkout-summary__total"><span>Total</span><strong>LKR {cartTotal.toLocaleString("en-LK")}</strong></div>
          </aside>
        </div>
      </section>
    </>
  );
}
