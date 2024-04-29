import React, { createContext, useEffect, useState } from "react";
import atlasConfig from "../atlasConfig.json";
import * as Realm from "realm-web";
import { toast } from "react-toastify";

const DatabaseContext = createContext({ state: {}, actions: {} });

// const app = new Realm.App({ id: atlasConfig.appId });

// reminder to bulk delete anon users
// REMINDER TO CHANGE APP SERVICE RULES ON PROJECT1 TO SEARCH AND READ ONLY
/**
 * React Component that connects the user to the database
 */
const DatabaseProvider = ({ children }) => {
    const [loaded, setLoaded] = useState(false);
    const [app, setApp] = useState(Realm.getApp(atlasConfig.appId));

    // internal functions
    const cleanLocalStorageOfCredentials = () => {
        // Loop over all items in local storage
        for (const key in localStorage) {
            // Check if the key starts with 'realm-web'
            if (key.startsWith(`realm-web:app(${atlasConfig.appId})`)) {
                // Remove the item
                localStorage.removeItem(key);
            }
        }
    };

    const logout = async () => {
        try {
            await app.currentUser?.logOut();
            setLoaded(false);
            console.log("Successfully logged out!");
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    async function loginAnonymously() {
        // if no local storage credentials, create new credentials and store in local storage
        const refreshApp = Realm.getApp(atlasConfig.appId);
        setApp(refreshApp);
        let credentials = Realm.Credentials.anonymous();
        const res = await refreshApp.logIn(credentials);
        setLoaded(true);
        console.log("Successfully logged in anonymously!");
    }

    useEffect(() => {
        // see if there are anonymous credentials in local storage, if not log in anonymously
        if (!app.currentUser) {
            console.log("Creating new anonymous user");
            loginAnonymously();
        } else {
            console.log("User already logged in");
            setLoaded(true);
        }
    }, []);

    /**
     * Function to find simulations by parameters
     * @param {*} searchDict The dictionary of parameters to search by
     * @returns The result of the search
     */
    async function findByParams(searchDict, attempt = 0) {
        console.log("Searching for simulations by parameters", searchDict);
        try {
            // Ensure the app is loaded and there's a current user
            const currentUser = app.currentUser;
            if (loaded && currentUser) {
                const result = await currentUser.functions.findByParams(searchDict);
                console.log(result);
                return result;
            } else {
                throw new Error("App not loaded or no current user.");
            }
        } catch (error) {
            console.error("Error during findByParams: ", error);

            // Handle specific error types
            if (error.statusCode === 401 && attempt < 1) {
                // Handle unauthorized error, clean up, and retry
                console.log("Unauthorized access, handling reauthentication.");
                await handleReauthentication();
                console.log("Retrying after reauthentication...");
                return findByParams(searchDict, attempt + 1);
            } else {
                // Handle other errors or retry limit reached
                console.error("Query failed or retry limit reached", { attempt });
                if (error.statusCode) {
                    console.error(`Received status code: ${error.statusCode}`);
                }
            }
        }
    }

    async function handleReauthentication() {
        // cleanLocalStorageOfCredentials();
        await logout();
        await loginAnonymously();
    }

    const exportValues = {
        findByParams,
        loaded,
    };

    return <DatabaseContext.Provider value={exportValues}>{children}</DatabaseContext.Provider>;
};
export default DatabaseProvider;

export function useDatabase() {
    const context = React.useContext(DatabaseContext);
    if (!context) {
        throw new Error("useDatabase must be used within a DatabaseProvider");
    }
    return context;
}
