# Glory Store

Starter scaffold for the "Glory Store" e-commerce project (Watches & Accessories).

This repository contains an initial Next.js App Router + TypeScript + Tailwind scaffold with:

- App Router layout
- Dark mode toggle (persisted via localStorage)
- Simple language toggle (English / Arabic) that switches `dir` to enable RTL
- Tailwind CSS + PostCSS configuration
- Mongoose helper for MongoDB connection

Next steps and full feature roadmap are tracked in the project's todo list.

Getting started (local development):

1. Install dependencies:

```bash
npm install
```

2. Add environment variables (for now only `MONGODB_URI` if you want DB features):

Create a `.env.local` file and add:

```
MONGODB_URI=your_mongodb_connection_string
```

3. Run the dev server:

```bash
npm run dev
```

This scaffold is the first milestone — I'll continue implementing product APIs, product pages, cart, checkout, NextAuth integration, Stripe payments, admin dashboard, and more according to the project plan. Tell me if you prefer JavaScript instead of TypeScript or if you'd rather use Prisma + PostgreSQL instead of MongoDB.
# glory-store