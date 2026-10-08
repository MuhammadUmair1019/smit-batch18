# Restaurant Management Backend

Initial service foundation for the Restaurant Backend API. Architecture and requirements are documented in [`docs/planning`](docs/planning/ARCHITECTURE.md). Business modules will be added in approved implementation milestones.

## Requirements

- Node.js 20 or newer
- MongoDB (a replica set will be needed for transactional checkout)

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and update `MONGODB_URI` if needed.
3. Start MongoDB.
4. Run `npm run migrate` to create the versioned database indexes.
5. Run `npm run start:dev` (or `npm run dev`) while developing and testing APIs. Nodemon watches TypeScript source files, runs them through `tsx`, and restarts the server when they change; no build is needed between changes.

The service listens on the configured `HOST` and `PORT`. Liveness is available at `/health/live`; readiness, including database connectivity, is available at `/health/ready`.

## Commands

- `npm run start:dev` / `npm run dev` — nodemon development server with reload; use this for API testing
- `npm run typecheck` — TypeScript validation
- `npm run build` — compile to `dist/`
- `npm start` — run the compiled server from `dist/` (build first; intended for production)

Do not commit `.env` or real credentials. The API contract and unresolved product decisions are tracked in `docs/planning`.
