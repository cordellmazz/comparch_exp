// simple react file that shows an example of chartjs
import React, { useState, useEffect } from "react";
import { useDatabase } from "../../context/DatabaseProvider.js";
import FlexBox from "../layout/structure/FlexBox.js";
import Navigation from "../layout/Navigation.js";
import SimModContainer from "../layout/simulation/SimModContainer.js";
import RecursiveStructure from "../input/ConfigInput.js";

function PageChartExample() {
    const [chartData, setChartData] = useState({});
    const { findByParams } = useDatabase();
    // const [specifications, setSpecifications] = useState({});

    // useEffect(() => {
    //     const updateChartData = async () => {
    //         // const result = await findByParams({ ID: "Run1" });
    //         // dummy data for now
    //         const result = {
    //             some_value: 1,
    //             another_value: 2,
    //             third_value: 3,
    //         };
    //         setChartData(result);
    //     };
    //     updateChartData();
    // }, [specifications]);

    useEffect(() => {
        // console.log(chartData);
    }, [chartData]);

    function removeName(data) {
        let modifiedData = { ...data };
        delete modifiedData.name;
        return modifiedData;
    }

    const [sliderValue, setSliderValue] = useState(0);

    // return (
    //     <FlexBox>
    //         <Navigation />
    //         <FlexColumn>
    //             <ChartBar data={chartData ? chartData : {}} />
    //         </FlexColumn>
    //         <FlexColumn>
    //             <CESlider
    //                 width={200}
    //                 value={sliderValue}
    //                 setValue={setSliderValue}
    //             />
    //         </FlexColumn>
    //     </FlexBox>
    // );

    return (
        <FlexBox>
            <Navigation />
            {/* Eventually there will be a dynamic number of SimMods */}
            {/* <SimulationModule config={CEConfig.DefaultConfig} /> */}
            <SimModContainer />
        </FlexBox>
    );
}

export default PageChartExample;
