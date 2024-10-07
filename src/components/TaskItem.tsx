import { CheckCircle, Circle, Trash2 } from 'lucide-react';
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task; // Prop type for a single task
  onToggle: () => void;
  onDelete: () => void;
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
      <div className="flex items-center space-x-3">
        <button onClick={onToggle} className="focus:outline-none">
          {task.completed ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400" />
          )}
        </button>
        <span
          className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
        >
          {task.text}
        </span>
      </div>
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 focus:outline-none"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </li>
  );
}

export default TaskItem;
