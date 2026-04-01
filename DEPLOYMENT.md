# Deployment — Kersten Crawford tax site

## Overview

- **Public site + admin** deploy to **Vercel**.
- **Database** is **PostgreSQL** everywhere (local Docker + production Neon / Supabase / Vercel Postgres). SQLite is **not** used — it does not fit serverless production.

## Domain

- Canonical admin/marketing: **`https://www.kerstencrawford.com`**
- Set **`AUTH_URL`** to that URL in Vercel (no trailing slash).

---

## Environment variables

### Vercel (Production)

| Variable | Required | Description |
|----------|----------|-------------|
| **`DATABASE_URL`** | Yes | Postgres connection string (Neon “pooled” or `?pgbouncer=true` URL is fine for Prisma). |
| **`AUTH_SECRET`** | Yes | `openssl rand -base64 32` — keep secret. |
| **`AUTH_URL`** | Yes | `https://www.kerstencrawford.com` |
| `VERCEL_ENV` | (auto) | Set by Vercel — used by middleware for www canonicalization on production. |

Optional (scripts only): `SEED_ADMIN_PASSWORD`, `ALLOW_ADMIN_BOOTSTRAP`, `BOOTSTRAP_ADMIN_PASSWORD`.

### Local (`.env`)

Copy **`.env.example`** → **`.env`** and adjust. Typical local DB URL:

```bash
DATABASE_URL="postgresql://kersten:kersten@localhost:5433/kersten?schema=public"
```

Start Postgres: **`docker compose up -d`** (see **`docker-compose.yml`** — host port **5433**).

---

## Local development

```bash
# 1) Start PostgreSQL
docker compose up -d

# 2) Install dependencies
npm install

# 3) Apply migrations (after pulling the repo or changing schema)
npx prisma migrate deploy
# or during active schema work:
# npx prisma migrate dev

# 4) Optional: demo data + admin if empty (creates admin only once)
npm run db:seed

# 5) Dev server
npm run dev
```

**Prisma Studio:** `npx prisma studio`

---

## Deploy to Vercel

1. Create a **PostgreSQL** database (e.g. [Neon](https://neon.tech)): create a project, copy the connection string.
2. In **Vercel** → project → **Settings** → **Environment Variables**:
   - Add `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL` for **Production** (and Preview if you use a branch DB).
3. Connect the Git repo and deploy.

### Migrations on Vercel

The **`build`** script runs:

```bash
prisma migrate deploy && prisma generate && next build
```

So each production build applies pending migrations **using the Vercel `DATABASE_URL`**. Ensure that variable is set **before** the first deploy (or run `npx prisma migrate deploy` once from your machine against production `DATABASE_URL`).

---

## Admin login in production

1. After the first deploy, ensure migrations ran (tables exist).
2. If login fails, create/reset the admin user from your **laptop** (same DB as Vercel):

```bash
ALLOW_ADMIN_BOOTSTRAP=1 DATABASE_URL="<paste production DATABASE_URL>" npm run bootstrap:admin
```

- Email: **`kerstencrawford@outlook.com`**
- Password: **`ChangeMeSoon!123`** (unless you set `BOOTSTRAP_ADMIN_PASSWORD`)

3. Log in at **`https://www.kerstencrawford.com/admin/login`**, then change the password under **Admin → Settings**.

---

## Auth / middleware

- Admin routes use **NextAuth** (credentials + JWT) and **middleware** for a single gate (no duplicate layout redirects). See **`middleware.ts`** and **`auth.ts`**.

---

## Security

- Never commit **`.env`** or production `DATABASE_URL`.
- Rotate **`AUTH_SECRET`** if it leaks.
