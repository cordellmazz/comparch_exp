// simple react file that shows an example of chartjs
import React, { useState, useEffect } from "react";
import { SimMod } from "./SimMod.js";
import * as CEConfig from "./CEConfig.js";
import FlexRow from "../structure/FlexRow.js";
import styled from "styled-components";
import { faPlus, faSave, faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CESaveDialog, { CELoadDialog } from "../../input/CEConfirm.js";
import { toast } from "react-toastify";
import { defaultSims } from "./CEDefaultSims.js";

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

    height: 50%;

    transition: 0.14s;
    &:hover {
        background-color: #bf5700;
        color: white;
    }
`;

const SaveButton = styled(AppendButton)`
    font-size: 2em;
    height: 25vh;
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
    min-height: 98vh;
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
    // dialog state
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [simSetName, setSimSetName] = useState("");
    const [loadDialogOpen, setLoadDialogOpen] = useState(false);
    const [chosenSimSet, setChosenSimSet] = useState(localStorage.getItem("currentSimSet") || "");
    const [importText, setImportText] = useState("");

    // load simulation sets from local storage
    const [simSets, setSimSets] = useState(JSON.parse(localStorage.getItem("saves")) || {});

    const [defaultConfig] = useState(CEConfig.DefaultConfig);
    const createNewConfig = () => {
        return {
            input: defaultConfig,
            id: uniqueID(),
            name: "",
            db_data: defaultSims,
            selected_metrics: [],
        };
    };

    const [loaded, setLoaded] = useState(false);
    const [configs, setConfigs] = useState(createNewConfig());
    // database data is stored in configs under the key "dbData"
    // useEffect to load configs from local storage
    useEffect(() => {
        try {
            const localConfigs = JSON.parse(localStorage.getItem("configs"));
            if (localConfigs) {
                setConfigs(localConfigs);
            } else {
                const newDefaultConfig = createNewConfig();
                localStorage.setItem("configs", JSON.stringify([newDefaultConfig]));
                setConfigs([newDefaultConfig]);
            }
            setLoaded(true);
        } catch (e) {
            toast.error("Error loading configs from local storage!", { autoClose: 1000 });
            setLoaded(true);
        }
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

    // duplicate config function that duplicates a config and inserts it after the original
    const duplicateConfig = (id) => {
        const newConfig = configs.find((config) => config.id === id);
        const newID = uniqueID();
        const newConfigObj = { ...newConfig, id: newID };
        const index = configs.findIndex((config) => config.id === id);
        const newConfigs = [...configs];
        newConfigs.splice(index + 1, 0, newConfigObj);
        setConfigs(newConfigs);
    };

    const appendNewConfig = () => {
        // if (configs.length < 10) {
        const newConfig = createNewConfig();
        setConfigs((currentConfigs) => [...currentConfigs, newConfig]);
        // }
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

    // Functions for saving simulation sets
    // get name of simulation set from user and save it to local storage under a saves dictionary with the name as the key
    const saveState = () => {
        setSimSetName("");
        setSaveDialogOpen(true);
    };

    const saveSimSet = () => {
        // get saves from local storage
        // update saves with new simulation set with simSetName as key and configs as value
        // save updated saves to local storage
        const saves = JSON.parse(localStorage.getItem("saves")) || {};
        if (saves[simSetName]) {
            const overwrite = window.confirm("Overwrite existing save?");
            if (!overwrite) {
                setSimSetName("");
                setSaveDialogOpen(false);
                return;
            }
        }
        const newSaves = { ...saves, [simSetName]: configs };
        localStorage.setItem("saves", JSON.stringify(newSaves));
        localStorage.setItem("currentSimSet", simSetName);
        setSimSetName("");
        setChosenSimSet(simSetName);
        setSaveDialogOpen(false);
        setSimSets(newSaves);
        toast("Simulation set saved!", { autoClose: 1000 });
    };

    const importSimSet = () => {
        try {
            const importedSimSet = JSON.parse(importText);
            const saves = JSON.parse(localStorage.getItem("saves")) || {};
            if (saves[importedSimSet]) {
                const overwrite = window.confirm("Overwrite existing save?");
                if (!overwrite) {
                    setImportText("");
                    return;
                }
            }
            const simSetName = Object.keys(importedSimSet)[0];
            const simSetObj = Object.values(importedSimSet)[0];
            const newSaves = { ...saves, [simSetName]: simSetObj };
            localStorage.setItem("saves", JSON.stringify(newSaves));
            setSimSets(newSaves);
            setImportText("");
            toast("Simulation set imported!", { autoClose: 1000 });
        } catch (e) {
            toast.error("Invalid import text!", { autoClose: 1000 });
        }
    };

    const cancelSaveSimSet = () => {
        setSimSetName("");
        setSaveDialogOpen(false);
    };

    // functions for loading simulation sets
    const loadState = () => {
        if (!simSets || chosenSimSet === "") {
            const firstSimSet = Object.keys(simSets)[0];
            setChosenSimSet(firstSimSet);
        }
        setLoadDialogOpen(true);
    };

    const loadSimSet = () => {
        // confirm if user wants to load simulation set
        if (!chosenSimSet || !simSets[chosenSimSet]) {
            toast.error("No simulation set chosen!", { autoClose: 1000 });
            return;
        }

        const confirmLoad = window.confirm(
            "Are you sure you want to load this simulation set? Any unsaved changes will be lost."
        );

        if (!confirmLoad) {
            return;
        }
        // get saves from local storage
        // get simulation set from saves with chosenSimSet as key
        // set configs to simulation set
        const saves = JSON.parse(localStorage.getItem("saves")) || {};
        const simSet = saves[chosenSimSet];
        if (!simSet) {
            toast.error("Simulation set not found!", { autoClose: 1000 });
            setChosenSimSet("");
            setLoadDialogOpen(false);
            return;
        }
        // save current sim set name to local storage
        localStorage.setItem("currentSimSet", chosenSimSet);
        setConfigs(simSet);
        setLoadDialogOpen(false);
        toast("Simulation set loaded!", { autoClose: 1000 });
    };

    const deleteSimSet = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this simulation set?");
        if (!confirmDelete) {
            return;
        }

        let saves = JSON.parse(localStorage.getItem("saves"));
        if (!saves) {
            return;
        }
        saves = Object.fromEntries(Object.entries(saves).filter(([key, value]) => key !== chosenSimSet));
        localStorage.setItem("saves", JSON.stringify(saves));
        setSimSets(saves);

        if (chosenSimSet === localStorage.getItem("currentSimSet")) {
            const firstSimSet = Object.keys(saves)[0];
            setChosenSimSet(firstSimSet);
            if (!firstSimSet) {
                localStorage.setItem("currentSimSet", "");
            }
        }
    };

    const exportSimSet = () => {
        const simSet = simSets[chosenSimSet];
        if (!simSet) {
            toast.error("Simulation set not found!", { autoClose: 1000 });
            setChosenSimSet("");
            setLoadDialogOpen(false);
            return;
        }
        navigator.clipboard.writeText(JSON.stringify({ [chosenSimSet]: simSet }));
        toast("Copied simulation set to clipboard!", { autoClose: 2000 });
    };

    const cancelLoadSimSet = () => {
        setLoadDialogOpen(false);
    };

    return (
        <>
            {loaded ? (
                <SimModContainerDiv>
                    <CESaveDialog
                        isOpen={saveDialogOpen}
                        title="Save Simulation Set"
                        message="name of simulation set:"
                        onConfirm={saveSimSet}
                        onCancel={cancelSaveSimSet}
                        simSetName={simSetName}
                        setSimSetName={setSimSetName}
                        importText={importText}
                        setImportText={setImportText}
                        importSimSet={importSimSet}
                    />
                    <CELoadDialog
                        isOpen={loadDialogOpen}
                        title="Load Simulation Set"
                        message="choose simulation set to load:"
                        onConfirm={loadSimSet}
                        onCancel={cancelLoadSimSet}
                        chosenSimSet={chosenSimSet}
                        setChosenSimSet={setChosenSimSet}
                        options={Object.keys(simSets)}
                        deleteSimSet={deleteSimSet}
                        exportSimSet={exportSimSet}
                    />
                    <ButtonContainer>
                        <AppendButton onClick={appendNewConfig}>
                            <FontAwesomeIcon icon={faPlus} size="2x" />
                            {/* <ModuleCounter>{configs.length}/10</ModuleCounter> */}
                        </AppendButton>
                        <SaveButton onClick={saveState}>
                            <FontAwesomeIcon icon={faSave} />
                        </SaveButton>
                        <SaveButton onClick={loadState}>
                            <FontAwesomeIcon icon={faShareFromSquare} />
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
                            duplicateConfig={() => duplicateConfig(config.id)}
                        />
                    ))}
                </SimModContainerDiv>
            ) : null}
        </>
    );
}

export default SimModContainer;
