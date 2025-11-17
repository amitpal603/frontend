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
    <nav className=" fixed z-20 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo with Icon */}
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-6 h-6 sm:w-7 sm:h-7" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              <Link to="/" className="hover:text-gray-100 transition-colors duration-200">
                Todos
              </Link>
            </h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {links.map((link, index) => (
              <li key={index}>
                <Link 
                  to={link.to}
                  className="px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium hover:bg-white/10 active:bg-white/20 transition-all duration-200 backdrop-blur-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-all duration-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with smooth animation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="bg-gradient-to-b from-purple-700/95 to-indigo-700/95 backdrop-blur-sm px-4 pb-4 space-y-1 border-t border-white/10">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.to}
                className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-white/10 active:bg-white/20 transition-all duration-200"
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