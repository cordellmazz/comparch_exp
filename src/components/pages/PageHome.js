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
                <SimulateButton onClick={handleSimulateClick}>EXPLORE</SimulateButton>
                <p>The text is starting</p>
            </CenteredContainer>
        </div>
    );
};

export default PageHome;
