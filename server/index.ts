import express, { Express, Request, Response } from "express";
import next from "next";
const PORT = process.env.PORT || 3000;
import bodyParser from "body-parser";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server: Express = express();

  // Body parser
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  // Next.js build serve
  server.get("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  // Server port
  server.listen(PORT, () => {
    console.log("Server started on port " + PORT);
  });
});