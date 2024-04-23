// spinning centered fontawesome loading icon
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const LoadingIcon = styled(FontAwesomeIcon)`
    margin: 15px;
    animation: spin 1s linear infinite;
    font-size: 2em;
    color: #007bff;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

function CELoadingIcon() {
    return (
        <LoadingIconContainer>
            <LoadingIcon icon={faSpinner} />
        </LoadingIconContainer>
    );
}

export default CELoadingIcon;
