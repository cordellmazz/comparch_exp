// styled button component

import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px;
    align-items: center;
    cursor: pointer;
`;

const ButtonInput = styled.button`
    flex-grow: 1;
    margin-right: 5px;
    cursor: pointer;
`;

const ButtonLabel = styled.label`
    width: 35px;
    text-align: center;
    margin: 0;
    padding-top: 2px;
    cursor: pointer;
`;

const CEButton = ({ width, height, value, setValue, func, title = "" }) => {
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <ButtonContainer style={{ width: width, height: height }}>
            <ButtonInput type="button" value={value} onChange={handleChange} onClick={func}>
                {title}
            </ButtonInput>
        </ButtonContainer>
    );
};

export default CEButton;
