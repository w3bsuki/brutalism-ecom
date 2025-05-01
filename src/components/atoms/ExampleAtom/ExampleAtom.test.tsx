import { render, screen } from '@testing-library/react';
import { ExampleAtom } from './ExampleAtom';

describe('ExampleAtom', () => {
  it('renders children correctly', () => {
    render(<ExampleAtom>Test Content</ExampleAtom>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
