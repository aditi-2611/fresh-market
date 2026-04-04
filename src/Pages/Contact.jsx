import React from "react";

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-box">

        <h1>Contact Us</h1>
        <p>We would love to hear from you! Fill out the form below.</p>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Your Message" rows="5" required></textarea>

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <h3>Our Location</h3>
          <p>Indore, Madhya Pradesh, India</p>

          <h3> Phone</h3>
          <p>+91 9302287645</p>

          <h3>Email</h3>
          <p>support@freshmarket.com</p>
        </div>

      </div>
    </div>
  );
}

export default Contact;
