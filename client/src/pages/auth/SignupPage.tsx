// Placeholder SignupPage Component
import React, { useState, ChangeEvent, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  Box, 
  Container, 
  TextField, 
  Button, 
  Typography, 
  InputAdornment, 
  IconButton,
  Alert,
  Divider,
  Stack,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  styled,
  alpha,
  Collapse,
  FormHelperText,
  Card,
  CardHeader,
  CardContent,
  Checkbox,
  Tab,
  Tabs
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  Person, 
  Business, 
  MedicalServices,
  Pets,
  ErrorOutline,
  ArrowBack,
  ChevronRight
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Define the MotionBox component
const MotionBox = motion(Box);
const MotionDiv = motion.div;

// Custom styled radio for better appearance
const StyledRadio = styled(Radio)(({ theme }) => ({
  padding: 8,
  '& .MuiSvgIcon-root': {
    fontSize: 24,
  },
}));

// Custom radio option component
const RoleRadioOption = styled(FormControlLabel)(({ theme }) => ({
  margin: 0,
  width: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1.5),
  transition: 'all 0.2s ease',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  },
  '&.Mui-checked': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    borderColor: theme.palette.primary.main,
  },
}));

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
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
           return value.length >= 8 ? null : 'Password must be at least 8 characters';
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

    // Validate the field
    const error = validateField(name, value);
    setFormErrors(prevErrors => ({ ...prevErrors, [name]: error }));

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
     }
  };

  const handleBack = () => {
    setApiError(null); // Clear errors when moving back
    setActiveStep((prevStep) => prevStep - 1);
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

  // Modern gradient background
  const backgroundGradient = 'linear-gradient(135deg, #0B4F6C 0%, #01949A 100%)';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: backgroundGradient,
        backgroundAttachment: 'fixed',
        py: { xs: 4, sm: 6, md: 8 },
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card elevation={6} sx={{ borderRadius: 4, overflow: 'hidden' }}>
            <CardHeader
              title={
                <Box sx={{ textAlign: 'center', mb: 1 }}>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                    <Box 
                      sx={{ 
                        width: 70, 
                        height: 70, 
                        borderRadius: '50%', 
                        backgroundColor: 'rgba(26, 156, 176, 0.1)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                    >
                      <Pets sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                    </Box>
                  </Box>
                  <Typography 
                    variant="h4" 
                    component="h1" 
                    fontWeight={700}
                    color="primary.dark"
                  >
                    Create Account
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Join OncoTracker to access pet cancer care tools
                  </Typography>
                </Box>
              }
              sx={{ pb: 2 }}
            />

            {/* Stepper */}
            <Stepper activeStep={activeStep} sx={{ px: 4, pb: 2 }}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <CardContent>
              {/* Error Display */}
              {apiError && (
                <Alert
                  severity="error"
                  icon={<ErrorOutline fontSize="inherit" />}
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    backgroundColor: 'error.light',
                    color: 'error.dark',
                    border: `1px solid ${theme.palette.error.main}`
                  }}
                  variant="filled"
                >
                  {apiError}
                </Alert>
              )}

              {/* Form Content */}
              <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                <Box sx={{ minHeight: 250, position: 'relative' }}>
                  {/* Step 0: Account Type */}
                  <Collapse in={activeStep === 0} timeout={300} unmountOnExit>
                    <Stack spacing={3} sx={{ width: '100%' }}>
                      <FormControl component="fieldset" error={!!formErrors.role}>
                        <FormLabel component="legend" sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}>
                          Select Account Type:
                        </FormLabel>
                        <RadioGroup
                          name="role"
                          value={role}
                          onChange={handleRoleChange}
                          sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2
                          }}
                        >
                          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: '100%' }}>
                            <Box 
                              className={role === 'owner' ? 'Mui-checked' : ''} 
                              sx={{ 
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                p: 2,
                                borderRadius: 2,
                                border: `1px solid ${role === 'owner' ? theme.palette.primary.main : theme.palette.divider}`,
                                bgcolor: role === 'owner' ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  bgcolor: alpha(theme.palette.primary.main, 0.04),
                                }
                              }}
                              onClick={() => handleRoleChange({ target: { value: 'owner' } } as any)}
                            >
                              <Radio 
                                value="owner"
                                checked={role === 'owner'}
                                sx={{ mr: 1 }}
                              />
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Pets sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography>Pet Owner</Typography>
                              </Box>
                            </Box>
                            
                            <Box 
                              className={role === 'vet' ? 'Mui-checked' : ''} 
                              sx={{ 
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                p: 2,
                                borderRadius: 2,
                                border: `1px solid ${role === 'vet' ? theme.palette.primary.main : theme.palette.divider}`,
                                bgcolor: role === 'vet' ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  bgcolor: alpha(theme.palette.primary.main, 0.04),
                                }
                              }}
                              onClick={() => handleRoleChange({ target: { value: 'vet' } } as any)}
                            >
                              <Radio 
                                value="vet"
                                checked={role === 'vet'}
                                sx={{ mr: 1 }}
                              />
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <MedicalServices sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography>Veterinarian</Typography>
                              </Box>
                            </Box>
                          </Box>
                        </RadioGroup>
                        {formErrors.role && <FormHelperText error>{formErrors.role}</FormHelperText>}
                      </FormControl>

                      {/* Conditional Clinic Name Field */}
                      <Collapse in={role === 'vet'} timeout={300} unmountOnExit>
                        <TextField
                          fullWidth
                          id="clinicName"
                          name="clinicName"
                          label="Clinic Name"
                          variant="outlined"
                          required={role === 'vet'}
                          value={clinicName}
                          onChange={handleChange}
                          disabled={loading}
                          error={!!formErrors.clinicName}
                          helperText={formErrors.clinicName || ''}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Business color="action" sx={{ mr: 1 }} />
                              </InputAdornment>
                            ),
                            sx: { borderRadius: 2 }
                          }}
                          InputLabelProps={{ shrink: true }}
                          sx={{ mt: 1 }}
                        />
                      </Collapse>
                    </Stack>
                  </Collapse>

                  {/* Step 1: Personal Details */}
                  <Collapse in={activeStep === 1} timeout={300} unmountOnExit>
                    <Stack spacing={3} sx={{ width: '100%' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            variant="outlined"
                            required
                            value={firstName}
                            onChange={handleChange}
                            disabled={loading}
                            error={!!formErrors.firstName}
                            helperText={formErrors.firstName || ''}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person color="action" sx={{ mr: 1 }} />
                                </InputAdornment>
                              ),
                              sx: { borderRadius: 2 }
                            }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            variant="outlined"
                            required
                            value={lastName}
                            onChange={handleChange}
                            disabled={loading}
                            error={!!formErrors.lastName}
                            helperText={formErrors.lastName || ''}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person color="action" sx={{ mr: 1 }} />
                                </InputAdornment>
                              ),
                              sx: { borderRadius: 2 }
                            }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </Grid>

                      <TextField
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        label="Email Address"
                        variant="outlined"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={handleChange}
                        disabled={loading}
                        error={!!formErrors.email}
                        helperText={formErrors.email || ''}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email color="action" sx={{ mr: 1 }} />
                            </InputAdornment>
                          ),
                          sx: { borderRadius: 2 }
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Stack>
                  </Collapse>

                  {/* Step 2: Set Password */}
                  <Collapse in={activeStep === 2} timeout={300} unmountOnExit>
                    <Stack spacing={3} sx={{ width: '100%' }}>
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        variant="outlined"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={handleChange}
                        disabled={loading}
                        error={!!formErrors.password}
                        helperText={formErrors.password || "Password must be at least 8 characters"}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="action" sx={{ mr: 1 }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleTogglePasswordVisibility}
                                edge="end"
                                color={showPassword ? "primary" : "default"}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                          sx: { borderRadius: 2 }
                        }}
                        InputLabelProps={{ shrink: true }}
                      />

                      <TextField
                        fullWidth
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type={showPassword ? 'text' : 'password'}
                        label="Confirm Password"
                        variant="outlined"
                        autoComplete="new-password"
                        required
                        value={passwordConfirm}
                        onChange={handleChange}
                        disabled={loading}
                        error={!!formErrors.passwordConfirm}
                        helperText={formErrors.passwordConfirm || ''}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="action" sx={{ mr: 1 }} />
                            </InputAdornment>
                          ),
                          sx: { borderRadius: 2 }
                        }}
                        InputLabelProps={{ shrink: true }}
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={agreeToTerms}
                            onChange={handleCheckboxChange}
                            name="agreeToTerms"
                            color="primary"
                          />
                        }
                        label={
                          <Typography variant="body2">
                            I agree to the{' '}
                            <Link 
                              to="/terms" 
                              style={{ 
                                textDecoration: 'none', 
                                color: theme.palette.primary.main 
                              }}
                            >
                              Terms and Conditions
                            </Link>
                          </Typography>
                        }
                      />
                      {formErrors.agreeToTerms && (
                        <FormHelperText error>{formErrors.agreeToTerms}</FormHelperText>
                      )}

                      {/* Veterinarian Note */}
                      <Collapse in={role === 'vet'} timeout={300} unmountOnExit>
                        <Alert severity="info" sx={{ mt: 1, borderRadius: 2 }}>
                          <Typography variant="caption">
                            Note: Veterinarian accounts require manual verification after signup.
                          </Typography>
                        </Alert>
                      </Collapse>
                    </Stack>
                  </Collapse>
                </Box>

                {/* Navigation Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                  <Button
                    onClick={handleBack}
                    disabled={activeStep === 0 || loading}
                    startIcon={<ArrowBack />}
                    sx={{ 
                      color: 'text.secondary',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      }
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isNextDisabled}
                    endIcon={activeStep === steps.length - 1 ? undefined : <ChevronRight />}
                    sx={{
                      py: 1,
                      px: 3,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'white',
                      background: 'linear-gradient(90deg, #0B4F6C 0%, #01949A 100%)',
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 15px rgba(0, 0, 0, 0.2)`,
                        background: 'linear-gradient(90deg, #0B4F6C 0%, #01949A 100%)',
                      },
                      '&:disabled': {
                        background: theme.palette.grey[400],
                        cursor: 'not-allowed',
                      }
                    }}
                  >
                    {loading && activeStep === steps.length - 1 ? (
                      <LoadingSpinner size="small" color="inherit" />
                    ) : activeStep === steps.length - 1 ? (
                      'Create Account'
                    ) : (
                      'Next'
                    )}
                  </Button>
                </Box>
              </form>

              {/* Link to Login */}
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Already have an account?
                </Typography>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  fullWidth
                  disabled={loading}
                  sx={{
                    py: 1.2,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: `${theme.palette.primary.main}10`,
                      borderColor: theme.palette.primary.dark,
                      color: theme.palette.primary.dark,
                    }
                  }}
                >
                  Sign In Instead
                </Button>
              </Box>
            </CardContent>
          </Card>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default SignupPage; 