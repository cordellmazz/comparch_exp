// This is a slider component whose thumb will snap to specific integer values passed in through props

import React from "react";
import styled from "styled-components";
import CEDropdown from "./CEDropdown";
import FlexRow from "../layout/structure/FlexRow";

const SliderContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2px;
    align-items: left;
    width: 100%;
`;

const SliderInput = styled.input`
    flex-grow: 1;
    margin-right: 5px;
    width: 75%;
`;

const ValueDisplay = styled.p`
    width: 35px;
    text-align: center;
    margin: 0;
    padding-top: 2px;
`;

const Label = styled.p`
    width: 50%;
    text-align: left;
    justify-content: center;
    margin: 0;
    padding-top: 2px;
`;

const CEDiscreteSlider = ({ width, height, options, value, setValue, title = "" }) => {
    const handleChange = (e) => {
        const index = Math.round(
            ((e.target.value - e.target.min) / (e.target.max - e.target.min)) * (options.length - 1)
        );
        setValue(options[index]);
    };

    // slider takes up 75%, dropdown takes up 25%
    return (
        <SliderContainer style={{ width: width, height: height }}>
            {title ? <Label>{title}</Label> : null}
            <SliderInput
                type="range"
                min="0"
                max={options.length - 1}
                value={options.indexOf(value)}
                onChange={handleChange}
            />
            <FlexRow style={{ width: "25%" }}>
                <CEDropdown value={value} setValue={setValue} options={options} />
                {/* <ValueDisplay>{title ? `${title}: ${value}` : value}</ValueDisplay> */}
            </FlexRow>
        </SliderContainer>
    );
};

export default CEDiscreteSlider;
