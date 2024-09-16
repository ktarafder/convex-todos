"use client";

import { useState } from 'react';
import { NewToDoForm } from './_components/new-todo-form';

type ToDoItemType = {
  title: string;
  description: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<ToDoItemType[]>([
    { title: 'Buy milk', description: 'Get fresh milk from the store', completed: false },
    { title: 'Read a book', description: 'Finish reading the current book', completed: false },
    { title: 'Exercise', description: 'Do a 30-minute workout', completed: false },
  ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-4xl font-bold text-white mb-10">My Cool To-Do List</h1>
      <ul className="space-y-4 w-full max-w-md">
        {todos.map(({ title, description, completed }, index) => (
          <ToDoItem
            key={index}
            title={title}
            description={description}
            completed={completed}
            onCompleteChanged={(newValue) => {
              setTodos((prev) => {
                const newTodos = [...prev];
                newTodos[index].completed = newValue;
                return newTodos;
              });
            }}
            onRemove={() => {
              setTodos((prev) => prev.filter((_, i) => i !== index));
            }}
          />
        ))}
      </ul>
      <NewToDoForm
        onCreate={(title, description) => {
          setTodos((prev) => [
            ...prev,
            { title, description, completed: false },
          ]);
        }}
      />
    </div>
  );
}

function ToDoItem({
  title,
  description,
  completed,
  onCompleteChanged,
  onRemove,
}: {
  title: string;
  description: string;
  completed: boolean;
  onCompleteChanged: (newValue: boolean) => void;
  onRemove: () => void;
}) {
  return (
    <li className={`flex items-center gap-4 p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-out ${completed ? 'bg-green-200' : 'bg-white'} hover:scale-105`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => onCompleteChanged(e.target.checked)}
        className="form-checkbox h-6 w-6 text-green-500"
      />
      <div className="flex flex-col flex-grow">
        <p className={`font-semibold text-xl ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        type="button"
        className="text-red-500 hover:text-red-700"
        onClick={onRemove}
      >
        Remove
      </button>
    </li>
  );
}
