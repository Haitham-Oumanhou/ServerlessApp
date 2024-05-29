import logo from "./logo.svg";
import "./App.css";
import Todo from "./Components/Todo";
import { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";

import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTodo = async () => {
    if (newTask.trim() === "") return;

    try {
      const response = await axios.post(
        "https://mywqqc0v8f.execute-api.us-east-1.amazonaws.com/v1/todos",
        { Task: newTask }
      );
      setTodos([...todos, response.data]);
      setNewTask("");
      fetchTodos(setTodos);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

   const fetchTodos = async (setTodos) => {
    try {
      const response = await axios.get(
        "https://mywqqc0v8f.execute-api.us-east-1.amazonaws.com/v1/todos"
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos(setTodos);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center  ">
      <h1 className=" m-8 text-4xl font-bold mb-4">Todo List</h1>
      <div className="flex items-center mb-4 w-[500px]">
        <Input
          size="lg"
          type="text"
          radius="sm"
          label="Add a New Task"
          color="primary"
          variant="outlined"
          className="mr-2 border border-blue-500 rounded-lg "
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <div
          className="flex  items-center justify-center w-12  px-2  py-4 bg-blue-500 text-white  rounded-large hover:bg-blue-600 transition"
          onClick={() => {
            addTodo();
          }}
        >
          <AddCircleSharpIcon />
        </div>
      </div>

      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          Task={todo.Task}
          Status={todo.Status}
        />
      ))}
    </div>
  );
}

export default App;
