// simple react file that shows an example of chartjs
import React from "react";
import Navigation from "../layout/Navigation.js";
import SimModContainer from "../layout/simulation/SimModContainer.js";
import styled from "styled-components";

const NoBorder = styled.div`
    border: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
`;

const BackgroundBanner = styled.img`
    position: absolute;
    top: 0;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    width: 100%;
    background-color: #f0f0f0;
    z-index: -1;
    object-fit: cover;
`;

function PageSimulation() {
    return (
        <NoBorder>
            <BackgroundBanner src={"/images/background1.jpeg"} />
            <Navigation />
            <SimModContainer />
        </NoBorder>
    );
}

export default PageSimulation;
