import express, { Request, Response } from "express";
const router = express.Router();

const db = require("../config/db");
import Contact from "@/interfaces/contact";

declare module "express-session" {
  interface SessionData {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    about: string;
  }
}

// Request contact
router.post("/request", (req: Request, res: Response) => {
  const sender = req.session.userName;
  const recipient = req.body.recipient;
  const insertRow = `INSERT INTO contacts (sender, recipient, status) VALUES ('${sender}', '${recipient}', 'pending')`;

  db.query(insertRow, (err: Error, rows: Contact[]) => {
    if (err) throw err;

    console.log("Contact created");
    res.send("Contact created");
  });
});

module.exports = router;
