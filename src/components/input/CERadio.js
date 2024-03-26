// styled radio button component

import React from "react";
import styled from "styled-components";

const RadioContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px;
    align-items: center;
`;

const RadioInput = styled.input`
    flex-grow: 1;
    margin-right: 5px;
`;

const RadioLabel = styled.label`
    width: 35px;
    text-align: center;
    margin: 0;
    padding-top: 2px;
`;

const CERadio = ({ width, height, value, setValue, title = "" }) => {
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <RadioContainer style={{ width: width, height: height }}>
            <RadioInput type="radio" value={value} onChange={handleChange} />
            <RadioLabel>{title}</RadioLabel>
        </RadioContainer>
    );
};

export default CERadio;
