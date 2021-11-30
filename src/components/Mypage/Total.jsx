import React, { useEffect, useState } from "react";
import TotalChart from "./TotalChart";

const Total = ({ loading = true, assets }) => {
	const [buyPrice, setBuyPrice] = useState(0);
	const [totalAsset, setTotalAsset] = useState(0);
	const [profit, setProfit] = useState(0);
	const [profitRate, setProfitRate] = useState(0);

  const getTotalInfos = () => {
    let totalAsset_temp = 0;
    let buyPrice_temp = 0;
    let profit_temp = 0;
    let profitRate_temp = 0;
    assets.forEach(el => {
      totalAsset_temp +=  Number(el.balance) * Number(el.price);
      buyPrice_temp += Number(el.balance) * Number(el.avg_buy_price);
    })
    profit_temp = totalAsset_temp-buyPrice_temp ;
    profitRate_temp = profit_temp/buyPrice_temp*100
    setTotalAsset(Math.floor(totalAsset_temp));
    setBuyPrice(Math.floor(buyPrice_temp));
    setProfit(Math.floor(profit_temp));
    setProfitRate(Number(profitRate_temp.toFixed(2)));
  }
  
  useEffect(() => {
    getTotalInfos();
	}, [assets]);

	return (
    <div>
      <TotalChart assets={assets}/>
      <table className="table coinlist-table table-striped table-hover text-center mt-4">
        <thead className="text-light bg-success ">
          <tr>
            <th>
              <span>평가 금액</span>
            </th>
            <th>
              <span>매수 금액</span>
            </th>
            <th>
              <span>평가 수익</span>
            </th>
            <th>
              <span>수익률</span>
            </th>
          </tr>
        </thead>
        <tbody className="table-dark">
          {loading ? (
            <tr>
              <td colSpan={4}>
                <h1 className="text-center">Loading...</h1>
              </td>
            </tr>
          ) : (
            <tr>
              <td>
                <span>{totalAsset.toLocaleString()} 원</span>
              </td>
              <td>
                <span>{buyPrice.toLocaleString()} 원</span>
              </td>
              <td>
                <span>{profit.toLocaleString()} 원</span>
              </td>
              <td>
                <span>{profitRate.toLocaleString()} %</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
	);
};

export default Total;
