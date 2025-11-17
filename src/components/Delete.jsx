import React from 'react'
import { createPortal } from 'react-dom'

function Delete({ open,setOpen,del,select }) {
  const model = document.getElementById('Portal')

  if (!model || !open) return null
    const removeTodo = () => {
      del(select._id)
      setOpen(false)
    }
  return createPortal(
    <div onClick={() => setOpen(false)} className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="flex justify-end mb-4">
          <h1 onClick={() => setOpen(false)} className="text-2xl font-bold text-gray-700 cursor-pointer hover:text-gray-900">
            X
          </h1>
        </div>

        <div className="mb-6">
          <p className="text-lg text-gray-600 text-center">
            You are sure delete this todo
          </p>
        </div>

        <div className="flex gap-4">
          <button onClick={() => setOpen(false)} className=" hover:cursor-pointer hover:rounded-full flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={removeTodo} className=" hover:cursor-pointer hover:rounded-full flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors shadow-lg">
            Delete
          </button>
        </div>
      </div>
    </div>,
    model
  )
}

export default Delete