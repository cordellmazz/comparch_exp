import React, { createContext, useEffect, useState } from "react";
import atlasConfig from "../atlasConfig.json";
import * as Realm from "realm-web";

const DatabaseContext = createContext({ state: {}, actions: {} });

// const app = new Realm.App({ id: atlasConfig.appId });
const app = Realm.getApp(atlasConfig.appId);

// reminder to bulk delete anon users

const DatabaseProvider = ({ children }) => {
    const [loaded, setLoaded] = useState(false);

    const [user, setUser] = useState(null);
    // const [mongodb, setMongodb] = useState(null);
    // const [database, setDatabase] = useState(null);

    // internal functions
    async function loginAnonymously() {
        try {
            const credentials = Realm.Credentials.anonymous();
            await app.logIn(credentials);
            setUser(app.currentUser);
            setLoaded(true);
            console.log("Successfully logged in anonymously!");
        } catch (error) {
            console.error("Failed to log in anonymously.", error);
        }
    }

    const logout = async () => {
        try {
            await app.currentUser?.logOut();
            setUser(null);
            console.log("Successfully logged out!");
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    useEffect(() => {
        // see if there are anonymous credentials in local storage, if not log in anonymously and store credentials in local storage
        if (!app.currentUser) {
            loginAnonymously();
        }

        return () => {
            console.log("cleanup");
            logout();
        };
    }, []);

    async function testFunc(text) {
        const result = await user.functions.testFunc(text);
        console.log(result);
    }

    async function findByParams(searchDict) {
        console.log("runnings");
        try {
            const result = await user.functions.findByParams(searchDict);
            console.log(result);
            return result;
        } catch (error) {
            console.error("Document could not be found", error);
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
        const result = await user.functions.queryByRange(parameterName, range);
        console.log(result);
        // return result;
    }

    /**
     * For use in the sweep SimMod
     * @param {JSON} staticParams these parameters are not the focus of the query but are the base to filter on. expected structure {"parameterName": "value", ...}
     * @param {JSON} sweepParams parameters to focus on in graphing.
     * Expected structure {"parameterName": {"type": "range" or "list", "start": beginningVal, "end": endVal, "list": ["val1", "val2", ...] or [1, 2, 4], ...}
     */
    async function filterAndSweepRuns(staticParams, sweepParams) {
        const result = await user.functions.filterAndSweepRuns(staticParams, sweepParams);
        console.log(result);
    }

    async function addRun(run) {
        const result = await user.functions.addRun(run);
        console.log(result);
    }

    const exportValues = {
        findByParams,
        testFunc,
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
