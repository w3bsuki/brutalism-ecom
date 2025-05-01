import { render, screen } from '@testing-library/react';
import { ExampleLayout } from './ExampleLayout';

describe('ExampleLayout', () => {
  it('renders children correctly', () => {
    render(<ExampleLayout>Test Content</ExampleLayout>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
