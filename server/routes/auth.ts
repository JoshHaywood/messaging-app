import express, { Request, Response } from "express";
const router = express.Router();

const db = require("../config/db");
const { HashPassword, salt } = require("../lib/security");
import User from "@/interfaces/user";

// Session data
declare module "express-session" {
  interface SessionData {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    about: string;
  }
};

const selectEmail = "SELECT * FROM users WHERE email = ?"; // Selects all emails

// Registering
router.post("/register", (req: Request, res: Response) => {
  const { userName, firstName, lastName, email, password } = req.body;
  const profilePicture = process.env.DEFAULT_PROFILE_PICTURE;

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
        req.session.userName = rows[0].user_name;
        req.session.firstName = rows[0].first_name;
        req.session.lastName = rows[0].last_name;
        req.session.email = rows[0].email;
        req.session.profilePicture = rows[0].profile_picture;
        req.session.about = rows[0].about;

        // Log session
        console.log(
          "Created session for user: " +
            "\n" +
            req.session.firstName +
            " " +
            req.session.lastName +
            "\n" +
            req.session.email
        );        
        res.send("Login successful");
        // Else incorrect password
      } else {
        res.send("Incorrect password");
      }
      // Else email does not exist
    } else {
      res.send("Email does not exist");
    };
  });
});

// Get session user
router.get("/user", (req: Request, res: Response) => {    
  // If user is logged in, send user data
  if (req.session.email) {
    res.send({
      loggedIn: true,
      firstName: req.session.firstName,
      lastName: req.session.lastName,
      profilePicture: req.session.profilePicture,
      about: req.session.about,
    });  
    // Else user is not logged in, send false
  } else {
      res.send({loggedIn: false});
  };
});

// Logout
router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy((err: Error) => {
    if (err) throw err;
    res.send("Logged out");
  });
});

module.exports = router;