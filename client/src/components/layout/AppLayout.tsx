import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated ? (
        <div className="flex h-screen overflow-hidden">
          {/* Mobile sidebar */}
          <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? 'visible' : 'invisible'}`} role="dialog" aria-modal="true">
            {/* Sidebar backdrop */}
            <div 
              className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${sidebarOpen ? 'opacity-100 ease-out duration-300' : 'opacity-0 ease-in duration-200'}`} 
              aria-hidden="true"
              onClick={() => setSidebarOpen(false)}
            ></div>
            
            {/* Sidebar panel */}
            <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transition ${sidebarOpen ? 'transform translate-x-0 ease-out duration-300' : 'transform -translate-x-full ease-in duration-200'}`}>
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <Sidebar closeSidebar={() => setSidebarOpen(false)} />
            </div>
          </div>
          
          {/* Static sidebar for desktop */}
          <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64">
              <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white shadow-soft">
                <Sidebar />
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex flex-col w-0 flex-1 overflow-hidden">
            <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm md:hidden">
              <button
                type="button"
                className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 px-4 flex justify-between">
                <div className="flex-1 flex items-center">
                  <img className="h-8 w-auto" src="/logo.svg" alt="OncoTracker" />
                  <span className="ml-2 text-xl font-bold text-primary-700">OncoTracker</span>
                </div>
              </div>
            </div>
            
            <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50 pb-6">
              <div className="py-6 px-4 sm:px-6 lg:px-8">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      ) : (
        // Non-authenticated layout
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default AppLayout; 