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
npm run db:seed
npm run dev
```

Demo admin:
- Email: admin@lordzicco.com
- Password: ChangeMeImmediately!2026

Change the demo password before production.

## Deployment
The app is suitable for a Render Web Service with a Render PostgreSQL database. Set DATABASE_URL, AUTH_SECRET and NEXT_PUBLIC_SITE_URL. For production deployments, prefer `npx prisma migrate deploy` after creating migrations.

This repository is the portfolio scaffold; some admin CRUD and media-upload functionality still require completion/configuration for production.
