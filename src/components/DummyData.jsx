import React from 'react';

function DummyData() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="glass-card rounded-2xl p-6 sm:p-8 animate-pulse border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-white/10" />
            
            <div className="flex-grow space-y-3">
              <div className="h-8 w-2/3 rounded-xl bg-white/10" />
              <div className="h-5 w-full rounded-lg bg-white/5" />
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-white/10" />
              <div className="w-32 h-10 rounded-xl bg-white/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DummyData;