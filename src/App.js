import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageHome from "./components/pages/Home";
import PageChartExample from "./components/pages/ChartExample";
import DatabaseProvider from "./context/DatabaseProvider";
import { NavBarProvider } from "./context/NavigationProvider";

function App() {
    return (
        <NavBarProvider>
            <DatabaseProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<PageHome />} />
                        <Route path="/example" element={<PageChartExample />} />
                    </Routes>
                </BrowserRouter>
            </DatabaseProvider>
        </NavBarProvider>
    );
}

export default App;
