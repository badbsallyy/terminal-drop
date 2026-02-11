# Vercel Deployment Checklist

This document provides a step-by-step guide for deploying terminal-drop to Vercel.

## Pre-Deployment Verification ✅

All items below have been verified and are ready:

- [x] **Code Quality**
  - All ESLint errors fixed
  - TypeScript compilation successful
  - Production build completes without errors
  - No security vulnerabilities (CodeQL scan passed)

- [x] **Configuration Files**
  - `vercel.json` created at repository root
  - `.gitignore` files properly configured
  - `.env.example` created with required variables
  - Build artifacts excluded from git

- [x] **Documentation**
  - Root README.md updated with deployment instructions
  - terminaldrop/README.md updated with development guide
  - Environment variables documented

## Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository: `badbsallyy/terminal-drop`
4. Vercel will automatically detect the `vercel.json` configuration

### 2. Configure Environment Variables

In the Vercel project settings, add:

```
NEXT_PUBLIC_BASE_URL=https://your-project-name.vercel.app
```

(Replace `your-project-name` with your actual Vercel project URL)

### 3. Add Storage Integrations

1. Go to your Vercel project → Storage tab
2. Add **Vercel KV** (or Upstash Redis):
   - Click "Create Database"
   - Choose KV/Redis
   - Follow the setup wizard
   - This automatically sets `KV_REST_API_URL` and `KV_REST_API_TOKEN`

3. Add **Vercel Blob**:
   - Click "Create Store"
   - Choose Blob Storage
   - Follow the setup wizard
   - This automatically sets `BLOB_READ_WRITE_TOKEN`

### 4. Deploy

Click "Deploy" - Vercel will:
1. Run `cd terminaldrop && npm install`
2. Run `npm run build`
3. Deploy the production build

### 5. Verify Deployment

After deployment, test the following:

1. **Homepage loads**: Visit your Vercel URL
2. **Upload text**: Try uploading text content
3. **Upload file**: Try uploading a file
4. **Curl access**: Run `curl https://your-url.vercel.app/[id]`
5. **Expiry works**: Verify content expires as configured

## Troubleshooting

### Build Fails
- Check that environment variables are set
- Verify build logs in Vercel dashboard
- Ensure `vercel.json` points to correct directory

### Storage Issues
- Verify KV and Blob integrations are connected
- Check environment variables in project settings
- Review function logs for error messages

### URL Issues
- Ensure `NEXT_PUBLIC_BASE_URL` matches your Vercel URL
- Redeploy after changing this variable

## Production Ready ✨

Your terminal-drop application is now:
- ✅ Clean and error-free
- ✅ Properly configured for Vercel
- ✅ Documented for deployment and development
- ✅ Tested and verified locally
- ✅ Ready for production use

---

For questions or issues, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)
- Project README files
