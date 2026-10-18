import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its children', () => {
    render(<Badge variant="success">Official</Badge>);
    expect(screen.getByText('Official')).toBeInTheDocument();
  });
});
