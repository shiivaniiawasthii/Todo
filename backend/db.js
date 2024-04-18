const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://shvaniawsthi001:HYOZLyCVvafbyD61@cluster0.qhsd9rl.mongodb.net/"
);

const todosSchema = mongoose.Schema({
  id: String,
  title: String,
  description: String,
});

const todos = mongoose.model("todos", todosSchema);

module.exports = {
  todos,
};
