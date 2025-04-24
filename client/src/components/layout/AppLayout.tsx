import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import PWAInstallButton from '../common/PWAInstallButton';

// Bootstrap sidebar width
const sidebarWidth = 280;

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    // Bootstrap JS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      document.body.removeChild(script);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="d-flex min-vh-100 bg-light w-100">
      {isAuthenticated ? (
        <>
          {/* Mobile header */}
          {isMobile && (
            <nav className="navbar navbar-expand-lg fixed-top bg-white shadow-sm">
              <div className="container-fluid">
                <button 
                  className="navbar-toggler border-0" 
                  type="button" 
                  onClick={handleSidebarToggle}
                >
                  <i className="bi bi-list"></i>
                </button>
                <a className="navbar-brand d-flex align-items-center" href="/">
                  <img src="/logo.svg" alt="OncoTracker" height="32" className="me-2" />
                  <span className="fw-bold text-primary">OncoTracker</span>
                </a>
              </div>
            </nav>
          )}

          {/* Sidebar */}
          <div 
            className={`sidebar bg-white ${isMobile ? 'mobile-sidebar' : 'desktop-sidebar'} ${sidebarOpen ? 'show' : ''}`} 
            style={{ 
              width: sidebarWidth,
              position: isMobile ? 'fixed' : 'sticky',
              top: 0,
              left: 0,
              height: '100vh',
              zIndex: isMobile ? 1045 : 1,
              transform: isMobile && !sidebarOpen ? `translateX(-${sidebarWidth}px)` : 'translateX(0)',
              transition: 'transform 0.3s ease-in-out',
              boxShadow: isMobile ? '0 0.5rem 1rem rgba(0, 0, 0, 0.15)' : 'none',
              borderRight: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            {isMobile && (
              <div className="d-flex justify-content-end p-2">
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleSidebarToggle}
                  aria-label="Close"
                ></button>
              </div>
            )}
            <Sidebar closeSidebar={isMobile ? handleSidebarToggle : undefined} />
          </div>

          {/* Backdrop for mobile */}
          {isMobile && sidebarOpen && (
            <div 
              className="sidebar-backdrop"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1040
              }}
              onClick={handleSidebarToggle}
            ></div>
          )}

          {/* Main content */}
          <main 
            className="flex-grow-1 p-3 p-lg-4 overflow-auto" 
            style={{ 
              marginTop: isMobile ? '56px' : 0,
              marginLeft: isMobile ? 0 : `${sidebarWidth}px`,
              width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
              maxWidth: '1600px'
            }}
          >
            <div className="mx-auto w-100" style={{ maxWidth: '1200px' }}>
              <Outlet />
            </div>
            <PWAInstallButton />
          </main>
        </>
      ) : (
        // Non-authenticated layout
        <div className="d-flex flex-column min-vh-100 w-100">
          <Header />
          <main className="flex-grow-1 w-100 p-3 p-md-4">
            <div className="container-lg d-flex flex-column w-100">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default AppLayout; 