import React, { useContext, useEffect, useState } from 'react';
import { Todos } from '../context/Context';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowAltCircleRight } from "react-icons/fa";
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

  // Fetch todo when editing — await getByIdTodo and use returned todo to populate form.
  useEffect(() => {
    if (!isEditing || !id) return;

    let mounted = true;

    const fetchTodo = async () => {
      try {
        const todoFromService = await getByIdTodo(id);
       

        const todo = todoFromService || currentTodo;
        if (!mounted || !todo) return;

        // Normalize the date for <input type="date">
        const dueDate =
          todo?.dueDate && !todo.dueDate.includes('T')
            ? // already yyyy-mm-dd?
              todo.dueDate
            : todo?.dueDate
            ? new Date(todo.dueDate).toISOString().split('T')[0]
            : '';

        setFormData({
          title: todo.title || '',
          description: todo.description || '',
          dueDate,
        });
      } catch (err) {
        console.error('Failed to fetch todo by id', err);
      }
    };

    fetchTodo();

    return () => {
      mounted = false;
    };
    // note: getByIdTodo included because it's provided by context
  }, [isEditing, id]);

  // Keep form in sync if currentTodo changes for any reason (e.g., other parts update it)
  useEffect(() => {
    if (!isEditing || !currentTodo) return;

    const todo = currentTodo;
    setFormData({
      title: todo.title || '',
      description: todo.description || '',
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
    });
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
    <div className="max-w-2xl mx-auto px-4">
      <div className="glass-card rounded-3xl p-8 sm:p-12 animate-scale-in">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-3">
            <span className="text-gradient">{isEditing ? "Update Mission" : "New Mission"}</span>
          </h1>
          <p className="text-slate-400 font-medium tracking-tight">Define the parameters for your next objective</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Objective Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all duration-300 focus:ring-4 focus:ring-brand-primary/20"
              placeholder="e.g. Conquer the Red Planet"
              required
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Mission Intel</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all duration-300 focus:ring-4 focus:ring-brand-primary/20 resize-none"
              placeholder="Provide detailed coordinates and objectives..."
            />
          </div>

          {/* Due Date Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Deadline (Earth Time)</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all duration-300 focus:ring-4 focus:ring-brand-primary/20"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] text-white font-black py-5 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-lg tracking-wider"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Synchronizing...
              </span>
            ) : (
              isEditing ? "INITIATE UPDATE" : "LAUNCH MISSION"
            )}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center space-x-4">
           <button 
             onClick={() => navigate('/')} 
             className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-300 font-bold uppercase tracking-widest text-xs"
           >
             <FaArrowAltCircleRight className="text-xl rotate-180" />
             <span>Return to Base</span>
           </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTodo;
