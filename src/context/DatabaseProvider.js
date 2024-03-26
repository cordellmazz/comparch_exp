import React, { createContext, useEffect, useState } from "react";
import atlasConfig from "../atlasConfig.json";
import * as Realm from "realm-web";

const DatabaseContext = createContext({ state: {}, actions: {} });

const app = new Realm.App({ id: atlasConfig.appId });
const credentials = Realm.Credentials.anonymous();

const DatabaseProvider = ({ children }) => {
    const [loaded, setLoaded] = useState(false);

    const [user, setUser] = useState(null);
    // const [mongodb, setMongodb] = useState(null);
    // const [database, setDatabase] = useState(null);

    // internal functions
    async function loginAnonymously() {
        try {
            // const user = await app.logIn(credentials);
            // setUser(user);
            console.log("Temporarily haulted");
            console.log("Successfully logged in anonymously");
            setLoaded(true);
        } catch (error) {
            console.error("Failed to log in anonymously", error);
        }
    }

    // async function connectToMongoDB() {
    //     try {
    //         // instantiate mongo client
    //         const mdb = app.currentUser.mongoClient(atlasConfig.dataSourceName);
    //         // path to project
    //         // do we need to specify a specific collection? or can we just pass in Projects
    //         const projects = mdb.db("Projects").collection("Project1");
    //         setMongodb(mdb);
    //         setDatabase(projects);

    //         console.log("Connected to MongoDB");
    //     } catch (error) {
    //         console.error("Failed to connect to database", error);
    //     }
    // }

    useEffect(() => {
        loginAnonymously();
        // connectToMongoDB();
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
