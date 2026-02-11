# terminal-drop

Instantly share Texts, Files, Urls via Terminal-Drop and make share files between phone and computer easy and fast

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/badbsallyy/terminal-drop)

This repository is ready to deploy to Vercel! The Next.js application is located in the `terminaldrop` directory and will be automatically detected and configured.

### Prerequisites for Production

For production deployment on Vercel, you'll need:

1. **Vercel KV** (Redis) - For storing metadata
2. **Vercel Blob** - For storing files

Both are available in the Vercel marketplace and can be added to your project with one click.

### Deployment Steps

1. Click the "Deploy to Vercel" button above or connect your GitHub repository
2. Add the following integrations from Vercel marketplace:
   - **Vercel KV** (recommended: Upstash Redis)
   - **Vercel Blob** for file storage
3. Set environment variables:
   - `NEXT_PUBLIC_BASE_URL` - Your production URL (e.g., `https://terminal-drop.vercel.app`)
4. Deploy!

The app will automatically use Vercel KV and Blob storage when deployed to Vercel.

## 🛠️ Local Development

1. Clone the repository:
```bash
git clone https://github.com/badbsallyy/terminal-drop.git
cd terminal-drop/terminaldrop
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Copy `.env.example` to `.env.local` and configure:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

**Note:** In local development without Vercel KV/Blob configured, the app uses local file storage in the `.data` directory.

## 📦 Features

- **Quick Sharing**: Drop text, URLs, or files and get an instant shareable link
- **Terminal-Friendly**: Perfect for curl access from the command line
- **Expiring Content**: Set expiration times (1 hour to 7 days)
- **File Support**: Upload files up to 50MB
- **Modern UI**: Built with Next.js, Tailwind CSS, and shadcn/ui

## 🔒 Storage

The app intelligently switches between storage backends:

- **Production (Vercel)**: Uses Vercel KV for metadata and Vercel Blob for files
- **Development**: Uses local file system storage in `.data` directory

## 🏗️ Built With

- [Next.js 16](https://nextjs.org/) - React framework
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv) - Redis for metadata
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) - File storage
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components

## 📄 License

MIT
