// Modules
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

// Env Settings
const app = express();
const port = 8011;

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cors());
const production = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
};

const corsOpt = function (req, callbank) {
  callbank(null, { origin: true });
};
app.options("*", cors(corsOpt), (req, res) => {
  res.setHeader("access-control-allow-credentials", "true");
  res.statusCode = 200;
});

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

app.post("/write", (request, response) => {
  const req = request.body;
  const query = "INSERT INTO comments SET ?";
  const params = {
    post_num: null,
    team_name: req.name,
    title: "",
    contents: req.contents,
  };
  connection.query(query, params, (err, result, fields) => {
    if (err) throw err;
    response.json({ saved: result.affectedRows, inserted_id: result.insertId });
  });
});

app.post("/write-comment", (request, response) => {
  const req = request.body;
  const query = "INSERT INTO comment_in_comment SET ?";
  const params = {
    id: null,
    contents: req.contents,
    comment_id: req.id,
    nickname: req.nickname,
  };
  connection.query(query, params, (err, result, fields) => {
    if (err) throw err;
    response.json({ saved: result.affectedRows, inserted_id: result.insertId });
  });
});

app.get("/list-comment", (request, response) => {
  const req = request.query;
  const params = {
    comment_id: req.id,
  };
  connection.query(
    "SELECT * FROM comment_in_comment WHERE ?",
    params,
    (err, rows) => {
      if (err) throw err;
      response.json({ data: rows });
    }
  );
});

app.get("/list", (request, response) => {
  const req = request.query;
  req.pages = parseInt(req.pages);
  if (isNaN(req.pages)) req.pages = 1;
  if (req.pages <= 1) req.pages = 1;

  let current_page = req.pages * 8;
  current_page = current_page - 8;
  const start = req.pages == undefined ? 0 : current_page;
  connection.query(
    "SELECT * FROM comments ORDER BY `post_num` DESC LIMIT " + start + ", 8",
    (err, rows) => {
      if (err) throw err;
      response.json({ data: rows });
    }
  );
});

//run the application
app.listen(port, () => {
  console.log(`running at port ${port}`);
});
