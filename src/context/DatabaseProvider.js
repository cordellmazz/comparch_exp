import React, { createContext, useEffect, useState } from "react";
import atlasConfig from "../atlasConfig.json";
import * as Realm from "realm-web";

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

    const [user, setUser] = useState(null);
    // const [mongodb, setMongodb] = useState(null);
    // const [database, setDatabase] = useState(null);

    // internal functions
    async function loginAnonymously() {
        // if no local storage credentials, create new credentials and store in local storage
        let credentials = Realm.Credentials.anonymous();
        const res = await app.logIn(credentials);
        setUser(app.currentUser);
        setLoaded(true);
        console.log("Successfully logged in anonymously!");
    }

    const cleanLocalStorageOfCredentials = () => {
        // get realm-web:app(atlasConfig.appId):userIds from local storage
        const userIds = JSON.parse(localStorage.getItem(`realm-web:app(${atlasConfig.appId}):userIds`));
        console.log("userIds", userIds);
        // for each userId, remove realm-web:token:app(atlasConfig.appId):<userId>
    };

    const logout = async () => {
        try {
            //
            await app.currentUser?.logOut();
            cleanLocalStorageOfCredentials();
            setUser(null);
            console.log("Successfully logged out!");
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    useEffect(() => {
        // see if there are anonymous credentials in local storage, if not log in anonymously and store credentials in local storage
        // if (!app.currentUser) {
        //     loginAnonymously();
        // } else {
        //     console.log("User already logged in");
        //     setUser(app.currentUser);
        //     setLoaded(true);
        // }
        // return () => {
        //     logout();
        // };
    }, []);

    async function testFunc(text) {
        const result = await user.functions.testFunc(text);
        console.log(result);
    }

    async function findByParams(searchDict) {
        console.log("runnings");
        console.log(searchDict);
        if (loaded) {
            try {
                const result = await user.functions.findByParams(searchDict);
                console.log(result);
                return result;
            } catch (error) {
                console.error("Document could not be found", error);
            }
        } else {
            console.error("Database not loaded");
        }
    }

    /**
     * Returns all documents that fall within the given range
     *
     * @param {string} parameterName parameter by which to query
     * @param {{"start": "<start of range>", "end": "<end of range>"}} range
     * @returns all documents that fall within the given range
     */
    async function queryByRange(parameterName, range) {
        if (loaded) {
            const result = await user.functions.queryByRange(parameterName, range);
            console.log(result);
            return result;
        }
    }

    /**
     * For use in the sweep SimMod
     * @param {JSON} staticParams these parameters are not the focus of the query but are the base to filter on. expected structure {"parameterName": "value", ...}
     * @param {JSON} sweepParams parameters to focus on in graphing.
     * Expected structure {"parameterName": {"type": "range" or "list", "start": beginningVal, "end": endVal, "list": ["val1", "val2", ...] or [1, 2, 4], ...}
     */
    async function filterAndSweepRuns(staticParams, sweepParams) {
        try {
            if (loaded) {
                const result = await user.functions.filterAndSweepRuns(staticParams, sweepParams);
                console.log(result);
                return result;
            } else {
                return -1;
            }
        } catch (error) {
            console.error("Error in filter and sweep request", error);
        }
    }

    async function addRun(run) {
        if (loaded) {
            const result = await user.functions.addRun(run);
            console.log(result);
        }
    }

    const exportValues = {
        findByParams,
        testFunc,
        filterAndSweepRuns,
        addRun,
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
