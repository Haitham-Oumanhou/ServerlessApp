import React from "react";

const Todo = ({ Task, Status }) => {
  return (
    <div className=" mb-[5px] p-4 border rounded-lg shadow-md w-[600px] max-w-full ">
      <h3 className="text-xl font-bold">{Task}</h3>
      <p className="text-blue-600">{Status}</p>
    </div>
  );
};

export default Todo;
