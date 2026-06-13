# KiteAPI Cloud

> Paid API hosting and metering platform for Kite agent payments.

[![CI](https://github.com/gnanam1990/kiteapi-cloud/actions/workflows/ci.yml/badge.svg)](https://github.com/gnanam1990/kiteapi-cloud/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Overview

KiteAPI Cloud lets developers host paid APIs for Kite agents with usage metering,
API-key rate limits, payment checks, and seller analytics. It is a pnpm monorepo
with a Vite + React 19 frontend and a Hono backend deployed as a Vercel
Serverless Function. The backend performs a real, live read of the Kite Mainnet
chain via `viem`; product modules beyond the publisher dashboard are honest
previews (see [Status](#status)).

## Features

- **API Publisher Dashboard** — register APIs, endpoints, pricing, docs, and access rules.
- **Live Kite Mainnet read** — `GET /api/chain/stats` returns the current block height over
  JSON-RPC (`viem`) plus gas/network stats from the KiteScan explorer, surfaced in the app's
  live-network strip. Degrades to a preview-safe payload if chain infrastructure is unreachable.
- **Hono API on Vercel** — the API runs as a real Vercel Serverless Function mounted at `/api`,
  not just local dev.
- **Create + read items** — `POST /api/apis` validates the owner is a real EVM address; the SPA
  also persists created items in `localStorage` so the create flow completes against the stateless
  function.
- **Worker runtime** — `POST /api/runs/simulate` exercises the `@kiteapi-cloud/worker` preview
  runtime end to end.
- **Approval flow** — pending approvals can be approved or denied; risky/fund-moving actions are
  gated behind explicit approval.
- **Graceful degradation** — if the live API is unreachable, the frontend renders from bundled
  preview data instead of breaking.

## Tech stack

- **Frontend:** Vite 7, React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), lucide-react
- **Backend:** Hono 4, `@hono/node-server` (Vercel adapter for the Node runtime)
- **Chain access:** `viem` (custom Kite Mainnet/Testnet chain definitions) + KiteScan explorer API
- **Tooling:** pnpm workspaces, TypeScript 5.9, Vitest, esbuild
- **Deployment:** Vercel Build Output API (v3)

## Architecture

A pnpm workspace (`packages/*`) plus a Vercel function entry at the repo root:

| Package | Role |
| --- | --- |
| `packages/web` | Vite + React 19 frontend (app shell, UI components, product routes). |
| `packages/api` | Hono app, routes, in-memory demo data, and the live chain read. |
| `packages/worker` | Background/preview run runtime (`PreviewRuntime`). |
| `packages/core` | Pure TypeScript domain logic — EVM address validation, activity log, types. |
| `packages/connectors` | Kite chain definitions, KiteScan helper, cached fetch, and the `viem` public client. |
| `server/index.ts` | Mounts the shared Hono `app` under `/api`; esbuild-bundled into a Vercel function. |

## Getting started

### Prerequisites

- Node.js 22
- pnpm 9.15.9 (declared via `packageManager`)

### Installation

```bash
pnpm install
```

### Configuration

Copy `.env.example` and set values as needed. The project reads these variable
names (names and purpose only — never commit real secrets):

| Variable | Purpose |
| --- | --- |
| `KITE_NETWORK` | Active Kite network (`mainnet` / `testnet`). |
| `KITE_MAINNET_RPC` | Kite Mainnet JSON-RPC endpoint. |
| `KITE_MAINNET_API` | KiteScan Mainnet explorer API base. |
| `KITE_TESTNET_RPC` | Kite Testnet JSON-RPC endpoint. |
| `KITE_TESTNET_API` | KiteScan Testnet explorer API base. |
| `API_PORT` | Local API server port (default `8787`). |
| `WEB_ORIGIN` | Allowed CORS origin for the API (default `http://localhost:5173`). |
| `VITE_API_URL` | Frontend API base for local dev; ignored in production (the SPA calls same-origin `/api`). |
| `WEBHOOK_SECRET_DEMO` | Local-only demo webhook secret. |
| `LLM_PROVIDER` | LLM provider selector (defaults to `preview`). |

### Running

```bash
pnpm dev
```

This runs the API and web app in parallel.

- Frontend: `http://localhost:5173`
- API: `http://localhost:8787`

```bash
curl http://localhost:8787/health        # { "ok": true, "service": "kiteapi-cloud" }
curl http://localhost:8787/chain/stats    # live Kite Mainnet block height + gas
```

## Usage

The production base path is same-origin `/api`; local dev uses `http://localhost:8787`.

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Service health probe. |
| GET | `/meta` | Product + module metadata (single source). |
| GET | `/modules` | Product modules. |
| GET | `/apis` | List items. |
| POST | `/apis` | Create an item (`name`, `description`, `owner` required; `owner` must be a valid EVM address). |
| GET | `/apis/:id` | Fetch one item. |
| GET | `/runs` | Activity / run log. |
| POST | `/runs/simulate` | Simulate a run through the worker runtime. |
| GET | `/approvals` | Pending approvals. |
| POST | `/approvals/:id/approve` · `/deny` | Resolve an approval. |
| GET | `/chain/stats` | Live Kite Mainnet block height + gas (degrades to preview if infra is down). |
| POST | `/webhooks/:triggerId` | Preview webhook intake. |

## Testing

```bash
pnpm -r typecheck
pnpm -r test
pnpm --filter @kiteapi-cloud/web build
```

Tests cover core validation (`packages/core`), API routes including the chain and worker
endpoints (`packages/api`), and the worker runtime (`packages/worker`).

## Project structure

```txt
server/index.ts         Hono entry mounted at /api (bundled into a Vercel function)
scripts/vercel-build.mjs Vercel Build Output API builder (SPA + serverless function)
packages/web/           Vite + React 19 frontend
packages/api/           Hono API server (app, routes, live chain read)
packages/worker/        background jobs and run simulation
packages/core/          pure TypeScript domain logic
packages/connectors/    Kite constants, KiteScan helper, cached fetch, viem client
```

## Status

Preview / demo product. What is real vs. preview:

- **Real:** Vite + React 19 frontend; Hono API deployed live as a Vercel Serverless Function at
  `/api`; the live Kite Mainnet read at `/chain/stats` (block height via JSON-RPC, gas via KiteScan);
  the core validation library; the worker runtime wired into `/api/runs/simulate`; the test suite.
- **Preview:** The **API Publisher Dashboard** module is the live module; **Usage Metering**,
  **Kite Payment Gateway**, **API Key + Rate Limit Engine**, and **Revenue Analytics** are marked
  preview. Agentic decisions, payment verification, fund movement, and scoring are preview-safe
  unless explicitly verified by backend code. Client-submitted payment claims are not trusted, and
  fund-moving or risky actions require explicit approval. No official mainnet contract address is
  invented in this repo.

API and demo data are in-memory; the serverless function is stateless, so created items are also
kept client-side in `localStorage`.

## Deployment

Vercel is connected to this repo and auto-deploys `main` via the Build Output API
(`scripts/vercel-build.mjs`):

- **Static frontend** — the built Vite SPA.
- **Serverless API** — `server/index.ts` is esbuild-bundled into a self-contained function mounted at `/api`.
- The frontend calls same-origin `/api` in production and falls back to bundled preview data on any error.

## License

[MIT](LICENSE) © 2026 Gnanam (gnanam1990)
</content>
</invoke>
