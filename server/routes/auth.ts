import express, { Request, Response } from "express";
const router = express.Router();

const db = require("../config/db");
const { HashPassword, salt } = require("../lib/security");

const selectEmail = "SELECT * FROM users WHERE email = ?"; // Selects all emails

// Registering
router.post("/register", (req: Request, res: Response) => {
  interface User {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePicture: string;
  };

  const { userName, firstName, lastName, email, password } = req.body;
  const profilePicture = "../images/default-profile.png";

  const selectUsername = "SELECT * FROM users WHERE user_name = ?"; // Selects all usernames
  const insertRow = "INSERT INTO users (user_name, first_name, last_name, email, password, salt, profile_picture) VALUES(?, ?, ?, ?, ?, ?, ?)"; // Inserts new row

  // Check if email already exists
  db.query(selectEmail, [email], (err: Error, rows: User[]) => {
    if (err) throw err;

    // If email exists
    if (rows.length > 0) {
      res.send("Email already exists");
      return;
    };

    // Check if username already exists
    db.query(selectUsername, [userName], (err: Error, rows: User[]) => {
      if (err) throw err;

      // If username exists
      if (rows.length > 0) {
        res.send("Username already exists");
        return;
      }

      // Else register user
      else {
        const hashedPassword = HashPassword(password, salt); // Hash password

        // Insert new row
        db.query(insertRow, [userName, firstName, lastName, email, hashedPassword, salt, profilePicture], (err: Error, rows: User[]) => {
          if (err) throw err;

          console.log("Registered: \n" + "User:" + userName + "\n" + "Email:" + email);
          res.send("Successfully registered, please login");
        });
      }
    });
  });
});

module.exports = router;