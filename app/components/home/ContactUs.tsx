import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-light-gray py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-semibold text-dark-heading">Contact Us</h2>
        <form className="mt-8 flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full mb-4"/>
          <input type="email" placeholder="Your Email" className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full mb-4"/>
          <textarea placeholder="Your Message" rows={4} className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full mb-4"></textarea>
          <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-md">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
