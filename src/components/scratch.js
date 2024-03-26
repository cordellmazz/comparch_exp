// simple react file that shows an example of chartjs
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartBar from "../layout/ChartBar.js";
import { useDatabase } from "../../context/DatabaseProvider.js";
import FlexBox from "../layout/structure/FlexBox.js";
import FlexColumn from "../layout/structure/FlexColumn.js";
import Navigation from "../layout/Navigation.js";
import CESlider from "../input/CESlider.js";
import SimModTest from "../layout/simulation/SimModTest.js";
import * as CEConfig from "../layout/simulation/CEConfig.js";

function PageChartExample() {
    const [chartData, setChartData] = useState({});
    const { findByParams } = useDatabase();
    const [specifications, setSpecifications] = useState({});

    ChartJS.register(ArcElement, Tooltip, Legend);

    useEffect(() => {
        const updateChartData = async () => {
            // const result = await findByParams({ ID: "Run1" });
            // dummy data for now
            const result = {
                some_value: 1,
                another_value: 2,
                third_value: 3,
            };
            setChartData(result);
        };
        updateChartData();
    }, [specifications]);

    useEffect(() => {
        console.log(chartData);
    }, [chartData]);

    function removeName(data) {
        let modifiedData = { ...data };
        delete modifiedData.name;
        return modifiedData;
    }

    const [sliderValue, setSliderValue] = useState(0);

    return (
        <FlexBox>
            <Navigation />
            <FlexColumn>
                <ChartBar data={chartData ? chartData : {}} />
            </FlexColumn>
            <FlexColumn>
                <CESlider
                    width={200}
                    value={sliderValue}
                    setValue={setSliderValue}
                />
            </FlexColumn>
        </FlexBox>
    );
}

export default PageChartExample;
