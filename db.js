const mongoose = require("mongoose");
const express = require('express');
const app = express();

const db = () => {
  mongoose
    .connect(
      "mongodb+srv://todoadmin:IpIadVDkgtIXRDMf@todoapi.forapob.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
      }
    )
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(3000, () => {
        console.log("Server started on port 3000");
      });
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
    });
};

module.exports = db;
