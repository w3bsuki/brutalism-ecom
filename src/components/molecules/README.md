# Molecules

Simple combinations of atoms forming a cohesive component. Examples: Form Field, Card, Search Bar.

## Usage Guidelines

### When to use

This directory contains molecules in the atomic design methodology. 
Use molecules when combining multiple atoms to create a functional component with a single responsibility.

### Structure

Each molecule should be in its own directory with the following structure:

```
molecules/
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

### Molecule Guidelines

- Compose molecules from atoms
- Maintain a single responsibility
- Keep business logic minimal
- Ensure molecules are reusable in different contexts
- Document expected behavior
