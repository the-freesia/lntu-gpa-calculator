import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Guide } from "./pages";



export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="guide" element={<Guide />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}