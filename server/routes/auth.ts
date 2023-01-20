import express, { Request, Response } from "express";
const router = express.Router();

const db = require("../config/db");
const { HashPassword, salt } = require("../lib/security");

interface User {
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_picture: string;
  salt: string;
};

const selectEmail = "SELECT * FROM users WHERE email = ?"; // Selects all emails

// Registering
router.post("/register", (req: Request, res: Response) => {
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

// Login
router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if email exists
  db.query(selectEmail, [email], (err: Error, rows: User[]) => {
    if (err) throw err;

    // If email exists
    if (rows.length > 0) {
      if (HashPassword(password, rows[0].salt) === rows[0].password) {
        // Create session
        req.session = Object.assign(req.session, {
          userName: rows[0].user_name,
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          email: rows[0].email,
          profilePicture: rows[0].profile_picture
        });

        console.log("Logged in: \n" + "User:" + rows[0].user_name + "\n" + "Email:" + rows[0].email);
        res.send("Login successful");
      } else {
        res.send("Incorrect password");
      }
    } else {
      res.send("Email does not exist");
    }
  });
});

module.exports = router;