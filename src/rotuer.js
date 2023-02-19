import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import React from "react";
import HomeTab from "./components/HomeTab";
import NotFound from "./router/NotFound";
import AdminPage from "./router/AdminPage";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        errorElement : <NotFound></NotFound>,
        children: [
            {
                path: "",
                element: <HomeTab></HomeTab>,
            },
            {
                path: "admin/",
                element: <AdminPage></AdminPage>,
            }
        ],
    },
]);
export default router;