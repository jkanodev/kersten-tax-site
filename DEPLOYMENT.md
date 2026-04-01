# Deployment notes — Kersten Crawford tax site

## Domains (production)

- **Public marketing site:** `https://kerstencrawford.com` and `https://www.kerstencrawford.com` (already on Vercel).
- **Admin dashboard:** same hostname, path **`/admin`** (e.g. `https://www.kerstencrawford.com/admin`).
- Public contact and schedule forms **POST to API routes** that write to the **`Inquiry`** table. The admin **Inquiries** screen is the inbox.

## Environment variables (Vercel)

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Database connection string |
| `AUTH_SECRET` | Long random string for NextAuth session encryption (`openssl rand -base64 32`) |
| `AUTH_URL` | Canonical site URL, e.g. `https://www.kerstencrawford.com` (no trailing slash) |

Optional: `SEED_ADMIN_PASSWORD` — only for running `npm run db:seed` locally or in a one-off job, not required at runtime.

## Database: local vs production

- **Local:** This repo defaults to **SQLite** (`DATABASE_URL="file:./dev.db"`) so you can develop without Docker. Run `npx prisma migrate dev` after pulling changes.
- **Vercel:** Serverless builds **cannot rely on a writable SQLite file** for production traffic. For production, use **PostgreSQL** (e.g. [Neon](https://neon.tech), Supabase, or Vercel Postgres):

  1. Create a Postgres database and set `DATABASE_URL` in Vercel (pooled URL is fine for Prisma).
  2. In `prisma/schema.prisma`, change the datasource to:

     ```prisma
     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }
     ```

  3. Locally, point `DATABASE_URL` at the same Postgres instance (or a staging DB), run `npx prisma migrate dev` to generate migrations if needed, then deploy. On CI/Vercel, run **`npx prisma migrate deploy`** as part of build (already covered if you add it to **`build`** script next to `prisma generate`).

The **Prisma schema models** (Client, Appointment, Inquiry, AdminUser) stay the same; only the `provider` and connection string change.

## Build command

The `package.json` `build` script runs `prisma generate` before `next build`. Add migration deploy when using Postgres in production, for example:

`prisma migrate deploy && prisma generate && next build`

## First admin user (local SQLite)

After migrations:

```bash
npm run db:seed
```

Creates `kerstencrawford@outlook.com` only if missing (seed does not reset passwords on re-run).

## Production admin bootstrap (Vercel + Postgres)

If production login fails, the `AdminUser` row is often missing or the hash does not match. **Do not** expose a setup URL in production; run this **once from your laptop** against the **same `DATABASE_URL`** Vercel uses:

1. Vercel → Project → Settings → Environment Variables → copy **Production** `DATABASE_URL`.
2. From this repo on your machine (Node installed):

```bash
cd /path/to/kersten-tax-site
ALLOW_ADMIN_BOOTSTRAP=1 DATABASE_URL="paste-your-production-url-here" npm run bootstrap:admin
```

This **creates or updates** `kerstencrawford@outlook.com` with password **`ChangeMeSoon!123`** (bcrypt, 12 rounds — same as `auth.ts` / seed).

Optional: `BOOTSTRAP_ADMIN_PASSWORD='YourSecret'` before `npm run bootstrap:admin` to set a different password.

The script **refuses to run** unless `ALLOW_ADMIN_BOOTSTRAP=1` (prevents accidental execution).

After login, **change the password** under **Admin → Settings** and stop sharing the bootstrap password.

## Security

- `/admin` (except `/admin/login`) is protected by **middleware** and **NextAuth** JWT sessions.
- Do not commit `.env`. Rotate `AUTH_SECRET` if it is ever exposed.
