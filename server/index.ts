import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import next from "next";
const PORT = process.env.PORT;
import bodyParser from "body-parser";
import cors from "cors";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const session = require("./lib/session");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");

app.prepare().then(() => {
  const server: Express = express();
  
  // Cors
  server.use(cors(
    {
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true
    }
  ));

  // Body parser
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.use(session);

  // Routes
  server.use("/auth", authRoutes);
  server.use("/users", usersRoutes);

  // Next.js build serve
  server.get("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  // Server port
  server.listen(PORT, () => {
    console.log("Server started on port " + PORT);
  });
});