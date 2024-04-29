import React from "react";
import styled from "styled-components";

const TipWrapper = styled.div`
    position: relative;
    display: inline-block;

    &:hover .tooltip {
        visibility: visible;
        opacity: 1;
    }
`;

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
    bottom: 100%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;

    &:after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
    }
`;

const ToolTipWrapper = ({ children, description }) => (
    <TipWrapper>
        {children}
        <TooltipText className="tooltip">{description}</TooltipText>
    </TipWrapper>
);

export default ToolTipWrapper;
