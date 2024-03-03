import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CalculatorApp from "./CalculatorApp";
import SupportPage from "./SupportPage";

function RouterApp(){
    const router = createBrowserRouter([
        {
            path:"",
            element:<CalculatorApp />
        },
        {
            path:"/calculator",
            element:<CalculatorApp />
        },
        {
            path:"/support",
            element:<SupportPage />
        }
    ])
    return(
        <RouterProvider router={router} />
    )
}

export default RouterApp