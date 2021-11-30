import React, { useEffect, useState } from "react";
import { Col, FormControl, InputGroup } from "react-bootstrap";
import { upbit} from "../../../apis/configs";
import Coin from "./Coin";
import axios from 'axios';

const CoinList = () => {
	const [coins, setCoins] = useState([]);
	const [coinsDisplay, setCoinsDisplay] = useState([]);
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		setLoading(true);
	}, [])
	
	const fetchData = async () => {
		// 업비트 코인 리스트 불러오기
		// const response = await upbit.get('/market/all')
		const response = await axios.get('http://13.125.255.188:5000' + '/upbit/market/all')
		// BTC 마켓 제외하고 찾기
		const coinList = response.data.filter((el)=>el.market.includes('KRW'))
		const markets = coinList.map((el) => el.market).toString();
		
		// 업비트 가격 데이터 불러오기
		// const tickerData = await upbit.get('ticker', {
		// 	params: {
		// 		markets : markets
		// 	}
		// })
		const tickerData = await axios.post('http://13.125.255.188:5000' + '/upbit/ticker', {
				markets : markets
		})

		// 불러온 두 데이터 합치기
		const mergedData = coinList.map((el, index)=>{
			return {...el, ...tickerData.data[index]}
		})
		
		setCoins(mergedData);
		setCoinsDisplay(mergedData.slice(0, 10));
	};

	
	useEffect(() => {
		if(!loading){
			fetchData();
		}
		return setLoading(false)
	}, []);

	const handleOnChange = () => (e) => {
		let searchedCoins = [];
		coins.forEach((coin) => {
			if (
				coin.english_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
				coin.korean_name.includes(e.target.value) ||
        coin.market.slice(4,).includes(e.target.value.toUpperCase())
			) {
				searchedCoins = [...searchedCoins, coin];
			}
		});
		setCoinsDisplay(searchedCoins.slice(0, 10));
	};

	return (
		<>
			<Col md={4} className="my-3 input-box">
				<InputGroup>
					<FormControl placeholder="Insert Coin name" onChange={handleOnChange()} />
				</InputGroup>
			</Col>
			<table className="table coinlist-table table-striped table-hover text-center">
				<thead className="text-light bg-primary">
					<tr>
						<th>
							<span>#</span>
						</th>
						<th>
							<span>한글명</span>
						</th>
						<th>
							<span>현재가</span>
						</th>
						<th>
							<span>전일대비(%)</span>
						</th>
						<th>
							<span>거래대금(원)</span>
						</th>
					</tr>
				</thead>
				<tbody className="table-dark">
					{loading && <tr><td colSpan={6}><h1 className="text-center">Loading...</h1></td></tr>}
					{coinsDisplay.map((coin, index) => (
						<Coin key={index} coin={coin} index={index + 1} />
					))}
				</tbody>
			</table>
		</>
	);
};




export default CoinList;
