const express = require("express");
const next = require("next");
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Body parser
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  // Next.js build serve
  server.get("*", (req, res) => {
    handle(req, res);
  });

  // Server port
  server.listen(PORT, () => {
    console.log("Server started on port " + PORT);
  });
});