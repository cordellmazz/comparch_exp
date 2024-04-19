import React, { useEffect, useRef } from "react";
import { Chart, Interaction, registerables } from "chart.js";
import styled from "styled-components";

Chart.register(...registerables);

const GraphSweepViewContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 5%;
`;

const defaultMetricsToDisplay = [
    "L1doverallHits",
    "L1doverallMisses",
    "L1doverallAccesses",
    "ctrl0readReqs",
    "ctrl0writeReqs",
];

function GraphDefaultView({ config = null, updateConfig, dbData }) {
    const canvasRef = useRef(null);
    const chartInstanceRef = useRef(null);

    // This function constructs the dataset needed for the radar chart
    const buildDatasets = () => {
        let labels = defaultMetricsToDisplay;
        let data = [];

        console.log("dbData", dbData);

        labels.forEach((metric) => {
            console.log("metric", '"' + metric + '"');
            if (dbData[0] && metric in dbData[0]) {
                data.push(dbData[0][metric]);
            } else {
                data.push(0); // default to 0 if not available
            }
        });

        return [
            {
                label: dbData.name || "Simulation Data",
                data: data,
            },
        ];
    };

    useEffect(() => {
        if (!dbData) return;

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(canvasRef.current, {
            type: "radar",
            data: {
                labels: defaultMetricsToDisplay,
                datasets: buildDatasets(),
            },
            options: {
                elements: {
                    line: {
                        borderWidth: 3,
                    },
                },
                responsive: true,
                interaction: {
                    mode: "index",
                    intersect: false,
                },
            },
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [dbData]); // Rerender chart only when dbData changes

    return (
        <GraphSweepViewContainer>
            <canvas ref={canvasRef}></canvas>
        </GraphSweepViewContainer>
    );
}

export default GraphDefaultView;
