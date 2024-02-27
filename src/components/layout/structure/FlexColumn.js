import React from "react";
import styled from "styled-components";

const FlexColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${(props) => props.justify};
    align-items: ${(props) => props.align};
    width: 100%;
    height: 100%;
`;

const FlexColumn = (props) => {
    return (
        <FlexColumnContainer
            justify={props.justify ? props.justify : "center"}
            align={props.align ? props.align : "center"}
            style={props.style ? props.style : {}}
        >
            {props.children}
        </FlexColumnContainer>
    );
};

export default FlexColumn;
