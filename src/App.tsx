// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getAllTasks, updateTaskStatus, deleteTask, Task } from './services/taskService';
import './App.css'; // Import the CSS file

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTasks = await getAllTasks();
      setTasks(fetchedTasks);
    } catch (err: any) {
      console.error("App fetchTasks Error:", err);
      setError(err.message || 'An unexpected error occurred while fetching tasks.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleUpdateStatus = useCallback(async (id: number, newStatus: string) => {
    setError(null);
    try {
        await updateTaskStatus(id, newStatus);
        fetchTasks();
    } catch (err: any) {
        console.error("App handleUpdateStatus Error:", err);
        setError(err.message || 'Failed to update status.');
    }
  }, [fetchTasks]);

  const handleDeleteTask = useCallback(async (id: number) => {
      setError(null);
      if (!window.confirm('Are you sure you want to delete this task?')) {
          return;
      }
      try {
          await deleteTask(id);
          fetchTasks();
      } catch (err: any) {
          console.error("App handleDeleteTask Error:", err);
          setError(err.message || 'Failed to delete task.');
      }
  }, [fetchTasks]);

  // Render task list section based on state
  const renderTaskList = () => {
     if (isLoading && tasks.length === 0) return <div className="loading-message">Loading tasks...</div>;
     // Error related to fetching will be shown above list
     // TaskList component handles the "no tasks" message internally now

     return (
        <TaskList
            tasks={tasks}
            onUpdateStatus={handleUpdateStatus}
            onDeleteTask={handleDeleteTask}
        />
     );
  }

  return (
    // Use className="App" which is styled in App.css
    <div className="App">
      <h1>HMCTS Task Manager</h1>

      <TaskForm onTaskCreated={fetchTasks} />

      <hr />

      {/* Display general/operational errors using the CSS class */}
      {error && !isLoading && <div className="error-message">Operation failed: {error}</div>}

      {/* Render the task list section */}
      {renderTaskList()}
    </div>
  );
}

export default App;