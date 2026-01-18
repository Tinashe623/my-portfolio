import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import AboutModern from './AboutModern';
import { describe, it, expect } from 'vitest';

describe('AboutModern Page', () => {
    it('renders without crashing', () => {
        render(<AboutModern />);
        // Could verify heading presence
        expect(screen.getByText(/About Me/i)).toBeInTheDocument();
        expect(screen.getByText(/Core Strengths/i)).toBeInTheDocument();
    });
});
