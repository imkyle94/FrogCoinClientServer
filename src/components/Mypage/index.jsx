import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import Details from "./Details";
import Total from "./Total";

/* 컴포넌트에서 사용하는 함수들 */
function sorting(arr, key) {
	arr.sort((a, b) => {
		if (typeof a[key] == "string") {
			let A = a[key].toUpperCase();
			let B = b[key].toUpperCase();
			return A.localeCompare(B);
		} else {
			let A = a[key];
			let B = b[key];
			return A - B;
		}
	});
}

function removeDuplicates(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (i < arr.length - 1) {
			if (arr[i].currency === arr[i + 1].currency) {
				arr[i].balance = Number(arr[i].balance) + Number(arr[i + 1].balance);
				arr.splice(i + 1, 1);
				i -= 1;
			} else arr[i].balance = Number(arr[i].balance);
		}
	}
}

function getDetails(arr) {
	let currencyList = [];
	let balanceList = [];
	let length = arr.length;
	arr.forEach((el) => {
		currencyList = [...currencyList, el.currency];
		balanceList = [...balanceList, el.balance];
	});
	return { currencyList, balanceList, length };
}
const baseUrl = "http://13.125.255.188:5000";

/* 마이페이지 */
const Mypage = () => {
	const [tab, setTab] = useState("Total");
	const [assets, setAssets] = useState([]);
	const [totalAssets, setTotalAssets] = useState([]);
	const [content, setContent] = useState(true);

	const [upbitData, setUpbitData] = useState([]);
	const [binanceData, setBinanceData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [inputMode, setInputMode] = useState(false);
	const [addMode, setAddMode] = useState(false);

	useEffect(async () => {
		setLoading(true);
		if(!inputMode && !addMode){		// 수정 및 추가 요청이 있을 때에만 data refresh
			const upbitData_temp = await axios.request({
				method: "GET",
				baseURL: baseUrl,
				url: "upbit/account",
			});
			const binanceData_temp = await axios.request({
				method: "GET",
				baseURL: baseUrl,
				url: "binance/account",
			});

			// 기존 state 값과 다른 경우에만 state 값 변경
			if (upbitData !== upbitData_temp) {
				setUpbitData(upbitData_temp.data);
			} 
			if (binanceData !== binanceData_temp) {
				setBinanceData(binanceData_temp.data);
			}
		}
		
		return setLoading(false);
	}, [inputMode, addMode]);

	useEffect(() => {
		if(upbitData && binanceData) {
			let upbitAssets = [...upbitData];
			let binanceAssets = [...binanceData];
			let totalData = [...upbitAssets, ...binanceAssets];
			let data = [];
			switch (tab) {
				case "Total":
					data = [...totalData];
					break;
				case "Upbit":
					data = [...upbitAssets];
					break;
				case "Binance":
					data = [...binanceAssets];
					break;
				default:
					data = [...totalData];
					break;
			}
			sorting(data, "currency");
			// removeDuplicates(data);
			setAssets(data);
			sorting(totalData, "exchange");
			setTotalAssets(totalData);
		}
	}, [upbitData, binanceData, tab]);

	const handleTabClick = (e) => {
		setTab(e.target.innerText);
	};
	const handleDetailClick = () => {
		setContent(!content);
	};

	return (
		<div className="Mypage-Container">
			<Button
				className="mb-4"
				onClick={handleDetailClick}
				variant={content ? "danger" : "primary"}
			>
				{content ? "자세히" : "차트보기"}
			</Button>
			{content ? (
				<Total loading={loading} assets={totalAssets} />
			) : (
				<Details
					handleTabClick={handleTabClick}
					loading={loading}
					assets={assets}
					inputMode={inputMode}
					setInputMode={setInputMode}
					setAddMode={setAddMode}
				/>
			)}
		</div>
	);
};

export default Mypage;
