# Atomic Design Component Standards

This document outlines the standards and best practices for creating and maintaining components within our atomic design system.

## Component Classification

### Atoms
- **Definition**: The smallest, indivisible UI elements.
- **Examples**: Button, Input, Badge, Icon, Typography elements
- **Characteristics**:
  - Zero or minimal business logic
  - Highly reusable across the entire application
  - Accept simple props to customize appearance and behavior
  - Generally stateless (except for internal UI state like focus, hover)

### Molecules
- **Definition**: Combinations of atoms that function together as a unit.
- **Examples**: Card, Dialog, DropdownMenu, Form elements
- **Characteristics**:
  - Composed of multiple atoms
  - Focused on a single responsibility
  - May contain limited business logic
  - Should be reusable in multiple contexts

### Organisms
- **Definition**: Complex components composed of molecules and/or atoms.
- **Examples**: NavBar, Footer, Product listings, Carousels
- **Characteristics**:
  - Complex components with specific use cases
  - May contain business logic
  - Often tied to specific features or sections
  - Made up of multiple molecules and atoms

### Templates
- **Definition**: Page-level structures that arrange organisms, molecules, and atoms.
- **Examples**: HomePage layout, ProductPage layout
- **Characteristics**:
  - Focus on structure and layout
  - No actual content, just placeholders
  - Define content areas and composition

## Component Structure

### File Organization
Each component should be in its own directory with the following structure:

```
ComponentName/
  ├── ComponentName.tsx        # Main component file
  ├── index.ts                 # Export file
  ├── ComponentName.types.ts   # TypeScript types (optional)
  ├── ComponentName.utils.ts   # Helper functions (optional)
  ├── ComponentName.styles.ts  # Extracted styles (optional)
  └── components/              # Sub-components (optional)
      └── ...
```

### Component Template

```tsx
// ComponentName.tsx
import React from 'react';
import { ComponentNameProps } from './ComponentName.types';

/**
 * ComponentName - Brief description of the component's purpose
 */
export function ComponentName({ prop1, prop2, ...props }: ComponentNameProps) {
  // Component logic here
  
  return (
    <div className="..." {...props}>
      {/* Component JSX */}
    </div>
  );
}
```

```ts
// index.ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';
```

```ts
// ComponentName.types.ts
import { HTMLAttributes } from 'react';

export interface ComponentNameProps extends HTMLAttributes<HTMLDivElement> {
  /** Description of prop1 */
  prop1?: string;
  /** Description of prop2 */
  prop2?: boolean;
}
```

## Coding Standards

### Naming Conventions
- Component files: PascalCase (e.g., `Button.tsx`)
- Utility files: camelCase (e.g., `utils.ts`)
- CSS class names: kebab-case with BEM methodology (e.g., `button--primary`)
- Props: camelCase (e.g., `onClick`, `isDisabled`)

### Props
- Use TypeScript interfaces for prop definitions
- Provide default values for optional props
- Document props with JSDoc comments
- Avoid overly complex prop structures
- Consider prop spreading for HTML attributes

### CSS/Styling
- Use Tailwind CSS classes as primary styling method
- Prefer Tailwind's utility-first approach over custom CSS
- For custom styles, use CSS modules or styled-components
- Follow brutalist design principles for visual styling

### Accessibility
- Ensure all components have appropriate ARIA roles and attributes
- Support keyboard navigation where applicable
- Maintain appropriate color contrast
- Test with screen readers

### Performance
- Memoize components when appropriate using React.memo
- Optimize useEffect dependencies
- Avoid unnecessary re-renders
- Keep component responsibilities focused and minimal

## Component Documentation
Each component should include:

1. JSDoc comments for the component and its props
2. Usage examples in comments
3. Explanation of any complex logic or edge cases

## Migration Guidelines
When migrating existing components to atomic design:

1. Identify the appropriate atomic level for the component
2. Create the new component structure following the standards
3. Move the component code, adjusting as needed
4. Update imports in all files that use the component
5. Test the component in all use cases
6. Remove the old component file only after confirming all imports are updated

## Review Checklist
Before submitting a component for review, ensure:

- [ ] Component is placed in the correct atomic design category
- [ ] Component follows the established file structure
- [ ] All props are typed and documented
- [ ] Component is accessible
- [ ] Component is responsive
- [ ] Component has been tested in all relevant scenarios
- [ ] No console errors or warnings are produced
- [ ] Code follows project style guidelines 