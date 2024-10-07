import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from './TaskForm';
import { jest } from '@jest/globals';

describe('TaskForm', () => {
  const mockOnAddTask = jest.fn();

  beforeEach(() => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
  });

  test('renders the form', () => {
    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const submitButton = screen.getByRole('button', { name: /add task/i });

    expect(inputElement).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('allows the user to type in the input field', () => {
    const inputElement = screen.getByPlaceholderText(
      /add a new task/i
    ) as HTMLInputElement; // Cast to HTMLInputElement
    fireEvent.change(inputElement, { target: { value: 'New Task' } });

    expect(inputElement.value).toBe('New Task');
  });

  test('calls onAddTask with the input value when the form is submitted', () => {
    const inputElement = screen.getByPlaceholderText(
      /add a new task/i
    ) as HTMLInputElement; // Cast to HTMLInputElement
    fireEvent.change(inputElement, { target: { value: 'New Task' } });

    // Submit the form by finding it with data-testid
    fireEvent.submit(screen.getByTestId('task-form'));

    expect(mockOnAddTask).toHaveBeenCalledWith('New Task');
    expect(mockOnAddTask).toHaveBeenCalledTimes(1);
  });
});
