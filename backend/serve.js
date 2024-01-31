const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes.js");
//const db = require("./config/db.js");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
//db();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://todoadmin:IpIadVDkgtIXRDMf@todoapi.forapob.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8000, () => {
      console.log(`Server started on port 8000`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.use("/api/todo", todoRoutes);