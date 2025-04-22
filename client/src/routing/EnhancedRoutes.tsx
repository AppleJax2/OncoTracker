import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Fade } from '@mui/material';

// Import our enhanced dashboard components
import PetParentDashboard from '../pages/dashboard/OwnerDashboardNew';
import PetDetailNew from '../pages/dashboard/PetDetailNew';

// Helper component for pet detail route redirection
const PetDetailRedirect: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  return <Navigate to={`/pet-parent/pets/${petId}/enhanced`} replace />;
};

// This component defines the routes for our enhanced pet parent pages
// It can be integrated into the main App.tsx routing
const EnhancedRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Enhanced Pet Parent Dashboard */}
      <Route 
        path="dashboard/enhanced" 
        element={
          <Fade in={true} timeout={500}>
            <div>
              <PetParentDashboard />
            </div>
          </Fade>
        } 
      />
      
      {/* Enhanced Pet Detail Page */}
      <Route 
        path="pets/:petId/enhanced" 
        element={
          <Fade in={true} timeout={500}>
            <div>
              <PetDetailNew />
            </div>
          </Fade>
        } 
      />

      {/* Redirect legacy URLs to enhanced versions */}
      <Route 
        path="dashboard" 
        element={<Navigate to="/pet-parent/dashboard/enhanced" replace />} 
      />
      
      <Route 
        path="pets/:petId" 
        element={<PetDetailRedirect />} 
      />
    </Routes>
  );
};

// Instructions for integrating into the main App.tsx:
// 
// 1. Import the EnhancedRoutes component in App.tsx:
//    import EnhancedRoutes from './routing/EnhancedRoutes';
//
// 2. Replace the existing dashboard routes with EnhancedRoutes:
//    Example:
//    <Routes>
//      {/* Auth Routes */}
//      <Route path="/login" element={<LoginPage />} />
//      <Route path="/signup" element={<SignupPage />} />
//      
//      {/* Protected Routes */}
//      <Route element={<ProtectedRoute />}>
//        {/* Using our enhanced routes */}
//        <Route path="/owner/*" element={<EnhancedRoutes />} />
//        
//        {/* Other routes remain the same */}
//        <Route path="/vet/dashboard" element={<VetDashboard />} />
//        {/* ... other routes ... */}
//      </Route>
//      
//      {/* Public Routes */}
//      <Route path="/" element={<HomePage />} />
//      <Route path="*" element={<Navigate to="/" replace />} />
//    </Routes>

export default EnhancedRoutes; 