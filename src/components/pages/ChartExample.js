// simple react file that shows an example of chartjs
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartBar from '../layout/ChartBar.js';

function PageChartExample() {
	const [chartData, setChartData] = useState({});

	ChartJS.register(ArcElement, Tooltip, Legend);

	useEffect(() => {
		
	}, []);

	function removeName(data) {
		let modifiedData = { ...data };
		delete modifiedData.name;
		return modifiedData;
	}

	return (
		<div>
			<ChartBar data={removeName(chartData)} />
		</div>
	);
}

export default PageChartExample;
