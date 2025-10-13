import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "../Shared/MainLayout";

const ServiceDetail = ({ service, allServices }) => {
  const { data, setData, post, processing, errors, recentlySuccessful } =
    useForm({
      name: "",
      email: "",
      subject: `Inquiry about ${service.title_en}`,
      message: "",
    });

  const submit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-undef
    post(route("services.contact"));
  };

  return (
    <MainLayout>
      <Head title={`${service.title_en} - Dembel City Center`} />
      <section className="bg-tertiary py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-end">
            <div className="w-full lg:w-10/12">
              <div className="py-8 text-right">
                <h1 className="text-4xl lg:text-5xl font-light uppercase text-primary">
                  {service.title_en}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-32">
              {/* Services Navigation */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Services
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/services"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary rounded-lg transition duration-200"
                    >
                      Overview
                    </Link>
                  </li>
                  {allServices.map((serv) => (
                    <li key={serv.id}>
                      <Link
                        href={`/services/${serv.id}`}
                        className={`block px-4 py-3 rounded-lg transition duration-200 ${
                          serv.id === service.id
                            ? "bg-primary text-white font-semibold"
                            : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                        }`}
                      >
                        {serv.title_en}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Form */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Contact Us
                </h4>
                <p className="text-gray-600 mb-6">
                  Interested in this service? Contact us for more information.
                </p>

                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your email address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={data.subject}
                      onChange={(e) => setData("subject", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows="3"
                      value={data.message}
                      onChange={(e) => setData("message", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={processing}
                      className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-200 disabled:opacity-50"
                    >
                      {processing ? "Sending..." : "Send Message"}
                    </button>
                  </div>

                  {recentlySuccessful && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                      Message has been sent successfully.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </aside>

          {/* Service Detail Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Service Header */}
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {service.title_en}
                  </h2>
                  <p className="text-gray-600 mt-2">{service.sub_title_en}</p>
                </div>
              </div>

              {/* Service Image */}
              {service.image && (
                <div className="mb-8">
                  <img
                    src={
                      service.image.startsWith("http")
                        ? service.image
                        : `/${service.image.replace(/^\/+/, "")}`
                    }
                    alt={service.title_en}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Service Description */}
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {service.description ||
                    "Detailed information about this service will be available soon."}
                </p>

                {/* Additional service details can be added here */}
                <div className="bg-gray-50 rounded-lg p-6 mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Service Highlights
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-primary mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Professional and reliable service
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-primary mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Experienced and trained staff
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-primary mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Customer satisfaction guaranteed
                    </li>
                  </ul>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 p-6 bg-primary rounded-lg text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Ready to Get Started?
                </h3>
                <p className="text-white mb-4">
                  Contact us today to learn more about this service
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
                >
                  Contact Us
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServiceDetail;
