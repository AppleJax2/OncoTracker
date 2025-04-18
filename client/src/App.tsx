import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NetworkProvider } from './contexts/NetworkContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Dashboard Pages
import DashboardPage from './pages/dashboard/DashboardPage';

// Public Pages
import StudyPage from './pages/public/StudyPage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NetworkProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/study/:accessToken" element={<StudyPage />} />
            
            {/* Protected Routes (use ProtectedRoute component as wrapper) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              
              {/* These routes will be implemented later */}
              <Route path="/patients" element={<h1>Patients Page</h1>} />
              <Route path="/patients/new" element={<h1>New Patient Page</h1>} />
              <Route path="/patients/:id" element={<h1>Patient Details Page</h1>} />
              
              <Route path="/studies" element={<h1>All Studies Page</h1>} />
              <Route path="/studies/active" element={<h1>Active Studies Page</h1>} />
              <Route path="/studies/new" element={<h1>New Study Page</h1>} />
              <Route path="/studies/:id" element={<h1>Study Details Page</h1>} />
              
              <Route path="/reports" element={<h1>Reports Page</h1>} />
              <Route path="/archive" element={<h1>Archive Page</h1>} />
              <Route path="/settings" element={<h1>Settings Page</h1>} />
            </Route>
            
            {/* Redirect to login or dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </NetworkProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
