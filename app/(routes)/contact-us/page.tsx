import React from "react";

const ContactUsPage = () => {
  return (
    <main className="text-center">
      <h1>Contact Us</h1>
      <p>
        We will love to hear from you! Whether you have a question, need prayer,
        or want to learn more about Christ Baptist Church, feel free to reach
        out.
      </p>
      <address>
        <p>
          Email:{" "}
          <a href="mailto:info@christbaptistchurch.com">
            info@christbaptistchurch.com
          </a>
        </p>
        <p>Phone: +2347033959586 </p>
        <p>Address: Surulere Area, Ogbomoso</p>
      </address>
    </main>
  );
};

export default ContactUsPage;
