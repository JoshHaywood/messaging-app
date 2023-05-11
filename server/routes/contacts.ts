import express, { Request, Response } from "express";
const router = express.Router();

const db = require("../config/db");
import Contact from "@/interfaces/contactTypes";

// Get all users
router.get("/get", (req: Request, res: Response) => {
  // Select all rows from users
  db.query("SELECT * FROM users", (err: Error, rows: Contact[]) => {
    if (err) throw err;

    res.send(rows);
  });
});

module.exports = router;
