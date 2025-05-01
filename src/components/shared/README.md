# Shared

Shared utilities and higher-order components. Examples: Error Boundary, Context Providers.

## Usage Guidelines

### When to use

This directory contains shared in the atomic design methodology. 
Use shared for utilities, context providers, and other components that are used across multiple atomic levels.

### Structure

Each share should be in its own directory with the following structure:

```
shared/
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

### Shared Component Guidelines

- Document usage patterns
- Keep interfaces consistent
- Avoid circular dependencies
- Consider performance implications
