import { Chart, registerables } from "chart.js";
import React, { useEffect } from "react";
import "chartjs-adapter-moment";
import { chartCofig1} from "../ChartConfig/chartConifgs";
import zoomPlugin from 'chartjs-plugin-zoom';

// Registration chart format
Chart.register(...registerables);
Chart.register(zoomPlugin);

const StaticChart = ({ coinInfo, chartData, bitcoinChart }) => {
	useEffect(() => {
		const ctx = document.getElementById("staticChart");
		const staticChart = new Chart(ctx, {
			type: 'line',
			data: {
				datasets: [
					{
						label: `${coinInfo.name}`,
						data: chartData,
						backgroundColor: "green",
						borderColor: "green",
						pointRadius: 0,
					},
					{
						label: `Bitcoin`,
						data: bitcoinChart,
						backgroundColor: "red",
						borderColor: "red",
						pointRadius: 0,
						hidden: true,
					},
				],
			},
			options: {
				plugins:{
					zoom:{
						
					}
				}
			},
			...chartCofig1,
		});
		return () => {
			// unmount될 때 canvas 삭제
			staticChart.destroy();
		};
	}, [coinInfo, chartData, bitcoinChart]);

	const renderPrice = () => {
		if (coinInfo) {
			return (
				<>
					<p className="my-0">$ {coinInfo.current_price}</p>
					<p
						className={
							coinInfo.price_change_24 < 0
								? "text-danger my-0"
								: "text-success my-0"
						}
					>
						{coinInfo.price_change_percentage_24h}%
					</p>
				</>
			);
		}
	};

	return (
		<div className="bg-white border mt-2 rounded p-3">
			<div>{renderPrice()}</div>
			<div>
				<canvas id="staticChart" width={250} height={250}></canvas>
			</div>
		</div>
	);
};



export default StaticChart;
