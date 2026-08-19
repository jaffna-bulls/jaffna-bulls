import { useState } from "react";
import PageHero from "../components/PageHero";
import "./contactUs.css";

const INFO_CARDS = [
  {
    title: "General Enquiries",
    text: "Official email address, phone number, and registered address will be displayed once confirmed.",
  },
  {
    title: "Careers & Opportunities",
    text: "Interested in working with Jaffna Bulls? Use the contact form to enquire about current open roles within the franchise.",
  },
  {
    title: "Partners & Stakeholders",
    text: "Connect with our team to discuss partnership and stakeholder enquiries.",
  },
];

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Connect With Jaffna Bulls"
        title="Contact Us"
        // description="A simple, professional way for supporters, partners, and stakeholders to contact the franchise."
      />

      <section className="section contact">
        <div className="container contact__grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <p className="eyebrow">Send a Message</p>
            <h2>Get in Touch</h2>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required />
              </div>
              <div className="contact-form__field">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" required />
              </div>
            </div>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" name="phone" type="tel" />
              </div>
              <div className="contact-form__field">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" />
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={6} required />
            </div>

            <button className="btn btn--primary" type="submit">
              Send Message
            </button>

            {submitted && (
              <p className="contact-form__success" role="status">
                Thanks — your message has been noted. This is a demo form with
                no backend connected yet.
              </p>
            )}
          </form>

          {/* <div className="contact-info">
            {INFO_CARDS.map((card) => (
              <div className="contact-info__card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div> */}
        </div>
      </section>
    </>
  );
}
