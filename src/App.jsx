import React from "react";
import { Box } from "@chakra-ui/react";
import AppRoutes from "./routes/AppRoutes.jsx";

function Layout() {
  return (
    <Box minH="100vh" bg="gray.900" display="flex" flexDir="column">
      <Header />
      <Box as="main" flex="1" minH={0}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default function App() {
  return <AppRoutes />;
}
