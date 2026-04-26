import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, CheckSquare } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
     { to: "/create", label: "Create Task" },
    { to: "/", label: "All Tasks" },
    { to: "/pending", label: "Pending" },
    { to: "/complete", label: "Completed" },
    { to: "/status", label: "Status" }
   
  ];

  return (
    <nav className="fixed z-50 w-full glass-nav text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo with Icon */}
          <div className="flex items-center space-x-3">
            <div className="bg-brand-primary/20 p-2 rounded-xl border border-brand-primary/30">
              <CheckSquare className="w-6 h-6 sm:w-7 sm:h-7 text-brand-primary" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              <Link to="/" className="text-gradient hover:opacity-80 transition-all duration-300">
                TodoSphere
              </Link>
            </h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-2">
            {links.map((link, index) => (
              <li key={index}>
                <Link 
                  to={link.to}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/5 active:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/10"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger button */}
          <button 
            className="md:hidden p-2.5 rounded-xl hover:bg-white/5 active:bg-white/10 transition-all duration-300 border border-white/5"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with smooth animation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="bg-slate-900/95 backdrop-blur-xl px-4 py-4 space-y-2 border-t border-white/10">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.to}
                className="block px-5 py-3.5 rounded-xl text-base font-medium hover:bg-white/5 active:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/5"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;