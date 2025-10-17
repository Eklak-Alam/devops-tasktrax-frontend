'use client';
import { useState } from 'react';

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = async () => {
    try {
      await onUpdate(task.id, editedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleComplete = async () => {
    try {
      await onUpdate(task.id, { ...task, is_completed: !task.is_completed });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className={`border rounded-lg text-gray-900 p-4 mb-3 ${task.is_completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Task title"
          />
          <textarea
            value={editedTask.description || ''}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Task description"
            rows="3"
          />
          <input
            type="date"
            value={editedTask.due_date || ''}
            onChange={(e) => setEditedTask({ ...editedTask, due_date: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start">
            <h3 className={`font-semibold text-lg ${task.is_completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-2 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-gray-600 mt-2">{task.description}</p>
          )}
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-4">
              {task.due_date && (
                <span className="text-sm text-gray-500">
                  Due: {new Date(task.due_date).toLocaleDateString()}
                </span>
              )}
              <span className="text-sm text-gray-400">
                Created: {new Date(task.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}