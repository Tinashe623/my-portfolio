import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import AboutModern from './AboutModern';
import { describe, it, expect } from 'vitest';

describe('AboutModern Page', () => {
    it('renders without crashing', () => {
        render(<AboutModern />);
        expect(screen.getByRole('heading', { name: /About Me/i })).toBeInTheDocument();
        expect(screen.getByText(/Core Values/i)).toBeInTheDocument();
    });
});
