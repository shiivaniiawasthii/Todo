const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://shvaniawsthi001:BuoTynB61VbCYe7V@cluster0.xmzm0fp.mongodb.net/todos"
);

const todosSchema = mongoose.Schema({
  completed: Boolean,
  title: String,
  description: String,
});

const todos = mongoose.model("todos", todosSchema);

module.exports = {
  todos,
};
