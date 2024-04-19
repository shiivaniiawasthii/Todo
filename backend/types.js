const zod = require("zod");

const createTodo = zod.object({
  description: zod.string(),
  title: zod.string(),
});

const updateTodo = zod.object({
  id: zod.string(),
});

const deleteTodo = zod.object({
  id: zod.string(),
});

module.exports = {
  createTodo: createTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
