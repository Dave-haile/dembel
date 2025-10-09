import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children, services }) {
  return (
    <>
      <Header services={services} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
