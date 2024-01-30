const express = require("express");
const router = express.Router();
const {
  createTodo,
  deleteTodo,
  listTodo,
  updateTodo,
  getOneTodo,
  checkedTodo,
} = require("../controllers/todoController.js");


//list todo items
router.get("/", listTodo);
// create todo item
router.post("/", createTodo);
//delete todo item
router.delete("/:id", deleteTodo);
//update todo item
router.put("/:id", updateTodo);
//get one todo item
router.get("/:id", getOneTodo);
//marked as checked
router.patch("/:id/checked", checkedTodo);

module.exports = router;
