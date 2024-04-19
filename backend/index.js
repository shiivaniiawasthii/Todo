const express = require("express");
const { createTodo, updateTodo, deleteTodo } = require("./types");
const { todos } = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/myTodos", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent wrong inputs",
    });
  }
  // put it on mongodb
  await todos.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });
  res.json({
    msg: "Todo created",
  });
  return;
});

app.get("/", async (req, res) => {
  const getTodos = await todos.find({});
  res.send(getTodos);
});

app.put("/update", async (req, res) => {
  const updatePayload = req.body;
  console.log(updatePayload, "updatedpayload");
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload) {
    res.status(411).json({
      msg: "You sent wrong input",
    });
  }
  // put it on mongodb
  await todos.findByIdAndUpdate(
    { _id: req.body.id },
    { completed: !req.body.completed }
  );

  res.json({ msg: "Todo is updated" });
});

app.delete("/delete", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = deleteTodo.safeParse(updatePayload);
  if (!parsedPayload) {
    res.status(411).json({
      msg: "You sent wrong input",
    });
  }

  try {
    const { id } = req.body; // Extract the todo ID from the request body

    // Find the todo by its ID and delete it
    const deletedTodo = await todos.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({
        msg: "Todo not found",
      });
    }

    res.json({ msg: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

app.listen(8080);
