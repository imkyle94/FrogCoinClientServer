const express = require("express");
const path = require("path");
const axios = require("axios");
const uuidv4 = require("uuid/v4");
const router = express.Router();

const sign = require("jsonwebtoken").sign;

// const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
// const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;
const server_url = "https://api.upbit.com/v1";
const dbUrl = "http://3.36.113.124:8080";
const baseUrl = 'http://frogcoin.fun25.co.kr:80';

// const payload = {
// 	access_key: access_key,
// 	nonce: uuidv4(),
// };

// const token = sign(payload, secret_key);

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

router
	.route("/account")
	// API key 정보 불러오기
	.get((req,res,next) => {
		const apiKeys = req.user.api;
		let access_key;
		let secret_key;
		apiKeys.forEach(el => {
			if(el.exchange == 'Upbit'){
				access_key = el.accessKey;
				secret_key = el.secretKey;
			}
		})
		console.log(access_key);
		console.log(secret_key);
		const payload = {
			access_key: access_key,
			nonce: uuidv4(),
		};
			
		const token = sign(payload, secret_key);
		res.locals.token = token;
		next()
	})
  // 내 자산 정보 불러오기
	.get(async (req, res, next) => {
		try {
			console.log("account router");
			const { data } = await axios.get(server_url + "/accounts", {
				headers: {
					Authorization: `Bearer ${res.locals.token}`,
				},
			});
			if (data) {
				// symbol을 coin id로 바꿈
				for (let i = 0; i < data.length; i++) {
					const result = await axios.get(
						dbUrl + `/coins/query/${data[i].currency}`
					);
					if (result.data[0]) {
						data[i].currency = result.data[0].id;
					}
				}
			}

			// DB 자산 확인 및 수기로 입력한 자산도 리스트에 포함시킴
			const result = await axios.post(dbUrl+`/assets/search`, {
				exchange: 'upbit',
				email: req.user.user.email,
			})
			let temp = [...result.data]
			let dbData = []
			temp.forEach(el=>{
				dbData = [...dbData, {
					currency: el.coinId,
					balance: el.amount,
					avg_buy_price: el.buyPrice,
				}]
			})
			let { currencyList } = getDetails(data);
			let assets = [...data];
			dbData.forEach(el => {
				if(!currencyList.includes(el.currency)){
					assets= [...assets, el]
				}
			})
			res.locals.data = assets.slice(1);
			// console.log(temp);
			next();
		} catch (error) {
			console.error(error);
			next(error);
		}
	})
  // 가격 정보 추가
	.get(async (req, res, next) => {
		try {
			let { currencyList } = getDetails(res.locals.data);
			const coingeckoData = await axios.post(
				"http://frogcoin.fun25.co.kr:80/coingecko/price",
				{
					ids: currencyList,
				}
			);
			let priceList = coingeckoData.data;
			let temp = [...res.locals.data];
			temp = temp.map((el) => {
				if (priceList[el.currency.toLowerCase()]) {
					el = {
						...el,
						email: req.user.user.email,
						price: Number(priceList[el.currency.toLowerCase()].krw),
						exchange: 'upbit',
					};
				}
				return el;
			});
			// DB에 있는 assets 체크, 있으면 그 값으로 변경
			const {data} = await axios.post(dbUrl+'/assets/check',{
				data: temp,
			})
			res.send(data);
		} catch (err) {
			console.error(err);
			next(err);
		}
	});

router.route("/market/all").get(async (req, res, next) => {
	try {
		console.log("market router");
		const result = await axios.get(server_url + "/market/all");
		res.send(result.data);
	} catch (error) {
		console.error(error);
		next(error);
	}
});
router.route("/ticker").post(async (req, res, next) => {
	try {
		console.log("ticker router");
		const result = await axios.get(server_url + "/ticker", {
			params: {
				markets: req.body.markets,
			},
		});
		res.send(result.data);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;
