import express, { Request, Response } from "express";
const router = express.Router();

const db = require("../config/db");
import User from "@/interfaces/user";
import Message from "@/interfaces/message";

// Store message in database
router.post("/store", (req: Request, res: Response) => {
  const { sender, recipient, message, time } = req.body;
  const insertRow = "INSERT INTO messages (sender, recipient, message, time) VALUES(?, ?, ?, ?)"; // Inserts new row

  // Insert new row
  db.query(insertRow, [sender, recipient, message, time], (err: Error, rows: User[]) => {
      if (err) throw err;
      
      res.send("Message stored");
    }
  );
});

router.get("/get", (req: Request, res: Response) => {
  const { sender, recipient } = req.query;
  const getSentMessages = "SELECT * FROM messages WHERE sender = ? AND recipient = ?"; // Gets all sent messages
  const getRecipientsMessages = "SELECT * FROM messages WHERE recipient = ? AND sender = ?"; // Gets all received messages

  // Get messages
  db.query(getSentMessages, [sender, recipient], (err: Error, sentRows: Message[]) => {
    if (err) throw err;
    db.query(getRecipientsMessages, [sender, recipient], (err: Error, recievedRows: Message[]) => {
      if (err) throw err;

      const rows = sentRows.concat(recievedRows);
      res.send(rows);
    });
  });
});

module.exports = router;