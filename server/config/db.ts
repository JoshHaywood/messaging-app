import mysql from "mysql";

//Database setup
const db = mysql.createConnection({
  //Remote
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT as unknown as number,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = db;