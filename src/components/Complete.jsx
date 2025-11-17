import React, { useContext, useState } from 'react'
import { Todos } from '../context/Context'
import DummyData from './dummyData'
import Delete from './Delete'
import { IoCheckmarkDone } from "react-icons/io5";
function GetAllTodo() {
  const {CompleteTask  , loading , deleteTodo} = useContext(Todos)
  const [open , setOpen] = useState(false)
  const [select , setSelect] = useState(null)

  const sendDelete = (todo) => {
    setSelect(todo)
    setOpen(true)
  }
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mt-20 text-center mb-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-slide-down">
            Completed Task
          </h1>
          
          {/* Task Counter */}
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg animate-scale-in">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 font-medium">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-800">{CompleteTask?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
       {loading ? ( <DummyData/>) : (
         <div className="space-y-4">
          {CompleteTask && CompleteTask.length > 0 ? (
            CompleteTask.map((todo, index) => (
              <div
                key={todo._id}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-5 sm:p-6 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Checkbox Button */}
                  <button className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-purple-400 hover:border-purple-600 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center group self-start sm:mt-1">
                    {todo.completed ? <IoCheckmarkDone/> : ''}
                  </button>

                  {/* Content Section */}
                  <div className="flex-grow min-w-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 break-words">
                      {todo.title}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed break-words">
                      {todo.description}
                    </p>
                  </div>

                  {/* Actions Section */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 flex-shrink-0">
                    {/* Delete Button */}
                    <button onClick={() => sendDelete(todo)} className="group relative bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center space-x-2">
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Delete</span>
                    </button>

                    {/* Due Date */}
                    {todo.dueDate && (
                      <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-2 rounded-lg">
                        <svg 
                          className="w-4 h-4 text-purple-600" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs sm:text-sm font-medium text-purple-700">
                          {new Date(todo.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="inline-block bg-white rounded-2xl p-12 shadow-xl">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center animate-bounce-slow">
                  <svg 
                    className="w-12 h-12 text-purple-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Completed Task</h3>
              </div>
            </div>
          )}
        </div>
       )}
      </div>

      <style >{`
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
            transform: scale(0.9);
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
          animation: slide-up 0.6s ease-out both;
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out 0.3s both;
        }
        
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
      `}</style>
      <Delete open={open} setOpen={setOpen} select={select} del={deleteTodo}/>
    </div>
  )
}

export default GetAllTodo