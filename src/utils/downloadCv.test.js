import { describe, it, expect, vi } from 'vitest';
import { downloadCvFromElement } from './downloadCv';

// Mock the entire html2pdf module or its dynamic import result
const mockSave = vi.fn().mockResolvedValue(true);
const mockFrom = vi.fn().mockReturnValue({ save: mockSave });
const mockSet = vi.fn().mockReturnValue({ from: mockFrom });
const mockHtml2pdf = vi.fn().mockReturnValue({ set: mockSet });

// Mock dynamic import of html2pdf.js
vi.mock('html2pdf.js', () => ({
    default: mockHtml2pdf,
}));

describe('downloadCvFromElement', () => {
    it('should return early if element is null', async () => {
        await downloadCvFromElement(null);
        expect(mockHtml2pdf).not.toHaveBeenCalled();
    });

    it('should process the element and call html2pdf', async () => {
        const element = document.createElement('div');
        // Mock classList and style appending behavior if needed, 
        // but jsdom handles basic DOM operations.

        await downloadCvFromElement(element);

        expect(element.classList.contains('bw-cv')).toBe(false); // Should be removed after
        expect(mockHtml2pdf).toHaveBeenCalled();
        expect(mockSet).toHaveBeenCalled();
        expect(mockFrom).toHaveBeenCalledWith(element);
        expect(mockSave).toHaveBeenCalled();
    });
});
