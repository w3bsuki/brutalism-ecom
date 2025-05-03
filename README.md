# Brutalist Hats E-Commerce

![Brutalist Hats Banner](./public/images/logos/brutalist-hats-logo.png)

## Project Overview

Brutalist Hats is a modern e-commerce website built with a unique brutalist design aesthetic. The site sells premium hats and headwear with a focus on bold design, clear typography, and high contrast visuals.

### ✅ Project Status: MVP Complete

All core functionality has been implemented, themed, and tested. The site is ready for production deployment.

## Features

- 🧢 Complete product browsing experience
- 🛒 Functioning cart and checkout flow
- 🌓 Dark/light theme toggle with persistent settings
- 📱 Fully responsive design for all device sizes
- ♿ Accessibility-focused implementation
- 🎨 Brutalist design aesthetic throughout

## Tech Stack

- **Framework**: Next.js
- **UI Library**: React
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Context API
- **Component Architecture**: Atomic Design Pattern

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to the project directory
cd brutalist-hats

# Install dependencies
pnpm install
# or
npm install

# Start the development server
pnpm dev
# or
npm run dev
```

## Project Structure

The project follows an atomic design pattern for component organization:

- `/components/atoms` - Basic building blocks (buttons, inputs, etc.)
- `/components/molecules` - Combinations of atoms (cards, form groups, etc.)
- `/components/organisms` - Complex UI sections (navbar, footer, etc.)
- `/components/templates` - Page layouts
- `/app` - Next.js app directory containing routes

## Theme System

The project implements a custom theme system that supports both light and dark themes. Key features:

- System preference detection
- User preference persistence
- Anti-flash implementation to prevent theme flickering
- Themed CSS variables for consistent application

## Documentation

For more detailed documentation, see the [docs](./docs) directory:

- [Project Documentation](./docs/README.md)
- [Theme Documentation](./docs/theme-testing/theme-documentation.md)
- [Accessibility Guidelines](./docs/accessibility.md)

## Next Steps

While the MVP is complete, the following enhancements could be implemented in future iterations:

1. User authentication and accounts
2. Wishlist functionality
3. Advanced filtering and search
4. Additional theme options
5. Customer reviews integration
6. Performance optimization

## Deployment

### Production Build

To create an optimized production build, run:

```bash
# Generate production build
npm run build

# Start production server
npm start
```

### Deployment Platforms

This project can be easily deployed to various platforms:

#### Vercel (Recommended)
1. Import your repository to Vercel
2. Set environment variables in the Vercel dashboard
3. Vercel will automatically detect Next.js and configure the build settings

#### Netlify
1. Import your repository to Netlify
2. Set build command to `npm run build`
3. Set publish directory to `.next`
4. Configure environment variables in the Netlify dashboard

#### Self-Hosted
1. Create a production build as shown above
2. Configure your server to point to the project directory
3. Set up a process manager like PM2 to keep the application running
4. Set up environment variables on your server

### Environment Configuration

Create a `.env` file based on the provided `.env.example` template. For production deployment, make sure to:

1. Set `NEXT_PUBLIC_ENVIRONMENT=production`
2. Configure all API keys and endpoints for production
3. Enable the `NEXT_PUBLIC_ENABLE_PURCHASE` flag if real transactions should be processed

## License

[MIT License](LICENSE)
