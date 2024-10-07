import { useState, FormEvent } from 'react';

interface TaskFormProps {
  onAddTask: (task: string) => void; // Prop type for adding a task
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [task, setTask] = useState<string>('');
  const [error, setError] = useState<string>(''); // State for error message

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTask(task);
      setTask('');
      setError(''); // Clear error message
    } else {
      setError('Task cannot be empty'); // Set error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4" data-testid="task-form">
      <div className="flex flex-col">
        <div className="flex">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow bg-white px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </form>
  );
};

export default TaskForm;
