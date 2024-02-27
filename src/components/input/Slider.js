// Import React and styled-components
import React, { useState } from "react";
import styled from "styled-components";

// Styled container for the slider
const SliderContainer = styled.div`
    flex-direction: column;
    margin: 20px;
`;

// Styled input for the slider
const SliderInput = styled.input`
    width: 100%;
    // margin: 5px 0;
`;

// Slider component
const Slider = ({ width, height, value, setValue, title = "" }) => {
    // Handle slider value change
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    // Return the slider component with a range input and a paragraph to display the value, paragraph is centered underneath slider, value is directly underneath slider
    return (
        <SliderContainer
            style={{ width: width, height: height, justifyContent: "top" }}
        >
            <SliderInput
                type="range"
                min="0" // Minimum value
                max="100" // Maximum value
                value={value}
                onChange={handleChange}
            />
            <p style={{ textAlign: "center", margin: "0px" }}>
                {title ? title + ": " + value : value}
            </p>
        </SliderContainer>
    );
};

export default Slider;
