# E-Commerce Admin Dashboard

A production-style admin dashboard for managing products, orders, and customers.

## Features

- Dashboard with KPI cards, revenue trend, order status breakdown, top products, and recent orders
- Product management: search, filter (category/status/price), sort, paginate, create, edit, delete
- Order management: search, filter by status, sort, paginate, status updates, item breakdown
- Customer management: search, sort, paginate, order history
- Mock JWT authentication with protected routes and persisted sessions
- Dark mode, toast notifications, loading skeletons, error boundaries

## Tech Stack

React 18, TypeScript, Redux Toolkit + RTK Query, React Router v6, React Hook Form, Tailwind CSS v4, Recharts, Vite, Vitest + React Testing Library, json-server (mock API).

## Getting Started

```bash
npm install
npm run dev:full   # starts the Vite dev server (5173) and the mock API (3001)
```

Sign in with the demo credentials shown on the login screen:

```
admin@example.com / admin123
```

### Other scripts

```bash
npm run dev      # Vite dev server only
npm run server    # json-server mock API only
npm run build     # type-check and build for production
npm run test      # run the test suite
npm run lint      # run oxlint
```

## Project Structure

```
src/
├── app/            # Redux store and typed hooks
├── components/
│   ├── common/     # Reusable UI primitives (Button, Modal, Table skeletons, Toast...)
│   ├── layout/     # Header, Sidebar, Layout shell
│   └── features/   # Feature-specific components (Products, Orders, Customers, Dashboard)
├── hooks/          # useAuth, useToast, useDebounce
├── pages/          # Route-level components
├── services/
│   ├── api/        # RTK Query API slices (products, orders, customers, dashboard)
│   └── auth/        # Mock auth service
├── store/slices/   # authSlice, uiSlice, filterSlice
├── types/          # Shared TypeScript types
└── utils/          # Formatters, validators, constants
```

## Mock API

The mock API is powered by [json-server](https://github.com/typicode/json-server) v1, seeded from `db.json`. It supports pagination (`_page`/`_per_page`), sorting (`_sort=field` or `_sort=-field`), and operator-based filtering (`field:operator=value`, e.g. `price:gte=50`).
