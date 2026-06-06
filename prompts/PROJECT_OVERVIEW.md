# KiteAPI Cloud — Project Prompt Pack

## One-line summary
Paid API hosting and metering platform for Kite agent payments.

## Product positioning
Let developers publish APIs that AI agents can call and pay for using Kite-based payment verification and usage metering.

## Why this exists
Agent economies need APIs that can charge per call, verify payment, meter usage, rate-limit agents, and pay out developers. This turns Kite into a monetized API economy.

## Repository name
`kiteapi-cloud`

## Header subtitle
`API CLOUD`

## Core routes
- `/`
- `/apis`
- `/apis/new`
- `/apis/:id`
- `/dashboard`
- `/usage`
- `/keys`
- `/billing`
- `/docs`


## Core modules
1. **API Publisher Dashboard** — Developers register APIs, endpoints, pricing, docs, and access rules.
2. **Usage Metering** — Track every API call by key, agent, endpoint, cost, latency, and status.
3. **Kite Payment Gateway** — Verify payments for prepaid credits, subscriptions, and pay-per-call access.
4. **API Key + Rate Limit Engine** — Issue keys and enforce per-plan limits.
5. **Revenue Analytics** — Show API seller revenue, usage, top agents, endpoint performance.

## API surface
- `POST /api-products`
- `GET /api-products`
- `POST /api-products/:id/endpoints`
- `POST /keys`
- `DELETE /keys/:id`
- `POST /payments/verify`
- `GET /usage`
- `ANY /proxy/:apiSlug/*`


## Safety requirements
- Backend proxy redacts secrets
- Never forward requests after quota failure
- Payment verification is mandatory for credit top-ups
- Mainnet payment token addresses must be confirmed before production


## Build philosophy
This is not a small demo. Build it as a serious productivity platform for Kite AI agents. Every UI screen must move the user toward a real workflow, decision, payment, approval, or operational outcome.
