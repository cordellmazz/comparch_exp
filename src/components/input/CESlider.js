// Import React and styled-components
import React, { useState } from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px;
    align-items: center;
`;

const SliderInput = styled.input`
    flex-grow: 1;
    margin-right: 5px;
`;

const ValueDisplay = styled.p`
    width: 35px;
    text-align: center;
    margin: 0;
    padding-top: 2px;
`;

const CESlider = ({ width, height, value, setValue, title = "" }) => {
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <SliderContainer style={{ width: width, height: height }}>
            <SliderInput type="range" min="0" max="100" value={value} onChange={handleChange} />
            <ValueDisplay>{title ? title + ": " + value : value}</ValueDisplay>
        </SliderContainer>
    );
};

export default CESlider;
