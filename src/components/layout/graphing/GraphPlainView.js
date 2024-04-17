// This is the graph for a default simMod in which the performance metrics for a single specific run are displayed
import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import styled from "styled-components";

const GraphPlainViewContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 5%;
`;

function GraphPlainView({ config = null }) {
    // canvas specifc values
    const canvasRef = useRef(null);
    const chartInstanceRef = useRef(null);

    // data processing from config
    const [data, setData] = useState(config.data);

    useEffect(() => {
        // react re rendering can cause problms with chartjs
        // so we destroy the doc if it exists and replace it with a new one
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // dynamically pull in the key-value pairs from the data dictionary
        // const labels = Object.keys(data);
        // const values = Object.values(data);

        // // Initialize the chart using the canvas ref
        // chartInstanceRef.current = new Chart(canvasRef.current, {
        //     type: "bar",
        //     data: {
        //         labels: labels,
        //         datasets: [
        //             {
        //                 label: "Data Values",
        //                 data: values,
        //                 backgroundColor: "rgba(191, 87, 0, 1)",
        //             },
        //         ],
        //     },
        // });

        // Cleanup function to destroy the chart instance
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [data]);

    return (
        <GraphPlainViewContainer>
            <canvas ref={canvasRef} />
        </GraphPlainViewContainer>
    );
}

export default GraphPlainView;
