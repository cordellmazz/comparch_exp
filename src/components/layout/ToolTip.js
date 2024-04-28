import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

// Tooltip Container
const TooltipContainer = styled.div`
    position: relative;
    display: inline-block;
`;

// Dynamic positioning for the tooltip
const getPositionStyles = (position) => {
    switch (position) {
        case "above":
            return css`
                bottom: 125%;
                left: 50%;
                margin-left: -60px;
            `;
        case "below":
            return css`
                top: 125%;
                left: 50%;
                margin-left: -60px;
            `;
        case "left":
            return css`
                top: 50%;
                right: 110%;
                margin-top: -15px;
            `;
        case "right":
            return css`
                top: 50%;
                left: 110%;
                margin-top: -15px;
            `;
        default:
            return css``;
    }
};

// Tooltip Text
const TooltipText = styled.span`
    visibility: hidden;
    width: 250px;
    background-color: white;
    color: black;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s;
    border: 1px solid black;

    ${({ position }) => getPositionStyles(position)}
`;

// Info Icon that changes color on hover
const InfoIcon = styled.div`
    cursor: pointer;
    color: gray;
    transition: background-color 0.3s, color 0.3s;
    margin-top: 2px;

    &:hover {
        color: #bf5700;
    }

    &:hover ${TooltipText} {
        visibility: visible;
        opacity: 1;
    }
`;

// React Component
const ToolTip = ({ tooltipText, position = "above" }) => {
    return (
        <TooltipContainer>
            <InfoIcon>
                <FontAwesomeIcon icon={faInfoCircle} />
                <TooltipText position={position}>{tooltipText}</TooltipText>
            </InfoIcon>
        </TooltipContainer>
    );
};

export default ToolTip;
