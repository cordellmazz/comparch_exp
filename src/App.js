import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageHome from "./components/pages/Home";
import PageSimulation from "./components/pages/PageSimulation";
import DatabaseProvider from "./context/DatabaseProvider";
import { NavBarProvider } from "./context/NavigationProvider";

function App() {
    return (
        <NavBarProvider>
            <DatabaseProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<PageHome />} />
                        <Route path="/example" element={<PageSimulation />} />
                    </Routes>
                </BrowserRouter>
            </DatabaseProvider>
        </NavBarProvider>
    );
}

export default App;
