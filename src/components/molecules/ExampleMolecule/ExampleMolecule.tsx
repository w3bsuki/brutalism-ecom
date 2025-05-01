import React from 'react';
import styles from './ExampleMolecule.module.css';

export interface ExampleMoleculeProps {
  children?: React.ReactNode;
}

/**
 * ExampleMolecule component
 *
 * @example
 * <ExampleMolecule>Content</ExampleMolecule>
 */
export const ExampleMolecule: React.FC<ExampleMoleculeProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};
