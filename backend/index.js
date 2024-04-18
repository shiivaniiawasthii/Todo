const express = require("express");
const { createTodo, updateTodo } = require("./types");
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
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload) {
    res.status(411).json({
      msg: "You sent wrong input",
    });
  }
  // put it on mongodb
  await todos.update(
    {
      _id: req.body.id,
    },
    { completed: true }
  );
  res.json({ msg: "Todo is updated" });
});

app.listen(8080);
