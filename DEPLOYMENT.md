# 🚀 Deploying to Vercel

## Option 1: Deploy via Vercel Dashboard (Recommended - No CLI needed!)

### Step 1: Push to GitHub (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: Algorithm Visualizer"
git branch -M main
git remote add origin https://github.com/yourusername/algorithm-visualizer.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Vite settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**

That's it! Vercel will build and deploy your site in ~1 minute.

---

## Option 2: Drag & Drop (Fastest!)

1. Make sure you've built the project:
```bash
npm run build
```

2. Go to [vercel.com](https://vercel.com)
3. Drag and drop the `dist` folder directly onto the Vercel dashboard
4. Done! Your site is live.

---

## After Deployment

Your site will be live at: `https://your-project-name.vercel.app`

### Custom Domain (Optional)
1. Go to your project settings on Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables (if needed)
1. Go to project settings
2. Click "Environment Variables"
3. Add any required variables

---

## Automatic Deployments

Once connected to GitHub:
- Every push to `main` branch = automatic production deployment
- Every pull request = automatic preview deployment

---

## Troubleshooting

If deployment fails:
1. Check build logs in Vercel dashboard
2. Ensure `vercel.json` is in root directory
3. Verify `package.json` has correct build script
4. Make sure all dependencies are in `package.json`

---

## Your Project is Ready! 🎉

The `vercel.json` configuration is already set up correctly:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

This ensures:
- ✅ React Router works correctly
- ✅ All routes are handled properly
- ✅ Optimal build configuration
