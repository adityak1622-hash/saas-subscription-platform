# SaaS Subscription Management Platform

A dummy SaaS subscription management project for learning, portfolio and college demonstrations.

## Features

- Subscription plans
- Plan upgrades and downgrades
- Dashboard statistics
- Usage analytics
- Invoice display
- Basic demo login API
- Frontend and backend communication

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Node.js
- Express

## Why this version is simple

This repository intentionally uses mock in-memory data.

It does not require PostgreSQL, Stripe, API keys, payment credentials or environment variables.

Anyone can clone the repository, install dependencies and run the demo.

## Run

Backend:

~~~bash
cd backend
npm install
npm run dev
~~~

Frontend, in another terminal:

~~~bash
cd frontend
npm install
npm run dev
~~~

Open http://localhost:3000

The backend runs on http://localhost:5000.

## Demo API

- GET /api/plans
- GET /api/dashboard
- POST /api/auth/login
- POST /api/subscriptions

The mock API can later be replaced with PostgreSQL, JWT authentication, Stripe Checkout and Stripe webhooks.

## Structure

~~~text
saas-subscription-platform/
├── frontend/
├── backend/
└── README.md
~~~
