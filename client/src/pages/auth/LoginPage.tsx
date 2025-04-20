import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
// import AppError from '../../utils/appError'; // Removed unused import
import LoadingSpinner from '../../components/common/LoadingSpinner';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    console.log('=== LOGIN FORM SUBMIT ===');
    console.log('Email:', email);
    console.log('Password length:', password.length);

    try {
      console.log('Calling login function from AuthContext...');
      // The login function in AuthContext returns the user object on success
      const loggedInUser = await login({ email, password });
      
      console.log('=== LOGIN COMPLETED ===');
      console.log('Returned user data:', loggedInUser);

      // Ensure loggedInUser is not null before navigating
      if (loggedInUser) {
        console.log(`Will navigate to dashboard based on role: ${loggedInUser.role}`);
        
        // Introduce a small delay before navigation to ensure state updates
        setTimeout(() => {
          console.log('Navigating now...');
          // Navigate based on role returned directly from the successful login call
          if (loggedInUser.role === 'vet') {
            navigate('/vet/dashboard');
          } else {
            navigate('/owner/dashboard');
          }
        }, 500);
      } else {
        // This case should ideally not happen if login() succeeded without error,
        // but handle it defensively.
        console.error('Login function returned null user data despite no errors!');
        setError('Login succeeded but failed to retrieve user data. Please try again.');
      }
    } catch (err: any) {
      console.error('=== LOGIN ERROR IN PAGE ===');
      console.error('Error type:', typeof err);
      console.error('Error:', err);
      console.error('Response data:', err?.response?.data);
      
      // Attempt to get a user-friendly message from the error
      let message = 'Login failed. Please check your credentials.';
      
      if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      } else if (!navigator.onLine) {
        message = 'You appear to be offline. Please check your internet connection.';
      }
      
      console.error('Setting error message:', message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              {/* Add Forgot Password link later */}
              {/* <a href="#" className="font-medium text-sky-600 hover:text-sky-500">
                Forgot your password?
              </a> */}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <LoadingSpinner size="small" color="text-white" />
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <p className="text-slate-600">
            Don't have an account?
            <Link to="/signup" className="font-medium text-sky-600 hover:text-sky-500 ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 