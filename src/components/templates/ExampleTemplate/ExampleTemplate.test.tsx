import { render, screen } from '@testing-library/react';
import { ExampleTemplate } from './ExampleTemplate';

describe('ExampleTemplate', () => {
  it('renders children correctly', () => {
    render(<ExampleTemplate>Test Content</ExampleTemplate>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
