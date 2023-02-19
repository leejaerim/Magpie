import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ChakraProvider} from "@chakra-ui/react";
import {RouterProvider} from "react-router-dom";
import router from "./rotuer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
        <RouterProvider router={router} />
    </ChakraProvider>
);
