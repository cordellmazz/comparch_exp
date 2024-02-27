import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import styled from "styled-components";

// styled div to make chart bar take up the full width and height of the container with a slight internal padding (5%) on all sides
const ChartBarContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 5%;
`;

function ChartBar({ data = null }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current !== null) {
            // react re rendering can cause problms with chartjs
            // so we destroy the doc if it exists and replace it with a new one
            chartRef.current.destroy();
        }

        const chartDoc = document.getElementById("chartBar");
        if (chartDoc) {
            // dynamically pull in the key-value pairs from the data dictionary
            const labels = Object.keys(data);
            const values = Object.values(data);

            chartRef.current = new Chart(chartDoc, {
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
        }

        return () => {
            if (chartRef.current !== null) {
                chartRef.current.destroy();
            }
        };
    }, [data]);

    return (
        <ChartBarContainer>
            <canvas id="chartBar" />
        </ChartBarContainer>
    );
}

export default ChartBar;
