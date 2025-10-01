import React from "react";
import { Link } from "@inertiajs/react";

export default function Header({ services = [] }) {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/">
                            <img
                                className="hidden md:block h-16 w-auto"
                                src="/img/logo-construction.png"
                                alt="Dembel City Center"
                            />
                            <img
                                className="md:hidden h-12 w-auto"
                                src="/img/logo-construction-small.png"
                                alt="DCC"
                            />
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-orange-600 font-semibold border-b-2 border-orange-600 pb-1"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-700 hover:text-orange-600 font-medium transition duration-150"
                        >
                            About Us
                        </Link>

                        {/* Services Dropdown */}
                        <div className="relative group">
                            <button className="text-gray-700 hover:text-orange-600 font-medium flex items-center transition duration-150">
                                Services
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
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <div className="py-1">
                                    {services.map((service) => (
                                        <Link
                                            key={service.id}
                                            href={`/services/${service.id}`}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                                        >
                                            {service.title_en}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/tenant"
                            className="text-gray-700 hover:text-orange-600 font-medium transition duration-150"
                        >
                            Tenants
                        </Link>
                        <Link
                            href="/gallery"
                            className="text-gray-700 hover:text-orange-600 font-medium transition duration-150"
                        >
                            Gallery
                        </Link>

                        {/* Mall Dropdown */}
                        <div className="relative group">
                            <button className="text-gray-700 hover:text-orange-600 font-medium flex items-center transition duration-150">
                                Mall
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
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <div className="py-1">
                                    <Link
                                        href="/building?building=dembel"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                                    >
                                        Dembel
                                    </Link>
                                    <Link
                                        href="/building?building=extension"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                                    >
                                        Dembel Extension
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Announcement Dropdown */}
                        <div className="relative group">
                            <button className="text-gray-700 hover:text-orange-600 font-medium flex items-center transition duration-150">
                                Announcement
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
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <div className="py-1">
                                    <Link
                                        href="/space"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Free Space
                                    </Link>
                                    <Link
                                        href="/news"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        News
                                    </Link>
                                    <Link
                                        href="/event"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Event
                                    </Link>
                                    <Link
                                        href="/vacancy"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Vacancy
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/contact"
                            className="text-gray-700 hover:text-orange-600 font-medium transition duration-150"
                        >
                            Contact Us
                        </Link>
                    </nav>

                    {/* Mobile menu button */}
                    <button className="lg:hidden p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
