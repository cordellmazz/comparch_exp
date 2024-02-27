import React from "react";
import styled from "styled-components";

const FlexRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${(props) => props.justify};
    align-items: ${(props) => props.align};
    width: 100%;
    height: 100%;
`;

const FlexRow = (props) => {
    return (
        <FlexRowContainer
            justify={props.justify ? props.justify : "center"}
            align={props.align ? props.align : "center"}
            style={props.style ? props.style : {}}
        >
            {props.children}
        </FlexRowContainer>
    );
};

export default FlexRow;
