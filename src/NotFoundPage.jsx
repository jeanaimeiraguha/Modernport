import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-200 p-4 transition-colors duration-300 ease-in-out">
      <div className="text-center">
        <FaExclamationTriangle className="text-yellow-400 text-6xl mx-auto mb-4" />
        <h1 className="text-4xl md:text-6xl font-bold mb-2">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4"><span>Page Not Found</span></h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          <span>Oops! The page you are looking for does not exist. It might have been moved or deleted.</span>
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 transition-colors"
        >
          <FaHome />
          <span>Go Back to Home</span>
        </Link>
      </div>
      <footer className="absolute bottom-4 text-sm text-gray-500 dark:text-gray-400">
        <p><span>© {new Date().getFullYear()} IRAGUHA Jean Aime</span></p>
      </footer>
    </div>
  );
};

export default NotFoundPage;