// local save data to browser. Things like graph display size and last used data source

import React, { createContext, useContext, useState } from "react";

const LocalDataContext = createContext();

export const LocalDataProvider = ({ children }) => {
    const [hasLocalData, setHasLocalData] = useState(false);
    const [graphSize, setGraphSize] = useState(null);

    // check if local data exists
    if (localStorage.getItem("hasLocalData")) {
        setHasLocalData(true);
    }

    return (
        <LocalDataContext.Provider value={{ exportValues }}>
            {children}
        </LocalDataContext.Provider>
    );
};

export const useLocalData = () => {
    const context = useContext(LocalDataContext);
    if (!context) {
        throw new Error("useLocalData must be used within a LocalDataProvider");
    }
    return context;
};

export default LocalDataContext;
