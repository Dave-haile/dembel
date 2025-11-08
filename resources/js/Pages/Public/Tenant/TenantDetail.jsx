import React from "react";
import { Head, Link } from "@inertiajs/react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  Star,
} from "lucide-react";
import MainLayout from "../Shared/MainLayout";
import { Map } from "../Shared/Map";
import { toast } from "react-toastify";

const TenantDetail = ({ tenant }) => {
  const category = tenant.category?.slug || "";
  const categoryName = tenant.category?.name || "";

  if (!tenant) {
    toast.error("Store Not Found");
    return (
      <MainLayout>
        <Head title="Store Not Found - Dembel City Center" />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🏪</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Store Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The store you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              // eslint-disable-next-line no-undef
              href={route("tenant.index")}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Directory
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
  const getCategoryColor = (category) => {
    const colors = {
      fashion: "bg-pink-100 text-pink-800",
      jewelry: "bg-purple-100 text-purple-800",
      beauty: "bg-rose-100 text-rose-800",
      restaurants: "bg-orange-100 text-orange-800",
      electronics: "bg-blue-100 text-blue-800",
      home: "bg-green-100 text-green-800",
      entertainment: "bg-indigo-100 text-indigo-800",
      health: "bg-emerald-100 text-emerald-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };
  const logoPath = tenant.logo ? `/${tenant.logo}` : "/storage/img/default.jpg";

  return (
    <MainLayout>
      <>
        <Head title={`${tenant.name} - Dembel City Center`} />
        <div className="relative h-80 bg-gradient-to-r from-slate-800 to-slate-700 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url(${logoPath})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
            <Link
              // eslint-disable-next-line no-undef
              href={route("tenant.index")}
              className="absolute top-6 left-4 flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Directory</span>
            </Link>

            <div className="flex items-center gap-8 mt-16">
              <div className="w-32 h-32 bg-white rounded-2xl p-4 shadow-xl">
                <img
                  src={logoPath}
                  alt={tenant.name}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.target.src = "storage/img/default.jpg";
                  }}
                />
              </div>

              <div className="text-white">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl md:text-5xl font-bold">
                    {tenant.name}
                  </h1>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                      category
                    )}`}
                  >
                    {categoryName}
                  </span>
                </div>
                <p className="text-xl text-gray-200 mb-4">{tenant.description}</p>
                <div className="flex items-center gap-6 text-gray-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      {tenant.room_no && <div>Room: {tenant.room_no}</div>}
                      <div>{tenant.floor?.name || tenant.floor}, {tenant.location}</div>
                    </div>
                  </div>
                  {tenant.hours && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{tenant.hours}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  About {tenant.name}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {tenant.fullDescription || tenant.description}
                </p>
              </div>

              {/* Store Features */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Store Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">
                      Premium Quality
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">
                      Prime Location
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Phone className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">
                      Customer Support
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">
                      Extended Hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-lg p-8 h-96">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-between">
                  <span>Store Location</span>
                  <span className="flex items-center gap-4">
                    <span className="text-2xl pl-4">Room: {tenant.room_no}</span>
                    <span className="text-2xl pl-4">{tenant.floor?.name || tenant.floor}, {tenant.location}</span>
                  </span>
                </h2>
                {/* <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                <div className="h-80 w-96"> */}
                <Map />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      {tenant.building && <p className="font-medium text-gray-900">{tenant.building}</p>}
                      {tenant.room_no && <p className="font-medium text-gray-900">Room: {tenant.room_no}</p>}
                      <p className="font-medium text-gray-900">{tenant.floor?.name || tenant.floor}</p>
                      {tenant.location && <p className="text-gray-600">{tenant.location}</p>}
                    </div>
                  </div>

                  {tenant.hours && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Opening Hours</p>
                        <p className="text-gray-600">{tenant.hours}</p>
                      </div>
                    </div>
                  )}

                  {tenant.phone && (
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(tenant.phone);
                        toast.success("Phone number copied to clipboard");
                      }}
                      className="flex items-center gap-3 cursor-pointer">
                      <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600">{tenant.phone}</p>
                      </div>
                    </div>
                  )}

                  {tenant.email && (
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(tenant.email);
                        toast.success("Email copied to clipboard");
                      }}
                      className="flex items-center gap-3 cursor-pointer">
                      <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">{tenant.email}</p>
                      </div>
                    </div>
                  )}

                  {tenant.website && (
                    <div
                      className="flex items-center gap-3 cursor-pointer">
                      <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Website</p>
                        <a
                          href={
                            tenant.website.startsWith("http")
                              ? tenant.website
                              : `https://${tenant.website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {tenant.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {tenant.phone && (
                    <a
                      href={`tel:${tenant.phone}`}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Call Store
                    </a>
                  )}

                  {tenant.email && (
                    <a
                      href={`mailto:${tenant.email}`}
                      className="w-full bg-gray-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      Send Email
                    </a>
                  )}

                  {tenant.website && (
                    <a
                      href={
                        tenant.website.startsWith("http")
                          ? tenant.website
                          : `https://${tenant.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Globe className="w-5 h-5" />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MainLayout>
  );
};

export default TenantDetail;
