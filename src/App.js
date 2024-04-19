import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageHome from "./components/pages/Home";
import PageSimulation from "./components/pages/PageSimulation";
import DatabaseProvider from "./context/DatabaseProvider";
import { NavBarProvider } from "./context/NavigationProvider";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageAbout from "./components/pages/PageAbout";

function App() {
    return (
        <div>
            <ToastContainer
                closeOnClick={true}
                transition={Slide}
                pauseOnFocusLoss={true}
                progressStyle={{ background: "#bf5700", color: "#ffffff" }}
                theme={"colored"}
            />
            <NavBarProvider>
                <DatabaseProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<PageSimulation />} />
                            <Route path="/about" element={<PageAbout />} />
                        </Routes>
                    </BrowserRouter>
                </DatabaseProvider>
            </NavBarProvider>
        </div>
    );
}

export default App;
