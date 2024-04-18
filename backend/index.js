const express = require("express");
const { createTodo, updateTodo } = require("./types");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to your todos");
});

app.post("/myTodos", (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent wrong inputs",
    });
  }
  return;
});

app.put("/update", (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload) {
    res.status(411).json({
      msg: "You sent wrong input",
    });
  }
});

app.listen(8080);
