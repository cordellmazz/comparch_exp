import React, { useState } from "react";
import { useNavBar } from "../../context/NavigationProvider";
import styled from "styled-components";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarButton = styled.button`
    height: 4vh;
    width: 4vh;
    min-width: 39px;
    min-height: 39px;
    background-color: #000;
    border: none;
    color: white;
    padding: 10px 15px;
    cursor: pointer;
    position: fixed;
    left: ${(props) => (props.active === "true" ? "212px" : "0")};
    top: 0px;
    transition: 0.3s;
    z-index: 101;
    // center content inside
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #bf5700;
    }
`;

const MenuItem = styled.a`
    padding: 10px 15px;
    text-decoration: none;
    font-size: 24px;
    color: black;
    display: block;
    transition: 0.1s;
    border-bottom: 1px solid #e0e0e0;

    &:hover {
        background-color: #bf5700;
        color: #ffffff;
    }
`;

const SidebarContainer = styled.div`
    width: ${(props) => (props.active === "true" ? "250px" : "0")};
    height: 100vh;
    background-color: #ffffff;
    transition: 0.3s;
    overflow-x: hidden;
    position: fixed;
    top: 0;
    left: 0;
    border-right: 1px solid #e0e0e0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

// top container where items are displayed at top
const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    flex: 1;
`;

const BottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-end;
`;

const BottomText = styled.div`
    padding: 10px 15px;
    text-decoration: none;
    font-size: 24px;
    color: black;
    display: block;
`;

const Navigation = () => {
    const { active, toggleActive } = useNavBar();

    return (
        <>
            <SidebarButton active={active.toString()} onClick={toggleActive}>
                <FontAwesomeIcon icon={faBars} />
            </SidebarButton>
            <SidebarContainer active={active.toString()}>
                <TopContainer>
                    <MenuItem href="/home">Home</MenuItem>
                    <MenuItem href="/simulate">Simulate</MenuItem>
                    <MenuItem href="/about">About</MenuItem>
                </TopContainer>
                <BottomContainer>
                    <BottomText>CompArch Explorer</BottomText>
                </BottomContainer>
            </SidebarContainer>
        </>
    );
};

export default Navigation;
