// Placeholder NotFoundPage Component
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-10">
      <h1 className="text-6xl font-bold text-sky-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-700 mb-4">Page Not Found</h2>
      <p className="text-slate-500 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link 
        to="/" 
        className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage; 