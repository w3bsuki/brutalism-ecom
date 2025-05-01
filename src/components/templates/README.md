# Templates

Page-level structures without real content. Examples: Product Page Template, Checkout Template.

## Usage Guidelines

### When to use

This directory contains templates in the atomic design methodology. 
Use templates to define the structure and layout of a page without specific content implementation.

### Structure

Each template should be in its own directory with the following structure:

```
templates/
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

### Template Guidelines

- Compose templates from organisms, molecules, and atoms
- Focus on structure rather than content
- Use placeholder content to demonstrate layout
- Document content requirements and page flow
