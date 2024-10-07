import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import { useEffect, useState } from 'react';

// Mock API
const mockAPI = {
  getTasks: () =>
    new Promise<Task[]>((resolve) =>
      setTimeout(
        () =>
          resolve([
            { id: 1, text: 'Learn React', completed: false },
            { id: 2, text: 'Build a To-Do App', completed: true },
            { id: 3, text: 'Master Tailwind CSS', completed: false },
          ]),
        500
      )
    ),
  addTask: (text: string) =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ id: Date.now(), text, completed: false }), 500)
    ),
  toggleTask: (id: number) =>
    new Promise((resolve) => setTimeout(() => resolve(id), 500)),
  deleteTask: (id: number) =>
    new Promise((resolve) => setTimeout(() => resolve(id), 500)),
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
    <>
      <div className="max-w-lg mx-auto rounded-lg shadow-md overflow-hidden p-8">
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
    </>
  );
}

export default App;
