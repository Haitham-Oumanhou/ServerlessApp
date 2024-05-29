import React, { useState } from "react";
import { Button } from "@nextui-org/button";

const Todo = ({ Id, Task, Status }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(Task);
  const [editedStatus, setEditedStatus] = useState(Status);

  const completeTask = () => {
    
    setIsCompleted(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save the edited task and status
    setIsEditing(false);
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
            isCompleted ? "text-green-500 line-through" : ""
          } ${isCompleted ? "cursor-default" : ""}`}
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
        <p className="font-medium" style={{ color: "#28A745" }}>
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
            <Button className="font-semibold" color="danger" radius="sm">
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
