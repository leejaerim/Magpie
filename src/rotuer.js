import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import React from "react";
import HomeTab from "./components/HomeTab";
import NotFound from "./router/NotFound";
import AdminPage from "./router/AdminPage";
import TablePanel from "./components/TablePanel";
import Table from "./components/Table";
import Payment from "./router/Payment";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        errorElement : <NotFound></NotFound>,
        children: [
            {
                path: "",
                element: <TablePanel></TablePanel>,
            },
            {
                path: "admin/",
                element: <AdminPage></AdminPage>,
            },
            {
                path: "payment/",
                element: <Payment></Payment>,
            },
        ],
    },
]);
export default router;