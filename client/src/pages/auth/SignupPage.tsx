// Placeholder SignupPage Component
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'owner', // Default to owner
    clinicName: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const { firstName, lastName, email, password, passwordConfirm, role, clinicName } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
    if (role === 'vet' && !clinicName.trim()) {
        setError('Clinic name is required for veterinarian accounts.');
        return;
    }
    // Add more validation as needed (e.g., password strength)

    setLoading(true);
    try {
      const userData = {
          firstName,
          lastName,
          email,
          password,
          passwordConfirm,
          role,
          ...(role === 'vet' && { clinicName })
      };
      await signup(userData);
      // Navigate after successful signup (context update should trigger route redirects)
    } catch (err: any) {
      console.error('Signup Failed:', err);
      const message = err?.response?.data?.message || err.message || 'Signup failed. Please try again.';
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
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {/* Role Selection */}
          <div className="rounded-md shadow-sm">
            <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">I am a:</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleChange}
              required
              disabled={loading}
              className="appearance-none relative block w-full px-3 py-2 border border-slate-300 bg-white placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
            >
              <option value="owner">Pet Owner</option>
              <option value="vet">Veterinarian</option>
            </select>
          </div>

          {/* Common Fields */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input id="firstName" name="firstName" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="First Name" value={firstName} onChange={handleChange} disabled={loading} />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <input id="lastName" name="lastName" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Last Name" value={lastName} onChange={handleChange} disabled={loading} />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Email address" value={email} onChange={handleChange} disabled={loading} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Password (min 8 characters)" value={password} onChange={handleChange} disabled={loading} />
            </div>
            <div>
              <label htmlFor="passwordConfirm" className="sr-only">Confirm Password</label>
              <input id="passwordConfirm" name="passwordConfirm" type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" value={passwordConfirm} onChange={handleChange} disabled={loading} />
            </div>
          </div>

          {/* Vet Specific Field */}
          {role === 'vet' && (
            <div className="rounded-md shadow-sm">
               <label htmlFor="clinicName" className="sr-only">Clinic Name</label>
               <input 
                 id="clinicName" 
                 name="clinicName" 
                 type="text" 
                 required={role === 'vet'} 
                 className="appearance-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                 placeholder="Clinic Name" 
                 value={clinicName} 
                 onChange={handleChange} 
                 disabled={loading} 
               />
            </div>
          )}
          
          {role === 'vet' && (
            <p className="text-xs text-slate-500 text-center">
              Veterinarian accounts require manual verification before full access is granted.
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <LoadingSpinner size="small" color="inherit" />
              ) : (
                'Sign up'
              )}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <p className="text-slate-600">
            Already have an account?
            <Link to="/login" className="font-medium text-sky-600 hover:text-sky-500 ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 