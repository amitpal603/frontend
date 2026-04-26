import React, { useContext, useEffect, useState } from "react";
import { Todos } from "../context/Context";
import DummyData from "./DummyData";
import Delete from "./Delete";
import { IoCheckmarkDone } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CheckSquare } from "lucide-react";

function GetAllTodo() {
  const { todos, loading, deleteTodo, singleUpdate } = useContext(Todos);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const navigate = useNavigate();

  const sendDelete = (todo) => {
    setSelect(todo);
    setOpen(true);
  };
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-tight">
          <span className="text-gradient">My Universe</span>
        </h1>

        {/* Task Counter */}
        <div className="inline-flex items-center glass-card rounded-2xl px-8 py-4 animate-scale-in">
          <div className="flex items-center space-x-4">
            <div className="bg-brand-primary/20 rounded-xl p-3 border border-brand-primary/30">
              <CheckSquare className="w-6 h-6 text-brand-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Missions</p>
              <p className="text-3xl font-black text-white">
                {todos?.length || 0}
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
          {todos && todos.length > 0 ? (
            todos.map((todo, index) => (
              <div
                key={todo._id}
                className="glass-card rounded-2xl overflow-hidden hover:border-brand-primary/50 group transform hover:-translate-y-1 transition-all duration-500 p-6 sm:p-8 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* Status Indicator */}
                  <button 
                    onClick={() => singleUpdate(todo._id, todo.completed)}
                    disabled={todo.completed}
                    className={`flex-shrink-0 w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                      todo.completed
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                        : "border-slate-600 hover:border-brand-primary group-hover:scale-110"
                    }`}
                  >
                    {todo.completed && <IoCheckmarkDone className="text-xl" />}
                  </button>

                  {/* Content Section */}
                  <div className="flex-grow min-w-0">
                    <h2 className={`${todo.completed ? 'line-through text-slate-500' : 'text-white'} text-2xl font-bold mb-2 break-words leading-tight`}>
                      {todo.title}
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed break-words font-medium">
                      {todo.description}
                    </p>
                  </div>

                  {/* Actions Section */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-4 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => navigate(`/create/${todo._id}`)}
                        disabled={todo.completed}
                        className={`${todo.completed ? 'opacity-0 scale-0' : 'opacity-100 scale-100'} p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all duration-300`}
                        title="Edit Mission"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => sendDelete(todo)}
                        className="p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 transition-all duration-300"
                        title="Abort Mission"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    {/* Due Date */}
                    {todo.dueDate && (
                      <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                        <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs font-bold text-slate-300 uppercase tracking-tighter">
                          {new Date(todo.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 animate-fade-in">
              <div className="inline-block glass-card rounded-3xl p-16 border-dashed border-2 border-white/10">
                <div className="w-24 h-24 mx-auto mb-8 bg-brand-primary/10 rounded-2xl flex items-center justify-center animate-pulse">
                  <CheckSquare className="w-12 h-12 text-brand-primary/50" />
                </div>
                <h3 className="text-3xl font-black text-white mb-3">Void Detected</h3>
                <p className="text-slate-400 font-medium max-w-xs mx-auto">No missions are currently scheduled in your universe.</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      <Delete open={open} setOpen={setOpen} select={select} del={deleteTodo} />
    </div>
  );
}

export default GetAllTodo;
