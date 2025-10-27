# Dembel City Center

> Status: In development

## Tech Stack

- **Backend**
  - Laravel 12 (`laravel/framework`)
  - PHP ^8.2
  - Inertia.js server adapter (`inertiajs/inertia-laravel`)
  - Authentication & API tokens: Laravel Sanctum
  - Routing helper: Tighten Ziggy

- **Frontend**
  - React 18 with Inertia.js (`@inertiajs/react`)
  - Vite 7 + `@vitejs/plugin-react`
  - Tailwind CSS 3 + `@tailwindcss/forms`
  - UI/animations: Headless UI, Framer Motion, GSAP
  - Icons: Lucide React, React Icons

- **Tooling & DX**
  - Laravel Vite Plugin
  - ESLint (core, react, import), Globals
  - PostCSS, Autoprefixer
  - Concurrent dev runner (PHP + Vite + queue + logs)

- **Testing & Scaffolding**
  - PHPUnit, Mockery, Faker
  - Laravel Breeze (scaffolding), Laravel Sail (optional local dev)

## Features

- **Public Site**
  - Home (`/`)
  - About (`/about`)
  - Services listing & detail with contact action (`/services`, `/services/{id}`, POST `/services/contact`)
  - Tenant directory & profiles (`/tenant`, `/tenant/{tenant}`)
  - Gallery (`/gallery`)
  - Free Spaces listings with detail and load more (`/space`, `/space/{freeSpace:slug}`, `/spaces/load`)
  - News & Events with load more (`/news-events`, `/news-events/load`)
  - Vacancies (`/vacancies`)
  - Mall overview (`/mall`)
  - Contact page (`/contact`)
  - Announcements (`/announcement`)

- **Admin (auth required, `/admin`)**
  - Dashboard (`/admin`)
  - Manage Tenants (list/show/create/update/delete JSON APIs)
  - Manage Free Spaces (list/show/create/update/delete JSON APIs)
  - Manage Vacancies (list/show/create/update/delete JSON APIs)

- **Architecture**
  - Inertia SPA: pages under `resources/js/Pages/**` rendered via `resources/js/app.jsx`
  - Vite entrypoint: `resources/js/app.jsx`
  - Tailwind configured in `tailwind.config.js` with custom theme, animations, and utilities

## Notes

- This codebase is actively evolving; routes, components, and APIs may change.

