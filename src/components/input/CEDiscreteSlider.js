// This is a slider component whose thumb will snap to specific integer values passed in through props

import React, { useState } from "react";
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
    cursor: pointer;
`;

const ValueDisplay = styled.p`
    width: 35px;
    text-align: center;
    margin: 0;
    padding-top: 2px;
`;

const Label = styled.p`
    font-size: 16px;
    width: 50%;
    text-align: left;
    justify-content: center;
    margin: 0;
    padding-top: 2px;
`;

function findIndexInOptions(options, value) {
    const index = options.findIndex((option) => option.toString() === value.toString());
    return index;
}

const CEDiscreteSlider = ({ width, height, options, value, setValue, title = "" }) => {
    try {
        // if options is a JSON object normalize it to an array of strings where each string is a key in the object
        // if (typeof options === "object" && !Array.isArray(options)) {
        //     options = Object.keys(options);
        // }
        // there is a way to get this component to handle sets of items but it involves looking strictly at the Object.entries of the options
        const [sliderValue, setSliderValue] = useState(findIndexInOptions(options, value) || 0);
        const handleSliderChange = (e) => {
            const index = Math.round(
                ((e.target.value - e.target.min) / (e.target.max - e.target.min)) * (options.length - 1)
            );
            setValue(options[index]);
            setSliderValue(index);
        };

        const handleDropdownChange = (val) => {
            let valNum = Number(val);
            setValue(valNum);
            setSliderValue(options.indexOf(valNum));
        };

        // slider takes up 75%, dropdown takes up 25%
        return (
            <SliderContainer style={{ width: width, height: height }}>
                {title ? <Label>{title}</Label> : null}
                <SliderInput
                    type="range"
                    min="0"
                    max={options.length - 1}
                    value={sliderValue}
                    onChange={handleSliderChange}
                />
                <FlexRow style={{ width: "25%" }}>
                    <CEDropdown value={value} setValue={handleDropdownChange} options={options} />
                    {/* <ValueDisplay>{title ? `${title}: ${value}` : value}</ValueDisplay> */}
                </FlexRow>
            </SliderContainer>
        );
    } catch (e) {
        console.log("Error in CEDiscreteSlider:", e);
        console.log("options:", options);
        return null;
    }
};

export default CEDiscreteSlider;
