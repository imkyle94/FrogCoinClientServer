const { default: axios } = require("axios");
const express = require("express");

const router = express.Router();

const DB_baseUrl = 'http://3.36.113.124:8080'

router.route('/').get(async(req,res,next) => {
  try {
    const result = await axios.get(DB_baseUrl+'/users')
    console.log(result.data);
    res.send(result.data)
  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;