import express, { Request, Response } from "express";
const router = express.Router();

const db = require("../config/db");
import User from "@/interfaces/user";

// Store message in database
router.post("/store", (req: Request, res: Response) => {
  const { sender, recipient, message, time } = req.body;
  const insertRow = "INSERT INTO messages (sender, recipient, message, time) VALUES(?, ?, ?, ?)"; // Inserts new row

  // Insert new row
  db.query(insertRow, [sender, recipient, message, time], (err: Error, rows: User[]) => {
      if (err) throw err;

      console.log(
        "Message stored: \n" +
          "Sender:" +
          sender +
          "\n" +
          "Recipient:" +
          recipient +
          "\n" +
          "Message:" +
          message +
          "\n" +
          "Time:" +
          time
      );
      res.send("Message stored");
    }
  );
});

module.exports = router;