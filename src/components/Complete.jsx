import React, { useContext, useState } from "react";
import { Todos } from "../context/Context";
import DummyData from "./DummyData";
import Delete from "./Delete";
import { IoCheckmarkDone } from "react-icons/io5";
import { CheckSquare } from "lucide-react";

function Complete() {
  const { CompleteTask, loading, deleteTodo } = useContext(Todos);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(null);

  const sendDelete = (todo) => {
    setSelect(todo);
    setOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-tight">
          <span className="text-gradient">Achieved Missions</span>
        </h1>

        {/* Task Counter */}
        <div className="inline-flex items-center glass-card rounded-2xl px-8 py-4 animate-scale-in">
          <div className="flex items-center space-x-4">
            <div className="bg-emerald-500/20 rounded-xl p-3 border border-emerald-500/30">
              <CheckSquare className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Completed</p>
              <p className="text-3xl font-black text-white">
                {CompleteTask?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      {loading ? (
        <DummyData />
      ) : (
        <div className="space-y-6">
          {CompleteTask && CompleteTask.length > 0 ? (
            CompleteTask.map((todo, index) => (
              <div
                key={todo._id}
                className="glass-card rounded-2xl overflow-hidden hover:border-emerald-500/50 group transform hover:-translate-y-1 transition-all duration-500 p-6 sm:p-8 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* Status Indicator */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center">
                    <IoCheckmarkDone className="text-xl text-emerald-400" />
                  </div>

                  {/* Content Section */}
                  <div className="flex-grow min-w-0">
                    <h2 className="text-slate-400 line-through text-2xl font-bold mb-2 break-words leading-tight">
                      {todo.title}
                    </h2>
                    <p className="text-slate-500 text-base leading-relaxed break-words font-medium italic">
                      {todo.description}
                    </p>
                  </div>

                  {/* Actions Section */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-4 flex-shrink-0">
                    <button
                      onClick={() => sendDelete(todo)}
                      className="p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 transition-all duration-300"
                      title="Archive Record"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                    {/* Completion Date Tag */}
                    <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-emerald-400 font-bold uppercase tracking-tighter text-xs">
                      Mission Cleared
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 animate-fade-in">
              <div className="inline-block glass-card rounded-3xl p-16 border-dashed border-2 border-white/10">
                <div className="w-24 h-24 mx-auto mb-8 bg-slate-800 rounded-2xl flex items-center justify-center">
                  <CheckSquare className="w-12 h-12 text-slate-600" />
                </div>
                <h3 className="text-3xl font-black text-white mb-3">No Trophies</h3>
                <p className="text-slate-400 font-medium max-w-xs mx-auto">Complete your first mission to see it displayed in this hall of fame.</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      <Delete open={open} setOpen={setOpen} select={select} del={deleteTodo} />
    </div>
  );
}

export default Complete;
