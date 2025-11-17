import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-6">
      <div className=" mt-20 max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-8 sm:p-12 text-center">
        {/* Illustration */}
        <div className="mx-auto w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 mb-6">
          <svg
            className="w-24 h-24 text-purple-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75v-.375a3.75 3.75 0 017.5 0V9.75M8.25 17.25h7.5M12 3v1.5M6.75 7.5l1.06 1.06M17.19 7.5l-1.06 1.06" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3">
          404 — Page not found
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 sm:text-lg mb-6">
          Looks like the page you’re trying to reach doesn’t exist or has moved.
          Check the URL or go back home.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white font-semibold shadow-lg hover:scale-[1.02] transform transition"
            aria-label="Go to homepage"
          >
            Go home
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M12 3l9 9-9 9" />
            </svg>
          </button>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-lg bg-white border border-gray-200 text-gray-700 font-medium shadow-sm hover:shadow-md transition"
            aria-label="Go back"
          >
            Go back
          </button>
        </div>

        {/* Footnote */}
        <p className="mt-6 text-xs text-gray-400">
          If you think this is a bug, contact support or try refreshing the page.
        </p>
      </div>
    </main>
  );
}

export default NotFound;
