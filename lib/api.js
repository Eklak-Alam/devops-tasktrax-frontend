// Use environment variable with fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api';

// Enhanced API with error handling
export const taskAPI = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Get all tasks error:', error);
      throw error;
    }
  },

  // Get task by ID
  getTaskById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Get task error:', error);
      throw error;
    }
  },

  // Create new task
  createTask: async (taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Create task error:', error);
      throw error;
    }
  },

  // Update task
  updateTask: async (id, taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Update task error:', error);
      throw error;
    }
  },

  // Delete task
  deleteTask: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Delete task error:', error);
      throw error;
    }
  },
};

// Debug helper
console.log('API Base URL:', API_BASE_URL);