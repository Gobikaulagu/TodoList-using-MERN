// routes/todos.js
const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET all todos
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// POST add new todo
router.post("/", async (req, res) => {
  const { task } = req.body;
  const newTodo = new Todo({ task });
  const saved = await newTodo.save();
  res.json(saved);
});

// DELETE a todo
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// PUT toggle complete
router.put("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

module.exports = router;
