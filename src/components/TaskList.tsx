import TaskItem from './TaskItem';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[]; // Prop type for the list of tasks
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  return (
    <ul className="space-y-2">
      {tasks.length > 0
        ? tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => onToggleTask(task.id)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))
        : null}
    </ul>
  );
}

export default TaskList;
