import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import next from "next";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";

const PORT = process.env.PORT;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const session = require("./lib/session");
const socket = require("./lib/socket");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const messageRoutes = require("./routes/message");
const settingsRoutes = require("./routes/settings");

app.prepare().then(() => {
  const app: Express = express();
  const server = http.createServer(app);

  // Cors
  app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));

  // Body parser
  app.use(bodyParser.json({ limit: "20mb" }));
  app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

  app.use(session); // Session

  // Routes
  app.use("/auth", authRoutes);
  app.use("/users", usersRoutes);
  app.use("/message", messageRoutes);
  app.use("/settings", settingsRoutes);

  // Next.js build serve
  app.get("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  // Server port
  server.listen(PORT, () => {
    socket(server); // Socket.io server

    console.log("Server started on port " + PORT);
  });
});