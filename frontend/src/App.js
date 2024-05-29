import logo from "./logo.svg";
import "./App.css";
import Todo from "./Components/Todo";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center  ">
      <h1 className="text-4xl font-bold mb-4">Todo List</h1>
      <Todo Task="Complete React Project" Status="In Progress" />
      <Todo Task="Review Pull Requests" Status="Pending" />
    </div>
  );
}

export default App;
