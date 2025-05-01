import React from 'react';
import styles from './ExampleOrganism.module.css';

export interface ExampleOrganismProps {
  children?: React.ReactNode;
}

/**
 * ExampleOrganism component
 *
 * @example
 * <ExampleOrganism>Content</ExampleOrganism>
 */
export const ExampleOrganism: React.FC<ExampleOrganismProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};
