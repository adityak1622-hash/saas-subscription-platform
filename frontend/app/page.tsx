"use client";

import { useEffect, useState } from "react";

type Plan = {
  id: number;
  name: string;
  description: string;
  price: number;
  interval: string;
  features: string[];
};

type Dashboard = {
  user: { name: string; email: string; role: string };
  subscription: { planId: number; planName: string; status: string; monthlySpend: number; nextInvoice: string };
  usage: { apiCalls: number; apiLimit: number };
  invoice: { amount: number; status: string; date: string };
};

const API = "http://localhost:5000";

export default function Home() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [message, setMessage] = useState("");

  async function loadData() {
    const plansResponse = await fetch(API + "/api/plans");
    const dashboardResponse = await fetch(API + "/api/dashboard");
    setPlans(await plansResponse.json());
    setDashboard(await dashboardResponse.json());
  }

  useEffect(() => {
    loadData().catch(() => setMessage("Start the demo API on port 5000."));
  }, []);

  async function changePlan(planId: number) {
    const response = await fetch(API + "/api/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId })
    });
    const data = await response.json();
    setMessage(data.message);
    await loadData();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div>
          <div className="text-2xl font-bold">SaaSFlow</div>
          <div className="text-xs text-slate-400">Subscription Management Demo</div>
        </div>
        <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800">Demo Account</button>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="mb-3 text-sm font-semibold text-blue-400">DUMMY SAAS PROJECT</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Manage subscriptions, plans and usage in one place.
          </h1>
          <p className="mt-5 max-w-2xl text-slate-400">
            A simple reusable demo using mock data and a small Express API. No Stripe account or database is required.
          </p>
        </div>

        {message && <div className="mt-5 rounded-xl border border-blue-900 bg-blue-950/50 p-4 text-blue-200">{message}</div>}

        {dashboard && (
          <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Active Plan", dashboard.subscription.planName],
              ["Monthly Spend", "₹" + dashboard.subscription.monthlySpend],
              ["API Usage", dashboard.usage.apiCalls.toLocaleString() + " / " + dashboard.usage.apiLimit.toLocaleString()],
              ["Next Invoice", dashboard.subscription.nextInvoice]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-3 text-xl font-semibold">{value}</p>
              </div>
            ))}
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-2xl font-bold">Subscription Plans</h2>
          <p className="mt-1 text-slate-400">Choose a plan to simulate an upgrade or downgrade.</p>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => {
              const active = dashboard?.subscription.planId === plan.id;
              return (
                <article key={plan.id} className={"rounded-2xl border p-6 " + (active ? "border-blue-500 bg-blue-950/20" : "border-slate-800 bg-slate-900")}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    {active && <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-300">Current</span>}
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
                  <div className="mt-6">
                    <span className="text-4xl font-bold">₹{plan.price}</span>
                    <span className="text-slate-400">/{plan.interval}</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    {plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
                  </ul>
                  <button
                    onClick={() => changePlan(plan.id)}
                    disabled={active}
                    className="mt-7 w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
                  >
                    {active ? "Current Plan" : "Choose Plan"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {dashboard && (
          <section className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-lg font-semibold">Usage Analytics</h2>
              <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: Math.min((dashboard.usage.apiCalls / dashboard.usage.apiLimit) * 100, 100) + "%" }}
                />
              </div>
              <p className="mt-3 text-sm text-slate-400">{dashboard.usage.apiCalls.toLocaleString()} API calls used this month.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-lg font-semibold">Recent Invoice</h2>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">₹{dashboard.invoice.amount}</p>
                  <p className="text-sm text-slate-400">{dashboard.invoice.date}</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">{dashboard.invoice.status}</span>
              </div>
            </div>
          </section>
        )}

        <footer className="py-12 text-center text-sm text-slate-500">
          Dummy project • Replace the mock API/data with PostgreSQL and Stripe when building a real product.
        </footer>
      </section>
    </main>
  );
}
