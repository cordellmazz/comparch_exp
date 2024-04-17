// simple react file that shows an example of chartjs
import React, { useState, useEffect } from "react";
import { SimMod } from "./SimMod.js";
import * as CEConfig from "./CEConfig.js";
import FlexRow from "../structure/FlexRow.js";
import styled from "styled-components";
import { faAlignJustify, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// sim mod container styled div with overflow x scroll, takes up the full width of the screen
const SimModContainerDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow-x: auto;
`;

// input button which adds a new simulation module to the container, on hover it turns orange with a slight delay
const AppendButton = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid black;
    width: 50px;
    cursor: pointer;
    background-color: white;
    color: black;

    height: 75%;

    transition: 0.14s;
    &:hover {
        background-color: #bf5700;
        color: white;
    }
`;

const SaveButton = styled(AppendButton)`
    font-size: 2em;
    height: 25%;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
`;

// styled div which holds the counter for how many modules the container has position at the bottom of its container, text is in center of div
const ModuleCounter = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    color: gray;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    align-items: center;
    justify-content: center;
`;

//function that generates random key
function uniqueID() {
    return Math.random().toString(36).substring(2, 24);
}

// holds several configs, each of which will be mapped to a simulation module
function SimModContainer() {
    const [defaultConfig] = useState(CEConfig.DefaultConfig);
    const [loaded, setLoaded] = useState(false);
    const [configs, setConfigs] = useState([{ ...defaultConfig, id: uniqueID(), name: "" }]);
    // database data is stored in configs under the key "dbData"
    // useEffect to load configs from local storage
    useEffect(() => {
        const localConfigs = JSON.parse(localStorage.getItem("configs"));
        if (localConfigs) {
            setConfigs(localConfigs);
        }
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (loaded) {
            localStorage.setItem("configs", JSON.stringify(configs));
        }
    }, [configs]);

    const generateSetConfig = (id) => (newConfig) => {
        setConfigs((currentConfigs) =>
            currentConfigs.map((config) => (config.id === id ? { ...config, ...newConfig } : config))
        );
    };

    const deleteConfig = (id) => {
        setConfigs((currentConfigs) => currentConfigs.filter((config) => config.id !== id));
    };

    const appendNewConfig = () => {
        if (configs.length < 10) {
            const newConfig = {
                input: defaultConfig,
                id: uniqueID(),
                name: "",
                db_data: [{ ...CEConfig.firstDoc }], // make an empty JSON object for later use storing database data
                selected_metrics: [],
            };
            setConfigs((currentConfigs) => [...currentConfigs, newConfig]);
        }
    };

    // shift config to the right in the array
    const shiftRight = (index) => {
        if (index < configs.length - 1) {
            const newConfigs = [...configs];
            const temp = newConfigs[index];
            newConfigs[index] = newConfigs[index + 1];
            newConfigs[index + 1] = temp;
            setConfigs(newConfigs);
        }
    };

    // shift config to the left in the array
    const shiftLeft = (index) => {
        if (index > 0) {
            const newConfigs = [...configs];
            const temp = newConfigs[index];
            newConfigs[index] = newConfigs[index - 1];
            newConfigs[index - 1] = temp;
            setConfigs(newConfigs);
        }
    };

    // get name of simulation set from user and save it to local storage under a saves dictionary with the name as the key
    const saveState = () => {
        const name = prompt("Name of simulation set:");
        if (name) {
            const saves = JSON.parse(localStorage.getItem("saves")) || {};
            if (saves[name]) {
                const overwrite = window.confirm("Overwrite existing save?");
                if (!overwrite) {
                    return;
                }
            }
            saves[name] = configs;
            localStorage.setItem("saves", JSON.stringify(saves));
        }
    };

    return (
        <>
            {loaded ? (
                <SimModContainerDiv>
                    <ButtonContainer>
                        <AppendButton onClick={appendNewConfig}>
                            <FontAwesomeIcon icon={faPlus} size="2x" />
                            <ModuleCounter>{configs.length}/10</ModuleCounter>
                        </AppendButton>
                        <SaveButton onClick={saveState}>
                            <FontAwesomeIcon icon={faSave} />
                        </SaveButton>
                    </ButtonContainer>

                    {configs.map((config, index) => (
                        <SimMod
                            key={config.id}
                            config={config}
                            setConfig={generateSetConfig(config.id)}
                            index={configs.indexOf(config)}
                            deleteConfig={() => deleteConfig(config.id)}
                            shiftLeft={() => shiftLeft(index)}
                            shiftRight={() => shiftRight(index)}
                        />
                    ))}
                </SimModContainerDiv>
            ) : null}
        </>
    );
}

export default SimModContainer;
