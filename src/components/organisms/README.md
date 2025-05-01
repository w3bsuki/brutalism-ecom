# Organisms

Complex UI sections composed of molecules and atoms. Examples: Navigation, Product Grid, Footer.

## Usage Guidelines

### When to use

This directory contains organisms in the atomic design methodology. 
Use organisms for complex UI sections that form a distinct section of the interface and may contain business logic.

### Structure

Each organism should be in its own directory with the following structure:

```
organisms/
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

### Organism Guidelines

- Compose organisms from molecules and atoms
- Can contain significant business logic
- Can be specific to the application
- Document data requirements and state management
