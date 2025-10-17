// components/FooterNote.jsx
import React from "react";

const FooterNote = () => {
  return (
    // <footer className="bg-gray-900 text-white py-8 mt-16">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    //     <p className="text-gray-400">
    //       For more details, contact Dembel Mall Administration.
    //     </p>
    //   </div>
    // </footer>
    <section className="py-12 px-4 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg">
          For more details about any announcement, contact{" "}
          <span className="font-bold">Dembel Mall Administration</span>
        </p>
        <p className="mt-2 text-blue-200">
          Email:{" "}
          <a
            href="mailto:info@dembelmall.et"
            className="underline hover:text-white"
          >
            info@dembelmall.et
          </a>{" "}
          | Phone:{" "}
          <a href="tel:+251111234567" className="underline hover:text-white">
            +251 11 123 4567
          </a>
        </p>
      </div>
    </section>
  );
};

export default FooterNote;
