import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2px;
    align-items: left;
`;

const DropdownSelect = styled.select`
    flex-grow: 1;
    margin-right: 5px;
    width: 100%;
`;

const DropdownLabel = styled.p`
    width: 50%;
    text-align: left;
    justify-content: center;
    margin: 0;
    padding-top: 2px;
`;

const CEDropdown = ({ width, height, value, setValue, title = "", options }) => {
    const normalizeOptions = () => {
        if (Array.isArray(options)) {
            return options.map((option) => ({
                key: option,
                value: option,
            }));
        }

        return Object.entries(options).map(([key, value]) => {
            if (typeof value === "object" && value.title) {
                return {
                    key: value.title,
                    value: key,
                };
            }

            return {
                key,
                value: key,
            };
        });
    };

    const processedOptions = normalizeOptions();

    const handleChange = (e) => {
        console.log("Changing this stupid value, " + e.target.value);
        setValue(e.target.value);
    };

    return (
        <DropdownContainer style={{ width: width ? width : "100%", height: height }}>
            {title ? <DropdownLabel>{title}</DropdownLabel> : null}
            <DropdownSelect value={value} onChange={handleChange}>
                {processedOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.key}
                    </option>
                ))}
            </DropdownSelect>
        </DropdownContainer>
    );
};

export default CEDropdown;
