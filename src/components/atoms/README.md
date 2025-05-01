# Atoms

Basic building blocks that cannot be broken down further. Examples: Button, Input, Icon.

## Usage Guidelines

### When to use

This directory contains atoms in the atomic design methodology. 
Use atoms for the most basic UI elements that can't be broken down further without losing their meaning or functionality.

### Structure

Each atom should be in its own directory with the following structure:

```
atoms/
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

### Atom Guidelines

- Keep atoms as simple and focused as possible
- Avoid dependencies on other UI components
- Ensure atoms are highly reusable
- Provide comprehensive prop interfaces
- Document all possible states
