# QR Photography Monorepo

This monorepo contains the frontend (Next.js) and backend (Express.js) applications.

## Install dependencies

From the repository root run:

```bash
npm run install-all
```

## Development

Start both the backend and frontend concurrently:

```bash
npm run dev
```

Frontend runs on port `3000` and the API on port `3001`.

## Deployment

- **Frontend**: deploy the `frontend` directory to Vercel.
- **Backend**: deploy the `backend` directory to Render.
- **Supabase**: used for database and storage. Add the following environment variables in both environments:

```
SUPABASE_URL
SUPABASE_SERVICE_KEY
SUPABASE_ANON_KEY
```

Vercel and Render should expose these variables at build and runtime to allow the apps to authenticate with Supabase securely.
