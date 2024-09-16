import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { TrashIcon } from '@heroicons/react/24/outline';

export function ToDoList() {
  const todos = useQuery(api.functions.listTodos);

  if (!todos?.length) {
    return (
      <p className="text-center text-gray-500">
        You have no tasks. Enjoy your free time!
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {todos.map(({ _id, title, description, completed }) => (
        <ToDoItem
          key={_id}
          id={_id}
          title={title}
          description={description}
          completed={completed}
        />
      ))}
    </ul>
  );
}

function ToDoItem({
  id,
  title,
  description,
  completed,
}: {
  id: Id<'todos'>;
  title: string;
  description: string;
  completed: boolean;
}) {
  const updateTodo = useMutation(api.functions.updateTodo);
  const deleteTodo = useMutation(api.functions.deleteTodo);

  return (
    <li
      className={`flex items-center justify-between p-4 border rounded-lg transition ${
        completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => updateTodo({ id, completed: e.target.checked })}
          className="mt-1 h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <div className="ml-4">
          <p
            className={`text-lg font-medium ${
              completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}
          >
            {title}
          </p>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
      <button
        type="button"
        className="text-red-500 hover:text-red-700"
        onClick={() => deleteTodo({ id })}
      >
        <TrashIcon className="h-6 w-6" />
      </button>
    </li>
  );
}
