# 🚀 Deployment Guide

This guide will help you deploy the Symbiotic Digital City 2070 project to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Node.js 18+ installed

## Step 1: Prepare Your Repository

1. **Update the homepage URL** in `package.json`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/Symbiotic-City-Model-2070"
   ```
   Replace `YOUR_USERNAME` with your actual GitHub username.

2. **Update the README.md**:
   - Replace all instances of `yourusername` with your actual GitHub username
   - Update the contact information and social media links

## Step 2: Push to GitHub

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Symbiotic Digital City 2070"
   ```

2. **Create a new repository on GitHub**:
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name it `Symbiotic-City-Model-2070`
   - Make it public
   - Don't initialize with README (we already have one)

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/Symbiotic-City-Model-2070.git
   git branch -M main
   git push -u origin main
   ```

## Step 3: Enable GitHub Pages

1. **Go to your repository settings**:
   - Navigate to your repository on GitHub
   - Click "Settings" tab

2. **Configure GitHub Pages**:
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"
   - This will use the workflow we created in `.github/workflows/deploy.yml`

## Step 4: Deploy

The deployment will happen automatically when you push to the main branch. However, you can also deploy manually:

```bash
npm run deploy
```

## Step 5: Verify Deployment

1. **Check GitHub Actions**:
   - Go to your repository
   - Click "Actions" tab
   - You should see a successful deployment workflow

2. **Visit your site**:
   - Your site will be available at: `https://YOUR_USERNAME.github.io/Symbiotic-City-Model-2070`
   - It may take a few minutes for the first deployment to complete

## Troubleshooting

### Build Errors
If you encounter build errors:
1. Check the GitHub Actions logs
2. Run `npm run build` locally to test
3. Ensure all dependencies are installed: `npm install`

### 404 Errors
If you get 404 errors:
1. Check that the homepage URL in `package.json` is correct
2. Ensure the repository name matches exactly
3. Wait a few minutes for GitHub Pages to update

### Routing Issues
If you have routing issues:
1. The Vite config is set up for relative paths (`base: './'`)
2. This should work correctly with GitHub Pages

## Custom Domain (Optional)

To use a custom domain:
1. Go to repository Settings → Pages
2. Enter your custom domain
3. Add a CNAME file to your repository with your domain
4. Update your DNS settings

## Environment Variables

If you need environment variables:
1. Add them in GitHub repository Settings → Secrets and variables → Actions
2. Reference them in the workflow file as `${{ secrets.VARIABLE_NAME }}`

## Performance Optimization

The build is already optimized with:
- Code splitting
- Asset compression
- Tree shaking
- Source maps disabled for production

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Review the build output locally
3. Ensure all files are committed to the repository
