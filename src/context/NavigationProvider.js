import React, { createContext, useContext, useState } from "react";

const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
    const [active, setActive] = useState(false);

    const toggleActive = () => {
        setActive(!active);
    };

    return (
        <NavBarContext.Provider value={{ active, toggleActive }}>
            {children}
        </NavBarContext.Provider>
    );
};

export const useNavBar = () => {
    const context = useContext(NavBarContext);
    if (!context) {
        throw new Error("useNavBar must be used within a NavigationProvider");
    }
    return context;
};
