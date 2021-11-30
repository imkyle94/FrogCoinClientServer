const express = require("express");
const path = require("path");
const axios = require("axios");

const router = express.Router();

const ApiKey = "33352480e6mshbfd56d7ef279f55p138a5fjsnf6f45d6dabcf";

router.route("/").get(async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../../build/index.html"));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.route("/session").get(async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../../build/index.html"));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/news", async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search",
      params: {
        q: "코인",
        count: "100",
        textDecorations: "false",
        setLang: "ko",
        cc: "KR",
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "x-bingapis-sdk": "true",
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
        "x-rapidapi-key": ApiKey,
      },
    };
    const news = await axios(options);
    res.json(news.data.value);
  } catch (err) {
    console.log(err.data);
  }
});

router.post("/news", async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search",
      params: {
        q: req.body.keyword,
        count: "100",
        textDecorations: "false",
        setLang: "ko",
        cc: "KR",
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "x-bingapis-sdk": "true",
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
        "x-rapidapi-key": ApiKey,
      },
    };
    const news = await axios(options);
    res.json(news.data.value);
  } catch {
    console.log("에러");
  }
});

router.get("/new", async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coins",
      headers: {
        "x-rapidapi-host": "coinranking1.p.rapidapi.com",
        "x-rapidapi-key": ApiKey,
      },
    };
    const news = await axios(options);
    res.json(news.data.data.coins);
  } catch {
    console.log("에러");
  }
});

router.get("/searchNum", (req, res) => {
  const num = req.user.length;
  console.log(req.session);
  console.log(req.user);
  console.log(req.user[0].length);
  res.json(num);
});

module.exports = router;
