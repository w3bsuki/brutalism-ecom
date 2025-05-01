# Layouts

Layout components that structure the overall page. Examples: Main Layout, Sidebar Layout.

## Usage Guidelines

### When to use

This directory contains layouts in the atomic design methodology. 
Use layouts to define the overall structure of pages, including headers, footers, and content areas.

### Structure

Each layout should be in its own directory with the following structure:

```
layouts/
└── ComponentName/
    ├── ComponentName.tsx      # Main component file
    ├── ComponentName.test.tsx # Tests
    ├── ComponentName.module.css # Optional CSS module
    └── index.ts               # Exports the component
```

### Naming Conventions

- Use PascalCase for component names
- Name the directory the same as the component
- Use descriptive names that reflect the component's purpose

### Layout Guidelines

- Keep layouts focused on structure
- Avoid embedding specific content
- Use composition to inject content
- Consider responsive behavior
- Document layout constraints and variations
