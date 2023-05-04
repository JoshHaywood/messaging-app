import express, { Request, Response } from "express";
const router = express.Router();

const db = require("../config/db");
import User from "@/interfaces/user";

// Update about section
router.put("/about", (req: Request, res: Response) => {
  const { about } = req.body;
  const updateAbout = "UPDATE users SET about = ? WHERE user_name = ?"; // Updates about section

  db.query(updateAbout, [about, req.session.userName], (err: Error, rows: User[]) => {
    if (err) throw err;

    req.session.about = about; // Update session
    res.send(about);
  });
});

module.exports = router;