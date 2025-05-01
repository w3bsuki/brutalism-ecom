import React from 'react';
import styles from './ExampleAtom.module.css';

export interface ExampleAtomProps {
  children?: React.ReactNode;
}

/**
 * ExampleAtom component
 *
 * @example
 * <ExampleAtom>Content</ExampleAtom>
 */
export const ExampleAtom: React.FC<ExampleAtomProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};
