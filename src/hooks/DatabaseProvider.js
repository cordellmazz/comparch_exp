import React, { createContext, useEffect, useState } from "react";
import atlasConfig from "../atlasConfig.json";
import * as Realm from "realm-web";

const DatabaseContext = createContext({ state: {}, actions: {} });
const app = new Realm.App({ id: atlasConfig.appId });

const DatabaseProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(0);
    const [mongodb, setMongodb] = useState(null);
    const [database, setDatabase] = useState(null);

    // internal functions
    async function loginAnonymously() {
        try {
            await app.logIn(Realm.Credentials.anonymous());
            console.log("Successfully logged in anonymously");
        } catch (error) {
            console.error("Failed to log in anonymously", error);
        }
    }

    async function connectToMongoDB() {
        var mdb;
        try {
            // instantiate mongo client
            mdb = app.currentUser.mongoClient(atlasConfig.dataSourceName);
            // path to project
            // do we need to specify a specific collection? or can we just pass in Projects
            const projects = mdb.db("Projects").collection("Project1");
            setMongodb(mongodb);
            setDatabase(projects);

            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Failed to connect to database", error);
        }
    }

    useEffect(() => {
        loginAnonymously();
        connectToMongoDB();
    }, []);

    // external functions
    async function fetchDocuments() {
        const documents = await database.find("ID = 'Run2'");
        console.log(documents);
        return documents;
    }

    async function findByParameters(parameters) {
        // the parameter parameters is a dictionary of criteria that we want to search the database for
        // for example, if we want to find all documents with a certain name, size, and date, parameters = {name: "michael", size: 5, date: "2021-10-01"}
        // This function has to dynamically create a query based on the parameters passed in

        const documents = await database.find(parameters);
    }

    const exportValues = {
        fetchDocuments,
    };

    return (
        <DatabaseContext.Provider value={exportValues}>
            {children}
        </DatabaseContext.Provider>
    );
};
export default DatabaseProvider;

export function useDatabase() {
    const context = React.useContext(DatabaseContext);
    if (!context) {
        throw new Error("useDatabase must be used within a DatabaseProvider");
    }
    return context;
}
