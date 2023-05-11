import express, { Request, Response } from "express";
import { Session } from "express-session";
const router = express.Router();

const db = require("../config/db");
import Contact from "@/interfaces/contactTypes";

// Cast session property to CustomSession type
interface CustomSession extends Session {
  [key: string]: any;
}

// Update user profile
router.put("/:field", (req: Request, res: Response) => {
  const { field } = req.params;
  const { value } = req.body;

  const updateProfile = `UPDATE users SET ${field} = ? WHERE user_name = ?`;

  db.query(
    updateProfile,
    [value, req.session.userName],
    (err: Error, rows: Contact[]) => {
      if (err) throw err;

      // Update session
      const customSession = req.session as CustomSession;
      customSession[field] = value;

      res.send(value);
    }
  );
});

module.exports = router;
