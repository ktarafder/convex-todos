import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export function NewToDoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createTodo = useMutation(api.functions.createTodo);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '') return;
    await createTodo({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10">
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Add a new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Add details (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
