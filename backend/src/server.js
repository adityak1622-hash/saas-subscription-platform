const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const plans = [
  { id: 1, name: "Free", description: "For trying the platform", price: 0, interval: "month", features: ["1 project", "Basic analytics", "Community support"] },
  { id: 2, name: "Pro", description: "For growing teams", price: 499, interval: "month", features: ["10 projects", "Advanced analytics", "Priority support"] },
  { id: 3, name: "Enterprise", description: "For larger businesses", price: 1999, interval: "month", features: ["Unlimited projects", "Advanced analytics", "Dedicated support"] }
];

let subscription = { planId: 2, status: "active", nextInvoice: "2026-10-28" };

app.get("/", (req, res) => {
  res.json({ message: "SaaS Subscription Management Demo API" });
});

app.get("/api/plans", (req, res) => {
  res.json(plans);
});

app.get("/api/dashboard", (req, res) => {
  const plan = plans.find((item) => item.id === subscription.planId);

  res.json({
    user: { name: "Demo User", email: "demo@example.com", role: "USER" },
    subscription: { ...subscription, planName: plan.name, monthlySpend: plan.price },
    usage: { apiCalls: 7420, apiLimit: plan.id === 1 ? 1000 : plan.id === 2 ? 10000 : 100000 },
    invoice: { amount: plan.price, status: "paid", date: "2026-09-28" }
  });
});

app.post("/api/auth/login", (req, res) => {
  res.json({
    message: "Demo login successful",
    token: "demo-token",
    user: { name: "Demo User", email: req.body.email || "demo@example.com", role: "USER" }
  });
});

app.post("/api/subscriptions", (req, res) => {
  const planId = Number(req.body.planId);
  const plan = plans.find((item) => item.id === planId);

  if (!plan) return res.status(404).json({ message: "Plan not found" });

  subscription = { planId: plan.id, status: "active", nextInvoice: "2026-10-28" };

  res.json({
    message: "Demo subscription changed to " + plan.name,
    subscription
  });
});

app.listen(PORT, () => {
  console.log("Demo API running at http://localhost:" + PORT);
});
