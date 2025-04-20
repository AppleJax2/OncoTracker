import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
// import { NetworkProvider } from './contexts/NetworkContext'; // Keep if needed, remove if not

// Layout Components
import AppLayout from './components/layout/AppLayout'; // Assume a main layout component exists

// Common Components
import LoadingSpinner from './components/common/LoadingSpinner'; // Assume a loading spinner exists

// --- Page Imports (Create these files later) ---

// Public Pages
import HomePage from './pages/public/HomePage'; // Create this
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage'; // Rename/create from RegisterPage

// Owner Pages
import OwnerDashboard from './pages/dashboard/OwnerDashboard'; // Create this
import PetDetail from './pages/dashboard/PetDetail'; // Create this
import ReportForm from './pages/dashboard/ReportForm'; // Create this
import AddPetForm from './pages/dashboard/AddPetForm'; // Create this
import FindVetPage from './pages/dashboard/FindVetPage'; // Create this

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

  // Check if user role is allowed
  // Add vet verification check here too
  const isAllowed = user && allowedRoles.includes(user.role);
  const isVerifiedVet = user?.role !== 'vet' || user?.isVerified === true;

  if (user && isAllowed && isVerifiedVet) {
      return <Outlet />;
  } else if (user && user.role === 'vet' && !user.isVerified) {
      // Optional: Redirect unverified vets to a specific page
      return <Navigate to="/vet-verification-pending" replace />;
  } else {
      // Redirect to a relevant dashboard or not found page if role doesn't match
      const fallbackPath = user?.role === 'vet' ? '/vet/dashboard' : '/owner/dashboard';
      return <Navigate to={fallbackPath} replace />;
  }
};

const App = () => {
  const { isLoading } = useAuth();

  // Optional: Show a global loading state while checking auth initially
  // if (isLoading) {
  //   return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  // }

  return (
    // <NetworkProvider> // Keep if needed
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

            {/* Owner Routes */}
            <Route element={<RoleBasedRoute allowedRoles={['owner']} />}>
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="/owner/pets/new" element={<AddPetForm />} />
              <Route path="/owner/pets/:petId" element={<PetDetail />} />
              <Route path="/owner/pets/:petId/report/new" element={<ReportForm />} />
              <Route path="/owner/find-vets" element={<FindVetPage />} />
            </Route>

            {/* Vet Routes */}
            <Route element={<RoleBasedRoute allowedRoles={['vet']} />}>
              <Route path="/vet/dashboard" element={<VetDashboard />} />
              <Route path="/vet/patients/:petId" element={<VetPatientDetail />} />
              <Route path="/vet/link-requests" element={<LinkRequestsPage />} />
            </Route>

            {/* Routes accessible by both authenticated owners and verified vets */}
            <Route element={<RoleBasedRoute allowedRoles={['owner', 'vet']} />}>
               <Route path="/settings" element={<SettingsPage />} />
               {/* Add other shared authenticated routes here */}
            </Route>

            {/* Fallback redirect inside protected routes (if needed) */}
            {/* <Route path="/dashboard" element={<Navigate based on role? />} /> */}

          </Route> { /* End AppLayout */}
        </Route> { /* End ProtectedRoute */}

        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    // </NetworkProvider>
  );
};

export default App;
