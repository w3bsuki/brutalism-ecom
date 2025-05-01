import { render, screen } from '@testing-library/react';
import { ExampleMolecule } from './ExampleMolecule';

describe('ExampleMolecule', () => {
  it('renders children correctly', () => {
    render(<ExampleMolecule>Test Content</ExampleMolecule>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
