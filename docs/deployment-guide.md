# Deployment Guide for Brutalist Hats E-Commerce

This guide provides detailed instructions for deploying the Brutalist Hats E-Commerce site to production. The deployment process is optimized for Vercel, but can be adapted for other hosting platforms.

## Prerequisites

Before deploying, ensure you have:

1. A GitHub account with the repository pushed (already completed)
2. A Vercel account (or account on your preferred hosting platform)
3. Completed all testing as outlined in the final checklist

## Pre-Deployment Preparation

### 1. Environment Variables

Create a `.env.production` file with the following variables:

```
NEXT_PUBLIC_SITE_URL=your-production-url.com
NEXT_PUBLIC_API_URL=your-api-url.com/api
```

**Note:** Never commit this file to the repository. These values should be set in your hosting platform's environment variables section.

### 2. Build Optimization

1. Update the `next.config.ts` file with production optimizations:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-production-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
```

2. Run a production build locally to check for any issues:

```bash
npm run build
```

Fix any errors or warnings that appear during the build process.

## Deployment to Vercel

### 1. Connect to Vercel

1. Sign up or log in to [Vercel](https://vercel.com/)
2. Click "Import Project" or "New Project"
3. Select "Import Git Repository"
4. Choose your GitHub repository (toni-jasi-brutalism3)
5. Authorize Vercel to access your repository if prompted

### 2. Configure Deployment Settings

1. Configure the project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

2. Configure environment variables:
   - Add all variables from your `.env.production` file
   - Set `NODE_ENV` to `production`

3. Set up custom domains (if applicable):
   - Click on "Domains" in the project settings
   - Add your custom domain
   - Follow Vercel's instructions for DNS configuration

### 3. Deploy

1. Click "Deploy"
2. Vercel will clone your repository, install dependencies, and build your project
3. Once deployment is complete, Vercel will provide a URL to access your site

### 4. Post-Deployment Verification

After deployment, verify:

1. The site loads correctly on the provided URL
2. Both themes work as expected
3. All pages load without errors
4. All functionality works (products, cart, checkout, etc.)
5. Mobile responsiveness is maintained

## Alternative Deployment Options

### Netlify Deployment

1. Sign up or log in to [Netlify](https://netlify.com/)
2. Click "New site from Git"
3. Select GitHub as your Git provider
4. Choose your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Click "Deploy site"

### AWS Amplify Deployment

1. Sign in to the AWS Management Console
2. Navigate to AWS Amplify
3. Click "Get Started" under "Amplify Hosting"
4. Choose "GitHub" as your repository source
5. Connect to your GitHub account and select your repository
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Output directory**: `.next`
7. Click "Save and deploy"

## Continuous Deployment

Both Vercel and other providers support continuous deployment. When set up:

1. Any push to the main branch will trigger a new build and deployment
2. Preview deployments will be created for pull requests
3. You can configure specific branches for staging environments

## Troubleshooting Common Deployment Issues

### Build Failures

1. **Missing dependencies**:
   - Ensure all dependencies are correctly listed in package.json
   - Check for any peer dependency warnings

2. **Environment variable issues**:
   - Verify all required environment variables are set in the hosting platform
   - Check for typos in variable names

3. **Out of memory errors**:
   - Increase the memory limit in the build settings
   - Or optimize large dependencies

### Runtime Errors

1. **API connection issues**:
   - Verify API endpoints are correctly configured
   - Check CORS settings if applicable

2. **Static asset loading errors**:
   - Check image paths and make sure they're correctly configured
   - Verify the CDN settings if using one

3. **Hydration errors**:
   - Look for components rendering differently on server and client
   - Check for date/time manipulation issues

## Post-Deployment Setup

### Analytics

1. Set up Google Analytics:
   - Create a Google Analytics 4 property
   - Add the measurement ID to your environment variables
   - Implement tracking in `src/components/analytics.tsx`

### Monitoring

1. Set up error tracking with Sentry:
   - Create a Sentry account and project
   - Install the Sentry SDK
   - Configure it in your Next.js application

### Performance Monitoring

1. Set up Vercel Analytics or Lighthouse CI
2. Configure regular performance audits
3. Establish performance budgets and alerts 