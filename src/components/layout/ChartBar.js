import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import styled from "styled-components";

const ChartBarContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 5%;
`;

function ChartBar({ data = null }) {
    const canvasRef = useRef(null); // Ref for the canvas element
    const chartInstanceRef = useRef(null); // Ref to store the chart instance

    useEffect(() => {
        // react re rendering can cause problms with chartjs
        // so we destroy the doc if it exists and replace it with a new one
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // dynamically pull in the key-value pairs from the data dictionary
        const labels = Object.keys(data);
        const values = Object.values(data);

        // Initialize the chart using the canvas ref
        chartInstanceRef.current = new Chart(canvasRef.current, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Data Values",
                        data: values,
                        backgroundColor: "rgba(191, 87, 0, 1)",
                    },
                ],
            },
        });

        // Cleanup function to destroy the chart instance
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [data]);

    return (
        <ChartBarContainer>
            <canvas ref={canvasRef} /> {/* Use ref instead of id */}
        </ChartBarContainer>
    );
}

export default ChartBar;
