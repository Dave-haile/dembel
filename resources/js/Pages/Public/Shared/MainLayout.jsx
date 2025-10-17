import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children, services }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header services={services} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
