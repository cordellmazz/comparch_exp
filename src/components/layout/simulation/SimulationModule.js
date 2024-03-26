// component to be used multiple times inside the simulation page. This component should be composed of a graph element and a collection of sliders/inputs that send a request with their values as a key value dictionary

import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartBar from "../ChartBar.js";
import { useDatabase } from "../../../context/DatabaseProvider.js";
import CEButton from "../../input/CEButton.js";
import CESlider from "../../input/CESlider.js";
import CEDropdown from "../../input/CEDropdown.js";
import FlexBox from "../structure/FlexBox.js";
import FlexColumn from "../structure/FlexColumn.js";
import FlexRow from "../structure/FlexRow.js";
import * as CEConfig from "./CEConfig.js";
import CEDiscreteSlider from "../../input/CEDiscreteSlider.js";

export function SimulationModule({ starting_config }) {
    // Graphical function
    ChartJS.register(ArcElement, Tooltip, Legend);
    const [chartData, setChartData] = useState({});
    const { findByParams, addRun, loaded } = useDatabase();

    // WE HAVE A DEFAULT CONFIG, LETS ALSO START WITH DEFAULT GRAPH DATA SO THERE IS NO DATABASE PING ON LOAD

    // Sim values in one dict
    const [config, setConfig] = useState({
        cpuType: starting_config.cpuType,
        branchPredictor: starting_config.branchPredictor,
        cache: {
            size: starting_config.cache.size,
            associativity: starting_config.cache.associativity,
            tagLatency: starting_config.cache.tagLatency,
            dataLatency: starting_config.cache.dataLatency,
            responseLatency: starting_config.cache.responseLatency,
            numberOfMshrs: starting_config.cache.numberOfMshrs,
            targetsOfMshrs: starting_config.cache.targetsOfMshrs,
        },
        prefetcher: starting_config.prefetcher,
        replacementPolicy: starting_config.replacementPolicy,
        coherencePolicy: starting_config.coherencePolicy,
    });

    // useEffect(() => {
    //     const updateChartData = async () => {
    //         // send a request to database using the values of the sliders as parameters
    //         const result = await findByParams({ ID: "Run1" });
    //         // dummy data for now
    //         // will probably need a clean data function before this
    //         setChartData(result);
    //     };
    //     updateChartData();
    // }, [specifications]);

    useEffect(() => {
        // console.log(chartData);
    }, [chartData]);

    // useeffect to console log the config on change
    useEffect(() => {
        console.log(config);
    }, [config]);

    function removeName(data) {
        let modifiedData = { ...data };
        delete modifiedData.name;
        return modifiedData;
    }

    const updateConfig = (path, value) => {
        setConfig((origConfig) => {
            const updatePath = (obj, keys, val) => {
                const key = keys[0];
                if (keys.length === 1) {
                    return { ...obj, [key]: val };
                } else {
                    return { ...obj, [key]: updatePath(obj[key], keys.slice(1), val) };
                }
            };

            const keys = path.split(".");
            return updatePath(origConfig, keys, value);
        });
    };

    const [sliderValue, setSliderValue] = useState(0);

    // func that console logs text
    // we can query with nested dicts set to specific values but the query has to look like this:
    // https://stackoverflow.com/questions/45138086/mongodb-finding-entries-using-a-nested-dictionary
    function searchForRun() {
        console.log("Searching for run with the following parameters:");
        console.log(config);

        const res = findByParams({
            cpuType: config.cpuType,
            branchPredictor: config.branchPredictor,
            cacheSize: config.cache.size,
            cacheAssociativity: config.cache.associativity,
            cacheTagLatency: config.cache.tagLatency,
            cacheDataLatency: config.cache.dataLatency,
            cacheResponseLatency: config.cache.responseLatency,
            cacheNumberOfMshrs: config.cache.numberOfMshrs,
            cacheTargetsOfMshrs: config.cache.targetsOfMshrs,
            prefetcher: config.prefetcher,
            replacementPolicy: config.replacementPolicy,
            coherencePolicy: config.coherencePolicy,
        });
        // set the chart data to the result of the database query
        console.log(res);
        // setChartData(res.res);
    }

    // return a mapped output for appropriate input types (CEDropdown, CESlider, etc.) using the CEConfig.js file
    // button at bottom which will send a request to the database with the current values of the sliders
    return (
        <FlexBox style={{ width: "50vw" }}>
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
    );
}
