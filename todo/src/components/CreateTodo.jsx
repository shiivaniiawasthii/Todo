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
    <div className=" mt-10 relative flex flex-col border border-black-500 w-1/2 m-auto">
      <div className="p-3 border border-black-500 ">
        {" "}
        <input
          type="text"
          placeholder="Add your todo..."
          name="title"
          onChange={handleInputChange}
          value={todo.title}
          className="block w-full border-hide focus:outline-none focus:border-transparent"
        />
      </div>
      <div className="p-3 border border-black-500 ">
        <input
          className="w-full focus:outline-none focus:border-transparent"
          type="text"
          placeholder="Add your todo's description..."
          name="description"
          onChange={handleInputChange}
          value={todo.description}
        />
      </div>

      <button
        onClick={handleAddingTodo}
        className=" bg-blue-500 p-9 absolute text-bold font-2xl top-0 right-0 font-bold text-white hover:bg-blue-700 "
      >
        {" "}
        Add
      </button>
    </div>
  );
}

export default CreateTodo;
