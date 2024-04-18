import React, { useState } from "react";

function CreateTodo() {
  const [todo, setTodo] = useState({ title: "", description: "" });
  const [todos, setTodos] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleAddingTodo = async () => {
    setTodos([...todos, todo]);
    setTodo({ title: "", description: "" });
    console.log(todo);
    const data = await fetch("http://localhost:8080/myTodos", {
      method: "POST",
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    const res = await data.json();
    console.log(res);
    if (res) alert("added");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add your todo..."
        name="title"
        onChange={handleInputChange}
        value={todo.title}
      />
      <input
        type="text"
        placeholder="Add your todo's description..."
        name="description"
        onChange={handleInputChange}
        value={todo.description}
      />
      <button onClick={handleAddingTodo}>Add</button>
    </div>
  );
}

export default CreateTodo;
