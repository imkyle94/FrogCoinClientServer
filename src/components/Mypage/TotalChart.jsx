import React, { useEffect, useState } from 'react'
import { Chart, registerables } from "chart.js";
import { colorArray } from './colors';
import { exchanges } from 'ccxt';
Chart.register(...registerables);

function getDetails (arr) {
  let currencies = [];
  let balances = [];
  let prices = [];
  let exchanges = [];
  let length = arr.length;
  arr.forEach(el => {
    currencies = [...currencies, el.currency.toUpperCase()]
    balances = [...balances, el.balance]
    prices = [...prices, el.price]
    exchanges = [...exchanges, el.exchanges]
  })
  return {currencies, balances, prices, exchanges, length}
}

const TotalChart = ({assets}) => {
  const [amountsPrices, setAmountPrices] = useState([]);
  const [assetDetails, setAssetDetails] = useState({});
  
  useEffect(()=>{
    if(assets){
      let temp =[]
      let assetDetails = getDetails(assets)
      for (let i = 0; i < assetDetails.balances.length; i++) {
        temp = [...temp, assetDetails.balances[i] * assetDetails.prices[i]];
      }
      setAssetDetails(assetDetails)
      setAmountPrices(temp)
    }
  }, [assets])

  useEffect(()=>{
    const data = {
      labels: assetDetails.currencies,
      datasets: [
        {
          label: 'Dataset 1',
          data: amountsPrices,
          backgroundColor: colorArray,
        }
      ]
    };
    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '보유 자산 포트폴리오(평가 금액)'
          }
        }
      },
    };
    const ctx = document.getElementById("pieChart");
    const pieChart = new Chart(ctx, config);
    return () => {
      pieChart.destroy();
    }
  }, [assetDetails])
  return (
    <div>
      <canvas id="pieChart" height={500}/>
    </div>
  )
}

export default TotalChart
