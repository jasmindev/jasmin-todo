const { TodoItem } = require("../models");

const createTodo = async (req, res) => {
  try {
    const todoItem = await TodoItem.create(req.body);
    res.status(201).json(todoItem);
  } catch (error) {
    res.status(400).json({ message: error.errors.title.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoItem = await TodoItem.findByIdAndDelete(req.params.id);
    res.status(200).json(todoItem);
  } catch (error) {
    res.status(400).json({ message: error.errors.title.message });
  }
};

const listTodo = async (req, res) => {
  try {
    const todoItems = await TodoItem.find();
    res.status(200).json(todoItems);
  } catch (error) {
    res.status(400).json({ message: error.errors.title.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todoItem = await TodoItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(todoItem);
  } catch (error) {
    res.status(400).json({ message: error.errors.title.message });
  }
};

const getOneTodo = async (req, res) => {
  try {
    const todoItem = await TodoItem.findById(req.params.id);
    res.status(200).json(todoItem);
  } catch (error) {
    res.status(400).json({ message: error.errors.title.message });
  }
};

const checkedTodo = async (req, res) => {
  try {
    const todoItem = await TodoItem.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    res.status(200).json(todoItem);
  } catch (error) {
    res.status(400).json({ message: error.errors.title.message });
  }
};

module.exports = {
  createTodo,
  deleteTodo,
  listTodo,
  updateTodo,
  getOneTodo,
  checkedTodo,
};
