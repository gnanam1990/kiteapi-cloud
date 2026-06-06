export const product = {
  name: "KiteAPI Cloud",
  repo: "kiteapi-cloud",
  subtitle: "API CLOUD",
  hero: "Host paid APIs for Kite agents with metering, key limits, payment checks, and seller analytics.",
  positioning: "Paid API hosting and metering platform for Kite agent payments.",
  entity: "apis",
  entitySingular: "api",
  entityRoute: "/apis",
  routes: [
  "/",
  "/apis",
  "/apis/new",
  "/apis/:id",
  "/dashboard",
  "/usage",
  "/keys",
  "/billing",
  "/docs"
],
  modules: [
  {
    "id": "module_1",
    "name": "API Publisher Dashboard",
    "description": "Developers register APIs, endpoints, pricing, docs, and access rules.",
    "preview": "live"
  },
  {
    "id": "module_2",
    "name": "Usage Metering",
    "description": "Track calls by key, agent, endpoint, cost, latency, and status.",
    "preview": "preview"
  },
  {
    "id": "module_3",
    "name": "Kite Payment Gateway",
    "description": "Verify prepaid credits, subscriptions, and pay-per-call access.",
    "preview": "preview"
  },
  {
    "id": "module_4",
    "name": "API Key + Rate Limit Engine",
    "description": "Issue keys and enforce per-plan limits.",
    "preview": "preview"
  },
  {
    "id": "module_5",
    "name": "Revenue Analytics",
    "description": "Show seller revenue, usage, top agents, and endpoint performance.",
    "preview": "preview"
  }
],
};
