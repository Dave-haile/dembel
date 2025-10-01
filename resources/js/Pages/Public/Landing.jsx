import React from "react";
import { Head, Link } from "@inertiajs/react";
import MainLayout from "./Shared/MainLayout";

const Home = ({ sliders, testimonials, news, services, gallery }) => {
    const navigationLinks = [
        "Home",
        "About",
        "Services",
        "Gallery",
        "Tenants",
        "News",
        "Events",
        "Vacancy",
        "Free Space",
        "Contact",
    ];

    const sisterCompanies = [
        "Yencomad Construction",
        "Dembel Real Estate",
        "Abaya-Gelna Agricultural Development",
        "One Engineering",
    ];
    return (
        <MainLayout>
            <Head title="Home - Dembel City Center" />
            {/* <main>
                <section className="relative bg-gray-900">
                    <div className="relative h-96 md:h-[500px] overflow-hidden">
                        {sliders.length > 0 ? (
                            <div className="absolute inset-0">
                                <img
                                    src={sliders[0].image}
                                    alt={sliders[0].title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500"></div>
                        )}

                        <div className="relative container mx-auto px-4 h-full flex items-center">
                            <div className="text-white max-w-2xl">
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                    Dembel City Center
                                </h1>
                                <p className="text-xl md:text-2xl mb-8 opacity-90">
                                    Your Premier Shopping Destination
                                </p>
                                <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105">
                                    Explore Now
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                            Our Services
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.slice(0, 3).map((service) => (
                                <div
                                    key={service.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                                >
                                    <div className="h-48 bg-gray-200">
                                        {service.image && (
                                            <img
                                                src={service.image}
                                                alt={service.title_en}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                            {service.title_en}
                                        </h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {service.description}
                                        </p>
                                        <Link
                                            href={`/services/${service.id}`}
                                            className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center transition duration-150"
                                        >
                                            Learn More
                                            <svg
                                                className="ml-1 w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                            Latest News
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {news.map((item) => (
                                <article
                                    key={item.id}
                                    className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition duration-300"
                                >
                                    <div className="h-48 bg-gray-200">
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {item.content}
                                        </p>
                                        <div className="text-sm text-gray-500">
                                            {new Date(
                                                item.created_at
                                            ).toLocaleDateString()}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-gray-900 text-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                            Gallery
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {gallery.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`relative h-48 bg-gray-700 rounded-lg overflow-hidden group cursor-pointer ${
                                        index === 0
                                            ? "md:col-span-2 md:row-span-2 h-96"
                                            : ""
                                    }`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-center justify-center">
                                        <span className="opacity-0 group-hover:opacity-100 transition duration-300 font-semibold">
                                            {item.title}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-orange-600 text-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                            What People Say
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm"
                                >
                                    <div className="text-yellow-300 text-4xl mb-4">
                                        "
                                    </div>
                                    <p className="text-lg mb-4 italic">
                                        {testimonial.content}
                                    </p>
                                    <div className="font-semibold">
                                        - {testimonial.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main> */}

            <section className="relative mt-20">
                <div className="h-[700px] w-full overflow-hidden">
                    {sliders.length > 0 ? (
                        <div className="relative h-full">
                            <img
                                src={`/storage/${sliders[0].image}`}
                                alt={sliders[0].title_en}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                            <div className="absolute bottom-20 right-10">
                                <div className="bg-primary text-white px-4 py-2 text-lg font-semibold animate-fade-in">
                                    {sliders[0].title_en}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                            <div className="text-white text-center">
                                <h1 className="text-5xl font-bold mb-4">
                                    Dembel City Center
                                </h1>
                                <p className="text-xl">
                                    Your Premier Shopping Destination
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-4">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Who We Are
                            </h2>
                            <p className="text-xl text-primary font-semibold">
                                Dembel City Centre (DCC)
                            </p>
                        </div>

                        <div className="lg:col-span-2 hidden lg:flex justify-center">
                            <div className="w-px h-32 bg-gray-300 rotate-45"></div>
                        </div>

                        <div className="lg:col-span-6">
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                Dembel City Centre (DCC) is a beautiful
                                flowery-yellow multi story building, located at
                                Africa Avenue on the road to the Air Port of
                                Addis Ababa. It is one of the first
                                Western-style shopping malls in Ethiopia built
                                in 2002. It is covering about 40,000m² of floor
                                area with basement ground floor and 12 stories,
                                is one of the best buildings in Ethiopia.
                            </p>
                            <Link
                                href="/about"
                                className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition duration-300"
                            >
                                Learn More
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
            </section>

            {/* Services Section */}
            <section className="py-16 bg-tertiary">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Services
                        </h2>
                        <p className="text-xl text-gray-600">
                            Some of our outdoor and indoor services
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 text-white"
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
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {service.title_en}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {service.sub_title_en}
                                        </p>
                                        <Link
                                            href={`/services/${service.id}`}
                                            className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition duration-300"
                                        >
                                            Learn More
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
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Gallery
                        </h2>
                        <p className="text-xl text-gray-600">
                            Some of our gallery
                        </p>
                    </div>

                    {/* Diamond Grid Gallery */}
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gallery-grid">
                            {gallery.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`relative overflow-hidden rounded-lg group cursor-pointer ${
                                        index === 3 ||
                                        index === 5 ||
                                        index === 6
                                            ? "md:col-span-1 md:row-span-1"
                                            : "md:col-span-2 md:row-span-2"
                                    }`}
                                >
                                    <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-center justify-center">
                                        <div className="text-white opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-4 group-hover:translate-y-0">
                                            <svg
                                                className="w-8 h-8 mx-auto"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-12 max-w-2xl mx-auto">
                        <p className="text-gray-700 text-lg mb-6">
                            The twelve-floor structure has more than 123 spaces
                            for shops and offices. It has a modern well-secured
                            double deck parking with a capacity of 500 vehicles
                            at a time.
                        </p>
                        <Link
                            href="/gallery"
                            className="inline-flex items-center px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition duration-300"
                        >
                            View All Galleries
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                className="py-20 bg-cover bg-center bg-gray-900 text-white relative"
                style={{
                    backgroundImage:
                        "url('/img/testimonials/testimonials-bg.jpg')",
                    backgroundPosition: "50% 100%",
                    minHeight: "540px",
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="container mx-auto px-4 relative">
                    <div className="flex justify-end">
                        <div className="w-full lg:w-1/2">
                            <div className="testimonial-carousel">
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={testimonial.id}
                                        className="testimonial-slide"
                                    >
                                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border border-white border-opacity-20">
                                            <div className="text-4xl text-yellow-400 mb-4">
                                                "
                                            </div>
                                            <blockquote className="text-lg italic mb-6">
                                                {testimonial.testimon}
                                            </blockquote>
                                            <div className="text-right">
                                                <p className="font-semibold text-lg">
                                                    {testimonial.name}
                                                </p>
                                                <p className="text-yellow-400">
                                                    {testimonial.position}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* News Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            News
                        </h2>
                        <p className="text-xl text-gray-600">Latest news</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {news.map((newsItem) => (
                            <article
                                key={newsItem.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                            >
                                <Link href={`/news/${newsItem.id}`}>
                                    <div className="relative h-48 bg-gray-200">
                                        <img
                                            src={`/storage/${newsItem.image}`}
                                            alt={newsItem.title_en}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </Link>

                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-primary text-white text-center rounded-lg p-2 mr-4">
                                            <div className="text-lg font-bold">
                                                {new Date(
                                                    newsItem.created_at
                                                ).getDate()}
                                            </div>
                                            <div className="text-xs">
                                                {new Date(
                                                    newsItem.created_at
                                                ).toLocaleString("default", {
                                                    month: "short",
                                                })}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition duration-300">
                                                <Link
                                                    href={`/news/${newsItem.id}`}
                                                >
                                                    {newsItem.title_en}
                                                </Link>
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                By{" "}
                                                {newsItem.author?.name ||
                                                    "Admin"}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 mb-4 line-clamp-3">
                                        {newsItem.sub_title_en}
                                    </p>

                                    <Link
                                        href={`/news/${newsItem.id}`}
                                        className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition duration-300"
                                    >
                                        Read More
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
                            </article>
                        ))}
                    </div>
                </div>
            </section>
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <img
                                src="/img/logo-construction-small.png"
                                alt="Dembel City Center"
                                className="h-12 mb-4"
                            />
                            <p className="text-gray-400">
                                Your premier shopping and entertainment
                                destination in the heart of the city.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">
                                Quick Links
                            </h3>
                            <ul className="space-y-2 text-gray-400">
                                {navigationLinks.map((link) => (
                                    <li key={link}>
                                        <Link
                                            href={`#${link
                                                .toLowerCase()
                                                .replace(" ", "-")}`}
                                            className="text-gray-300 hover:text-white transition-colors duration-200"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link
                                        href="/contact"
                                        className="hover:text-white transition duration-150"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">
                                Contact Info
                            </h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>Dembel City Center</li>
                                <li>Addis Ababa, Ethiopia</li>
                                <li>Phone: +251 11 123 4567</li>
                                <li>Email: info@dembel.com</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">
                                Follow Us
                            </h3>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white transition duration-150"
                                >
                                    <span className="sr-only">Facebook</span>
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>
                            &copy; 2024 Dembel City Center. All rights reserved.
                            Developed by www.melfantech.com
                        </p>
                    </div>
                </div>
            </footer>
        </MainLayout>
    );
};
export default Home;

// import React from 'react'
// import { Head, Link } from '@inertiajs/inertia-react';

// const Home = () => {
//   return (

//     <>
//     <Head title="Home" />
//     <div>Home</div>
//     </>
//   )
// }
// export default Home;
