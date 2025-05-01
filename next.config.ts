import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';
import CompressionPlugin from 'compression-webpack-plugin';
import { WebpackConfigContext } from 'next/dist/server/config-shared';
import webpack from 'webpack';

const analyzeBundle = process.env.ANALYZE === 'true' 
  ? withBundleAnalyzer({ enabled: true })
  : (config: NextConfig) => config;

const nextConfig: NextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
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
  // Add webpack configuration for further optimization
  webpack: (config: webpack.Configuration, { dev, isServer }: WebpackConfigContext) => {
    // Only apply these optimizations in production
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

      // Split chunks more efficiently
      if (config.optimization) {
        config.optimization.splitChunks = {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module: any) {
                // Safe handling of module.context
                if (!module.context) return 'npm.unknown';
                
                // Get the name of the npm package
                const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                if (!match) return 'npm.unknown';
                
                const packageName = match[1];
                // Return a nice clean package name
                return `npm.${packageName.replace('@', '')}`;
              },
            },
            // Specific chunking for larger dependencies
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 40,
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              name: 'framer-motion',
              priority: 30,
            },
            utils: {
              test: /[\\/]node_modules[\\/](lodash|date-fns|tailwind-merge)[\\/]/,
              name: 'utils',
              priority: 20,
            },
          },
        };
      }
    }

    return config;
  },
};

export default analyzeBundle(nextConfig);
