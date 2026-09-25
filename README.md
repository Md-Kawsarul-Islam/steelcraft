# Kawsar — Next.js + MongoDB

A focused steel fabrication website with MongoDB-backed content management.

## Included

- Next.js website
- Product and project pages with category filtering
- Real-work gallery
- Quote/contact form
- WhatsApp quote link
- Email quotation support with Resend
- Admin login
- Admin CRUD for projects, client names, products and blog posts
- MongoDB for local development and MongoDB Atlas for hosting

## Local setup

### 1. Requirements

Install:
- Node.js 20+
- MongoDB Community Server (or use MongoDB Atlas)

Make sure MongoDB is running locally.

### 2. Configure environment

Copy `.env.example` to `.env.local` and replace every `CHANGE_ME` / `YOUR_...` value.

Example local database:

`MONGODB_URI=mongodb://127.0.0.1:27017/Kawsar`

### 3. Install dependencies

```bash
npm install
```

### 4. Seed starter content

```bash
npm run seed
```

Run this once for a fresh database. It creates starter products, projects and blog posts without duplicating existing records.

### 5. Start the website

```bash
npm run dev
```

Open:
- `http://localhost:3000`
- `http://localhost:3000/admin`

Use the admin email and password configured in `.env.local`.

## Hosting

Use MongoDB Atlas for production. Set the production MongoDB connection string and all environment variables in your hosting provider. Do not upload `.env.local` or commit secrets to Git.
