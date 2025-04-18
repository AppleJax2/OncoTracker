import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNetwork } from '../../hooks/useNetwork';
import Sidebar from './Sidebar';
import {
  Bars3Icon,
  XMarkIcon,
  WifiIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { user, logout } = useAuth();
  const { online, connectionQuality, offlineSubmissionsCount, syncNow, syncingOfflineData } = useNetwork();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex max-w-xs w-full">
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
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
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white">
          <Sidebar />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 bg-white shadow">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                type="button"
                className="lg:hidden -ml-2 mr-2 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                OncoTracker
              </h1>
            </div>
            <div className="flex items-center ml-4 md:ml-6">
              {/* Network status indicator */}
              <div className="mr-3 flex items-center">
                <WifiIcon 
                  className={`h-5 w-5 mr-1 ${
                    !online 
                      ? 'text-red-500' 
                      : connectionQuality === 'poor' 
                      ? 'text-yellow-500' 
                      : 'text-green-500'
                  }`} 
                />
                <span className="text-sm text-gray-600">
                  {!online 
                    ? 'Offline' 
                    : connectionQuality === 'poor' 
                    ? 'Weak Connection' 
                    : 'Online'}
                </span>
              </div>

              {/* Sync button for offline submissions */}
              {offlineSubmissionsCount > 0 && (
                <button
                  onClick={syncNow}
                  disabled={!online || syncingOfflineData}
                  className={`mr-3 flex items-center px-3 py-1.5 text-sm rounded-md ${
                    !online || syncingOfflineData
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  <CloudArrowUpIcon className="h-4 w-4 mr-1" />
                  <span>
                    {syncingOfflineData 
                      ? 'Syncing...' 
                      : `Sync (${offlineSubmissionsCount})`}
                  </span>
                </button>
              )}

              {/* Settings */}
              <Link
                to="/settings"
                className="p-1 rounded-full text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span className="sr-only">Settings</span>
                <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="ml-3 p-1 rounded-full text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span className="sr-only">Logout</span>
                <ArrowLeftOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 pb-8">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout; 