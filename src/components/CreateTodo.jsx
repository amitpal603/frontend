import React, { useContext, useEffect, useState } from 'react';
import { Todos } from '../context/Context';
import { useParams, useNavigate } from 'react-router-dom';

function CreateTodo() {
  const {
    createTodo,
    currentTodo,
    updateTodo,
    getByIdTodo,
    loading,
    setLoading,
  } = useContext(Todos);

  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  // Fetch todo when editing
  useEffect(() => {
    if (!isEditing || !id) return;

    let cancelled = false;
    const fetchTodo = async () => {
      try {
        await getByIdTodo(id);
      } catch (err) {
        console.error('Failed to fetch todo by id', err);
      }
    };

    fetchTodo();

    return () => {
      cancelled = true;
    };
  }, [isEditing, id, getByIdTodo]);

  // Populate formData when currentTodo arrives
  useEffect(() => {
    if (isEditing && currentTodo) {
      setFormData({
        title: currentTodo.title || '',
        description: currentTodo.description || '',
        // convert to yyyy-mm-dd for <input type="date">
        dueDate: currentTodo.dueDate
          ? new Date(currentTodo.dueDate).toISOString().split('T')[0]
          : '',
      });
    }
  }, [isEditing, currentTodo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await updateTodo(id, formData);
      } else {
        await createTodo(formData);
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mt-20 text-center mb-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-2 animate-slide-down">
            {isEditing ? 'Update Task' : 'Add New Task'}
          </h1>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 transform transition-all duration-300 hover:shadow-2xl animate-scale-in"
        >
          <div className="space-y-6">
            {/* Title Input */}
            <div className="group">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600"
              >
                Task Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your task title..."
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 placeholder-gray-400 hover:border-gray-300"
                required
              />
            </div>

            {/* Description Textarea */}
            <div className="group">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add task description or notes..."
                rows="4"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder-gray-400 resize-none hover:border-gray-300"
              />
            </div>

            {/* Due Date Input */}
            <div className="group">
              <label
                htmlFor="dueDate"
                className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-pink-600"
              >
                Due Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 hover:border-gray-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="hover:cursor-pointer w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-60"
            >
              <span>{loading ? 'Saving ..' : isEditing ? 'Update Todo' : 'Create Todo'}</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </form>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-2 animate-bounce-slow">
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-75"></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.2s both;
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out 0.3s both;
        }
        
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        
        .delay-75 {
          animation-delay: 75ms;
        }
        
        .delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
}

export default CreateTodo;
