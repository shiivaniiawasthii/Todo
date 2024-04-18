const zod = require("zod");

const createTodo = zod.object({
  desciption: zod.string(),
  title: zod.string,
});

const updateTodo = zod.object({
  id: zod.string(),
});

module.exports({
  createTodo: createTodo,
  updateTodo: updateTodo,
});
