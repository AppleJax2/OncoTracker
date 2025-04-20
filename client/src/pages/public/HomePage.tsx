// Placeholder HomePage Component
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-slate-800 mb-4">Welcome to OncoTracker</h1>
      <p className="text-lg text-slate-600 mb-8">
        Monitor pet cancer treatment side effects easily and effectively.
      </p>
      <div className="space-x-4">
        <Link 
          to="/login"
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </Link>
        <Link 
          to="/signup"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default HomePage; 