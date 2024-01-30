const express = require("express");
const router = express.Router();
const {
  createTodo,
  deleteTodo,
  listTodo,
  updateTodo,
  getOneTodo,
  checkedTodo,
} = require("../controllers/todo");


// create todo item
router.post("/api/todo", createTodo);
//delete todo item
router.delete("/api/todo/:id", deleteTodo);
//list todo items
router.get("/api/todo", listTodo);
//update todo item
router.put("/api/todo/:id", updateTodo);
//get one todo item
router.get("/api/todo/:id", getOneTodo);
//marked as checked
router.patch("/api/todo/:id/checked", checkedTodo);
