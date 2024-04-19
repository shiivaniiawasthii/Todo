import { useEffect } from "react";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import { useState } from "react";
import Nav from "./components/Nav";
const todos = [];

function App() {
  const [todos, setTodos] = useState([]);
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
      {/* <Nav /> */}
      <CreateTodo />
      <Todos todos={todos} />
    </div>
  );
}

export default App;
