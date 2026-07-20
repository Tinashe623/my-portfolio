import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import HomeModern from './HomeModern';
import { describe, it, expect } from 'vitest';

describe('HomeModern Page', () => {
    it('renders without crashing', () => {
        render(<HomeModern />);
        expect(screen.getByRole('heading', { name: /Tinashe Mundieta/i })).toBeInTheDocument();
        expect(screen.getByText(/Start a Project/i)).toBeInTheDocument();
    });
});
