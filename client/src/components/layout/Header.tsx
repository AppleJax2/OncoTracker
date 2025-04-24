import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    // Navigate might happen automatically via context/route changes, or redirect here
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top py-2">
      <div className="container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-brand fw-bold d-flex align-items-center">
          <span className="text-primary">Onco</span>Tracker
        </Link>

        {/* Mobile Toggle */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation/User Actions */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="ms-auto d-flex align-items-center">
            {isAuthenticated && user ? (
              <>
                <span className="text-muted d-none d-sm-block me-3">
                  Welcome, {user.firstName} ({user.role === 'vet' ? 'Veterinarian' : 'Pet Owner'})
                </span>
                
                {/* Settings Link */}
                <Link 
                  to="/settings" 
                  className="btn btn-link text-muted p-1 me-2"
                  aria-label="settings"
                >
                  <i className="bi bi-gear fs-5"></i>
                </Link>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="btn btn-link text-muted p-1"
                  aria-label="logout"
                >
                  <i className="bi bi-box-arrow-right fs-5"></i>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn btn-link text-muted text-decoration-none me-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header; 