import React, { useContext } from 'react';
import { Todos } from '../context/Context';

function DummyData() {
  const {todos} = useContext(Todos)
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {
            Array.from({length : todos.length}).map((ele, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-gray-200 animate-pulse" />
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="h-6 w-3/4 rounded bg-gray-200 mb-3 animate-pulse" />
                    <div className="h-4 w-full max-w-lg rounded bg-gray-200 animate-pulse" />
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse" />
                    <div className="w-24 h-8 rounded-lg bg-gray-200 animate-pulse" />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default DummyData;