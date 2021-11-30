const express = require("express");
const axios = require("axios");
const router = express.Router();

const coingeckoUrl = "https://api.coingecko.com/api/v3";

router.route("/coinlist/").get(async (req, res, next) => {
  try {
    const result = await axios.request({
      method: "GET",
      baseURL: coingeckoUrl,
      url: `/coins/markets/`,
      params: {
        vs_currency: "usd",
        per_page:250,
        
      },
    });
    const data = result.data;
    // 데이터 클라이언트에 보냄!!
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.route("/coinlist/:id").get(async (req, res, next) => {
  try {
    const result = await axios.request({
      method: "GET",
      baseURL: coingeckoUrl,
      url: `/coins/markets/`,
      params: {
        vs_currency: "usd",
        ids: req.params.id,
      },
    });
    const data = result.data;
    // 데이터 클라이언트에 보냄!!
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.route("/chart/:id/:days").get(async (req, res, next) => {
  try {
    const result = await axios.request({
      method: "GET",
      baseURL: coingeckoUrl,
      url: `/coins/${req.params.id}/market_chart`,
      params: {
        vs_currency: "usd",
        days: req.params.days,
      },
    });
    res.send(result.data);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/price').post(async(req,res,next) => {
  try {
    const {data} = await axios.request({
      method: "GET",
      baseURL: coingeckoUrl,
      url: `/simple/price`,
      params: {
        vs_currencies : 'krw,usd',
        ids: req.body.ids.toString(),
      },
    });
    res.send(data)
  } catch (err) {
    console.error(err);
    next(err);
  }
})

// router.route('/ticker').post(async(req,res,next) => {
//   try {
//     const {data} = await axios.request({
//       method: "GET",
//       baseURL: coingeckoUrl,
//       url: `/`,
//       params: {
//         
//       },
//     });
//     console.log(data);
//     res.send(data)
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// })



module.exports = router;
