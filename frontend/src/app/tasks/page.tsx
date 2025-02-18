'use client';
import { useEffect, useState } from 'react';
import api from '../../../utils/api';
import { useRouter } from 'next/navigation';
import { getToken, removeToken } from '../../../utils/auth';

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');
  const [editedTaskDescription, setEditedTaskDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) {
      router.push('/login');
      return;
    }
    fetchTasks();
  }, [router]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      alert('Failed to fetch tasks. Please try again.');
    }
  };

  const logout = () => {
    removeToken();
    router.push('/login');
  };

  const createTask = async () => {
    try {
      await api.post('/tasks', {
        title: newTaskTitle,
        description: newTaskDescription,
      });
      fetchTasks();
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (error) {
      alert('Failed to create task. Please try again.');
    }
  };

  const updateTask = async (id: number) => {
    try {
      await api.put(`/tasks/${id}`, {
        title: editedTaskTitle,
        description: editedTaskDescription,
      });
      fetchTasks();
      setEditingTaskId(null);
      setEditedTaskTitle('');
      setEditedTaskDescription('');
    } catch (error) {
      alert('Failed to update task. Please try again.');
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      alert('Failed to delete task. Please try again.');
    }
  };

  // Toggle Task Completion Status
  const toggleTaskStatus = async (id: number, currentStatus: boolean) => {
    try {
      await api.put(`/tasks/${id}`, { isComplete: !currentStatus });
      // Optimistically update the local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isComplete: !currentStatus } : task
        )
      );
    } catch (error) {
      alert('Failed to toggle task status. Please try again.');
    }
  };

  // Split tasks into pending and completed
  const pendingTasks = tasks.filter((task) => !task.isComplete);
  const completedTasks = tasks.filter((task) => task.isComplete);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </header>

      {/* Create Task Form */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Create New Task</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <textarea
            placeholder="Description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <button
            onClick={createTask}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
          >
            Create Task
          </button>
        </div>
      </section>

      {/* Horizontal Layout for Pending and Completed Tasks */}
      <section className="flex gap-8">
        {/* Pending Tasks List */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pending Tasks</h2>
          {pendingTasks.length === 0 ? (
            <p className="text-gray-500 text-center">No pending tasks found.</p>
          ) : (
            pendingTasks.map((task) => (
              <div key={task.id} className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
                {editingTaskId === task.id ? (
                  // Edit Mode
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">Edit Task</h2>
                    <input
                      type="text"
                      placeholder="Title"
                      value={editedTaskTitle}
                      onChange={(e) => setEditedTaskTitle(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                    <textarea
                      placeholder="Description"
                      value={editedTaskDescription}
                      onChange={(e) => setEditedTaskDescription(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={() => updateTask(task.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTaskId(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
                    <p className="text-gray-600">{task.description}</p>
                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={() => toggleTaskStatus(task.id, task.isComplete)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                      >
                        Mark Complete
                      </button>
                      <button
                        onClick={() => {
                          setEditingTaskId(task.id);
                          setEditedTaskTitle(task.title);
                          setEditedTaskDescription(task.description);
                        }}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Completed Tasks List */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Completed Tasks</h2>
          {completedTasks.length === 0 ? (
            <p className="text-gray-500 text-center">No completed tasks found.</p>
          ) : (
            completedTasks.map((task) => (
              <div key={task.id} className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => toggleTaskStatus(task.id, task.isComplete)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300"
                  >
                    Mark Incomplete
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}