const express = require("express");
const mongoose = require("mongoose");

const app = express();
const Todo = require("./models/Todo");

const cors = require("cors");
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connectd to db"))
  .catch((err) => console.log("Error in connecting to db: ", err));

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todo/new", async (req, res) => {
  const todo = await Todo.create(req.body);
  res.send(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  todo.save();
  res.json(todo);
});
app.listen(3000, () => {
  console.log("app is running on port: 3000");
});
