'use client'

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { useState } from "react";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskCreated = () => {
    setRefreshTrigger(prev => prev + 1); // Trigger refresh
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🚀 DevOps TaskTrax
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your tasks efficiently with our full-stack DevOps application
          </p>
        </header>

        <TaskForm onTaskCreated={handleTaskCreated} />
        <TaskList key={refreshTrigger} />
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Built with Next.js, Express.js, and MySQL</p>
        </footer>
      </div>
    </div>
  );
}