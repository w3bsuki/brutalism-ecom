#!/usr/bin/env node

/**
 * Atomic Design Structure Setup Script
 * 
 * This script creates the folder structure for atomic design and adds README files
 * to each directory explaining its purpose.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'src', 'components');

// Define the atomic design structure
const ATOMIC_STRUCTURE = {
  'atoms': 'Basic building blocks that cannot be broken down further. Examples: Button, Input, Icon.',
  'molecules': 'Simple combinations of atoms forming a cohesive component. Examples: Form Field, Card, Search Bar.',
  'organisms': 'Complex UI sections composed of molecules and atoms. Examples: Navigation, Product Grid, Footer.',
  'templates': 'Page-level structures without real content. Examples: Product Page Template, Checkout Template.',
  'layouts': 'Layout components that structure the overall page. Examples: Main Layout, Sidebar Layout.',
  'shared': 'Shared utilities and higher-order components. Examples: Error Boundary, Context Providers.'
};

/**
 * Create the README content for a specific atomic design level
 */
function createReadmeContent(level, description) {
  return `# ${level.charAt(0).toUpperCase() + level.slice(1)}

${description}

## Usage Guidelines

### When to use

This directory contains ${level} in the atomic design methodology. 
${getWhenToUseGuidelines(level)}

### Structure

Each ${level.slice(0, -1)} should be in its own directory with the following structure:

\`\`\`
${level}/
└── ComponentName/
    ├── ComponentName.tsx      # Main component file
    ├── ComponentName.test.tsx # Tests
    ├── ComponentName.module.css # Optional CSS module
    └── index.ts               # Exports the component
\`\`\`

### Naming Conventions

- Use PascalCase for component names
- Name the directory the same as the component
- Use descriptive names that reflect the component's purpose

${getAdditionalGuidelines(level)}
`;
}

/**
 * Get specific guidelines for when to use each atomic level
 */
function getWhenToUseGuidelines(level) {
  switch(level) {
    case 'atoms':
      return 'Use atoms for the most basic UI elements that can\'t be broken down further without losing their meaning or functionality.';
    case 'molecules':
      return 'Use molecules when combining multiple atoms to create a functional component with a single responsibility.';
    case 'organisms':
      return 'Use organisms for complex UI sections that form a distinct section of the interface and may contain business logic.';
    case 'templates':
      return 'Use templates to define the structure and layout of a page without specific content implementation.';
    case 'layouts':
      return 'Use layouts to define the overall structure of pages, including headers, footers, and content areas.';
    case 'shared':
      return 'Use shared for utilities, context providers, and other components that are used across multiple atomic levels.';
    default:
      return '';
  }
}

/**
 * Get additional guidelines specific to each atomic level
 */
function getAdditionalGuidelines(level) {
  switch(level) {
    case 'atoms':
      return `### Atom Guidelines

- Keep atoms as simple and focused as possible
- Avoid dependencies on other UI components
- Ensure atoms are highly reusable
- Provide comprehensive prop interfaces
- Document all possible states`;
    case 'molecules':
      return `### Molecule Guidelines

- Compose molecules from atoms
- Maintain a single responsibility
- Keep business logic minimal
- Ensure molecules are reusable in different contexts
- Document expected behavior`;
    case 'organisms':
      return `### Organism Guidelines

- Compose organisms from molecules and atoms
- Can contain significant business logic
- Can be specific to the application
- Document data requirements and state management`;
    case 'templates':
      return `### Template Guidelines

- Compose templates from organisms, molecules, and atoms
- Focus on structure rather than content
- Use placeholder content to demonstrate layout
- Document content requirements and page flow`;
    case 'layouts':
      return `### Layout Guidelines

- Keep layouts focused on structure
- Avoid embedding specific content
- Use composition to inject content
- Consider responsive behavior
- Document layout constraints and variations`;
    case 'shared':
      return `### Shared Component Guidelines

- Document usage patterns
- Keep interfaces consistent
- Avoid circular dependencies
- Consider performance implications`;
    default:
      return '';
  }
}

/**
 * Create a basic component and index file
 */
function createExampleComponent(level, componentName) {
  const componentCode = `import React from 'react';
import styles from './${componentName}.module.css';

export interface ${componentName}Props {
  children?: React.ReactNode;
}

/**
 * ${componentName} component
 *
 * @example
 * <${componentName}>Content</${componentName}>
 */
export const ${componentName}: React.FC<${componentName}Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};
`;

  const indexCode = `export * from './${componentName}';
`;

  const styleCode = `.container {
  /* Base styles */
}
`;

  const testCode = `import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders children correctly', () => {
    render(<${componentName}>Test Content</${componentName}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
`;

  return {
    component: componentCode,
    index: indexCode,
    style: styleCode,
    test: testCode
  };
}

async function main() {
  console.log('Setting up atomic design structure...');

  // Create the atomic design directories
  for (const [level, description] of Object.entries(ATOMIC_STRUCTURE)) {
    const levelDir = path.join(COMPONENTS_DIR, level);
    
    // Create the directory
    try {
      await fs.mkdir(levelDir, { recursive: true });
      console.log(`Created directory: ${levelDir}`);
      
      // Create README
      const readmePath = path.join(levelDir, 'README.md');
      await fs.writeFile(readmePath, createReadmeContent(level, description));
      console.log(`Created README: ${readmePath}`);
      
      // Create example component for each level
      if (level !== 'shared') {
        const componentName = `Example${level.charAt(0).toUpperCase() + level.slice(1, -1)}`;
        const componentDir = path.join(levelDir, componentName);
        await fs.mkdir(componentDir, { recursive: true });
        
        const componentFiles = createExampleComponent(level, componentName);
        
        await fs.writeFile(path.join(componentDir, `${componentName}.tsx`), componentFiles.component);
        await fs.writeFile(path.join(componentDir, 'index.ts'), componentFiles.index);
        await fs.writeFile(path.join(componentDir, `${componentName}.module.css`), componentFiles.style);
        await fs.writeFile(path.join(componentDir, `${componentName}.test.tsx`), componentFiles.test);
        
        console.log(`Created example component: ${componentName} in ${level}`);
      }
    } catch (error) {
      console.error(`Error creating ${level} directory:`, error);
    }
  }

  console.log('Atomic design structure setup complete!');
}

main().catch(error => {
  console.error('Setup failed:', error);
  process.exit(1);
}); 