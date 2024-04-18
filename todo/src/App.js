import { useEffect } from "react";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import { useState } from "react";
const todos = [];

function App() {
  const [todos, setTodos] = useState([
    { title: "hey1", description: "hey2", completed: true },
    { title: "heyyy1", description: "hey2", completed: false },
  ]);
  async function fetchingData(url) {
    const data = await fetch(url);
    const res = await data.json();
    console.log(res);
    setTodos(res);
  }
  useEffect(() => {
    fetchingData("http://localhost:8080/");
  }, []);
  return (
    <div>
      <CreateTodo />
      <Todos todos={todos} />
    </div>
  );
}

export default App;
