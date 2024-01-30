const express = require("express");
const app = express();
const db = require("./db.js");


app.use(express.json());
db();


