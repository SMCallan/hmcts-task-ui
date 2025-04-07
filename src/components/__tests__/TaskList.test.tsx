// src/components/__tests__/TaskList.test.tsx

// No 'import React from 'react';' needed

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import TaskList from '../TaskList'; // Component to test
import { Task } from '../../services/taskService'; // Import Task interface

// --- Mock Data and Props ---
const mockTasks: Task[] = [
  { id: 1, title: 'Task One', description: 'Desc 1', status: 'To Do', dueDate: '2024-10-01T00:00:00.000Z', createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' },
  { id: 2, title: 'Task Two', description: null, status: 'In Progress', dueDate: '2024-10-02T00:00:00.000Z', createdAt: '2024-01-02T00:00:00.000Z', updatedAt: '2024-01-02T00:00:00.000Z' },
];

const mockOnUpdateStatus = jest.fn();
const mockOnDeleteTask = jest.fn();

// --- Test Suite ---
describe('<TaskList />', () => {
    // Clear mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders a list of tasks correctly', () => {
        render(<TaskList tasks={mockTasks} onUpdateStatus={mockOnUpdateStatus} onDeleteTask={mockOnDeleteTask} />);

        // Check if task titles are rendered
        expect(screen.getByText('Task One')).toBeInTheDocument();
        expect(screen.getByText('Task Two')).toBeInTheDocument();

        // Check if other details are present (e.g., status dropdown for Task One)
        // Use queryByText for optional description
        expect(screen.getByText(/Desc 1/)).toBeInTheDocument(); // Description for Task One
        expect(screen.queryByText(/Description: Desc 2/)).not.toBeInTheDocument(); // No description for Task Two

        // Check status dropdowns exist and have correct initial value
        const statusSelects = screen.getAllByLabelText(/update status for/i);
        expect(statusSelects.length).toBe(2);
        expect(statusSelects[0]).toHaveValue('To Do'); // Task One status
        expect(statusSelects[1]).toHaveValue('In Progress'); // Task Two status

        // Check delete buttons exist
        expect(screen.getAllByRole('button', { name: /delete task/i })).toHaveLength(2);
    });

    it('renders "No tasks found" message when tasks array is empty', () => {
        render(<TaskList tasks={[]} onUpdateStatus={mockOnUpdateStatus} onDeleteTask={mockOnDeleteTask} />);
        // Check for the specific message in the component
        expect(screen.getByText(/no tasks found. create one using the form above!/i)).toBeInTheDocument();
    });

    it('calls onUpdateStatus prop when status dropdown is changed', () => {
        render(<TaskList tasks={mockTasks} onUpdateStatus={mockOnUpdateStatus} onDeleteTask={mockOnDeleteTask} />);

        // Find the status dropdown for the first task ('Task One')
        const statusSelect = screen.getAllByLabelText(/update status for task one/i)[0]; // Be more specific with label

        // Simulate changing the value
        fireEvent.change(statusSelect, { target: { value: 'Done' } });

        // Check if the prop function was called with correct arguments
        expect(mockOnUpdateStatus).toHaveBeenCalledTimes(1);
        expect(mockOnUpdateStatus).toHaveBeenCalledWith(mockTasks[0].id, 'Done'); // Task ID 1, new status 'Done'
    });

     it('calls onDeleteTask prop when delete button is clicked', () => {
        render(<TaskList tasks={mockTasks} onUpdateStatus={mockOnUpdateStatus} onDeleteTask={mockOnDeleteTask} />);

        // Find the delete button for the second task ('Task Two')
        const deleteButton = screen.getByRole('button', { name: /delete task task two/i });

        // Simulate clicking the button
        fireEvent.click(deleteButton);

        // Check if the prop function was called with correct arguments
        expect(mockOnDeleteTask).toHaveBeenCalledTimes(1);
        expect(mockOnDeleteTask).toHaveBeenCalledWith(mockTasks[1].id); // Task ID 2
    });

});