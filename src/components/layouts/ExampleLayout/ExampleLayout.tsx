import React from 'react';
import styles from './ExampleLayout.module.css';

export interface ExampleLayoutProps {
  children?: React.ReactNode;
}

/**
 * ExampleLayout component
 *
 * @example
 * <ExampleLayout>Content</ExampleLayout>
 */
export const ExampleLayout: React.FC<ExampleLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};
