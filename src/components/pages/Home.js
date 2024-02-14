import React, { useEffect, useState } from "react";
import atlasConfig from "../../atlasConfig.json";
import * as Realm from "realm-web";
import { useDatabase } from "../../hooks/DatabaseProvider";

const app = new Realm.App({ id: atlasConfig.appId });

function PageHome() {
    const { fetchDocuments } = useDatabase();
    return (
        <div>
            <button onClick={fetchDocuments}>Get Run</button>
        </div>
    );
}

export default PageHome;
