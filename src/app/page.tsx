"use client";
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react';
import { NewToDoForm } from './_components/new-todo-form';
import { ToDoList } from './_components/to-do-list';
import { SignInButton, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Authenticated>
        <div className="w-full max-w-3xl mx-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-800">My Tasks</h1>
            <UserButton />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <ToDoList />
            <NewToDoForm />
          </div>
        </div>
      </Authenticated>

      <Unauthenticated>
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-semibold text-gray-700">Welcome to TaskMaster</h2>
          <p className="text-gray-500">Organize your life and boost your productivity</p>
          <SignInButton>
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-300">
              Sign In
            </button>
          </SignInButton>
        </div>
      </Unauthenticated>

      <AuthLoading>
        <p>Loading...</p>
      </AuthLoading>
    </div>
  );
}
