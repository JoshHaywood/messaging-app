import express, { Request, Response } from "express";
const router = express.Router();

const db = require("../config/db");
import Message from "@/interfaces/message";

// Get most recent message from each conversation
router.get("/get/recent", (req: Request, res: Response) => {
  const { sender } = req.query; // Get sender from query
  const getRecentMessages =
    "SELECT * FROM messages WHERE id IN (SELECT MAX(id) FROM messages WHERE sender = ? OR recipient = ? GROUP BY sender, recipient) ORDER BY id DESC"; // Gets most recent message from each conversation

  // Get most recent messages
  db.query(
    getRecentMessages,
    [sender, sender],
    (err: Error, rows: Message[]) => {
      if (err) throw err;

      res.send(rows); // Send most recent messages
    }
  );
});

// Get conversation between two users
router.get("/get/conversation", (req: Request, res: Response) => {
  const { sender, recipient } = req.query; // Get sender and recipient from query
  const getSentMessages =
    "SELECT * FROM messages WHERE sender = ? AND recipient = ?"; // Gets all sent messages
  const getRecipientsMessages =
    "SELECT * FROM messages WHERE recipient = ? AND sender = ?"; // Gets all received messages

  // Get messages
  db.query(
    getSentMessages,
    [sender, recipient],
    (err: Error, sentRows: Message[]) => {
      if (err) throw err;
      db.query(
        getRecipientsMessages,
        [sender, recipient],
        (err: Error, receivedRows: Message[]) => {
          if (err) throw err;

          const rows = sentRows.concat(receivedRows); // Combine sent and received messages
          res.send(rows); // Send messages
        }
      );
    }
  );
});

// Get images from recipient to sender
router.get("/get/images", (req: Request, res: Response) => {
  const { sender, recipient } = req.query; // Get sender and recipient from query
  const getImages =
    "SELECT image FROM messages WHERE sender = ? AND recipient = ? AND image IS NOT NULL"; // Gets all images

  // Get images
  db.query(getImages, [recipient, sender], (err: Error, rows: Message[]) => {
    if (err) throw err;

    res.send(rows); // Send images
  });
});

// Store message in database
router.post("/store", (req: Request, res: Response) => {
  const { sender, recipient, message, image, time, date } = req.body;
  const insertRow =
    "INSERT INTO messages (sender, recipient, message, image, time, date) VALUES(?, ?, ?, ?, ?, ?)"; // Inserts new row

  // Insert new row
  db.query(
    insertRow,
    [sender, recipient, message, image, time, date],
    (err: Error, rows: Message[]) => {
      if (err) throw err;

      res.send("Message stored");
    }
  );
});

module.exports = router;
