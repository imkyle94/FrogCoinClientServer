import axios from "axios";
import React, { useEffect, useState } from "react";
import StaticChart from "./StaticChart";

const CoinDetail = ({coinId}) => {
	const [chartData, setChartData] = useState([]);
	const [coinInfo, setCoinInfo] = useState([]);
	const [bitcoinChart, setBitcoinChart] = useState([]);
	const [timeFormat, setTimeFormat] = useState(1);
	
	const xyFormat = (array) => {
		return array.map((el) => ({
			x: el[0],
			y: el[1],
		}));
	};
	
	// 서버에 데이터 요청
	const fetchData = async () => {
		const baseUrl = 'http://frogcoin.fun25.co.kr:80'
		const result = await Promise.all([
			axios.request({
				method: 'GET',
				baseURL: baseUrl,
				url: `/coingecko/chart/${coinId}/${timeFormat}`,
			}),
			
			axios.request({
				method: 'GET',
				baseURL: baseUrl,
				url: `/coingecko/chart/bitcoin/${timeFormat}`,
			}),
			
			axios.request({
				method: 'GET',
				baseURL: baseUrl,
				url: `/coingecko/coinlist/${coinId}`,
			}),
		]);
		setChartData(xyFormat(result[0].data.prices));
		setBitcoinChart(xyFormat(result[1].data.prices));
		setCoinInfo(result[2].data[0]);
	};
	useEffect(() => {
		fetchData();
	}, [timeFormat]);


	return (
		<>
			
			<div className="chart-buttons mt-1">
				<Buttons setTimeFormat={setTimeFormat}/>
			</div>
			<div><StaticChart coinInfo = {coinInfo} chartData ={chartData} bitcoinChart={bitcoinChart}  /></div>
		</>
	);
};

function Buttons({ setTimeFormat }) {
	const timeFormatList = ["24h", "7d", "14d", "30d", "90d", "180d", "1y"];
	const days = [1, 7, 14, 30, 90, 180, 365];
	return	(
		timeFormatList.map((timeFormat,index) => (
			<button
				key={index}
				onClick={() => setTimeFormat(days[index])}
				className="btn btn-outline-secondary btn-sm mx-1"
			>
				{timeFormat}
			</button>
		))
	)
}



export default CoinDetail;
