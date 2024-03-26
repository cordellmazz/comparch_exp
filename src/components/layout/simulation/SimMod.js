// reduced version of simulation module that relies on SimModContainer to provide the config and setConfig functions
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartBar from "../ChartBar.js";
import { useDatabase } from "../../../context/DatabaseProvider.js";
import CEButton from "../../input/CEButton.js";
import CEDropdown from "../../input/CEDropdown.js";
import FlexBox from "../structure/FlexBox.js";
import FlexColumn from "../structure/FlexColumn.js";
import FlexRow from "../structure/FlexRow.js";
import * as CEConfig from "./CEConfig.js";
import CEDiscreteSlider from "../../input/CEDiscreteSlider.js";
import styled from "styled-components";

const slideOutTime = 0.5; // in seconds

// styled div for the sim module sets y position to tob of div
const SimModDiv = styled.div`
    position: relative;
    margin: 10px;
    border-radius: 10px;
    border: 1px solid black;
    padding: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    min-width: 35vw;
    min-height: 93vh;
`;

// styled div for the sim module when it is deleted
const SimModDivAnimated = styled(SimModDiv)`
    &.slide-out {
        max-width: 0;
        min-width: 0;
        padding: 0;
        margin: 0;
        opacity: 0;
        overflow: hidden;
        transition: min-width ${slideOutTime - 0.05}s ease-out, opacity 0.5s ease-out, padding 0.5s ease-out,
            margin 0.5s ease-out;
    }
`;

// styled div for a small gray number marker in the top left of the container that says what number the module is
const NumberMarker = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    color: gray;
    padding: 10px;
    border-radius: 10px;
    width: 15px;
    text-align: center;
    z-index: 5;
`;

// styled input for editable title field at the top of the container
const TitleInput = styled.input`
    margin: 10px;
    position: absolute;
    top: 0;
    left: 25px;
    width: 50%;
    height: 15px;
    border: none;
    border-bottom: 1px solid gray;
    text-align: left;
    font-size: 1em;
    z-index: 2;
    color: gray;
`;

// styled input at top right that is styled the same as the append button
const DeleteButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid black;
    min-width: 50px;
    cursor: pointer;
    background-color: white;
    color: black;

    z-index: 1;

    transition: 0.14s;
    &:hover {
        background-color: #bf5700;
        color: white;
    }
`;

export function SimMod({ config, setConfig, index, deleteConfig }) {
    // Graphical function
    ChartJS.register(ArcElement, Tooltip, Legend);
    const [chartData, setChartData] = useState({});
    const { findByParams, addRun, loaded } = useDatabase();

    // animation
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        console.log("isDeleted: ", isDeleted);
        if (isDeleted) {
            const timer = setTimeout(() => {
                deleteConfig(index);
                console.log("deleting config");
            }, slideOutTime * 1000);
            return () => clearTimeout(timer);
        }
    }, [isDeleted]);

    // local config acts as a buffer for the global config to modified before being set
    // SimMod however only displays the actual config managed in SimModContainer
    const [localConfig, setLocalConfig] = useState(config);

    // This function handles updating the local config which will then update the global config
    const updateConfig = (path, value) => {
        setLocalConfig((origConfig) => {
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

    function searchForRun() {
        console.log("Searching for run with the following parameters:");
        console.log(config);

        // const res = findByParams({
        //     cpuType: config.cpuType,
        //     branchPredictor: config.branchPredictor,
        //     cacheSize: config.cache.size,
        //     cacheAssociativity: config.cache.associativity,
        //     cacheTagLatency: config.cache.tagLatency,
        //     cacheDataLatency: config.cache.dataLatency,
        //     cacheResponseLatency: config.cache.responseLatency,
        //     cacheNumberOfMshrs: config.cache.numberOfMshrs,
        //     cacheTargetsOfMshrs: config.cache.targetsOfMshrs,
        //     prefetcher: config.prefetcher,
        //     replacementPolicy: config.replacementPolicy,
        //     coherencePolicy: config.coherencePolicy,
        // });
        // // set the chart data to the result of the database query
        // console.log(res);
        // setChartData(res.res);
    }

    useEffect(() => {
        // console.log(chartData);
    }, [chartData]);

    const handleDeleteConfig = () => {
        setIsDeleted(true);
    };

    return (
        <SimModDivAnimated className={isDeleted ? "slide-out" : ""}>
            <NumberMarker>#{index + 1}</NumberMarker>
            <TitleInput
                defaultValue={config.name === "" ? `Simulation ${index + 1}` : config.name}
                onChange={(e) => updateConfig("name", e.target.value)}
            />
            <DeleteButton onClick={handleDeleteConfig}>remove</DeleteButton>
            <FlexBox>
                <FlexColumn>
                    <FlexRow>
                        <ChartBar data={chartData ? chartData : {}} />
                    </FlexRow>
                    <FlexColumn>
                        <CEDropdown
                            value={config.cpuType}
                            setValue={(val) => updateConfig("cpuType", val)}
                            options={CEConfig.CpuTypes}
                            title={"CPU Type:"}
                        />
                        <CEDropdown
                            title="Branch Predictor:"
                            value={config.branchPredictor}
                            setValue={(val) => updateConfig("branchPredictor", val)}
                            options={CEConfig.BranchPredictors}
                        />
                        <>Cache</>
                        <CEDiscreteSlider
                            title="Size:"
                            value={config.cache.size}
                            setValue={(val) => updateConfig("cache.size", val)}
                            options={CEConfig.Cache.Size}
                        />
                        <CEDiscreteSlider
                            title="Associativity:"
                            value={config.cache.associativity}
                            setValue={(val) => updateConfig("cache.associativity", val)}
                            options={CEConfig.Cache.Associativity}
                        />
                        <CEDiscreteSlider
                            title="Tag Latency:"
                            value={config.cache.tagLatency}
                            setValue={(val) => updateConfig("cache.tagLatency", val)}
                            options={CEConfig.Cache.Tag_latency}
                        />
                        <CEDiscreteSlider
                            title="Data Latency:"
                            value={config.cache.dataLatency}
                            setValue={(val) => updateConfig("cache.dataLatency", val)}
                            options={CEConfig.Cache.Response_latency}
                        />
                        <CEDiscreteSlider
                            title="Response Latency:"
                            value={config.cache.responseLatency}
                            setValue={(val) => updateConfig("cache.responseLatency", val)}
                            options={CEConfig.Cache.Response_latency}
                        />
                        <CEDiscreteSlider
                            title="Number of MSHRs:"
                            value={config.cache.numberOfMshrs}
                            setValue={(val) => updateConfig("cache.numberOfMshrs", val)}
                            options={CEConfig.Cache.Number_of_MSHRs}
                        />
                        <CEDiscreteSlider
                            title="Targets of MSHRs:"
                            value={config.cache.targetsOfMshrs}
                            setValue={(val) => updateConfig("cache.targetsOfMshrs", val)}
                            options={CEConfig.Cache.Targets_of_MSHRs}
                        />
                        <CEDropdown
                            title="Prefetcher:"
                            value={config.prefetcher}
                            setValue={(val) => updateConfig("prefetcher", val)}
                            options={CEConfig.Prefetchers}
                        />
                        <CEDropdown
                            title="Replacement Policie:"
                            value={config.replacementPolicy}
                            setValue={(val) => updateConfig("replacementPolicy", val)}
                            options={CEConfig.ReplacementPolicies}
                        />
                        <CEDropdown
                            title="Coherence Policie:"
                            value={config.coherencePolicy}
                            setValue={(val) => updateConfig("coherencePolicy", val)}
                            options={CEConfig.CoherencePolicies}
                        />
                    </FlexColumn>
                    <CEButton title={"Update Module"} func={searchForRun} />
                </FlexColumn>
            </FlexBox>
        </SimModDivAnimated>
    );
}
