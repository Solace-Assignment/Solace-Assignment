## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Install dependencies

```bash
npm i
```

2. Run the development server:

```bash
npm run dev
```

## Database set up

1. Launch the database container.

```bash
docker compose up -d
```

2. Create a `solaceassignment` database.

3. Push migration to the database

```bash
npm run db:migrate
```

4. Seed the database

```bash
npm run db:seed
```
