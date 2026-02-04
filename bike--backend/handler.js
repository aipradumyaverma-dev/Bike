const express = require("express");
const app = express();
const cors = require("cors");
const parser = require("body-parser");
const serverless = require("serverless-http");
app.use(express.json());
app.use(parser.json({ type: "application/json" }));
app.use(parser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use(cors({ allowedHeaders: "Content-Type,Authorization,language" }));

app.use("/" + process.env.STAGE, require("./routes/routes"));

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
    errorMessage: "Invalid page.Please go back and request again.",
  });
});

exports.handler = serverless(app);
  