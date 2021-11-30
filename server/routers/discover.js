const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const options = {
      method: "GET",
      url: "https://twelve-data1.p.rapidapi.com/etf",
      params: {
        exchange: 'Euronext', format: 'json'
      },
      headers: {
        'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
        'x-rapidapi-key': '19c6113a50msh1b0382cd6119651p166336jsn2094dddfaf2b'
      }
    };

    const news = await axios(options);

    console.log(news.data);
    res.send("됐따 뉴스");
  } catch {
    console.log("에러");
  }
});
module.exports = router;

