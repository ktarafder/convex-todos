"use client";

import { NewToDoForm } from './_components/new-todo-form';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

export default function Home() {

  const todos = useQuery(api.functions.listTodos);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-4xl font-bold text-white mb-10">My Cool To-Do List</h1>
      <ul className="space-y-4 w-full max-w-md">
        {todos?.map(({ _id, title, description, completed }, index) => (
          <ToDoItem
            key={index}
            id = {_id}
            title={title}
            description={description}
            completed={completed}
          />
        ))}
      </ul>
      <NewToDoForm />
    </div>
  );
}

function ToDoItem({
  id,
  title,
  description,
  completed,
}: {
  id: Id<"todos">;
  title: string;
  description: string;
  completed: boolean;
}) {
  const updateTodo = useMutation(api.functions.updateTodo);
  const deleteTodo = useMutation(api.functions.deleteTodo);
  return (
    <li className={`flex items-center gap-4 p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-out ${completed ? 'bg-green-200' : 'bg-white'} hover:scale-105`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => updateTodo({ id, completed: e.target.checked })}
        className="form-checkbox h-6 w-6 text-green-500"
      />
      <div className="flex flex-col flex-grow">
        <p className={`font-semibold text-xl ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        type="button"
        className="text-red-500 hover:text-red-700"
        onClick={() => deleteTodo({ id })}
      >
        Remove
      </button>
    </li>
  );
}
