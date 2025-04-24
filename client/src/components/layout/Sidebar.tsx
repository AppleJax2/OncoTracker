import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  closeSidebar?: () => void;
}

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Define navigation based on user role
  const petParentNavigation = [
    { name: 'Dashboard', href: '/pet-parent/dashboard', icon: 'bi-house' },
    { name: 'Add New Pet', href: '/pet-parent/pets/new', icon: 'bi-plus-circle' },
    { name: 'Find Veterinarian', href: '/pet-parent/find-vets', icon: 'bi-people' },
    { name: 'Settings', href: '/settings', icon: 'bi-gear' },
  ];
  
  const vetNavigation = [
    { name: 'Dashboard', href: '/vet/dashboard', icon: 'bi-house' },
    { name: 'Link Requests', href: '/vet/link-requests', icon: 'bi-people' },
    { name: 'Settings', href: '/settings', icon: 'bi-gear' },
  ];
  
  const navigation = user?.role === 'vet' ? vetNavigation : petParentNavigation;
  
  const handleViewProfile = () => {
    navigate('/settings');
    if (closeSidebar) {
      closeSidebar();
    }
  };

  return (
    <div className="d-flex flex-column h-100 pt-2 pb-2 overflow-auto">
      {/* Logo */}
      <div className="d-flex align-items-center px-3 mb-3">
        <div className="bg-primary bg-opacity-10 p-2 rounded">
          <i className="bi bi-heart text-primary fs-4"></i>
        </div>
        <h5 className="ms-2 fw-bold mb-0">
          <span className="text-primary">Onco</span>Tracker
        </h5>
      </div>
      
      {/* User info at top for mobile view */}
      {user && (
        <div className="d-flex d-md-none align-items-center px-3 mb-3">
          <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            {user.firstName ? user.firstName.charAt(0) : 'U'}
          </div>
          <div className="ms-2">
            <div className="fw-medium text-dark">{user.firstName || 'User'} {user.lastName || ''}</div>
            <small className="text-muted text-capitalize">{user.role === 'pet-parent' ? 'Pet Parent' : user.role || 'Unknown'}</small>
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <div className="flex-grow-1">
        <div className="px-3 mb-1">
          <small className="fw-semibold text-uppercase text-muted letter-spacing-1">Main</small>
        </div>
        
        <nav className="nav flex-column px-2">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={closeSidebar}
                className={`nav-link py-2 px-3 mb-1 rounded ${isActive ? 'active bg-primary bg-opacity-10 text-primary' : 'text-dark'}`}
              >
                <div className="d-flex align-items-center">
                  <i className={`${item.icon} ${isActive ? 'text-primary' : 'text-muted'} me-3`}></i>
                  <span className="fw-medium fs-6">{item.name}</span>
                </div>
              </NavLink>
            );
          })}
        </nav>
        
        {user?.role === 'pet-parent' && (
          <>
            <hr className="my-3" />
            <div className="px-3 mb-1">
              <small className="fw-semibold text-uppercase text-muted letter-spacing-1">Resources</small>
            </div>
            <nav className="nav flex-column px-2">
              <NavLink
                to="/resources"
                onClick={closeSidebar}
                className={({ isActive }) => `nav-link py-2 px-3 rounded ${isActive ? 'active bg-primary bg-opacity-10 text-primary' : 'text-dark'}`}
              >
                <div className="d-flex align-items-center">
                  <i className={`bi-clipboard ${location.pathname === '/resources' ? 'text-primary' : 'text-muted'} me-3`}></i>
                  <span className="fw-medium fs-6">Cancer Resources</span>
                </div>
              </NavLink>
            </nav>
          </>
        )}
      </div>
      
      {/* User info at bottom for desktop view */}
      {user && (
        <div className="d-none d-md-block border-top pt-3 px-3 mt-auto">
          <div className="d-flex align-items-center">
            <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
              <i className="bi bi-person"></i>
            </div>
            <div className="ms-2">
              <div className="fw-medium text-dark">{user.firstName || 'User'} {user.lastName || ''}</div>
              <small className="text-muted text-capitalize">{user.role === 'pet-parent' ? 'Pet Parent' : user.role || 'Unknown'}</small>
            </div>
          </div>
          <button 
            onClick={handleViewProfile}
            className="btn btn-link text-primary p-0 mt-1 text-decoration-none fw-medium"
            style={{ fontSize: '0.75rem' }}
          >
            View Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar; 