// simple react file that shows an example of chartjs
import React, { useState, useEffect } from "react";
import { useDatabase } from "../../context/DatabaseProvider.js";
import FlexBox from "../layout/structure/FlexBox.js";
import Navigation from "../layout/Navigation.js";
import SimModContainer from "../layout/simulation/SimModContainer.js";
import RecursiveStructure from "../input/ConfigInput.js";

function PageSimulation() {
    return (
        <FlexBox>
            <Navigation />
            <SimModContainer />
        </FlexBox>
    );
}

export default PageSimulation;
