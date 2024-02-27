import React, { useEffect, useState } from "react";
import { useDatabase } from "../../context/DatabaseProvider";
import FlexBox from "../layout/structure/FlexBox";
import Navigation from "../layout/Navigation";

function PageHome() {
    const { findByParams } = useDatabase();

    function wrapper() {
        findByParams({ ID: "Run1" });
    }

    return (
        <>
            <Navigation />
            <FlexBox>
                <button onClick={wrapper}>Get Run</button>
            </FlexBox>
        </>
    );
}

export default PageHome;
