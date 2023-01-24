import express, { Request, Response } from "express";
const router = express.Router();

const db = require("../config/db");

interface User {
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  salt: string;
  profile_picture: string;
};

// Get all users
router.get("/get", (req: Request, res: Response) => {
  // Select all rows from users
  db.query("SELECT * FROM users", (err: Error, rows: User[]) => {
    if (err) throw err;

    res.send(rows);
  });
});

module.exports = router;