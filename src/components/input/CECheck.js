import React from "react";
import styled from "styled-components";

const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: row;
    min-width: 100px;
    align-items: flex-start; // Corrected from 'left' to 'flex-start'
    justify-content: flex-start; // Corrected from 'left' to 'flex-start'
    cursor: pointer;
`;

const CheckboxInput = styled.input`
    flex-grow: 1;
    margin-right: 5px;
    cursor: pointer;
`;

const CheckboxLabel = styled.label`
    text-align: left;
    margin: 0;
    padding-top: 2px;
    cursor: pointer;
`;

const CECheckbox = ({ width, height, value, setValue, title = "" }) => {
    const invertValue = () => setValue(!value);

    return (
        <CheckboxContainer style={{ width, height }} onClick={invertValue}>
            <CheckboxInput
                type="checkbox"
                checked={value} // Controlled component, use checked instead of value
                onChange={invertValue} // Properly handle changes, though clicking the container will also work
                onClick={(e) => e.stopPropagation()} // Prevent the event from bubbling up when checkbox itself is clicked
            />
            <CheckboxLabel>{title}</CheckboxLabel>
        </CheckboxContainer>
    );
};

export default CECheckbox;
