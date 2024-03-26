import React from "react";
import styled from "styled-components";

// Styled container for the flex box
const FlexBoxContainer = styled.div`
    display: flex;
    width: 100%;
    min-width: 400px;
    height 100%;
    flex-direction: ${(props) => props.direction};
    justify-content: ${(props) => props.justify};

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

// FlexBox component
const FlexBox = (props) => {
    return (
        <FlexBoxContainer
            direction={props.direction ? props.direction : "row"}
            justify={props.justify ? props.justify : "center"}
            style={props.style ? props.style : {}}
        >
            {props.children}
        </FlexBoxContainer>
    );
};

export default FlexBox;
