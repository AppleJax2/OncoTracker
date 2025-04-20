import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  closeSidebar?: () => void;
}

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Patients', href: '/patients', icon: UsersIcon },
    { name: 'Active Studies', href: '/studies/active', icon: ClipboardDocumentCheckIcon },
    { name: 'All Studies', href: '/studies', icon: ClipboardDocumentListIcon },
    { name: 'Reports', href: '/reports', icon: ChartBarIcon },
    { name: 'Archive', href: '/archive', icon: ArchiveBoxIcon },
  ];

  return (
    <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
      <div className="flex items-center flex-shrink-0 px-4">
        <img 
          className="h-8 w-auto" 
          src="/logo.svg" 
          alt="OncoTracker Logo" 
        />
        <span className="ml-2 text-xl font-bold text-primary-700">OncoTracker</span>
      </div>
      <div className="mt-5 flex-1 flex flex-col">
        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
              onClick={closeSidebar}
            >
              <item.icon
                className="mr-3 flex-shrink-0 h-6 w-6 text-gray-500"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      {user && (
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="h-9 w-9 bg-primary-200 text-primary-700 rounded-full flex items-center justify-center">
              <span className="text-base font-medium">{user.firstName.charAt(0)}</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user.firstName}</p>
              <p className="text-xs font-medium text-gray-500">{user.clinicName || 'Veterinarian'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar; 