import express, { Request, Response } from "express";
const router = express.Router();

const db = require("../config/db");

import User from "@/interfaces/user";
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

// Create contact request
router.post("/request", (req: Request, res: Response) => {
  const { sender, sender_name, sender_picture, recipient } = req.body;

  const selectRecipient = `SELECT * FROM users WHERE user_name = '${recipient}'`;
  const selectExisting = `
    SELECT * FROM contacts WHERE
    (sender = '${sender}' AND recipient = '${recipient}') OR
    (sender = '${recipient}' AND recipient = '${sender}')
  `;
  const insertRow = `INSERT INTO contacts (sender, sender_name, sender_picture, recipient, status) VALUES (?, ?, ?, ?, ?)`;

  // If sender and recipient are the same
  if (sender === recipient) {
    return res.send(`You cannot add yourself as a contact`);
  }

  // Select recipient
  db.query(selectRecipient, (err: Error, rows: User[]) => {
    if (err) throw err;

    // Check if user exists
    if (rows.length === 0) {
      return res.send(`User "${recipient}" not found`);
    }

    // Select existing contact
    db.query(selectExisting, (err: Error, rows: Contact[]) => {
      if (err) throw err;

      // If contact already exists
      if (rows.length > 0) {
        const contact = rows[0];

        // If contact exists and was sent by sender
        if (contact.status === "pending" && contact.sender === sender) {
          return res.send(`You have already sent a request to "${recipient}"`);
        }

        // If contact is already accepted
        if (contact.status === "accepted" && contact.sender === sender) {
          return res.send(`"${recipient}" is already a contact`);
        }

        // If contact exists and wasn't sent by sender
        if (contact.status === "pending" && contact.sender === recipient) {
          return res.send(`"${recipient}" has already sent you a request`);
        }

        // If contact is already accepted
        if (contact.status === "accepted" && contact.sender === recipient) {
          return res.send(
            `You have already accepted a request from "${recipient}"`
          );
        }
      }

      // Insert new contact
      db.query(
        insertRow,
        [sender, sender_name, sender_picture, recipient, "pending"],
        (err: Error, rows: Contact[]) => {
          if (err) throw err;

          res.send("Contact request sent");
        }
      );
    });
  });
});

// Get pending contacts
router.get("/pending", (req: Request, res: Response) => {
  const userName = req.session.userName;
  const selectPending = `SELECT * FROM contacts WHERE recipient = ? AND status = 'pending'`;

  db.query(selectPending, [userName], (err: Error, rows: Contact[]) => {
    if (err) throw err;

    res.send(rows);
  });
});

// Accept contact request
router.put("/accept/:sender", (req: Request, res: Response) => {
  const { sender } = req.params;
  const recipient = req.session.userName;

  const updateRow = `UPDATE contacts SET status = 'accepted' WHERE sender = ? AND recipient = ?`;

  db.query(updateRow, [sender, recipient], (err: Error, rows: Contact[]) => {
    if (err) throw err;

    res.send("Contact request accepted");
  });
});

// Pull accept contacts from database
router.get("/accepted", (req: Request, res: Response) => {
  const userName = req.session.userName;

  // Select any rows where the sender or recipient have accepted a contact
  const selectAccepted = `
    SELECT * FROM contacts WHERE
    (sender = ? OR recipient = ?) AND status = 'accepted'
  `;

  // Get user data based on contact user name
  const selectUsers = `
    SELECT user_name, first_name, last_name, profile_picture, about FROM users WHERE
    user_name IN (
      SELECT sender FROM contacts WHERE recipient = ? AND status = 'accepted'
      UNION
      SELECT recipient FROM contacts WHERE sender = ? AND status = 'accepted'
    )
  `;

  // Get accepted contacts
  db.query(
    selectAccepted,
    [userName, userName],
    (err: Error, Contacts: Contact[]) => {
      if (err) throw err;

      // Get user data for each contact
      db.query(
        selectUsers,
        [userName, userName],
        (err: Error, rows: User[]) => {
          if (err) throw err;

          res.send(rows);
        }
      );
    }
  );
});

// Decline contact request
router.delete("/decline/:sender", (req: Request, res: Response) => {
  const { sender } = req.params;
  const recipient = req.session.userName;

  const deleteRow = `DELETE FROM contacts WHERE sender = ? AND recipient = ?`;

  db.query(deleteRow, [sender, recipient], (err: Error, rows: Contact[]) => {
    if (err) throw err;

    res.send("Contact request declined");
  });
});

module.exports = router;
