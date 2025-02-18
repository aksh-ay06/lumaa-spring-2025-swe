'use client'; // Mark as a Client Component

import { useState } from 'react';
import api from '../utils/api';

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editTask, setEditTask] = useState<{ id: number; title: string; description: string } | null>(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      alert('Failed to fetch tasks. Please try again.');
    }
  };

  // Create a new task
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '' }); // Reset form
    } catch (error) {
      alert('Failed to create task. Please try again.');
    }
  };

  // Update a task
  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTask) return;

    try {
      const response = await api.put(`/tasks/${editTask.id}`, editTask);
      setTasks(tasks.map((task) => (task.id === editTask.id ? response.data : task)));
      setEditTask(null); // Reset edit form
    } catch (error) {
      alert('Failed to update task. Please try again.');
    }
  };

  // Delete a task
  const handleDeleteTask = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      alert('Failed to delete task. Please try again.');
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = async (id: number, isComplete: boolean) => {
    try {
      const response = await api.put(`/tasks/${id}`, { isComplete: !isComplete });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      alert('Failed to update task status. Please try again.');
    }
  };

  return (
    <div>
      {/* Form to create a new task */}
      <form onSubmit={handleCreateTask} className="mb-4">
        <h2 className="text-lg font-bold">Create New Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <button type="submit" className="p-2 bg-green-500 text-white rounded">
          Add Task
        </button>
      </form>

      {/* Edit Task Form */}
      {editTask && (
        <form onSubmit={handleUpdateTask} className="mb-4">
          <h2 className="text-lg font-bold">Edit Task</h2>
          <input
            type="text"
            placeholder="Title"
            value={editTask.title}
            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <textarea
            placeholder="Description"
            value={editTask.description}
            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded mr-2">
            Save Changes
          </button>
          <button
            onClick={() => setEditTask(null)}
            className="p-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </form>
      )}

      {/* List of Tasks */}
      <ul>
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="border p-4 mb-2 rounded">
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.isComplete ? 'Completed' : 'Pending'}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => toggleTaskCompletion(task.id, task.isComplete)}
                  className={`p-2 rounded ${
                    task.isComplete ? 'bg-yellow-500' : 'bg-green-500'
                  } text-white`}
                >
                  {task.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                  onClick={() =>
                    setEditTask({ id: task.id, title: task.title, description: task.description })
                  }
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}