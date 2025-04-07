// src/components/TaskForm.tsx
import React, { useState } from 'react';
import { createTask, CreateTaskData } from '../services/taskService';

interface TaskFormProps {
  onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Validation
    if (!title.trim() || !status.trim() || !dueDate) {
        setError('Title, Status, and Due Date are required.');
        setIsSubmitting(false);
        return;
    }

    // Date Formatting
    let isoDueDate: string;
    try {
        const dateObj = new Date(dueDate + 'T00:00:00.000Z');
        if (isNaN(dateObj.getTime())) throw new Error();
        isoDueDate = dateObj.toISOString();
    } catch {
         setError('Invalid Due Date format. Please use YYYY-MM-DD.');
         setIsSubmitting(false);
         return;
    }

    // Prepare Data
    const newTaskData: CreateTaskData = {
      title: title.trim(),
      description: description.trim() || null,
      status: status.trim(),
      dueDate: isoDueDate,
    };

    // Call API
    try {
      await createTask(newTaskData);
      setTitle('');
      setDescription('');
      setStatus('To Do');
      setDueDate('');
      setError(null);
      onTaskCreated();
    } catch (err: any) {
      console.error("Form Submit Error:", err);
      setError(err.message || 'An unexpected error occurred while creating the task.');
    } finally {
       setIsSubmitting(false);
    }
  };

  // Render Form - remove inline styles, use CSS from App.css
  return (
    <form onSubmit={handleSubmit}> {/* Use CSS for form styling */}
      <h2>Create New Task</h2>

      {/* Use error-message class, but only render if error exists */}
      {error && <p className="error-message">{error}</p>}

      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description (Optional):</label>
        <textarea
          id="description" value={description} onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status" value={status} onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;