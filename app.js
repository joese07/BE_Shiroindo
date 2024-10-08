require("dotenv").config();

const express = require("express");
const cors = require("cors");

const router = require("./routes");

const app = express();
const corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

app.use(router);

app.use((req, res, next) => {
  res.status(404).send("Sorry, we could not find what you were looking for!");
});

module.exports = app;
