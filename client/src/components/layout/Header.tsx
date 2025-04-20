import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeftOnRectangleIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'; // Example icons

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    // Navigate might happen automatically via context/route changes, or redirect here
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/" className="text-2xl font-bold text-sky-600 hover:text-sky-700">
          OncoTracker
        </Link>

        {/* Navigation/User Actions */}
        <div className="flex items-center space-x-4">
          {isAuthenticated && user ? (
            <>
              <span className="text-sm text-slate-600 hidden sm:inline">
                Welcome, {user.firstName} ({user.role === 'vet' ? 'Veterinarian' : 'Pet Owner'})
              </span>
              {/* Settings Link */}
              <Link
                to="/settings"
                className="p-2 text-slate-500 hover:text-sky-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                title="Settings"
              >
                <Cog6ToothIcon className="h-6 w-6" />
              </Link>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 text-slate-500 hover:text-red-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                title="Logout"
              >
                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header; 