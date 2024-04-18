import React from "react";

function Todos({ todos }) {
  return (
    <div>
      {todos.map((todo) => (
        <>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <button>
            {todo.completed ? "Mark as uncompleted" : "Mark as completed"}
          </button>
        </>
      ))}
    </div>
  );
}

export default Todos;
