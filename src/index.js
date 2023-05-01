import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ChakraProvider} from "@chakra-ui/react";
import {RouterProvider} from "react-router-dom";
import router from "./rotuer";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new QueryClient();
root.render(
    <ChakraProvider>
        <QueryClientProvider client={client}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </ChakraProvider>
);
