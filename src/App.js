import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import PageSimulation from "./components/pages/PageSimulation";
import DatabaseProvider from "./context/DatabaseProvider";
import { NavBarProvider } from "./context/NavigationProvider";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageAbout from "./components/pages/PageAbout";
import PageHome from "./components/pages/PageHome";
import Page404 from "./components/pages/Page404";
import GlobalStyles from "./components/styles/GlobalStyles";

function RedirectToPage({ to }) {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to, { replace: true });
    }, [navigate, to]);
    return null;
}

function App() {
    return (
        <>
            <GlobalStyles />
            <ToastContainer
                closeOnClick={true}
                transition={Slide}
                pauseOnFocusLoss={true}
                progressStyle={{ background: "#bf5700", color: "#ffffff" }}
                autoClose={3000}
                theme={"colored"}
            />
            <NavBarProvider>
                <DatabaseProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<RedirectToPage to="/home" />} />
                            <Route path="/home" element={<PageHome />} />
                            <Route path="/simulate" element={<PageSimulation />} />
                            <Route path="/about" element={<PageAbout />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </BrowserRouter>
                </DatabaseProvider>
            </NavBarProvider>
        </>
    );
}

export default App;
