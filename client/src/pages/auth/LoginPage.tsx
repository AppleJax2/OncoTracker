import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css'; // We'll create this file for custom styling
import PWAInstallButton from '../../components/common/PWAInstallButton';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check for success message from signup
  useEffect(() => {
    if (location.state?.signupSuccess) {
      setSuccess('Account created successfully! Please login with your credentials.');
    }
  }, [location]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? null : 'Please enter a valid email address');
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email first
    if (!validateEmail(email)) {
      return;
    }
    
    setError(null);
    setLoading(true);

    try {
      console.log('Login attempt with:', { email });
      const loggedInUser = await login({ email, password });
      console.log('Login successful, user data received:', loggedInUser);
      
      if (loggedInUser) {
        // Get role from user object, default to 'owner' if not specified
        const userRole = loggedInUser.role || 'owner';
        console.log('User role:', userRole);
        
        // Navigate based on role
        if (userRole === 'vet') {
          navigate('/vet/dashboard');
        } else {
          // Force navigation to owner dashboard
          console.log('Navigating to owner dashboard');
          navigate('/owner/dashboard', { replace: true });
        }
      } else {
        setError('Login succeeded but user data retrieval failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Login form error:', err);
      
      let message = 'Login failed. Please check your credentials or network connection.';
      if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (err?.message) {
         if (err.message.includes('Network Error') || !navigator.onLine) {
            message = 'Network error. Please check your internet connection.'
         } else if (err.response?.status === 401) {
            message = 'Invalid email or password.';
         }
      }
      
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailFocused && e.target.value) {
      validateEmail(e.target.value);
    } else {
      setEmailError(null);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-9">
            <div className="card shadow-lg border-0 rounded-lg mt-5 mb-5 login-card animate__animated animate__fadeIn">
              <div className="card-header bg-white text-center p-4 border-0">
                <div className="mb-3 animate__animated animate__fadeInDown">
                  <div className="avatar-circle mx-auto">
                    <i className="bi bi-person-fill avatar-icon"></i>
                  </div>
                </div>
                <h1 className="text-center fw-bold mb-0">Welcome Back</h1>
                <p className="text-muted mt-2">Sign in to access OncoTracker</p>
              </div>
              
              <div className="card-body p-4 p-md-5">
                {success && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    {success}
                    <button type="button" className="btn-close" onClick={() => setSuccess(null)}></button>
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div className="form-floating">
                      <input 
                        type="email" 
                        className={`form-control ${emailError ? 'is-invalid' : ''}`}
                        id="email-address" 
                        placeholder="name@example.com"
                        value={email}
                        onChange={handleEmailChange}
                        disabled={loading}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => {
                          setEmailFocused(false);
                          if (email) validateEmail(email);
                        }}
                        required
                      />
                      <label htmlFor="email-address">
                        <i className="bi bi-envelope me-2"></i>Email Address
                      </label>
                      {emailError && <div className="invalid-feedback">{emailError}</div>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="form-floating">
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        required
                      />
                      <label htmlFor="password">
                        <i className="bi bi-lock me-2"></i>Password
                      </label>
                      <button 
                        type="button" 
                        className="btn btn-link password-toggle" 
                        onClick={handleTogglePasswordVisibility}
                      >
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="rememberMe" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-decoration-none small">Forgot password?</Link>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-3 mb-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="d-flex align-items-center justify-content-center">
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing in...
                      </span>
                    ) : 'Sign In'}
                  </button>

                  <div className="divider-container mb-4">
                    <hr className="divider-line" />
                    <span className="divider-text text-muted">OR</span>
                    <hr className="divider-line" />
                  </div>

                  <div className="text-center">
                    <p className="text-muted mb-3">Don't have an account?</p>
                    <Link to="/signup" className="btn btn-outline-primary w-100 py-3">
                      Create New Account
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PWAInstallButton />
    </div>
  );
};

export default LoginPage; 