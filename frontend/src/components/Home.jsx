import React, { useEffect, useState } from 'react';
import Item from './Item';
import { Button, Modal, TextField } from '@material-ui/core';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({});
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedCompleted, setEditedCompleted] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      fetchTasks(); 
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditedTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedCompleted(task.completed);
    setEditModalOpen(true);
  };

  const handleCreate = () => {
    setEditedTask({});
    setEditedTitle('');
    setEditedDescription('');
    setEditedCompleted(false);
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const requestMethod = editedTask.id ? 'PUT' : 'POST';
      const url = editedTask.id
        ? `http://localhost:4000/api/tasks/${editedTask.id}`
        : 'http://localhost:4000/api/tasks';

      await fetch(url, {
        method: requestMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
          completed: editedCompleted ? 1 : 0,
        }),
      });

      fetchTasks();
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-white mx-auto my-4">Task Manager</h1>
      <div className="flex justify-end mr-4">
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create New Task
        </Button>
      </div>
      <ul>
        {tasks.map((task) => (
          <Item
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      <Modal open={editModalOpen} onClose={handleModalClose}>
        <div className="modal-container bg-white rounded-lg shadow-md p-4 w-80 mx-auto mt-20">
          <h2 className="text-lg font-bold mb-4">
            {editedTask.id ? 'Edit Task' : 'Create New Task'}
          </h2>
          <TextField
            label="Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="mb-4 w-full my-4"
            variant="outlined"
          />
          <TextField
            label="Description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="mb-4 w-full my-4"
            multiline
            rows={4}
            variant="outlined"
          />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={editedCompleted}
              onChange={(e) => setEditedCompleted(e.target.checked)}
              className="mr-2"
              id="completed-checkbox"
            />
            <label htmlFor="completed-checkbox" className="text-sm">
              Completed
            </label>
          </div>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            {editedTask.id ? 'Update' : 'Create'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
