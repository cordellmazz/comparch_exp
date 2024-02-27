// simple react file that shows an example of chartjs
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartBar from "../layout/ChartBar.js";
import { useDatabase } from "../../context/DatabaseProvider.js";
import Slider from "../input/Slider.js";
import FlexBox from "../layout/structure/FlexBox.js";
import FlexColumn from "../layout/structure/FlexColumn.js";
import Navigation from "../layout/Navigation.js";

function PageChartExample() {
    const [chartData, setChartData] = useState({});
    const { findByParams } = useDatabase();
    const [specifications, setSpecifications] = useState({});

    ChartJS.register(ArcElement, Tooltip, Legend);

    // async updateData() function
    useEffect(() => {
        const updateChartData = async () => {
            const result = await findByParams({ ID: "Run1" });
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
                <Slider
                    width={200}
                    value={sliderValue}
                    setValue={setSliderValue}
                />
            </FlexColumn>
        </FlexBox>
    );
}

export default PageChartExample;
