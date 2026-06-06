import { buildActivity, demoAddress, type ActivityEvent, type ApprovalRequest, type ProductItem, type ProductModule } from "@kiteapi-cloud/core";

export const modules: ProductModule[] = [
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
];

export const items: ProductItem[] = [
  {
    "id": "api_1",
    "name": "API Publisher Dashboard",
    "description": "Developers register APIs, endpoints, pricing, docs, and access rules.",
    "owner": demoAddress,
    "status": "active",
    "risk": "medium",
    "moduleId": "module_1",
    "budgetKite": "5",
    "createdAt": "2026-06-06T02:00:00.000Z"
  },
  {
    "id": "api_2",
    "name": "Usage Metering",
    "description": "Track calls by key, agent, endpoint, cost, latency, and status.",
    "owner": demoAddress,
    "status": "active",
    "risk": "high",
    "moduleId": "module_2",
    "budgetKite": "50",
    "createdAt": "2026-06-06T02:00:00.000Z"
  },
  {
    "id": "api_3",
    "name": "Kite Payment Gateway",
    "description": "Verify prepaid credits, subscriptions, and pay-per-call access.",
    "owner": demoAddress,
    "status": "draft",
    "risk": "low",
    "moduleId": "module_3",
    "budgetKite": "0",
    "createdAt": "2026-06-06T02:00:00.000Z"
  }
];

export const activity: ActivityEvent[] = [
  buildActivity(items[0], "KiteAPI Cloud preview event accepted", new Date("2026-06-06T02:10:00.000Z")),
  buildActivity(items[1], "Risky Kite action queued for explicit approval", new Date("2026-06-06T02:20:00.000Z")),
];

export const approvals: ApprovalRequest[] = [
  {
    id: "approval_1",
    itemId: items[1].id,
    status: "pending",
    reason: "High-risk or fund-moving Kite action requires explicit approval.",
    risk: "high",
    requestedAt: "2026-06-06T02:20:00.000Z",
  },
];

export function createItem(input: Pick<ProductItem, "name" | "description" | "owner">) {
  const item: ProductItem = {
    id: `api_${Date.now()}`,
    name: input.name,
    description: input.description,
    owner: input.owner,
    status: "draft",
    risk: "low",
    moduleId: modules[0].id,
    budgetKite: "0",
    createdAt: new Date().toISOString(),
  };
  items.unshift(item);
  return item;
}
