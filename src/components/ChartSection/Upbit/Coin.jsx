import React from 'react'
import { Link } from 'react-router-dom';

const Coin = ({coin, index}) => {
  const handleOnClick = () => {
		
	}
  return (
		<>
			<tr>
				<th> {index} </th>
				<td>
					<Link to={`/coins/${coin.english_name.toLowerCase()}`} className="text-light text-decoration-none ">
					<span>{coin.korean_name}</span>
					</Link>
				</td>
				<td>
					<span > {coin.trade_price.toLocaleString()} 원</span>
				</td>
				<td>
				<span
						className={
							coin.signed_change_rate < 0
								? "text-danger mx-2 "
								: "text-success mx-2 "
						}
					>
						{" "}
						{coin.signed_change_rate < 0 ? (
							<i className="fas fa-sort-down align-middle mx-1"></i>
						) : (
							<i className="fas fa-sort-up align-middle mx-1"></i>
						)}
						{(coin.signed_change_rate*100).toFixed(2)} %
					</span>
				</td>
				<td
					className={
						coin.price_change_percentage_24h < 0
							? "text-danger mx-2"
							: "text-success mx-2"
					}
				>
					<span > {Math.floor(coin.acc_trade_price_24h/1000000)}백만 </span>
				</td>
			</tr>
		</>
	);
}

export default Coin
