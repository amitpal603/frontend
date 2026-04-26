import React, { useContext } from 'react'
import { Todos } from '../context/Context'

function TaskStatus() {
  const {todos , ActiveTask , CompleteTask} = useContext(Todos)
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="glass-card rounded-3xl p-8 sm:p-12 animate-scale-in">
        <h1 className="text-4xl font-black mb-10 text-center tracking-tight">
          <span className="text-gradient">Mission Analytics</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Tasks */}
          <div className="glass-card rounded-2xl p-6 border-white/5 hover:border-brand-primary/30 transition-colors duration-500">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Total Fleet</p>
            <p className="text-5xl font-black text-white">{todos.length || 0}</p>
            <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-brand-primary w-full opacity-50"></div>
            </div>
          </div>

          {/* Active Tasks */}
          <div className="glass-card rounded-2xl p-6 border-white/5 hover:border-amber-500/30 transition-colors duration-500">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Active Missions</p>
            <p className="text-5xl font-black text-white">{ActiveTask.length || 0}</p>
            <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 transition-all duration-1000" 
                style={{ width: `${(ActiveTask.length / (todos.length || 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Complete Tasks */}
          <div className="glass-card rounded-2xl p-6 border-white/5 hover:border-emerald-500/30 transition-colors duration-500">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Completed Ops</p>
            <p className="text-5xl font-black text-white">{CompleteTask.length || 0}</p>
            <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-1000" 
                style={{ width: `${(CompleteTask.length / (todos.length || 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Efficiency Metric */}
        <div className="mt-10 p-6 glass-card rounded-2xl border-white/5 bg-white/5 overflow-hidden relative">
           <div className="relative z-10">
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Efficiency Rating</p>
             <p className="text-2xl font-bold text-white">
               {todos.length ? Math.round((CompleteTask.length / todos.length) * 100) : 0}% 
               <span className="text-slate-500 text-sm font-medium ml-2">Mission Success Rate</span>
             </p>
           </div>
           <div 
             className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand-primary to-emerald-500 transition-all duration-1000" 
             style={{ width: `${(CompleteTask.length / (todos.length || 1)) * 100}%` }}
           ></div>
        </div>
      </div>
    </div>
  )
}

export default TaskStatus