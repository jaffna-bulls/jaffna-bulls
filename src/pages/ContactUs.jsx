import { useState } from "react";
import PageHero from "../components/PageHero";
import { submitContactForm } from "../services/contactService";
import "./contactUs.css";

const INITIAL_FORM = {
  name: "",
  emailAddress: "",
  phoneNumber: "",
  subject: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactUs() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear that field's error as the user corrects it
    setFieldErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required.";
    if (!form.emailAddress.trim()) {
      errors.emailAddress = "Email address is required.";
    } else if (!EMAIL_REGEX.test(form.emailAddress.trim())) {
      errors.emailAddress = "Enter a valid email address.";
    }
    if (!form.message.trim()) errors.message = "Message is required.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus("submitting");

    try {
      await submitContactForm({
        name: form.name.trim(),
        emailAddress: form.emailAddress.trim(),
        phoneNumber: form.phoneNumber.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      setServerError(err.message || "Something went wrong. Please try again.");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <>
      <PageHero
        eyebrow="Connect With Jaffna Bulls"
        title="Contact Us"
      />

      <section className="section contact">
        <div className="container contact__grid">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <p className="eyebrow">Send a Message</p>
            <h2>Get in Touch</h2>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  disabled={isSubmitting}
                  required
                />
                {fieldErrors.name && (
                  <p className="contact-form__error" id="name-error">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              <div className="contact-form__field">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  value={form.emailAddress}
                  onChange={handleChange}
                  aria-invalid={!!fieldErrors.emailAddress}
                  aria-describedby={fieldErrors.emailAddress ? "email-error" : undefined}
                  disabled={isSubmitting}
                  required
                />
                {fieldErrors.emailAddress && (
                  <p className="contact-form__error" id="email-error">
                    {fieldErrors.emailAddress}
                  </p>
                )}
              </div>
            </div>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="contact-form__field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.message}
                aria-describedby={fieldErrors.message ? "message-error" : undefined}
                disabled={isSubmitting}
                required
              />
              {fieldErrors.message && (
                <p className="contact-form__error" id="message-error">
                  {fieldErrors.message}
                </p>
              )}
            </div>

            <button className="btn btn--primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="contact-form__success" role="status">
                Thanks your message has been sent. We'll get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="contact-form__error contact-form__error--server" role="alert">
                {serverError}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}