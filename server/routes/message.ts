import express, { Request, Response } from "express";
const router = express.Router();

const db = require("../config/db");
import Message from "@/interfaces/message";

// Store message in database
router.post("/store", (req: Request, res: Response) => {
  const { sender, recipient, message, image, time, date } = req.body;
  const insertRow = "INSERT INTO messages (sender, recipient, message, image, time, date) VALUES(?, ?, ?, ?, ?, ?)"; // Inserts new row

  // Insert new row
  db.query(insertRow, [sender, recipient, message, image, time, date], (err: Error, rows: Message[]) => {
      if (err) throw err;
      
      res.send("Message stored");
    }
  );
});

// Get messages
router.get("/get", (req: Request, res: Response) => {
  const { sender, recipient } = req.query; // Get sender and recipient from query
  const getSentMessages = "SELECT * FROM messages WHERE sender = ? AND recipient = ?"; // Gets all sent messages
  const getRecipientsMessages = "SELECT * FROM messages WHERE recipient = ? AND sender = ?"; // Gets all received messages

  // Get messages
  db.query(getSentMessages, [sender, recipient], (err: Error, sentRows: Message[]) => {
    if (err) throw err;
    db.query(getRecipientsMessages, [sender, recipient], (err: Error, receivedRows: Message[]) => {
      if (err) throw err;

      const rows = sentRows.concat(receivedRows); // Combine sent and received messages
      res.send(rows); // Send messages
    });
  });
});

module.exports = router;