import React from 'react';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';

const Item = ({ task, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(task); 
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <li className="bg-gray-100 rounded-lg shadow-md p-4 my-2 mx-auto w-4/5">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{task.title}</h2>
        {task.completed ? (
          <AiFillCheckCircle size={36} color="green" />
        ) : (
          <AiOutlineCheckCircle size={36} color="gray" />
        )}
      </div>
      <p>{task.description}</p>
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Item;
