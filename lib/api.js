const API_BASE_URL = 'http://localhost:5000/api';

export const taskAPI = {
  // Get all tasks
  getAllTasks: async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    return response.json();
  },

  // Get task by ID
  getTaskById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    return response.json();
  },

  // Create new task
  createTask: async (taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return response.json();
  },

  // Update task
  updateTask: async (id, taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return response.json();
  },

  // Delete task
  deleteTask: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};