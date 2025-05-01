# Task: Migrate BrutalistNavbar Component to Atomic Design

## Objective
Migrate the BrutalistNavbar component from the current structure to the atomic design structure as part of our ongoing component migration effort.

## Component Details
- **Name**: BrutalistNavbar
- **Current Location**: `src/components/layout/BrutalistNavbar.tsx`
- **Target Location**: `src/components/organisms/BrutalistNavbar/BrutalistNavbar.tsx`
- **Classification**: Organism (complex component that contains multiple molecules and atoms)
- **Dependencies**: 
  - `react`, `next/link`
  - `lucide-react` icons
  - `framer-motion`
  - `@/hooks/use-cart`

## Migration Steps

### 1. Create Component Directory Structure
```bash
mkdir -p src/components/organisms/BrutalistNavbar
```

### 2. Create Component Files
The component will consist of the following files:
- `BrutalistNavbar.tsx` - Main component file
- `index.ts` - Export file
- `types.ts` - Types used by the component
- `BrutalistNavbar.test.tsx` - Tests (optional for this phase)

### 3. Extract Sub-Components (Optional)
Consider breaking down the complex navbar into smaller, reusable components:
- `NavItem.tsx` - For individual navigation items
- `MobileMenu.tsx` - For the mobile menu implementation
- `SearchBar.tsx` - For the search functionality

### 4. Migrate Component Code
1. Copy the original BrutalistNavbar component to the new location
2. Update imports if necessary
3. Refactor the component to follow atomic design principles
4. Extract types to `types.ts`

### 5. Create Barrel Export
Create an `index.ts` file that exports the BrutalistNavbar component:
```typescript
export * from './BrutalistNavbar';
```

### 6. Create Re-export in Original Location
To maintain backward compatibility during the transition period:
```typescript
export { BrutalistNavbar } from '../../organisms/BrutalistNavbar';
```

### 7. Test Component
1. Run the application to ensure the component works
2. Check that all navigation elements display correctly
3. Verify mobile menu, search functionality, and dropdown menus

### 8. Update Migration Mapping
Update the component migration mapping document to reflect the completed migration:
- Change status from "Not Started" to "Completed"
- Add the completion date

## Code Changes

### New `src/components/organisms/BrutalistNavbar/types.ts`
```tsx
export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
  }>;
}
```

### New `src/components/organisms/BrutalistNavbar/BrutalistNavbar.tsx`
Migrated from the original file with appropriate imports and structure.

### New `src/components/organisms/BrutalistNavbar/index.ts`
```tsx
export * from './BrutalistNavbar';
```

### New `src/components/layout/BrutalistNavbar.tsx` (Re-export)
```tsx
export { BrutalistNavbar } from '../organisms/BrutalistNavbar';
```

## Expected Outcome
- BrutalistNavbar component successfully migrated to the atomic structure
- All existing usages of the navbar continue to work through the re-export
- Component follows the atomic design guidelines
- Migration mapping updated to track progress

## Definition of Done
- BrutalistNavbar component available in atomic structure
- Application runs without errors
- All functionality works as expected (navigation, dropdowns, mobile menu, search)
- Re-export in place for backward compatibility 