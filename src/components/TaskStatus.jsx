import React, { useContext } from 'react'
import { Todos } from '../context/Context'

function TaskStatus() {
  const {todos , ActiveTask , CompleteTask} = useContext(Todos)
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
     <div className="  shadow-purple-300 mt-20 bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Task Status</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className=" shadow-lg shadow-blue-400 bg-blue-50 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 border border-blue-200">
          <p className="text-lg font-semibold text-blue-600">Total Task</p>
          <p className="text-3xl font-bold text-blue-800 mt-2">{todos.length || 0}</p>
        </div>
        <div className=" shadow-lg shadow-yellow-400 bg-yellow-50 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 border border-yellow-200">
          <p className="text-lg font-semibold text-yellow-600">Active Task</p>
          <p className="text-3xl font-bold text-yellow-800 mt-2">{ActiveTask.length || 0}</p>
        </div>
        <div className=" shadow-lg shadow-green-400 bg-green-50 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 border border-green-200">
          <p className="text-lg font-semibold text-green-600">Complete Task</p>
          <p className="text-3xl font-bold text-green-800 mt-2">{CompleteTask.length || 0}</p>
        </div>
      </div>
     </div>
    </div>
  )
}

export default TaskStatus