# Project Finalization Plan

This plan outlines the steps to finalize the Brutalist E-commerce project, focusing on core functionality, UI consistency, and bug fixes.

## I. Core E-commerce Flow Finalization

-   **[ ] Cart Page (`src/app/cart/page.tsx`)**
    -   [ ] Verify quantity update functionality.
    -   [ ] Verify item removal functionality.
    -   [ ] Ensure accurate calculation and display of subtotals and totals.
    -   [ ] Review and refine layout/styling to match the brutalist theme.
    -   [ ] Ensure "Proceed to Checkout" button works correctly.
-   **[ ] Checkout Process (`src/app/checkout/...`)**
    -   [ ] Design and implement basic checkout page layout (Brutalist theme).
    *   Consider using `react-hook-form` + `zod` for robust form handling if implementing actual forms.
    -   [ ] Add form fields for shipping/billing information (or placeholders).
    -   [ ] Implement order summary display.
    -   [ ] Add placeholder/mock payment integration section.
    -   [ ] Simulate order placement logic.
    -   [ ] Create a basic order confirmation page/view (`src/app/checkout/confirmation/...`).
-   **[ ] Shop Page (`src/app/shop/page.tsx`)**
    -   [ ] Final review of layout and filter functionality after recent changes.
    -   [ ] Ensure pagination or "load more" is considered if product list grows (or confirm current state is acceptable).

## II. Component & Hook Refactoring / Consistency

-   **[ ] Standardize Quick View/Dialog Component**
    -   [ ] Identify the current Quick View component used in the shop (`ProductQuickView`).
    -   [ ] Refactor `BrutalistHatImageCarousel` (`src/components/organisms/BrutalistHatImageCarousel/`) to use the *same* `ProductQuickView` dialog component as the shop page, instead of its own potentially different mechanism.
    -   [ ] Ensure the dialog component used is flexible and reusable.
-   **[ ] Consolidate `Add to Cart` Logic**
    -   [ ] Review all "Add to Cart" buttons (Product Card, Quick View, possibly others) to ensure they use the `useCart` hook (`addItem` function) correctly.
    -   [ ] Verify all working buttons trigger the `react-hot-toast` notification.
    -   [ ] Debug any non-functional "Add to Cart" buttons.
-   **[ ] Review Custom Hooks (`src/hooks/`)**
    -   [ ] Briefly review existing hooks (`useCart`, `useProductFiltering`, `useRecentlyViewed`) for potential minor improvements or shared logic opportunities.

## III. UI/UX Polish & Fixes

-   **[ ] Fix `react-hot-toast` Styling Issues**
    -   [ ] Inspect `src/app/layout.tsx` toast options (`toastOptions` in `<HotToaster />`).
    -   [ ] Inspect custom toast JSX in `ProductCard.tsx`.
    -   [ ] Ensure button text/background colors within the toast are always visible and contrast well, regardless of the active theme (use theme variables or appropriate utility classes). Check `bg-current`, `text-current-inverse`, `text-current` usage.
-   **[ ] Remove Redundant "Bestsellers" Headline**
    -   [ ] Edit home page (`src/app/page.tsx`) and remove the static "BESTSELLERS" H2 title, relying on the marquee instead.
-   **[ ] Button Consistency Check**
    -   [ ] Quickly review primary buttons across different sections (Hero CTA, Cart, Checkout, Filters) for consistent styling, hover effects, and brutalist feel.
-   **[ ] Responsiveness Check**
    -   [ ] Final review of key pages (Home, Shop, Product, Cart) on various screen sizes (mobile, tablet, desktop).
-   **[ ] Accessibility (A11y) Quick Check**
    -   [ ] Verify focus states are clear (using `focus-visible`).
    -   [ ] Check major interactive elements have appropriate ARIA labels where needed.
    -   [ ] Ensure core images have alt text.

## III-B. PWA & Mobile Experience Enhancement

-   **[✓] PWA Support**
    -   [✓] Verify next-pwa installation and configuration
    -   [✓] Create and optimize PWA icons 
    -   [✓] Update manifest.json for proper PWA installation
    -   [✓] Add custom PWA installation prompt
-   **[✓] Mobile UX Improvements**
    -   [✓] Add offline notification component
    -   [✓] Create loading screen for PWA launch
    -   [✓] Optimize viewport settings for mobile
    -   [✓] Add mobile-specific CSS enhancements
    -   [✓] Improve touch target sizes and spacing for mobile users

## IV. Final Checks & Deployment Prep

-   **[ ] Code Cleanup**
    -   [ ] Remove any temporary `console.log` statements.
    -   [ ] Remove commented-out old code blocks.
    -   [ ] Check for unused variables or imports (linters usually help here).
-   **[ ] Manual Testing**
    -   [ ] Test the full user flow: Home -> Shop -> Filter -> Product Detail -> Add to Cart -> View Cart -> Proceed to Checkout (simulated) -> Confirmation.
    -   [ ] Test theme toggling on different pages.
    -   [ ] Test PWA functionality (add to home screen, basic offline access if configured).
-   **[ ] Build Verification**
    -   [ ] Run `pnpm build` (or equivalent) to ensure the production build completes without errors (ignoring expected TS/ESLint warnings based on config).
    -   [ ] Optionally, run `pnpm start` and test the production build locally.
-   **[ ] Final Commit & Push**
    -   [ ] Commit all final changes to Git.
    -   [ ] Push to the remote repository.
-   **[ ] Deployment**
    -   [ ] Deploy to hosting platform (Vercel, Netlify, etc.). 