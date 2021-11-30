// Modules
const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');

// Env Settings
const app = express();
const port = 8011;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("X-test", "sdfsdfsdfsdf");
  next();
});

const production = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
};
// MySQL Settings
const connection = mysql.createConnection({
  host: production.host,
  user: production.username,
  password: production.password,
  database: production.database,
});

app.get("/", (req, res) => {
  res.json({ message: "Root page" });
});

app.post("/write", cors(), (request, response) => {
  const req = request.query;
  const query = "INSERT INTO comments SET ?";
  const params = { post_num: null, team_name: req.name, title: req.title, contents:: req.contents };
  connection.query(query, params, (err, result, fields) => {
    if (err) throw err;
    response.json({ saved: result.affectedRows, inserted_id: result.insertId });
  });
});

app.get("/list", (request, response) => {
  connection.query("SELECT * FROM comments", (err, rows) => {
    if (err) throw err;
    response.json({ data: rows });
  });
});

//run the application
app.listen(port, () => {
  console.log(`running at port ${port}`);
});
