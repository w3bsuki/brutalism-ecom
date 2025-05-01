# Atomic Design Migration - Finalization Plan

## Overview
This document outlines the finalization steps for migrating the codebase to follow the atomic design methodology. The atomic design pattern organizes components into five categories: atoms, molecules, organisms, templates, and pages.

## Progress So Far
- Created atomic design folder structure in the components directory
- Migrated several key components (ThemeProvider, CartProvider, BrutalistNavbar, CookieConsentWrapper, BrutalistFooter)
- Updated layout.tsx to use components from the new structure
- Migrated ProductCard and ProductQuickView to atomic design structure
- Migrated BrutalistHero to atomic design structure with static button borders
- Updated BrutalistNavbar to have static button borders on Shop buttons (both desktop and mobile)
- Migrated BrutalistIndecisiveHero to atomic design structure with static button borders
- Enhanced BrutalistFooter with proper types and accessibility improvements
- Migrated ProductFilters to atomic design structure and improved accessibility

## Remaining Tasks

### 1. Complete Remaining Component Migration

#### Atoms to Migrate
- [x] Button
- [x] Input
- [x] ThemeProvider
- [x] CartProvider
- [x] Badge
- [x] Tooltip
- [x] Progress
- [x] AspectRatio
- [x] Rating

#### Molecules to Migrate
- [x] CookieConsent
- [x] Card
- [x] Dialog
- [x] Carousel
- [x] DropdownMenu
- [x] Toast components (Toast, Toaster, use-toast)

#### Organisms to Migrate
- [x] BrutalistNavbar
- [x] Footer
- [x] BrutalistHero
- [x] BrutalistIndecisiveHero
- [x] BrutalistTrendingCarousel
- [x] BrutalistTextMarquee
- [x] BrutalistSignupCarousel
- [x] BrutalistLogoRibbon
- [x] BrutalistHatImageCarousel
- [x] BrutalistFeaturedCollections
- [x] ShopPageContent
- [x] RecentlyViewedSection
- [x] ProductFilters
- [ ] ProductSort
- [ ] Move any remaining complex components from layout/ directory

### 2. Update Import Paths Across the Codebase
- Search for all imports of migrated components and update their paths
- Use the re-export pattern only if necessary during the transition period
- Remove legacy/duplicate files only after confirming imports are updated

### 3. Testing and Validation
- Manually test all migrated components
- Run all automated tests
- Check for any console errors or warnings
- Verify visual consistency

### 4. Documentation
- Update README.md with information about the atomic design structure
- Document the component organization and naming conventions
- Provide examples of how to create new components following the atomic design principles

## Implementation Guidelines

### File Organization
- Each component should be in its own directory
- Each directory should have an index.ts file that exports the component
- Complex components may have additional files (types.ts, utils.ts, etc.)

### Example Structure
```
src/components/
  atoms/
    Button/
      Button.tsx
      index.ts
      types.ts (optional)
  molecules/
    Card/
      Card.tsx
      index.ts
  organisms/
    BrutalistNavbar/
      BrutalistNavbar.tsx
      index.ts
      types.ts
```

### Migration Checklist for Each Component
1. Create appropriate directory structure in atoms/molecules/organisms
2. Move component file(s) to the new location
3. Create index.ts to export the component
4. Update imports in all files that use the component
5. Remove the old component file only after confirming all imports are updated
6. Test the component to ensure it works as expected

## Timeline
- Target completion: End of the sprint
- Prioritize components used across multiple pages
- Start with atoms, then move to molecules and organisms 