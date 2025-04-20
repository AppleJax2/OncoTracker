import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  HomeIcon,
  PlusCircleIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ClipboardDocumentCheckIcon,
  HeartIcon,
  UserIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  closeSidebar?: () => void;
}

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Define navigation based on user role
  const ownerNavigation = [
    { name: 'Dashboard', href: '/owner/dashboard', icon: HomeIcon },
    { name: 'Add New Pet', href: '/owner/pets/new', icon: PlusCircleIcon },
    { name: 'Find Veterinarian', href: '/owner/find-vets', icon: UserGroupIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];
  
  const vetNavigation = [
    { name: 'Dashboard', href: '/vet/dashboard', icon: HomeIcon },
    { name: 'Link Requests', href: '/vet/link-requests', icon: UserGroupIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];
  
  const navigation = user?.role === 'vet' ? vetNavigation : ownerNavigation;

  return (
    <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
      <div className="flex items-center flex-shrink-0 px-4">
        <div className="bg-primary-100 p-2 rounded-lg">
          <HeartIcon className="h-8 w-8 text-primary-600" />
        </div>
        <span className="ml-3 text-xl font-bold text-primary-700">OncoTracker</span>
      </div>
      
      {/* User info at top for mobile view */}
      {user && (
        <div className="flex items-center px-4 mt-4 mb-6 md:hidden">
          <div className="h-10 w-10 bg-warm-100 text-warm-600 rounded-full flex items-center justify-center">
            <span className="text-base font-medium">{user.firstName.charAt(0)}</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{user.firstName} {user.lastName}</p>
            <p className="text-xs font-medium text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      )}
      
      <div className="mt-5 flex-1 flex flex-col">
        <nav className="flex-1 px-2 space-y-2">
          <div className="mb-4">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main
            </p>
          </div>
          
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition duration-150 ease-in-out ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                }`
              }
              onClick={closeSidebar}
            >
              <item.icon
                className={`mr-3 flex-shrink-0 h-5 w-5 ${
                  location.pathname.startsWith(item.href) 
                    ? 'text-primary-500' 
                    : 'text-gray-400 group-hover:text-primary-500'
                }`}
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
          
          {user?.role === 'owner' && (
            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="mb-4">
                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Resources
                </p>
              </div>
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition duration-150 ease-in-out ${
                    isActive
                      ? 'bg-warm-50 text-warm-700'
                      : 'text-gray-700 hover:bg-warm-50 hover:text-warm-700'
                  }`
                }
                onClick={closeSidebar}
              >
                <ClipboardDocumentCheckIcon
                  className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-warm-500"
                  aria-hidden="true"
                />
                Cancer Resources
              </NavLink>
            </div>
          )}
        </nav>
      </div>
      
      {/* User info at bottom for desktop view */}
      {user && (
        <div className="hidden md:flex md:flex-shrink-0 md:flex-col border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="h-9 w-9 bg-warm-100 text-warm-600 rounded-full flex items-center justify-center">
              <UserIcon className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user.firstName} {user.lastName}</p>
              <p className="text-xs font-medium text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={() => {/* Handle profile */}}
            className="mt-3 text-xs text-primary-600 hover:text-primary-800 font-medium"
          >
            View Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar; 