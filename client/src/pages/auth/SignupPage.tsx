// Placeholder SignupPage Component
import React, { useState, ChangeEvent, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignupPage.css';
import PWAInstallButton from '../../components/common/PWAInstallButton';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: '' as '' | 'owner' | 'vet', // Start empty to force selection
    clinicName: '',
    agreeToTerms: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fieldFocus, setFieldFocus] = useState<Record<string, boolean>>({});
  const { signup } = useAuth();

  const { firstName, lastName, email, password, passwordConfirm, role, clinicName, agreeToTerms } = formData;

  const steps = ['Account Type', 'Personal Details', 'Set Password'];

  // Validation
  const validateField = (name: string, value: string | boolean): string | null => {
     switch (name) {
        case 'firstName':
           return typeof value === 'string' && value.trim() ? null : 'First name is required';
        case 'lastName':
           return typeof value === 'string' && value.trim() ? null : 'Last name is required';
        case 'email':
           if (typeof value !== 'string' || !value.trim()) return 'Email is required';
           return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email format';
        case 'password':
           if (typeof value !== 'string' || !value) return 'Password is required';
           if (value.length < 8) return 'Password must be at least 8 characters';
           if (!/[a-z]/.test(value)) return 'Password must include lowercase letters';
           if (!/[A-Z]/.test(value)) return 'Password must include uppercase letters';
           if (!/[0-9]|[^a-zA-Z0-9]/.test(value)) return 'Password must include numbers or special characters';
           return null;
        case 'passwordConfirm':
           if (typeof value !== 'string' || !value) return 'Please confirm your password';
           return value === formData.password ? null : 'Passwords do not match';
        case 'clinicName':
           return formData.role === 'vet' && typeof value === 'string' && !value.trim() ? 'Clinic name is required for veterinarians' : null;
        case 'role':
           return value ? null : 'Please select an account type';
        case 'agreeToTerms':
           return value ? null : 'You must agree to the terms and conditions';
        default:
           return null;
     }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear API error on input change
    if (apiError) setApiError(null);

    // Validate the field if focused
    if (fieldFocus[name]) {
      const error = validateField(name, value);
      setFormErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    }

    // Special case: re-validate passwordConfirm when password changes
    if (name === 'password' && formData.passwordConfirm) {
      const confirmError = validateField('passwordConfirm', formData.passwordConfirm);
      setFormErrors(prevErrors => ({ ...prevErrors, passwordConfirm: confirmError }));
    }
  };

  const handleRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
     const newRole = e.target.value as 'owner' | 'vet';
     setFormData({ ...formData, role: newRole, clinicName: newRole === 'owner' ? '' : formData.clinicName });

     // Clear API error on input change
     if (apiError) setApiError(null);

     const roleError = validateField('role', newRole);
     const clinicError = validateField('clinicName', newRole === 'vet' ? formData.clinicName : '');

     setFormErrors(prevErrors => ({ ...prevErrors, role: roleError, clinicName: clinicError }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
    
    // Validate the field
    const error = validateField(name, checked);
    setFormErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleFocus = (field: string) => {
    setFieldFocus(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFieldFocus(prev => ({ ...prev, [field]: false }));
    
    // Validate on blur
    const value = formData[field as keyof typeof formData];
    const error = validateField(field, value);
    setFormErrors(prev => ({ ...prev, [field]: error }));
  };

  // Stepper Logic with Validation
  const validateStepFields = (stepIndex: number): boolean => {
    let fieldsToValidate: string[] = [];
    switch(stepIndex) {
      case 0: fieldsToValidate = ['role']; if (formData.role === 'vet') fieldsToValidate.push('clinicName'); break;
      case 1: fieldsToValidate = ['firstName', 'lastName', 'email']; break;
      case 2: fieldsToValidate = ['password', 'passwordConfirm', 'agreeToTerms']; break;
      default: return false;
    }

    let isValid = true;
    const currentStepErrors: Record<string, string | null> = {};

    fieldsToValidate.forEach(field => {
      const value = formData[field as keyof typeof formData];
      const error = validateField(field, value);
      currentStepErrors[field] = error;
      if (error) {
        isValid = false;
      }
    });

    // Update errors for the current step only
    setFormErrors(prevErrors => ({...prevErrors, ...currentStepErrors}));
    return isValid;
  };

  const handleNext = () => {
     if (validateStepFields(activeStep)) {
        setApiError(null); // Clear previous API errors when moving next
        setActiveStep((prevStep) => prevStep + 1);

        // Scroll to top of form
        window.scrollTo({ top: 0, behavior: 'smooth' });
     }
  };

  const handleBack = () => {
    setApiError(null); // Clear errors when moving back
    setActiveStep((prevStep) => prevStep - 1);
    
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // Final validation check before submitting
    if (!validateStepFields(activeStep)) {
        setApiError("Please fix the errors before submitting.");
        return;
    }

    setLoading(true);
    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        role,
        ...(role === 'vet' && { clinicName: clinicName.trim() })
      };
      console.log("Submitting signup data:", userData);
      await signup(userData);
      console.log("Signup successful");
      
      // Navigate to login after successful signup
      navigate('/login', { state: { signupSuccess: true } });
    } catch (err: any) {
      console.error('Signup Failed:', err);
      let errorMessage = 'Signup failed. Please check your details and try again.';
       if (err?.response?.data?.message) {
           errorMessage = err.response.data.message;
       } else if (err?.message && !err.message.includes('Network Error')) {
           errorMessage = `An error occurred: ${err.message}`;
       } else if (err.message?.includes('Network Error') || !navigator.onLine) {
           errorMessage = 'Network error. Please check your connection.';
       }
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Button disabled state calculation
  const isNextDisabled = useMemo(() => {
    if (loading) return true;
    if (activeStep === 0) {
      return !role || formErrors.role !== null || (role === 'vet' && (!clinicName.trim() || formErrors.clinicName !== null));
    } else if (activeStep === 1) {
      return !firstName.trim() || !lastName.trim() || !email.trim() || formErrors.firstName !== null || formErrors.lastName !== null || formErrors.email !== null;
    } else if (activeStep === 2) {
      return !password || !passwordConfirm || !agreeToTerms || formErrors.password !== null || formErrors.passwordConfirm !== null || formErrors.agreeToTerms !== null;
    }
    return true; // Should not happen
  }, [activeStep, role, clinicName, firstName, lastName, email, password, passwordConfirm, agreeToTerms, formErrors, loading]);

  // Password Strength Meter
  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 25;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 25;
    
    // Contains number or special char
    if (/[0-9]|[^a-zA-Z0-9]/.test(password)) strength += 25;
    
    return strength;
  };
  
  const getPasswordStrengthLabel = (strength: number) => {
    if (strength < 25) return { text: 'Very weak', colorClass: 'text-danger' };
    if (strength < 50) return { text: 'Weak', colorClass: 'text-danger' };
    if (strength < 75) return { text: 'Good', colorClass: 'text-warning' };
    return { text: 'Strong', colorClass: 'text-success' };
  };
  
  const passwordStrength = calculatePasswordStrength(password);
  const strengthInfo = getPasswordStrengthLabel(passwordStrength);

  return (
    <div className="signup-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="card shadow-lg border-0 rounded-lg my-5 signup-card animate__animated animate__fadeIn">
              <div className="card-header bg-white text-center p-4 border-0">
                <div className="mb-3 animate__animated animate__fadeInDown">
                  <div className="avatar-circle mx-auto">
                    <i className="bi bi-person-plus-fill avatar-icon"></i>
                  </div>
                </div>
                <h1 className="text-center fw-bold mb-0">Create Account</h1>
                <p className="text-muted mt-2">Join OncoTracker today</p>
              </div>
              
              <div className="card-body p-4 p-md-5">
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="progress-steps d-flex justify-content-between position-relative">
                    {steps.map((label, index) => (
                      <div 
                        key={label} 
                        className={`progress-step ${activeStep === index ? 'active' : ''} ${activeStep > index ? 'completed' : ''}`}
                      >
                        <div className="step-indicator">
                          {activeStep > index ? (
                            <i className="bi bi-check-lg"></i>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="step-label">{label}</div>
                      </div>
                    ))}
                    <div className="progress-line"></div>
                  </div>
                </div>

                {apiError && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {apiError}
                    <button type="button" className="btn-close" onClick={() => setApiError(null)}></button>
                  </div>
                )}

                <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                  {/* Step 0: Account Type */}
                  {activeStep === 0 && (
                    <div className="animate__animated animate__fadeIn">
                      <div className="mb-4">
                        <p className="fw-bold mb-3">I am a:</p>
                        <div className="row g-3">
                          <div className="col-12 col-md-6">
                            <div className={`role-option ${role === 'owner' ? 'role-selected' : ''}`}>
                              <input
                                type="radio"
                                className="btn-check"
                                name="role"
                                id="owner"
                                value="owner"
                                checked={role === 'owner'}
                                onChange={handleRoleChange}
                              />
                              <label className="btn role-btn w-100" htmlFor="owner">
                                <i className="bi bi-person-heart me-2"></i>
                                Pet Owner
                              </label>
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className={`role-option ${role === 'vet' ? 'role-selected' : ''}`}>
                              <input
                                type="radio"
                                className="btn-check"
                                name="role"
                                id="vet"
                                value="vet"
                                checked={role === 'vet'}
                                onChange={handleRoleChange}
                              />
                              <label className="btn role-btn w-100" htmlFor="vet">
                                <i className="bi bi-clipboard2-pulse me-2"></i>
                                Veterinarian
                              </label>
                            </div>
                          </div>
                        </div>
                        {formErrors.role && (
                          <div className="text-danger small mt-2">{formErrors.role}</div>
                        )}
                      </div>

                      {role === 'vet' && (
                        <div className="mb-4 animate__animated animate__fadeIn">
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control ${formErrors.clinicName ? 'is-invalid' : ''}`}
                              id="clinicName"
                              name="clinicName"
                              placeholder="Clinic Name"
                              value={clinicName}
                              onChange={handleChange}
                              disabled={loading}
                              onFocus={() => handleFocus('clinicName')}
                              onBlur={() => handleBlur('clinicName')}
                              required={role === 'vet'}
                            />
                            <label htmlFor="clinicName">
                              <i className="bi bi-building me-2"></i>
                              Clinic Name
                            </label>
                            {formErrors.clinicName && (
                              <div className="invalid-feedback">{formErrors.clinicName}</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 1: Personal Details */}
                  {activeStep === 1 && (
                    <div className="animate__animated animate__fadeIn">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                              id="firstName"
                              name="firstName"
                              placeholder="First Name"
                              value={firstName}
                              onChange={handleChange}
                              disabled={loading}
                              onFocus={() => handleFocus('firstName')}
                              onBlur={() => handleBlur('firstName')}
                              required
                            />
                            <label htmlFor="firstName">
                              <i className="bi bi-person me-2"></i>
                              First Name
                            </label>
                            {formErrors.firstName && (
                              <div className="invalid-feedback">{formErrors.firstName}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
                              id="lastName"
                              name="lastName"
                              placeholder="Last Name"
                              value={lastName}
                              onChange={handleChange}
                              disabled={loading}
                              onFocus={() => handleFocus('lastName')}
                              onBlur={() => handleBlur('lastName')}
                              required
                            />
                            <label htmlFor="lastName">
                              <i className="bi bi-person me-2"></i>
                              Last Name
                            </label>
                            {formErrors.lastName && (
                              <div className="invalid-feedback">{formErrors.lastName}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                          id="email"
                          name="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={handleChange}
                          disabled={loading}
                          onFocus={() => handleFocus('email')}
                          onBlur={() => handleBlur('email')}
                          required
                        />
                        <label htmlFor="email">
                          <i className="bi bi-envelope me-2"></i>
                          Email Address
                        </label>
                        {formErrors.email && (
                          <div className="invalid-feedback">{formErrors.email}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Set Password */}
                  {activeStep === 2 && (
                    <div className="animate__animated animate__fadeIn">
                      <div className="form-floating mb-3">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                          id="password"
                          name="password"
                          placeholder="Password"
                          value={password}
                          onChange={handleChange}
                          disabled={loading}
                          onFocus={() => handleFocus('password')}
                          onBlur={() => handleBlur('password')}
                          required
                        />
                        <label htmlFor="password">
                          <i className="bi bi-lock me-2"></i>
                          Password
                        </label>
                        <button
                          type="button"
                          className="btn btn-link password-toggle"
                          onClick={handleTogglePasswordVisibility}
                        >
                          <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </button>
                        {formErrors.password && (
                          <div className="invalid-feedback">{formErrors.password}</div>
                        )}
                      </div>

                      {/* Password Strength Meter */}
                      {password && (
                        <div className="mb-4">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <small className="text-muted">Password strength:</small>
                            <small className={strengthInfo.colorClass}><strong>{strengthInfo.text}</strong></small>
                          </div>
                          <div className="progress" style={{ height: '6px' }}>
                            <div
                              className={`progress-bar ${
                                passwordStrength < 50 ? 'bg-danger' : 
                                passwordStrength < 75 ? 'bg-warning' : 
                                'bg-success'
                              }`}
                              role="progressbar"
                              style={{ width: `${passwordStrength}%` }}
                              aria-valuenow={passwordStrength}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="form-floating mb-4">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className={`form-control ${formErrors.passwordConfirm ? 'is-invalid' : ''}`}
                          id="passwordConfirm"
                          name="passwordConfirm"
                          placeholder="Confirm Password"
                          value={passwordConfirm}
                          onChange={handleChange}
                          disabled={loading}
                          onFocus={() => handleFocus('passwordConfirm')}
                          onBlur={() => handleBlur('passwordConfirm')}
                          required
                        />
                        <label htmlFor="passwordConfirm">
                          <i className="bi bi-lock me-2"></i>
                          Confirm Password
                        </label>
                        {formErrors.passwordConfirm && (
                          <div className="invalid-feedback">{formErrors.passwordConfirm}</div>
                        )}
                      </div>

                      <div className="mb-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="agreeToTerms"
                            name="agreeToTerms"
                            checked={agreeToTerms}
                            onChange={handleCheckboxChange}
                          />
                          <label className="form-check-label" htmlFor="agreeToTerms">
                            I agree to the{' '}
                            <Link to="/terms" className="text-decoration-none">
                              Terms and Conditions
                            </Link>
                          </label>
                        </div>
                        {formErrors.agreeToTerms && (
                          <div className="text-danger small mt-1">{formErrors.agreeToTerms}</div>
                        )}
                      </div>

                      {role === 'vet' && (
                        <div className="alert alert-info d-flex align-items-center" role="alert">
                          <i className="bi bi-info-circle-fill me-2"></i>
                          <div>
                            <strong>Note:</strong> Veterinarian accounts require manual verification after signup.
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={handleBack}
                      disabled={activeStep === 0 || loading}
                    >
                      <i className="bi bi-arrow-left me-1"></i>
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isNextDisabled}
                    >
                      {loading && activeStep === steps.length - 1 ? (
                        <span className="d-flex align-items-center justify-content-center">
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Creating account...
                        </span>
                      ) : activeStep === steps.length - 1 ? (
                        'Create Account'
                      ) : (
                        <>
                          Next
                          <i className="bi bi-arrow-right ms-1"></i>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="text-muted mb-3">Already have an account?</p>
                  <Link to="/login" className="btn btn-outline-primary w-100">
                    Sign In Instead
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PWAInstallButton />
    </div>
  );
};

export default SignupPage; 