import React from 'react';
import Header from './Header';

export default function FrontendLayout({ children, services = [] }) {
  return (
    <>
      <Header services={services} />
      <main>{children}</main>
      <footer>
        <div className="container">© {new Date().getFullYear()} Dembel City Center</div>
      </footer>
    </>
  );
}
