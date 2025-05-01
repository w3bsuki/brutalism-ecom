#!/usr/bin/env node

/**
 * Component Audit Tool
 * 
 * This script helps analyze React components in a Next.js project.
 * It identifies components, their usage, and provides basic metrics.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
const OUTPUT_FILE = path.join(ROOT_DIR, 'docs', 'component-inventory.md');

// Extensions to consider
const EXTENSIONS = ['.tsx', '.jsx', '.ts', '.js'];

// Component regex patterns
const COMPONENT_PATTERNS = [
  /(?:export\s+(?:default\s+)?(?:function|const)\s+)([A-Z][A-Za-z0-9_]+)(?:\s*[:=]\s*(?:React\.)?(?:FC|FunctionComponent|VFC|VoidFunctionComponent)<|\s*(?:\(|=>))/g,
  /(?:class\s+)([A-Z][A-Za-z0-9_]+)(?:\s+extends\s+(?:React\.)?Component)/g,
  /(?:export\s+(?:default\s+)?(?:const|let|var)\s+)([A-Z][A-Za-z0-9_]+)(?:\s*=\s*\((?:props|{|}|\s)*\)\s*=>)/g,
];

// Import regex pattern
const IMPORT_PATTERN = /import\s+{?([^}]*)}?\s+from\s+['"]([^'"]+)['"]/g;

async function findFiles(dir, extensions, results = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await findFiles(fullPath, extensions, results);
    } else if (extensions.includes(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }
  
  return results;
}

async function extractComponents(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const components = [];
  
  for (const pattern of COMPONENT_PATTERNS) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      components.push({
        name: match[1],
        filePath: path.relative(ROOT_DIR, filePath),
        loc: content.split('\n').length,
      });
    }
  }
  
  return components;
}

async function findImports(filePath, componentMap) {
  const content = await fs.readFile(filePath, 'utf-8');
  const imports = {};
  
  let match;
  while ((match = IMPORT_PATTERN.exec(content)) !== null) {
    const importedItems = match[1].split(',').map(item => item.trim());
    const importPath = match[2];
    
    // Only process relative imports
    if (!importPath.startsWith('.') && !importPath.startsWith('@/')) continue;
    
    // Resolve the imported file path
    let resolvedPath;
    if (importPath.startsWith('@/')) {
      // Handle "@/" alias
      resolvedPath = path.join(SRC_DIR, importPath.slice(2));
    } else {
      resolvedPath = path.resolve(path.dirname(filePath), importPath);
    }
    
    // Try to resolve with extensions if needed
    if (!resolvedPath.includes('.')) {
      for (const ext of EXTENSIONS) {
        const testPath = resolvedPath + ext;
        try {
          await fs.access(testPath);
          resolvedPath = testPath;
          break;
        } catch (error) {
          // Try index file
          const indexPath = path.join(resolvedPath, `index${ext}`);
          try {
            await fs.access(indexPath);
            resolvedPath = indexPath;
            break;
          } catch (error) {
            // Ignore
          }
        }
      }
    }
    
    const normalizedPath = path.relative(ROOT_DIR, resolvedPath);
    
    for (const item of importedItems) {
      if (!item || item === 'default') continue;
      
      const component = Object.values(componentMap).flat().find(c => 
        c.name === item && 
        (path.relative(ROOT_DIR, c.filePath) === normalizedPath || normalizedPath.includes(c.filePath))
      );
      
      if (component) {
        if (!imports[component.name]) {
          imports[component.name] = [];
        }
        imports[component.name].push(path.relative(ROOT_DIR, filePath));
      }
    }
  }
  
  return imports;
}

async function analyzeComponentComplexity(component) {
  const content = await fs.readFile(path.join(ROOT_DIR, component.filePath), 'utf-8');
  
  // Count props
  const propsMatch = content.match(/interface\s+(\w+)Props|type\s+(\w+)Props|Props\s*=/g);
  const propsCount = propsMatch ? propsMatch.length : 0;
  
  // Count state hooks
  const stateHooksCount = (content.match(/useState/g) || []).length;
  
  // Count effect hooks
  const effectHooksCount = (content.match(/useEffect|useLayoutEffect/g) || []).length;
  
  // Count callback hooks
  const callbackHooksCount = (content.match(/useCallback|useMemo|useRef/g) || []).length;
  
  // Check if there are potential performance issues
  const potentialIssues = [];
  
  if (stateHooksCount > 5) {
    potentialIssues.push('High state count');
  }
  
  if (effectHooksCount > 3) {
    potentialIssues.push('Many side effects');
  }
  
  if (content.includes('children') && !content.includes('React.memo') && component.loc > 100) {
    potentialIssues.push('Large component passing children without memoization');
  }
  
  return {
    props: propsCount,
    stateHooks: stateHooksCount,
    effectHooks: effectHooksCount,
    callbackHooks: callbackHooksCount,
    potentialIssues
  };
}

async function guessAtomicLevel(component) {
  const content = await fs.readFile(path.join(ROOT_DIR, component.filePath), 'utf-8');
  
  // Heuristic for atomic levels
  if (component.filePath.includes('/atoms/')) {
    return 'Atom';
  } else if (component.filePath.includes('/molecules/')) {
    return 'Molecule';
  } else if (component.filePath.includes('/organisms/')) {
    return 'Organism';
  } else if (component.filePath.includes('/templates/')) {
    return 'Template';
  } else if (component.filePath.includes('/pages/')) {
    return 'Page';
  }
  
  // Try to guess based on component complexity
  const { props, stateHooks, effectHooks, callbackHooks } = await analyzeComponentComplexity(component);
  const totalComplexity = props + stateHooks * 2 + effectHooks * 2 + callbackHooks;
  const hasChildren = content.includes('children');
  const hasOtherComponents = (content.match(/<[A-Z]\w+/g) || []).length;
  
  if (hasOtherComponents <= 1 && totalComplexity <= 3) {
    return 'Atom';
  } else if (hasOtherComponents <= 5 && totalComplexity <= 8) {
    return 'Molecule';
  } else if (hasChildren || hasOtherComponents > 5 || totalComplexity > 8) {
    return 'Organism';
  }
  
  return 'Unknown';
}

async function main() {
  console.log('Starting component audit...');
  
  // Step 1: Find all files
  console.log('Finding files...');
  const allFiles = await findFiles(SRC_DIR, EXTENSIONS);
  console.log(`Found ${allFiles.length} files`);
  
  // Step 2: Extract components
  console.log('Extracting components...');
  const componentsByFile = {};
  for (const file of allFiles) {
    const components = await extractComponents(file);
    if (components.length > 0) {
      componentsByFile[file] = components;
    }
  }
  
  const allComponents = Object.values(componentsByFile).flat();
  console.log(`Found ${allComponents.length} components`);
  
  // Step 3: Find component usage
  console.log('Finding component usage...');
  const componentUsage = {};
  for (const file of allFiles) {
    const imports = await findImports(file, componentsByFile);
    for (const [component, usedInFiles] of Object.entries(imports)) {
      if (!componentUsage[component]) {
        componentUsage[component] = [];
      }
      componentUsage[component].push(...usedInFiles);
    }
  }
  
  // Step 4: Analyze components
  console.log('Analyzing components...');
  const componentDetails = [];
  for (const component of allComponents) {
    const complexity = await analyzeComponentComplexity(component);
    const atomicLevel = await guessAtomicLevel(component);
    const usedIn = componentUsage[component.name] || [];
    
    componentDetails.push({
      ...component,
      atomicLevel,
      complexity,
      usedIn,
      usageCount: usedIn.length,
      recommendation: usedIn.length === 0 ? 'Consider removing' : 
                     complexity.potentialIssues.length > 0 ? 'Consider refactoring' : 
                     'Keep'
    });
  }
  
  // Step 5: Generate report
  console.log('Generating report...');
  
  // Sort by recommendation priority (remove > refactor > keep)
  componentDetails.sort((a, b) => {
    const recommendationOrder = { 'Consider removing': 0, 'Consider refactoring': 1, 'Keep': 2 };
    return recommendationOrder[a.recommendation] - recommendationOrder[b.recommendation];
  });
  
  const report = `# Component Audit Report
Generated on ${new Date().toISOString().split('T')[0]}

## Summary
- Total components: ${componentDetails.length}
- Components not used: ${componentDetails.filter(c => c.usageCount === 0).length}
- Components to refactor: ${componentDetails.filter(c => c.recommendation === 'Consider refactoring').length}
- Components to keep: ${componentDetails.filter(c => c.recommendation === 'Keep').length}

## Atomic Design Distribution
- Atoms: ${componentDetails.filter(c => c.atomicLevel === 'Atom').length}
- Molecules: ${componentDetails.filter(c => c.atomicLevel === 'Molecule').length}
- Organisms: ${componentDetails.filter(c => c.atomicLevel === 'Organism').length}
- Templates: ${componentDetails.filter(c => c.atomicLevel === 'Template').length}
- Pages: ${componentDetails.filter(c => c.atomicLevel === 'Page').length}
- Unknown: ${componentDetails.filter(c => c.atomicLevel === 'Unknown').length}

## Components

| Name | File | Lines | Atomic Level | Usage Count | Hooks | Issues | Recommendation |
|------|------|-------|--------------|-------------|-------|--------|----------------|
${componentDetails.map(c => 
  `| ${c.name} | ${c.filePath} | ${c.loc} | ${c.atomicLevel} | ${c.usageCount} | S:${c.complexity.stateHooks} E:${c.complexity.effectHooks} C:${c.complexity.callbackHooks} | ${c.complexity.potentialIssues.join(', ') || 'None'} | ${c.recommendation} |`
).join('\n')}

## Unused Components

${componentDetails.filter(c => c.usageCount === 0).map(c => 
  `- **${c.name}** (${c.filePath})`
).join('\n')}

## Components with Potential Issues

${componentDetails.filter(c => c.complexity.potentialIssues.length > 0).map(c => 
  `- **${c.name}** (${c.filePath}): ${c.complexity.potentialIssues.join(', ')}`
).join('\n')}

## Next Steps
1. Review and validate unused components before removal
2. Address components with performance concerns
3. Begin restructuring according to atomic design principles
`;

  await fs.writeFile(OUTPUT_FILE, report);
  console.log(`Report generated at ${OUTPUT_FILE}`);
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
}); 