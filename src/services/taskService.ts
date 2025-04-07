// src/services/taskService.ts
import axios from 'axios';

// Use Vite's way of accessing environment variables
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/tasks`;

// Interface for the Task object shape
export interface Task {
  id: number;
  title: string;
  description?: string | null;
  status: string;
  dueDate: string; // Keep as string from JSON
  createdAt: string;
  updatedAt: string;
}

// Interface for data needed when creating a task
export interface CreateTaskData {
  title: string;
  description?: string | null;
  status: string;
  dueDate: string; // Expect ISO string format for sending
}


/**
 * Fetches all tasks from the API.
 * @returns {Promise<Task[]>} A promise resolving to an array of tasks.
 */
export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error('Failed to fetch tasks. Is the backend running?');
  }
};

/**
 * Creates a new task via the API.
 * @param {CreateTaskData} taskData - The data for the new task.
 * @returns {Promise<Task>} A promise resolving to the newly created task.
 */
export const createTask = async (taskData: CreateTaskData): Promise<Task> => {
  try {
    const response = await axios.post<Task>(API_BASE_URL, taskData);
    return response.data;
  } catch (error: any) {
    console.error("Error creating task:", error);
    if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error); // Use backend's validation message
    }
    throw new Error('Failed to create task.');
  }
};

/**
 * Updates the status of a specific task.
 * @param {number} id - The ID of the task to update.
 * @param {string} status - The new status value.
 * @returns {Promise<Task>} A promise resolving to the updated task.
 */
export const updateTaskStatus = async (id: number, status: string): Promise<Task> => {
  try {
    // PATCH /api/tasks/:id/status
    const response = await axios.patch<Task>(`${API_BASE_URL}/${id}/status`, { status });
    return response.data;
  } catch (error: any) {
    console.error(`Error updating status for task ${id}:`, error);
    if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
    }
    throw new Error('Failed to update task status.');
  }
};

/**
 * Deletes a specific task by its ID.
 * @param {number} id - The ID of the task to delete.
 * @returns {Promise<void>} A promise resolving on successful deletion.
 */
export const deleteTask = async (id: number): Promise<void> => {
  try {
    // DELETE /api/tasks/:id
    await axios.delete(`${API_BASE_URL}/${id}`);
    // Success = 204 No Content, no data returned
  } catch (error: any) {
    console.error(`Error deleting task ${id}:`, error);
    if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error); // Use backend's message (e.g., 404)
    }
    throw new Error('Failed to delete task.');
  }
};