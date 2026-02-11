# TerminalDrop - Next.js Application

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment Variables

Copy `.env.example` to `.env.local` and configure as needed:

```bash
cp .env.example .env.local
```

Required variables for production:
- `NEXT_PUBLIC_BASE_URL` - Your production URL

Optional (for Vercel deployment):
- `KV_REST_API_URL` - Vercel KV endpoint (auto-set by Vercel)
- `KV_REST_API_TOKEN` - Vercel KV token (auto-set by Vercel)
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob token (auto-set by Vercel)

## Building

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Linting

Run ESLint:

```bash
npm run lint
```

## Project Structure

- `/app` - Next.js app directory with pages and API routes
- `/components` - React components
- `/lib` - Utility functions and storage logic
- `/public` - Static assets
- `/.data` - Local storage directory (development only, git-ignored)

## Storage Backends

The app supports two storage backends:

1. **Local Storage** (development): Stores files and metadata in `.data` directory
2. **Vercel Storage** (production): Uses Vercel KV and Blob

The backend is automatically selected based on environment variables.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

For detailed deployment instructions, see the main [README.md](../README.md) in the repository root.

