import express, { Request, Response } from "express";
const router = express.Router();

const db = require("../config/db");
import User from "@/interfaces/user";

// Update profile picture
router.put("/profile-picture", (req: Request, res: Response) => {
  const { profilePicture } = req.body;
  const updateProfilePicture = "UPDATE users SET profile_picture = ? WHERE user_name = ?"; // Updates profile picture

  db.query(updateProfilePicture, [profilePicture, req.session.userName], (err: Error, rows: User[]) => {
    if (err) throw err;

    req.session.profilePicture = profilePicture; // Update session
    res.send(profilePicture);
  });
});

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