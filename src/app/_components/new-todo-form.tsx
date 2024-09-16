import { useState } from 'react';

type ToDoFormProps = {
    onCreate: (title: string, description: string) => void;
};

export function NewToDoForm({ onCreate }: ToDoFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title && description) {
            onCreate(title, description);
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-3 w-full max-w-md mt-8">
            <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
                type="submit"
                className="bg-indigo-600 text-white p-3 rounded-lg shadow-md hover:bg-indigo-700 transform transition-all duration-300 ease-out">
                Add
            </button>
        </form>
    );
}
