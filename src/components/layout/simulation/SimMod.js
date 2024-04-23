// reduced version of simulation module that relies on SimModContainer to provide the config and setConfig functions
import React, { useState, useEffect } from "react";
import { useDatabase } from "../../../context/DatabaseProvider.js";
import CEButton from "../../input/CEButton.js";
import FlexBox from "../structure/FlexBox.js";
import FlexColumn from "../structure/FlexColumn.js";
import FlexRow from "../structure/FlexRow.js";
import RecursiveStructure from "../../input/ConfigInput.js";
import GraphSweepView from "../graphing/GraphSweepView.js";
import CEDropdown from "../../input/CEDropdown.js";
import ToolTip, { ToolTipWrapper } from "../ToolTip.js";
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
    ReorderArrows,
    ViewTypeSwitcher,
    CopyConfigButton,
    NoteTakingArea,
    PasteConfigButton,
    DuplicateConfigButton,
} from "./SimModDivs.js";
import GraphDefaultView from "../graphing/GraphDefaultView.js";
import { toast } from "react-toastify";
import CELoadingIcon from "../misc/CELoadingIcon.js";

export function SimMod({ config, setConfig, index, deleteConfig, shiftLeft, shiftRight, duplicateConfig }) {
    // component states
    const [isDeleted, setIsDeleted] = useState(false); // for animation
    const [viewType, setViewType] = useState(config.view_type || "default"); // ["default", "sweep"]

    // graph data
    const { findByParams } = useDatabase();
    const [selectedMetrics, setSelectedMetrics] = useState(config.selected_metrics);
    const [sweepParameter, setSweepParameter] = useState(config.sweep_parameter || "l1d_size");
    const [dbData, setDbData] = useState(config.db_data);
    const [metricChoice, setMetricChoice] = useState(CEConfig.DefaultMetricsConfig);

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

    function addMetricToSet() {
        const newSelection = Object.values(CEConfig.findSelected(metricChoice))[0];
        if (!selectedMetrics.includes(newSelection)) {
            setSelectedMetrics([...selectedMetrics, newSelection]);
        } else {
            toast.error("Metric already selected!", { autoClose: 1000 });
        }
    }

    function synchronizeWithConfig(clipConfig) {
        setLocalConfig(clipConfig);
        setViewType(clipConfig.view_type || "default");
        setSweepParameter(clipConfig.sweep_parameter || "l1d_size");
        setSelectedMetrics(clipConfig.selected_metrics || []);
        setDbData(clipConfig.db_data || []);
    }

    const [getSimLoading, setGetSimLoading] = useState(false);
    async function getSimulation() {
        setGetSimLoading(true);
        const inputSelections = CEConfig.findSelected(config.input);
        // filtered selections where its every parameter except the sweep parameter
        let staticParams = inputSelections;
        if (viewType === "sweep") {
            staticParams = Object.fromEntries(
                Object.entries(inputSelections).filter(([key, value]) => key !== sweepParameter)
            );
        }
        const result = await findByParams(staticParams);
        setGetSimLoading(false);
        // if result is empty array then error
        if (result.length === 0) {
            console.error("No results found for given parameters");
            toast.error("No results found for given parameters!");
            return;
        }
        toast("Simulation data retrieved!");
        setDbData(result);
    }
    return (
        <SimModDivAnimated className={isDeleted ? "slide-out" : ""}>
            <NumberMarker>#{index + 1}</NumberMarker>
            <TitleInput
                defaultValue={config.name === "" ? `Simulation ${index + 1}` : config.name}
                onChange={(e) => updateConfig("name", e.target.value)}
            />
            <ReorderArrows shiftLeft={shiftLeft} shiftRight={shiftRight} />
            <DeleteButton
                onClick={() => {
                    setIsDeleted(true);
                }}
            >
                remove
            </DeleteButton>
            <ViewTypeSwitcher viewType={viewType} setViewType={setViewType} updateConfig={updateConfig} />
            <CopyConfigButton config={config} />
            <PasteConfigButton
                synchronizeWithConfig={(clipConfig) => {
                    synchronizeWithConfig(clipConfig);
                }}
            />
            <DuplicateConfigButton config={config} duplicateConfig={duplicateConfig} />
            <FlexBox>
                <RowColSwapContainer>
                    {viewType === "default" ? (
                        <GraphDefaultView config={config} updateConfig={updateConfig} dbData={dbData} />
                    ) : (
                        <GraphSweepView
                            config={config}
                            updateConfig={updateConfig}
                            selectedMetrics={selectedMetrics}
                            sweepParameter={sweepParameter}
                            dbData={dbData}
                        />
                    )}
                    <FlexColumn align={"left"}>
                        {viewType === "default" ? null : (
                            <>
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
                                        <ToolTip
                                            tooltipText={
                                                "Select a metric to sweep over (x axis), value will be ignored below."
                                            }
                                            position="left"
                                        />
                                    </FlexRow>
                                </SweepSelectorContainer>
                            </>
                        )}

                        <RecursiveStructure config={config} updateConfig={updateConfig} prefix={"input"} />
                        {getSimLoading ? <CELoadingIcon /> : <CEButton title={"Get Simulation"} func={getSimulation} />}
                        <NoteTakingArea notes={config.notes} updateConfig={updateConfig} />
                    </FlexColumn>
                </RowColSwapContainer>
            </FlexBox>
        </SimModDivAnimated>
    );
}
