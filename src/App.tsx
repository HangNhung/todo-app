import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

// Mock API
const mockAPI = {
  getTasks: async () => {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  },
  addTask: async (text: string) => {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, completed: false }),
    });
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
    return response.json();
  },
  toggleTask: async (id: number) => {
    const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: true }), // Assuming you want to toggle to completed
    });
    if (!response.ok) {
      throw new Error('Failed to toggle task');
    }
    return response.json();
  },
  deleteTask: async (id: number) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    return response.json();
  },
};

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>(
    'all'
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mockAPI.getTasks().then((fetchedTasks: Task[]) => {
      setTasks(fetchedTasks);
      setIsLoading(false);
    });
  }, []);

  const addTask = async (text: string) => {
    const newTask = (await mockAPI.addTask(text)) as Task;
    setTasks([...tasks, newTask]);
  };

  const toggleTask = async (id: number) => {
    await mockAPI.toggleTask(id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = async (id: number) => {
    await mockAPI.deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto rounded-lg shadow-md overflow-hidden p-8">
      <h1 className="text-3xl font-bold text-center mb-8">To-Do App</h1>
      <TaskForm onAddTask={addTask} />
      <Filter currentFilter={filter} onFilterChange={setFilter} />
      {isLoading ? (
        <p className="text-center mt-4">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      )}
    </div>
  );
}

export default App;
