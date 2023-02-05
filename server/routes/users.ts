import express, { Request, Response } from "express";
const router = express.Router();

const db = require("../config/db");
import User from "@/interfaces/user";

// Get all users
router.get("/get", (req: Request, res: Response) => {
  // Select all rows from users
  db.query("SELECT * FROM users", (err: Error, rows: User[]) => {
    if (err) throw err;

    res.send(rows);
  });
});

// Get recipient by id
router.get("/get/:id", (req: Request, res: Response) => {
  const recipient = req.params.id;
  // Select all rows from users where id = recipient
  db.query("SELECT * FROM users WHERE email = ?", [recipient], (err: Error, rows: User[]) => {
    if (err) throw err;

    res.send(rows);
  });
});

module.exports = router;