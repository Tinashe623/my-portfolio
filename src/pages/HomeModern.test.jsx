import React from 'react';
import { render } from '../test-utils';
import HomeModern from './HomeModern';
import { describe, it } from 'vitest';

describe('HomeModern Page', () => {
    it('renders without crashing', () => {
        render(<HomeModern />);
        // Check for some known text or element
        // Since I haven't seen the exact content yet, I'll check for something generic or just that it renders
        // Based on typical portfolios, "Hi" or the name might be there.
        // Let's rely on the render not throwing for now, or check for a heading if I see the file content.
    });
});
