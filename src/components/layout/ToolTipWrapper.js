import React, { useState } from "react";
import styled, { css } from "styled-components";

// Tooltip Container
const TooltipContainer = styled.div`
    position: relative;
    display: inline-block;
    cursor: help;
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
    width: 120px;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s, visibility 0s linear 0.3s;
    border: 1px solid #ddd;

    ${({ position }) => getPositionStyles(position)}
`;

// React Component for Tooltips
export const ToolTipWrapper = ({ children, tooltipText, position = "above", hoverDelay = 500 }) => {
    const [hoverTimeout, setHoverTimeout] = useState(null);

    const handleMouseOver = () => {
        const timeout = setTimeout(() => {
            const tooltip = document.getElementById("tooltip-text");
            if (tooltip) {
                tooltip.style.visibility = "visible";
                tooltip.style.opacity = 1;
            }
        }, hoverDelay);
        setHoverTimeout(timeout);
    };

    const handleMouseOut = () => {
        clearTimeout(hoverTimeout);
        const tooltip = document.getElementById("tooltip-text");
        if (tooltip) {
            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = 0;
        }
    };

    return (
        <TooltipContainer onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {children}
            <TooltipText id="tooltip-text" position={position}>
                {tooltipText}
            </TooltipText>
        </TooltipContainer>
    );
};

export default ToolTipWrapper;
