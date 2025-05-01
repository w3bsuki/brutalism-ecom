import { render, screen } from '@testing-library/react';
import { ExampleOrganism } from './ExampleOrganism';

describe('ExampleOrganism', () => {
  it('renders children correctly', () => {
    render(<ExampleOrganism>Test Content</ExampleOrganism>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
