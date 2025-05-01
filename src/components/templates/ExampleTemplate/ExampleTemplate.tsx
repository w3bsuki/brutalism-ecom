import React from 'react';
import styles from './ExampleTemplate.module.css';

export interface ExampleTemplateProps {
  children?: React.ReactNode;
}

/**
 * ExampleTemplate component
 *
 * @example
 * <ExampleTemplate>Content</ExampleTemplate>
 */
export const ExampleTemplate: React.FC<ExampleTemplateProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};
