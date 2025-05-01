# Task: Migrate Button Component to Atomic Design

## Objective
Migrate the Button component from the current structure to the atomic design structure as our first component migration.

## Component Details
- **Name**: Button
- **Current Location**: `src/components/ui/button.tsx`
- **Target Location**: `src/components/atoms/Button/Button.tsx`
- **Classification**: Atom
- **Dependencies**: 
  - `@radix-ui/react-slot`
  - `class-variance-authority`
  - `@/lib/utils` (for `cn` utility)

## Migration Steps

### 1. Create Component Directory Structure
```bash
mkdir -p src/components/atoms/Button
```

### 2. Create Component Files
The component will consist of the following files:
- `Button.tsx` - Main component file
- `Button.module.css` - Optional styles (not needed if using Tailwind)
- `index.ts` - Export file
- `Button.test.tsx` - Tests

### 3. Migrate Component Code
1. Copy the original Button component to the new location
2. Update imports if necessary
3. Make sure the component follows the atomic design guidelines

### 4. Create Barrel Export
Create an `index.ts` file that exports the Button component:
```typescript
export * from './Button';
```

### 5. Create Re-export in Original Location
To maintain backward compatibility during the transition period:
```typescript
export { Button, buttonVariants } from '../../atoms/Button';
```

### 6. Test Component
1. Run the application to ensure the component works
2. Check that all UI elements using buttons display correctly
3. Verify that all button variants and sizes still work

### 7. Update Migration Mapping
Update the component migration mapping document to reflect the completed migration:
- Change status from "Not Started" to "Completed"
- Add the completion date

## Code Changes

### New `src/components/atoms/Button/Button.tsx`
```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps extends React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * Button component
 * 
 * A versatile button component with various styles and sizes.
 * 
 * @example
 * <Button>Click me</Button>
 * <Button variant="outline" size="sm">Small Outline</Button>
 */
export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { buttonVariants }
```

### New `src/components/atoms/Button/index.ts`
```tsx
export * from './Button';
```

### New `src/components/ui/button.tsx` (Re-export)
```tsx
export { Button, buttonVariants } from '../atoms/Button';
```

## Expected Outcome
- Button component successfully migrated to the atomic design structure
- All existing usages of the button continue to work through the re-export
- Component follows the atomic design guidelines
- Migration mapping updated to track progress

## Definition of Done
- Button component available in atomic structure
- Application runs without errors
- All button variants and sizes work as expected
- Re-export in place for backward compatibility 