import axios from "axios";

const serverUrl = 'http://13.125.255.188:5000'

/* Coingecko API */
export const coingecko = axios.create({
	// axios를 이용해서 API의 json 데이터를 불러옴
	// axios.create() : baseURL을 지정함으로써 api를 불러올때마다 주소를 간단하게 적을 수 있음
	baseURL: "https://api.coingecko.com/api/v3",
});

export const coingeckoUrl = "https://api.coingecko.com/api/v3";


/* Upbit API */
export const upbit = axios.create({
	baseURL: "http://api.upbit.com/v1",
});
export const upbitUrl = "http://api.upbit.com/v1";

/* Binance API */
