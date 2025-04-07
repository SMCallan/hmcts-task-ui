// src/components/TaskList.tsx
import React from 'react';
import { Task } from '../services/taskService';

interface TaskListProps {
    tasks: Task[];
    onUpdateStatus: (id: number, newStatus: string) => void;
    onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateStatus, onDeleteTask }) => {

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>, taskId: number) => {
    onUpdateStatus(taskId, event.target.value);
  };

  const handleDeleteClick = (taskId: number) => {
    onDeleteTask(taskId);
  };

  // Render Logic
  if (tasks.length === 0) {
     // Use className for styling the message
     return <div className="no-tasks-message">No tasks found. Create one using the form above!</div>;
  }

  return (
    // Add className to the main div for potential specific styling
    <div className="task-list">
      <h2>Task List</h2>
      {/* ul is styled via .task-list ul in CSS */}
      <ul>
        {tasks.map((task) => (
          // li is styled via .task-list li in CSS
          <li key={task.id}>
            {/* Use className for details section */}
            <div className="task-details">
                <h3>{task.title}</h3>
                {task.description && (
                    <p className="description"> {/* Optional specific class */}
                        Description: {task.description}
                    </p>
                 )}
                <p>
                    Status:
                    {/* select is styled via .task-details select */}
                    <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(e, task.id)}
                        aria-label={`Update status for ${task.title}`}
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </p>
                <p className="due-date"> {/* Optional specific class */}
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                 </p>
            </div>

            {/* Use className for actions section */}
            <div className="task-actions">
                <button
                    onClick={() => handleDeleteClick(task.id)}
                    className="delete-button" // Use class from App.css
                    aria-label={`Delete task ${task.title}`}
                >
                    Delete
                </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;