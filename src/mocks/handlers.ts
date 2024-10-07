import { http, HttpResponse } from 'msw';

// Define the interface for newTodo
interface Todo {
  text: string;
  completed: boolean;
}

let todos = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build a To-Do App', completed: true },
  { id: 3, text: 'Master Tailwind CSS', completed: false },
];

export const handlers = [
  // Handler to fetch all todos
  http.get('/tasks', () => {
    return HttpResponse.json(todos);
  }),

  // Handler to add a new todo
  http.post('/tasks', async ({ request }) => {
    const newTodo = await request.json();
    return HttpResponse.json(
      { id: todos.length + 1, ...(newTodo as Todo) },
      { status: 201 }
    );
  }),

  // Handler to toggle the completed field of a todo
  http.put('/tasks/:id/toggle', ({ params }) => {
    const { id } = params;
    const todo = todos.find((todo) => todo.id === Number(id));
    if (todo) {
      todo.completed = !todo.completed; // Toggle the completed field
      return HttpResponse.json(todo);
    }
    return HttpResponse.json({ message: 'Todo not found', status: 201 });
  }),

  // Handler to delete a todo
  http.delete('/tasks/:id', ({ params }) => {
    const { id } = params;
    todos = todos.filter((todo) => todo.id !== Number(id));
    return HttpResponse.json({ message: 'Todo deleted' });
  }),
];
