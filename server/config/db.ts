import mysql from "mysql";

//Database setup
const db = mysql.createConnection({
  //Remote
  host: "eu-cdbr-west-03.cleardb.net",
  user: "bcec77d8e13a20",
  port: 3306,
  password: "ef521053",
  database: "heroku_c1e8ec3bb372891",
});

module.exports = db;