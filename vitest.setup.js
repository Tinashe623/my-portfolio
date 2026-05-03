// Immediately set IntersectionObserver mock before any imports
(() => {
  const MockIntersectionObserver = class {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.root = null;
      this.rootMargin = '';
      this.thresholds = [];
    }
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };

  if (typeof global !== 'undefined') {
    global.IntersectionObserver = MockIntersectionObserver;
  }
  if (typeof window !== 'undefined') {
    window.IntersectionObserver = MockIntersectionObserver;
  }
})();

import '@testing-library/jest-dom/vitest'

// Polyfill matchMedia for Chakra UI hooks in jsdom
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}
