// Enhanced API client with better error handling and configuration
class TaskAPI {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api';
    this.timeout = 10000; // 10 seconds
  }

  async request(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
        ...options,
      };

      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return await response.text();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - server is not responding');
      }
      
      console.error(`API request failed: ${endpoint}`, error);
      throw new Error(`Network error: ${error.message}`);
    }
  }

  // Get all tasks
  async getAllTasks() {
    return this.request('/tasks');
  }

  // Get task by ID
  async getTaskById(id) {
    if (!id) throw new Error('Task ID is required');
    return this.request(`/tasks/${id}`);
  }

  // Create new task
  async createTask(taskData) {
    if (!taskData?.title) throw new Error('Task title is required');
    
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  // Update task
  async updateTask(id, taskData) {
    if (!id) throw new Error('Task ID is required');
    
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  // Delete task
  async deleteTask(id) {
    if (!id) throw new Error('Task ID is required');
    
    return this.request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }
}

// Singleton instance
export const taskAPI = new TaskAPI();

// Debug helper (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('API Base URL:', process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api');
}