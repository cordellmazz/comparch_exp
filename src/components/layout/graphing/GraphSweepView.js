// This is the graph for a default simMod in which the performance metrics for a single specific run are displayed
import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import styled from "styled-components";
import { useDatabase } from "../../../context/DatabaseProvider";

const GraphSweepViewContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 5%;
`;

function GraphSweepView({ config = null, updateConfig, selectedMetrics, sweepParameter, dbData }) {
    // canvas specifc values
    const canvasRef = useRef(null);
    const chartInstanceRef = useRef(null);

    // visual / animations
    const [graphLoading, setGraphLoading] = useState(false);

    // build datasets function
    function buildDatasets() {
        // for each metric in selectedMetrics, build a dataset using the data from the data dict
        const datasets = selectedMetrics.map((metric) => {
            return {
                label: metric,
                data: Object.values(dbData).map((run) => run[metric]),
            };
        });
        return datasets;
    }

    useEffect(() => {
        console.log("dbData", dbData);
        // update objects within config
        if (dbData) {
            updateConfig("db_data", dbData);
        }
        if (selectedMetrics) {
            updateConfig("selected_metrics", selectedMetrics);
        }

        // react re rendering can cause problms with chartjs
        // so we destroy the doc if it exists and replace it with a new one
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        if (dbData) {
            // Initialize the chart using the canvas ref
            chartInstanceRef.current = new Chart(canvasRef.current, {
                type: "line",
                data: {
                    labels: Object.values(dbData).map((run) => run[sweepParameter]),
                    datasets: buildDatasets(),
                },
                options: {
                    responsive: true,
                    interaction: {
                        mode: "index",
                        intersect: false,
                    },
                    scales: {
                        // y: {
                        //     beginAtZero: true,
                        //     title: {
                        //         display: true,
                        //         text: , // Y-axis label
                        //         // color: "#911", // Optional: color of label
                        //         // font: {
                        //         //     family: "Comic Sans MS", // Optional: font
                        //         //     size: 20, // Optional: size in px
                        //         //     weight: "bold", // Optional: font weight
                        //         //     lineHeight: 1.2, // Optional: line height
                        //         // },
                        //     },
                        // },
                        x: {
                            title: {
                                display: true,
                                text: sweepParameter, // X-axis label
                                // color: "#911", // Optional: color of label
                                // font: {
                                //     family: "Comic Sans MS", // Optional: font
                                //     size: 20, // Optional: size in px
                                //     weight: "bold", // Optional: font weight
                                //     lineHeight: 1.2, // Optional: line height
                                // },
                            },
                        },
                    },
                },
                // options: {
                //     scales: {
                //         myScale: {
                //             type: "logarithmic",
                //             position: "right", // `axis` is determined by the position as `'y'`
                //         },
                //     },
                // },
            });
        }

        // Cleanup function to destroy the chart instance
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [dbData, selectedMetrics]);

    return (
        <GraphSweepViewContainer>
            <canvas ref={canvasRef} />
        </GraphSweepViewContainer>
    );
}

export default GraphSweepView;
