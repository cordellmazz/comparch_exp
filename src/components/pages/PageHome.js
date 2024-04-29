import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Navigation from "../layout/Navigation";

const BackgroundBanner = styled.img`
    margin: 0px;
    padding: 0px;
    position: absolute;
    top: 0;
    width: 100%;
    height: 400px;
    background-color: #f0f0f0;
    object-fit: cover;
    z-index: -2;
`;

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: top;
    height: 100vh;
    width: 60%;
    margin: 0 auto;
`;

const WelcomeMessage = styled.h1`
    text-align: center;
    margin-top: 40px;
    color: #333;
    font-size: 128px;
    width: 100%;
`;

const SimulateButton = styled.button`
    font-size: 40px;
    padding: 10px 20px;
    background-color: #0077cc;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
        background-color: #005fa3;
    }
`;

const BackestgroundImage = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url("/images/background4.jpeg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -3;
`;

const WhiteBackground = styled.div`
    background-color: white;
    opacity: 0.85;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
`;

const PageHome = () => {
    const navigate = useNavigate(); // Hook for navigation

    const handleSimulateClick = () => {
        navigate("/simulate");
    };

    return (
        <div>
            <Navigation />
            <BackestgroundImage />
            <WhiteBackground />
            <BackgroundBanner src={"/images/background3.jpeg"} />
            <WelcomeMessage>Comparch Explorer</WelcomeMessage>
            <CenteredContainer>
                <SimulateButton style={{ marginBottom: "40px" }} onClick={handleSimulateClick}>
                    EXPLORE
                </SimulateButton>
                <p>
                    The goal of this project was to build an educational tool for students taking the course ECE460N
                    Computer Architecture that will assist them as they learn material throughout the semester. There
                    were several steps to accomplish this goal. First, we identified a large set of parameters, which
                    were essential to the design of any computer architecture; we then considered a range of reasonable
                    changes that could be made to these parameters, such as different memory organizational patterns,
                    different types of microarchitecture, different branch predictors, etc. Secondly, we took this set
                    of parameters, and simulated each of their performance using a simulator. Then the performance data
                    was stored in a database for use in the user interface tool, which displays the stored data for
                    students to access.
                </p>
                <p>
                    Our system design includes three major subsystems: the simulator, database and data management, and
                    website for the user interface. The simulator includes the parameters being simulated, the
                    benchmarks those parameters are run against, and the simulator itself. The database consists of the
                    database itself and data management for how the data is input from the simulator, digested for
                    storage into the database, and the formatting and code to be output to the website. The website
                    includes the integration from the database to frontend website code as well as the user interface
                    for students to interact with in addition to graphical data representations.
                </p>
                <p>For a quick guide on using this site, please see the following video:</p>
                <div style={{ minHeight: "473px" }}>
                    <iframe
                        width="840px"
                        height="473px"
                        src="https://www.youtube.com/embed/qxM0WZmKVzg?si=7wbuD__nAWZ-_-nE"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>
                </div>
                <p style={{ minHeight: "250px" }}>
                    For more information about the site and the code please see the <a href="/about">about page</a>
                </p>
            </CenteredContainer>
        </div>
    );
};

export default PageHome;
