// provider that manages a set of settings
import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export function useSettings() {
    return useContext(SettingsContext);
}

export default function SettingsProvider({ children }) {
    const [settings, setSettings] = useState({
        background: true,
    });

    function updateSetting(setting, value) {
        setSettings({ ...settings, [setting]: value });
    }

    return <SettingsContext.Provider value={{ settings, setSettings }}>{children}</SettingsContext.Provider>;
}
