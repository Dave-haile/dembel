import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";

const FeaturedTenants = ({ tenants }) => {
  const getLogo = (tenant) => {
    if (tenant && tenant.logo) return tenant.logo;
    return "https://placehold.co/600x400?text=No+Store+Logo";
  };

  // const normalizeWebsite = (website) => {
  //   if (!website) return null;
  //   if (/^https?:\/\//i.test(website)) return website;
  //   return `https://${website}`;
  // };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Featured Tenants
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our premium collection of brands and stores offering the
            best shopping experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tenants.map((tenant) => (
            <div
              key={tenant.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={getLogo(tenant)}
                  alt={tenant?.name || "Tenant logo"}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              <div className="p-6">
                {tenant?.category && (
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {tenant.category.name}
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors duration-200">
                  {tenant?.name || "Unnamed Tenant"}
                </h3>

                {tenant?.description && (
                  <p className="text-gray-600 mb-4">{tenant.description}</p>
                )}

                <Link
                  href={`/tenant/${tenant.id}`}
                  className="inline-flex items-center text-blue-800 hover:text-blue-900 font-medium group/link transition-colors duration-200"
                >
                  Visit Store
                  <ArrowRight
                    size={16}
                    className="ml-2 transform group-hover/link:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={"/tenant"}
            className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center group"
          >
            View All Tenants
            <ArrowRight
              size={20}
              className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTenants;
