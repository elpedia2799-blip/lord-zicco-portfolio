# Lord Zicco — Premium Graphic Designer Portfolio

A premium black/red graphic designer portfolio built with Next.js, TypeScript, Prisma and PostgreSQL.

## Features
- Cinematic portfolio landing page
- Portfolio project pages
- Services and contact form
- PostgreSQL + Prisma schema
- Protected admin dashboard
- Hashed passwords and httpOnly sessions
- Messages, projects, services, content and analytics sections
- Cloudinary-ready upload placeholder

## Setup
```bash
npm install
npx prisma generate
npx prisma db push
ADMIN_SEED_PASSWORD="choose-a-strong-password" npm run db:seed
npm run dev
```

Demo admin email:
- `admin@lordzicco.com`

The admin password is supplied through `ADMIN_SEED_PASSWORD` during seeding and is not stored in the repository.

## Deployment
The app is suitable for a Render Web Service with a Render PostgreSQL database. Set `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`, and `ADMIN_SEED_PASSWORD`. For production deployments, prefer `npx prisma migrate deploy` after creating migrations.

This repository is the portfolio scaffold; some admin CRUD and media-upload functionality still require completion/configuration for production.
