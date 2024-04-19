import React, { useState, useEffect } from "react";

function Todos({ todos }) {
  const [updatedId, setUpdatedId] = useState(); // State variable to store the ID of the todo to update
  const [deleteId, setdeleteId] = useState(); // State variable to store the ID of the todo to delete

  // useEffect hook to trigger the update API call when updatedId changes
  useEffect(() => {
    if (updatedId) {
      const { id, completed } = updatedId;
      handleUpdateTodo(id, completed); // Call handleUpdateTodo when updatedId changes
    }
  }, [updatedId]); // Run useEffect whenever updatedId changes
  useEffect(() => {
    if (deleteId) {
      handleDeleteTodo(deleteId); // Call handleUpdateTodo when updatedId changes
    }
  }, [deleteId]); // Run useEffect whenever updatedId changes

  const handleUpdateTodo = async (id, completed) => {
    console.log(completed);
    try {
      const data = await fetch("http://localhost:8080/update", {
        method: "PUT",
        body: JSON.stringify({
          id: id,
          completed: completed,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      const res = await data.json();
      console.log(res);
      if (res) alert("updated");
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("An error occurred while updating todo. Please try again later.");
    } finally {
      setUpdatedId(null); // Reset updatedId after the API call is completed
    }
  };
  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch("http://localhost:8080/delete", {
        method: "DELETE",
        body: JSON.stringify({ id }), // Send the todo ID in the request body
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Todo deleted successfully");
      } else {
        alert("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("An error occurred while deleting todo. Please try again later.");
    }
  };

  return (
    <div className=" mt-10  flex flex-col border border-black-500 w-1/2 m-auto">
      {todos.map((todo) => (
        <div key={todo._id} className="relative p-3 border border-black-500">
          <p className="font-bold text-1xl">{todo.title}</p>
          <p>{todo.description}</p>
          <button
            onClick={() =>
              setUpdatedId({ id: todo._id, completed: todo.completed })
            } // Set updatedId when the button is clicked
            className="bg-blue-500 p-2 absolute text-bold font-2xl top-0 right-0 font-bold text-white hover:bg-blue-700"
          >
            {todo.completed ? "Mark as uncompleted" : "Mark as completed"}
          </button>
          <button
            onClick={() => setdeleteId(todo._id)} // Set updatedId when the button is clicked
            className="bg-red-500 p-2 absolute text-bold font-2xl top-0 right-0 font-bold text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Todos;
