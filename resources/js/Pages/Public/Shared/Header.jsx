import React from 'react';
import { Link } from '@inertiajs/react';

export default function Header({ services = [] }) {
  return (
    <header className="header-narrow header-semi-transparent-light">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="logo">
          <Link href="/">
            <img src="/img/logo-construction.png" alt="dcc" style={{ maxWidth: 200 }} />
          </Link>
        </div>

        <nav>
          <ul className="nav">
            <li><Link href="/" className="nav-link">Home</Link></li>
            <li><Link href="/about" className="nav-link">About Us</Link></li>

            <li className="nav-item dropdown">
              <a className="nav-link">Services</a>
              <ul className="dropdown-menu">
                {services.map(s => (
                  <li key={s.id}>
                    <Link className="dropdown-item" href={`/services/${s.id}`}>
                      {s.title_en}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li><Link href="/tenants" className="nav-link">Tenants</Link></li>
            <li><Link href="/gallery" className="nav-link">Gallery</Link></li>

            <li className="nav-item dropdown">
              <a className="nav-link">Mall</a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" href="/building?building=dembel">Dembel</Link></li>
                <li><Link className="dropdown-item" href="/building?building=extension">Dembel Extension</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link">Announcement</a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" href="/space">Free Space</Link></li>
                <li><Link className="dropdown-item" href="/news">News</Link></li>
                <li><Link className="dropdown-item" href="/event">Event</Link></li>
                <li><Link className="dropdown-item" href="/vacancy">Vacancy</Link></li>
              </ul>
            </li>

            <li><Link href="/contact" className="nav-link">Contact Us</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
