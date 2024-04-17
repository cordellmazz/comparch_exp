// reduced version of simulation module that relies on SimModContainer to provide the config and setConfig functions
import React, { useState, useEffect } from "react";
import { useDatabase } from "../../../context/DatabaseProvider.js";
import CEButton from "../../input/CEButton.js";
import FlexBox from "../structure/FlexBox.js";
import FlexColumn from "../structure/FlexColumn.js";
import FlexRow from "../structure/FlexRow.js";
import styled from "styled-components";
import RecursiveStructure from "../../input/ConfigInput.js";
import GraphSweepView from "../graphing/GraphSweepView.js";
import CEDropdown from "../../input/CEDropdown.js";
import InfoTip from "../InfoTip.js";
import * as CEConfig from "./CEConfig.js";
// import all the styled components from SimModDivs.js
import {
    RowColSwapContainer,
    slideOutTime,
    TextOptions,
    SimModDivAnimated,
    NumberMarker,
    TitleInput,
    DeleteButton,
    SelectedMetrics,
    SweepSelectorContainer,
} from "./SimModDivs.js";

export function SimMod({ config, setConfig, index, deleteConfig }) {
    // graph data
    const { findByParams } = useDatabase();
    const [selectedMetrics, setSelectedMetrics] = useState(config.selected_metrics);
    const [sweepParameter, setSweepParameter] = useState(config.sweep_parameter || "l1d_size");

    // animation
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        if (isDeleted) {
            const timer = setTimeout(() => {
                deleteConfig(index);
            }, slideOutTime * 1000);
            return () => clearTimeout(timer);
        }
    }, [isDeleted]);

    // local config acts as a buffer for the global config to modified before being set
    // SimMod however only displays the actual config managed in SimModContainer
    const [localConfig, setLocalConfig] = useState(config);

    // This function handles updating the local config which will then update the global config
    const updateConfig = (path, value, setFunc = setLocalConfig) => {
        path = path.toLowerCase();
        setFunc((origConfig) => {
            const updateAttribute = (obj, keys, val) => {
                const key = keys[0];
                if (keys.length === 1) {
                    return { ...obj, [key]: val };
                } else {
                    return { ...obj, [key]: updateAttribute(obj[key], keys.slice(1), val) };
                }
            };

            const keys = path.split(".");
            return updateAttribute(origConfig, keys, value);
        });
    };

    // Any time the local config changes it will update the global config
    useEffect(() => {
        if (!isDeleted) {
            setConfig(localConfig);
        }
    }, [localConfig]);

    useEffect(() => {
        // store sweep parameter in config
        updateConfig("sweep_parameter", sweepParameter);
    }, [sweepParameter]);

    // const selectedVals = CEConfig.findDeepestSelected(config.input);

    // data processing from config
    const [dbData, setDbData] = useState(config.db_data);
    const { filterAndSweepRuns } = useDatabase();
    const [metricChoice, setMetricChoice] = useState(CEConfig.DefaultMetricsConfig);

    async function testSweep() {
        const results = await filterAndSweepRuns(
            // pass in selected value for every param here, then every possibility for the sweep parameter in the next object
            { memory_size: "2GB", l1d_size: "16kB", l1i_size: "16kB" }, // for every parameter that is not defined here, it adds another dimension to the graph. So this should probably be mandatory to define every other parameter
            {
                l2_size: { type: "list", values: ["256kB", "512kB"] },
            }
        );
        console.log("results", results);
        setDbData(results);
    }

    // function getSelectedValue() {
    //     let currentSelection = metricChoice["groups"]["selected"].toLowerCase();
    //     let current = metricChoice["groups"][currentSelection];

    //     while (current) {
    //         currentSelection = current["selected"];
    //         current = current[currentSelection.toLowerCase()];
    //     }

    //     return currentSelection;
    // }

    function addMetricToSet() {
        const newSelection = Object.values(CEConfig.findSelected(metricChoice))[0];
        if (!selectedMetrics.includes(newSelection)) {
            setSelectedMetrics([...selectedMetrics, newSelection]);
        }
    }

    async function getSimulation() {
        const inputSelections = CEConfig.findSelected(config.input);
        // filtered selections where its every parameter except the sweep parameter
        const staticParams = Object.fromEntries(
            Object.entries(inputSelections).filter(([key, value]) => key !== sweepParameter)
        );
        const result = await findByParams(staticParams);
        // if result is empty array then error
        if (result.length === 0) {
            console.error("No results found for given parameters");
            return;
        }
        setDbData(result);
    }

    return (
        <SimModDivAnimated className={isDeleted ? "slide-out" : ""}>
            <NumberMarker>#{index + 1}</NumberMarker>
            <TitleInput
                defaultValue={config.name === "" ? `Simulation ${index + 1}` : config.name}
                onChange={(e) => updateConfig("name", e.target.value)}
            />
            <DeleteButton
                onClick={() => {
                    setIsDeleted(true);
                }}
            >
                remove
            </DeleteButton>
            <FlexBox>
                <RowColSwapContainer>
                    <GraphSweepView
                        config={config}
                        updateConfig={updateConfig}
                        selectedMetrics={selectedMetrics}
                        sweepParameter={sweepParameter}
                        dbData={dbData}
                    />
                    <FlexColumn align={"left"}>
                        <RecursiveStructure
                            structure={CEConfig.metricOptions}
                            config={metricChoice}
                            updateConfig={(path, value) => {
                                updateConfig(path, value, setMetricChoice);
                            }}
                        />
                        <CEButton title={"Add Metric"} func={addMetricToSet} />
                        <SelectedMetrics>
                            <TextOptions texts={selectedMetrics} setTexts={setSelectedMetrics} />
                        </SelectedMetrics>
                        <SweepSelectorContainer>
                            <FlexRow>
                                <CEDropdown
                                    title={"Sweep Metric:"}
                                    value={sweepParameter}
                                    setValue={setSweepParameter}
                                    options={[
                                        "l1d_size",
                                        "l1i_size",
                                        "l2_size",
                                        "memory_type",
                                        "memory_size",
                                        "cpu_type",
                                        "isa",
                                        "num_cores",
                                        "board_clk_freq",
                                    ]}
                                />
                                <InfoTip
                                    tooltipText={"Select a metric to sweep over (x axis), value will be ignored below."}
                                    position="left"
                                />
                            </FlexRow>
                        </SweepSelectorContainer>
                        <RecursiveStructure config={config} updateConfig={updateConfig} prefix={"input"} />
                        <CEButton title={"Get Simulation"} func={getSimulation} />
                    </FlexColumn>
                </RowColSwapContainer>
            </FlexBox>
        </SimModDivAnimated>
    );
}
