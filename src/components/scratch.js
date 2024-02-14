import React, { useEffect, useState } from "react";
import Run from "../../CollectionRun.js";
import atlasConfig from "../../atlasConfig.json";
import * as Realm from "realm-web";

const app = new Realm.App({ id: atlasConfig.appId });

function PageHome() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Perform an anonymous login
        loginAnonymously().then(() => setIsLoading(false));
    }, []);

    async function loginAnonymously() {
        try {
            // Attempt to log in anonymously
            await app.logIn(Realm.Credentials.anonymous());
            console.log("Successfully logged in anonymously");
        } catch (error) {
            console.error("Failed to log in anonymously", error);
        }
    }

    // Example: Query all documents
    async function fetchDocuments() {
        const mongodb = app.currentUser.mongoClient(atlasConfig.dataSourceName);
        const myCollection = mongodb.db("Projects").collection("Project1");
        const documents = await myCollection.find();
        console.log(documents);
    }

    async function getRun() {
        const runs = await Run.find({ ID: "Run1" });
        console.log(runs);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={fetchDocuments}>Get Run</button>
        </div>
    );
}
