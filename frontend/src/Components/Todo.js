import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import axios from "axios";

const Todo = ({ id, Task, Status }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(Task);
  const [editedStatus, setEditedStatus] = useState(Status);

  const completeTask = async () => {
    try {
      await axios.patch(
        `https://mywqqc0v8f.execute-api.us-east-1.amazonaws.com/v1/todos/${id}`,
        { Status: "Completed" }
      );
      window.location.reload();

      setIsCompleted(true);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (editedTask.trim() === "") return;

    const updatedTodo = {
      Task: editedTask,
      Status: editedStatus,
    };
    try {
      await axios.put(
        `https://mywqqc0v8f.execute-api.us-east-1.amazonaws.com/v1/todos/${id}`,
        updatedTodo
      );
      window.location.reload();
    } catch (error) {
      console.log("Error updating:", error);
    } finally {
      setIsEditing(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `https://mywqqc0v8f.execute-api.us-east-1.amazonaws.com/v1/todos/${id}`
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="mb-[10px] p-4 border rounded-lg shadow-md w-[600px] max-w-full">
      {isEditing ? (
        <input
          type="text"
          className="text-xl font-bold focus:outline-none"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
        />
      ) : (
        <h3
          className={`text-xl font-bold ${
            Status === "Completed"
              ? "text-green-500 line-through cursor-default"
              : ""
          }`}
        >
          {Task}
        </h3>
      )}
      {isEditing ? (
        <select
          value={editedStatus}
          onChange={(e) => setEditedStatus(e.target.value)}
          className="w-full p-2 mt-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      ) : (
        <p
          className="font-medium"
          style={{ color: Status === "Completed" ? "#28A745" : "#3777FF" }}
        >
          {Status}
        </p>
      )}
      <div className="flex justify-end space-x-2 mt-4">
        {isEditing ? (
          <Button
            className="font-semibold"
            color="success"
            radius="sm"
            onClick={handleSave}
          >
            Save
          </Button>
        ) : (
          <>
            <Button
              className="font-semibold"
              color="success"
              radius="sm"
              onClick={completeTask}
            >
              Done
            </Button>
            <Button
              className="font-semibold"
              color="warning"
              radius="sm"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              className="font-semibold"
              color="danger"
              radius="sm"
              onClick={() => {
                deleteTodo(id);
              }}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
