import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
// import { NetworkProvider } from './contexts/NetworkContext'; // Keep if needed, remove if not

// Layout Components
import AppLayout from './components/layout/AppLayout'; // Assume a main layout component exists

// Common Components
import LoadingSpinner from './components/common/LoadingSpinner'; // Assume a loading spinner exists

// Enhanced Routes
import EnhancedRoutes from './routing/EnhancedRoutes';

// --- Page Imports (Create these files later) ---

// Public Pages
import HomePage from './pages/public/HomePage'; // Create this
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage'; // Rename/create from RegisterPage

// Pet Parent Pages
import PetParentDashboard from './pages/dashboard/OwnerDashboardNew'; // Renamed for clarity
import PetDetail from './pages/dashboard/PetDetail'; // Create this
import ReportForm from './pages/dashboard/ReportForm'; // Create this
import AddPetForm from './pages/dashboard/AddPetForm'; // Create this
import FindVetPage from './pages/dashboard/FindVetPage'; // Create this
import ResourcesPage from './pages/dashboard/ResourcesPage'; // New Resources Page

// Vet Pages
import VetDashboard from './pages/dashboard/VetDashboard'; // Create this
import VetPatientDetail from './pages/dashboard/VetPatientDetail'; // Create this (can reuse PetDetail?)
import LinkRequestsPage from './pages/dashboard/LinkRequestsPage'; // Create this

// Common Protected Pages
import SettingsPage from './pages/dashboard/SettingsPage'; // Create this
import NotFoundPage from './pages/public/NotFoundPage'; // Create this

// --- Protected Route Components ---

// Component to handle redirects based on auth status
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>; // Full screen loader
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Component to restrict access based on role
const RoleBasedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Ensure user exists and has a role property
  if (!user) {
    console.error('User object is null or undefined despite authentication');
    return <Navigate to="/login" replace />;
  }

  // Default to 'pet-parent' role if none is specified
  const userRole = user.role || 'pet-parent';
  console.log('Current user role for route check:', userRole);

  // Normalize owner role to pet-parent for routing purposes
  const normalizedRole = userRole === 'owner' ? 'pet-parent' : userRole;
  
  // Check if normalized user role is allowed
  const isAllowed = allowedRoles.includes(normalizedRole);
  const isVerifiedVet = normalizedRole !== 'vet' || user.isVerified === true;

  if (isAllowed && isVerifiedVet) {
    return <Outlet />;
  } else if (normalizedRole === 'vet' && !user.isVerified) {
    // Redirect unverified vets to a specific page
    return <Navigate to="/vet-verification-pending" replace />;
  } else {
    // Redirect to the appropriate dashboard based on role
    const fallbackPath = normalizedRole === 'vet' ? '/vet/dashboard' : '/pet-parent/dashboard';
    console.log('Redirecting to fallback path:', fallbackPath);
    return <Navigate to={fallbackPath} replace />;
  }
};

// Custom redirect component to handle role-based redirects
const RoleBasedRedirect = () => {
  const { user } = useAuth();
  const userRole = user?.role || 'pet-parent';
  const normalizedRole = userRole === 'owner' ? 'pet-parent' : userRole;
  const redirectPath = normalizedRole === 'vet' ? '/vet/dashboard' : '/pet-parent/dashboard';
  return <Navigate to={redirectPath} replace />;
};

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Verification Pending Route (Example) */}
      <Route path="/vet-verification-pending" element={<div><h1>Verification Pending</h1><p>Your veterinarian account is awaiting verification.</p></div>} />

      {/* --- Protected Routes --- */}
      <Route element={<ProtectedRoute />}> { /* Checks if logged in */}
        <Route element={<AppLayout />}> { /* Wraps protected pages with common layout */}

          {/* Routes accessible by both authenticated pet parents and verified vets */}
          <Route element={<RoleBasedRoute allowedRoles={['pet-parent', 'vet']} />}>
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Pet Parent Routes - using EnhancedRoutes for improved UX */}
          <Route element={<RoleBasedRoute allowedRoles={['pet-parent']} />}>
            <Route path="/pet-parent/*" element={<EnhancedRoutes />} />
          </Route>

          {/* Vet Routes */}
          <Route element={<RoleBasedRoute allowedRoles={['vet']} />}>
            <Route path="/vet/dashboard" element={<VetDashboard />} />
            <Route path="/vet/patients/:petId" element={<VetPatientDetail />} />
            <Route path="/vet/link-requests" element={<LinkRequestsPage />} />
          </Route>

          {/* Catch-all redirect for authenticated users */}
          <Route path="*" element={<RoleBasedRedirect />} />

        </Route> { /* End AppLayout */}
      </Route> { /* End ProtectedRoute */}

      {/* Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
};

export default App;
