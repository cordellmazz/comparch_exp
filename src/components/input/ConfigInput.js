import CEDropdown from "./CEDropdown";
import CEDiscreteSlider from "./CEDiscreteSlider";
import { simModStructure } from "../layout/simulation/CEConfig";
import { useState } from "react";
import styled from "styled-components";
import * as CEConfig from "../layout/simulation/CEConfig";

const Container = styled.div`
    width: 100%;
    max-width: 600px;
`;

const ConditionalHaze = styled(({ isEnabled, ...rest }) => <div {...rest} />)`
    transition: max-height 0.5s, opacity 0.5s ease-in-out;
    opacity: ${(props) => (props.isEnabled ? "1" : "0.5")};
    max-height: ${(props) => (props.isEnabled ? "1000px" : "20px")};
    overflow: hidden;
    text-align: left;
`;

const SectionTitle = styled.div`
    margin-top: 15px;
    text-align: left;
    font-weight: bold;
`;

const SectionGroup = styled.div`
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid gray;
`;

const ConditionalWrapper = ({ children, title, enabled, setEnabled }) => {
    if (enabled === "false") {
        enabled = false;
    } else if (enabled === "true") {
        enabled = true;
    }

    return (
        <ConditionalHaze isEnabled={enabled}>
            <label>
                <input
                    type="checkbox"
                    checked={Boolean(enabled)}
                    onChange={() => setEnabled(!enabled)}
                    style={{ marginRight: "10px" }}
                />
                Enable {title}
            </label>
            {children}
        </ConditionalHaze>
    );
};

// WHY WAS IT DOING THAT? It would go through the dict and get the value
// but then sometimes it would return a JSON object instead of a string
function getValueInConfig(config, path) {
    try {
        const pathSegments = path.toLowerCase().split(".");

        let currentSegment = config;

        pathSegments.forEach((segment) => {
            currentSegment = currentSegment[segment];
        });

        if (!(typeof currentSegment === "string")) {
            // cast dict to string
            currentSegment = JSON.stringify(currentSegment);
        }

        return currentSegment;
    } catch (e) {
        console.log("Config value error, likely input and structure mismatch:", e);
    }
}

const generateTerminalComponent = (key, value, config, updateConfig) => {
    const { title, type, options } = value;
    const configValue = getValueInConfig(config, key + ".selected");

    if (type === "dropdown") {
        return (
            <CEDropdown
                title={title}
                value={configValue}
                setValue={(val) => updateConfig(key + ".selected", val)}
                options={options}
                key={key}
            />
        );
    } else if (type === "dsliders") {
        return (
            <CEDiscreteSlider
                title={title}
                value={configValue}
                setValue={(val) => updateConfig(key + ".selected", val)}
                options={options}
                key={key}
            />
        );
    }
};

// Not sure if that JSON stringify error is still happening (don't think it is)
// Next need to make it so the enabled checkboxes modify the config value as well
// then it is on to adding the graphing
const renderSimModule = (structure, keyPrefix = "", config, updateConfig) => {
    return Object.entries(structure).map(([key, value]) => {
        const { title, dynamic, type, optional, options, dependent } = value;
        const ComponentKey = `${keyPrefix}${keyPrefix === "" ? "" : "."}${key}`;
        const configPath = (keyPrefix ? `${keyPrefix}.${key}` : key).toLowerCase();

        let Component;
        const currentValue = getValueInConfig(config, configPath);

        if ((type === "dropdown" || type === "dsliders") && !dynamic) {
            // temrinal values of the recursive function
            Component = generateTerminalComponent(ComponentKey.toLowerCase(), value, config, updateConfig);
        } else if (dynamic) {
            // keys of dependet options are stored in dependentOptionKeys for use in the control component
            const dependentOptionKeys = Object.entries(options).reduce((acc, [optionKey, optionValue]) => {
                if (optionValue.dependent) {
                    acc[optionKey] = optionKey;
                }
                return acc;
            }, {});
            const configValueForControl = getValueInConfig(config, configPath + ".selected"); // problem line regarding input prefix
            // problem child, should be a terminal component
            const controlComponent = generateTerminalComponent(
                ComponentKey.toLowerCase(),
                { ...value, options: dependentOptionKeys },
                config,
                updateConfig
            );

            const selectedDependentOption = Object.entries(options).filter(
                ([optionKey, optionValue]) => optionValue.dependent && configValueForControl.toUpperCase() === optionKey
            );

            const independentOptions = Object.entries(options).filter(
                ([optionKey, optionValue]) => !optionValue.dependent
            );

            Component = (
                <>
                    {controlComponent}
                    {selectedDependentOption.map(([depKey, depValue]) =>
                        renderSimModule({ [depKey]: depValue }, configPath, config, updateConfig)
                    )}
                    {independentOptions.map(([nonDepKey, nonDepValue]) =>
                        renderSimModule({ [nonDepKey]: nonDepValue }, configPath, config, updateConfig)
                    )}
                </>
            );
        } else {
            // For non-dynamic, nested components
            Component = (
                <SectionGroup key={ComponentKey}>
                    <SectionTitle>{title}</SectionTitle>
                    {renderSimModule(options, ComponentKey, config, updateConfig)}
                </SectionGroup>
            );
        }

        return optional ? (
            <ConditionalWrapper
                title={title}
                key={ComponentKey}
                enabled={getValueInConfig(config, configPath + ".enabled")}
                setEnabled={(val) => updateConfig(configPath + ".enabled", val)}
            >
                {Component}
            </ConditionalWrapper>
        ) : (
            Component
        );
    });
};

const RecursiveStructure = ({ structure = simModStructure, prefix = "", config, updateConfig }) => {
    return <Container>{renderSimModule(structure, prefix, config, updateConfig)}</Container>;
};

export default RecursiveStructure;
