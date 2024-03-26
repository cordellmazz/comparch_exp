// styled checkbox component

import React from "react";
import styled from "styled-components";

const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px;
    align-items: center;
`;

const CheckboxInput = styled.input`
    flex-grow: 1;
    margin-right: 5px;
`;

const CheckboxLabel = styled.label`
    width: 35px;
    text-align: center;
    margin: 0;
    padding-top: 2px;
`;

const CECheckbox = ({ width, height, value, setValue, title = "" }) => {
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <CheckboxContainer style={{ width: width, height: height }}>
            <CheckboxInput
                type="checkbox"
                value={value}
                onChange={handleChange}
            />
            <CheckboxLabel>{title}</CheckboxLabel>
        </CheckboxContainer>
    );
};

export default CECheckbox;
