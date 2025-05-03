import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';
import CompressionPlugin from 'compression-webpack-plugin';
import { WebpackConfigContext } from 'next/dist/server/config-shared';
import webpack from 'webpack';
import withPWA from 'next-pwa';

// Configure bundle analyzer
const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placehold.co', 'res.cloudinary.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Force ignoring TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
    tsconfigPath: "./tsconfig.build.json",
  },
  // Force ignoring ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
    dirs: [],
  },
  // Configure HTTP response headers for better caching and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Enable experimental features that improve performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  // Configure webpack to compile with optimizations
  webpack: (config, { dev, isServer }) => {
    // Only run these optimizations for production builds
    if (!dev && !isServer) {
      // Enable compression for all assets
      config.plugins?.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      );

      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
      };
    }
    
    return config;
  },
  transpilePackages: [],
};

// Configure the PWA plugin for production only
const withPWAConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

// Apply all plugins
export default withBundleAnalyzerConfig(withPWAConfig(nextConfig));
