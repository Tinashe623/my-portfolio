import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme'; // Assuming theme is in src/theme.js

const AllTheProviders = ({ children }) => {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </ChakraProvider>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
