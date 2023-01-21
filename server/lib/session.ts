import express from "express";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import session from "express-session";

const app = express();
app.use(cookieParser());

const secret = crypto.randomBytes(256).toString("hex");

// Session setup
app.use(session({
    name: "user_id",
    secret: process.env.SECRET || secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Max age one day
    },
  })
);

module.exports = app;
