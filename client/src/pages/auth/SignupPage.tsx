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
  Grid as MuiGrid,
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
  Tabs,
  CircularProgress,
  StepConnector,
  StepIconProps,
  LinearProgress,
  Tooltip,
  Fade,
  Grow,
  Zoom,
  useMediaQuery
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
  ChevronRight,
  CheckCircle,
  AccountCircle,
  Badge,
  VpnKey,
  Check
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Define the MotionBox component
const MotionBox = motion(Box);
const MotionDiv = motion.div;

// Animation variants for elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const buttonHoverTap = {
  hover: { scale: 1.03, transition: { duration: 0.2 } },
  tap: { scale: 0.98 }
};

// Custom step connector
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.MuiStepConnector-alternativeLabel`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.MuiStepConnector-active`]: {
    [`& .MuiStepConnector-line`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.MuiStepConnector-completed`]: {
    [`& .MuiStepConnector-line`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .MuiStepConnector-line`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

// Custom step icon
const QontoStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;
  const theme = useTheme();

  const icons: { [index: string]: React.ReactElement } = {
    1: <VpnKey />,
    2: <Badge />,
    3: <AccountCircle />,
  };

  return (
    <Box
      className={className}
      sx={{
        height: 22,
        display: 'flex',
        color: active ? theme.palette.primary.main : theme.palette.text.disabled,
        alignItems: 'center',
        ...(active && {
          color: theme.palette.primary.main,
        }),
        ...(completed && {
          color: theme.palette.primary.main,
        }),
      }}
    >
      {completed ? (
        <CheckCircle sx={{ fontSize: 26 }} />
      ) : (
        <Box
          sx={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            bgcolor: active ? 'rgba(5, 150, 105, 0.1)' : 'transparent',
            border: `2px solid ${active ? theme.palette.primary.main : theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icons[String(props.icon)]}
        </Box>
      )}
    </Box>
  );
};

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

// Password strength component
const PasswordStrengthMeter = ({ password }: { password: string }) => {
  const theme = useTheme();
  
  // Calculate password strength
  const calculateStrength = (password: string): number => {
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
  
  const strength = calculateStrength(password);
  
  // Determine color based on strength
  const getColor = () => {
    if (strength < 25) return theme.palette.error.main;
    if (strength < 50) return theme.palette.error.light;
    if (strength < 75) return theme.palette.warning.main;
    return theme.palette.success.main;
  };
  
  // Determine label based on strength
  const getLabel = () => {
    if (strength < 25) return 'Very weak';
    if (strength < 50) return 'Weak';
    if (strength < 75) return 'Good';
    return 'Strong';
  };
  
  return (
    <Box sx={{ mt: 1, mb: 1, display: password ? 'block' : 'none' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          Password strength:
        </Typography>
        <Typography variant="caption" sx={{ color: getColor(), fontWeight: 600 }}>
          {getLabel()}
        </Typography>
      </Box>
      <Box sx={{ width: '100%', bgcolor: alpha(theme.palette.divider, 0.5), borderRadius: 5, height: 6, overflow: 'hidden' }}>
        <Box
          sx={{
            width: `${strength}%`,
            bgcolor: getColor(),
            height: '100%',
            transition: 'width 0.3s ease, background-color 0.3s ease',
            borderRadius: 5,
          }}
        />
      </Box>
    </Box>
  );
};

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

  // Modern gradient background matching theme.ts colors
  const backgroundGradient = 'linear-gradient(135deg, #4a8a88 0%, #65a8a6 100%)';

  // Custom Grid component that works with 'item' prop
  const Grid = MuiGrid;

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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card 
            elevation={6} 
            sx={{ 
              borderRadius: 4, 
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)'
              }
            }}
          >
            <CardHeader
              title={
                <Box sx={{ textAlign: 'center', mb: 1 }}>
                  <Fade in={true} timeout={800}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Box 
                          sx={{ 
                            width: 70, 
                            height: 70, 
                            borderRadius: '50%', 
                            backgroundColor: 'rgba(101, 168, 166, 0.1)', // Updated to match theme teal
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            boxShadow: '0 4px 14px rgba(101, 168, 166, 0.15)' // Updated to match theme teal
                          }}
                        >
                          <Pets sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                        </Box>
                      </motion.div>
                    </Box>
                  </Fade>
                  <motion.div variants={itemVariants}>
                    <Typography 
                      variant="h4" 
                      component="h1" 
                      fontWeight={700}
                      color="primary.dark"
                      sx={{ 
                        backgroundImage: 'linear-gradient(90deg, #4a8a88, #65a8a6)', // Updated to match theme teal
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 2px 5px rgba(0,0,0,0.05)'
                      }}
                    >
                      Create Account
                    </Typography>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mt: 1,
                        fontWeight: 500
                      }}
                    >
                      Join OncoTracker to access pet cancer care tools
                    </Typography>
                  </motion.div>
                </Box>
              }
              sx={{ pb: 2 }}
            />

            {/* Stepper */}
            <Stepper 
              activeStep={activeStep} 
              connector={<QontoConnector />}
              sx={{ 
                px: { xs: 2, sm: 4 }, 
                pb: 2 
              }}
              alternativeLabel={!isMobile}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <CardContent>
              {/* Error Display */}
              {apiError && (
                <Grow in={true} timeout={800}>
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
                    onClose={() => setApiError(null)}
                  >
                    {apiError}
                  </Alert>
                </Grow>
              )}

              {/* Form Content */}
              <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                <Box sx={{ minHeight: 280, position: 'relative' }}>
                  {/* Step 0: Account Type */}
                  <Collapse in={activeStep === 0} timeout={500} unmountOnExit>
                    <Stack spacing={3} sx={{ width: '100%' }}>
                      <Zoom in={true} timeout={500}>
                        <FormControl component="fieldset" error={!!formErrors.role}>
                          <FormLabel component="legend" sx={{ mb: 1.5, fontWeight: 500, color: 'text.primary' }}>
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
                                  p: 2.5,
                                  borderRadius: 3,
                                  border: `2px solid ${role === 'owner' ? theme.palette.primary.main : theme.palette.divider}`,
                                  bgcolor: role === 'owner' ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                                    transform: 'translateY(-2px)',
                                    boxShadow: role === 'owner' ? `0 6px 15px ${alpha(theme.palette.primary.main, 0.2)}` : `0 4px 10px ${alpha(theme.palette.grey[500], 0.1)}`,
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
                                  <Pets sx={{ 
                                    mr: 1.5, 
                                    color: 'primary.main',
                                    fontSize: 26
                                  }} />
                                  <Typography sx={{ fontWeight: 500 }}>Pet Owner</Typography>
                                </Box>
                              </Box>
                              
                              <Box 
                                className={role === 'vet' ? 'Mui-checked' : ''} 
                                sx={{ 
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  p: 2.5,
                                  borderRadius: 3,
                                  border: `2px solid ${role === 'vet' ? theme.palette.primary.main : theme.palette.divider}`,
                                  bgcolor: role === 'vet' ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                                    transform: 'translateY(-2px)',
                                    boxShadow: role === 'vet' ? `0 6px 15px ${alpha(theme.palette.primary.main, 0.2)}` : `0 4px 10px ${alpha(theme.palette.grey[500], 0.1)}`,
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
                                  <MedicalServices sx={{ 
                                    mr: 1.5, 
                                    color: 'primary.main',
                                    fontSize: 26
                                  }} />
                                  <Typography sx={{ fontWeight: 500 }}>Veterinarian</Typography>
                                </Box>
                              </Box>
                            </Box>
                          </RadioGroup>
                          {formErrors.role && (
                            <FormHelperText error sx={{ mt: 1, ml: 1, fontWeight: 500 }}>
                              {formErrors.role}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Zoom>

                      {/* Conditional Clinic Name Field */}
                      <Collapse in={role === 'vet'} timeout={500} unmountOnExit>
                        <Zoom in={role === 'vet'} timeout={300}>
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
                            onFocus={() => handleFocus('clinicName')}
                            onBlur={() => handleBlur('clinicName')}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Business 
                                    color={fieldFocus.clinicName ? "primary" : "action"} 
                                    sx={{ mr: 1 }} 
                                  />
                                </InputAdornment>
                              ),
                              sx: { 
                                borderRadius: 2,
                                transition: 'all 0.2s ease',
                                '&.Mui-focused': {
                                  boxShadow: `0 0 0 2px ${theme.palette.primary.main}30`,
                                }
                              }
                            }}
                            InputLabelProps={{ 
                              shrink: true,
                              sx: {
                                color: fieldFocus.clinicName ? theme.palette.primary.main : undefined
                              }
                            }}
                            sx={{ mt: 1 }}
                          />
                        </Zoom>
                      </Collapse>
                    </Stack>
                  </Collapse>

                  {/* Step 1: Personal Details */}
                  <Collapse in={activeStep === 1} timeout={500} unmountOnExit>
                    <Stack spacing={3} sx={{ width: '100%' }}>
                      <Zoom in={true} timeout={500}>
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
                              onFocus={() => handleFocus('firstName')}
                              onBlur={() => handleBlur('firstName')}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Person 
                                      color={fieldFocus.firstName ? "primary" : "action"} 
                                      sx={{ mr: 1 }} 
                                    />
                                  </InputAdornment>
                                ),
                                sx: { 
                                  borderRadius: 2,
                                  transition: 'all 0.2s ease',
                                  '&.Mui-focused': {
                                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}30`,
                                  }
                                }
                              }}
                              InputLabelProps={{ 
                                shrink: true,
                                sx: {
                                  color: fieldFocus.firstName ? theme.palette.primary.main : undefined
                                }
                              }}
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
                              onFocus={() => handleFocus('lastName')}
                              onBlur={() => handleBlur('lastName')}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Person 
                                      color={fieldFocus.lastName ? "primary" : "action"} 
                                      sx={{ mr: 1 }} 
                                    />
                                  </InputAdornment>
                                ),
                                sx: { 
                                  borderRadius: 2,
                                  transition: 'all 0.2s ease',
                                  '&.Mui-focused': {
                                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}30`,
                                  }
                                }
                              }}
                              InputLabelProps={{ 
                                shrink: true,
                                sx: {
                                  color: fieldFocus.lastName ? theme.palette.primary.main : undefined
                                }
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Zoom>

                      <Zoom in={true} timeout={600}>
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
                          onFocus={() => handleFocus('email')}
                          onBlur={() => handleBlur('email')}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email 
                                  color={fieldFocus.email ? "primary" : "action"} 
                                  sx={{ mr: 1 }} 
                                />
                              </InputAdornment>
                            ),
                            sx: { 
                              borderRadius: 2,
                              transition: 'all 0.2s ease',
                              '&.Mui-focused': {
                                boxShadow: `0 0 0 2px ${theme.palette.primary.main}30`,
                              }
                            }
                          }}
                          InputLabelProps={{ 
                            shrink: true,
                            sx: {
                              color: fieldFocus.email ? theme.palette.primary.main : undefined
                            }
                          }}
                        />
                      </Zoom>
                    </Stack>
                  </Collapse>

                  {/* Step 2: Set Password */}
                  <Collapse in={activeStep === 2} timeout={500} unmountOnExit>
                    <Stack spacing={3} sx={{ width: '100%' }}>
                      <Zoom in={true} timeout={500}>
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
                          helperText={formErrors.password || ''}
                          onFocus={() => handleFocus('password')}
                          onBlur={() => handleBlur('password')}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock 
                                  color={fieldFocus.password ? "primary" : "action"} 
                                  sx={{ mr: 1 }} 
                                />
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
                            sx: { 
                              borderRadius: 2,
                              transition: 'all 0.2s ease',
                              '&.Mui-focused': {
                                boxShadow: `0 0 0 2px ${theme.palette.primary.main}30`,
                              }
                            }
                          }}
                          InputLabelProps={{ 
                            shrink: true,
                            sx: {
                              color: fieldFocus.password ? theme.palette.primary.main : undefined
                            }
                          }}
                        />
                      </Zoom>

                      {/* Password strength meter */}
                      <Fade in={password.length > 0} timeout={300}>
                        <Box>
                          <PasswordStrengthMeter password={password} />
                        </Box>
                      </Fade>

                      <Zoom in={true} timeout={600}>
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
                          onFocus={() => handleFocus('passwordConfirm')}
                          onBlur={() => handleBlur('passwordConfirm')}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock 
                                  color={fieldFocus.passwordConfirm ? "primary" : "action"} 
                                  sx={{ mr: 1 }} 
                                />
                              </InputAdornment>
                            ),
                            sx: { 
                              borderRadius: 2,
                              transition: 'all 0.2s ease',
                              '&.Mui-focused': {
                                boxShadow: `0 0 0 2px ${theme.palette.primary.main}30`,
                              }
                            }
                          }}
                          InputLabelProps={{ 
                            shrink: true,
                            sx: {
                              color: fieldFocus.passwordConfirm ? theme.palette.primary.main : undefined
                            }
                          }}
                        />
                      </Zoom>

                      <Zoom in={true} timeout={700}>
                        <FormControl error={!!formErrors.agreeToTerms}>
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
                                    color: theme.palette.primary.main,
                                    fontWeight: 500
                                  }}
                                >
                                  Terms and Conditions
                                </Link>
                              </Typography>
                            }
                          />
                          {formErrors.agreeToTerms && (
                            <FormHelperText error sx={{ ml: 1, fontWeight: 500 }}>
                              {formErrors.agreeToTerms}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Zoom>

                      {/* Veterinarian Note */}
                      <Collapse in={role === 'vet'} timeout={300} unmountOnExit>
                        <Fade in={role === 'vet'} timeout={400}>
                          <Alert 
                            severity="info" 
                            sx={{ 
                              mt: 1, 
                              borderRadius: 2,
                              border: `1px solid ${theme.palette.info.main}40`,
                            }}
                            icon={<MedicalServices />}
                          >
                            <Typography variant="body2" fontWeight={500}>
                              Note: Veterinarian accounts require manual verification after signup.
                            </Typography>
                          </Alert>
                        </Fade>
                      </Collapse>
                    </Stack>
                  </Collapse>
                </Box>

                {/* Navigation Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                  <motion.div
                    variants={buttonHoverTap}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      onClick={handleBack}
                      disabled={activeStep === 0 || loading}
                      startIcon={<ArrowBack />}
                      sx={{ 
                        color: 'text.secondary',
                        transition: 'all 0.2s ease',
                        borderRadius: 6,
                        px: 2,
                        py: 1,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.08),
                          transform: 'translateX(-2px)'
                        }
                      }}
                    >
                      Back
                    </Button>
                  </motion.div>
                  <motion.div
                    variants={buttonHoverTap}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isNextDisabled}
                      endIcon={activeStep === steps.length - 1 ? undefined : <ChevronRight />}
                      sx={{
                        py: 1,
                        px: 3,
                        borderRadius: 6,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'white',
                        background: 'linear-gradient(90deg, #4a8a88 0%, #65a8a6 100%)', // Updated to match theme teal
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.25s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0 6px 20px rgba(101, 168, 166, 0.3)`, // Updated to match theme teal
                          background: 'linear-gradient(90deg, #4a8a88 10%, #65a8a6 90%)', // Updated to match theme teal
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                          boxShadow: `0 2px 10px rgba(101, 168, 166, 0.2)`, // Updated to match theme teal
                        },
                        '&:disabled': {
                          background: theme.palette.grey[400],
                          cursor: 'not-allowed',
                        }
                      }}
                    >
                      {loading && activeStep === steps.length - 1 ? (
                        <>
                          <LoadingSpinner size="small" color="inherit" />
                          <Box sx={{ width: '100%', position: 'absolute', bottom: 0, left: 0 }}>
                            <LinearProgress color="inherit" sx={{ height: 3, borderRadius: 3 }} />
                          </Box>
                        </>
                      ) : activeStep === steps.length - 1 ? (
                        'Create Account'
                      ) : (
                        'Next'
                      )}
                    </Button>
                  </motion.div>
                </Box>
              </form>

              {/* Link to Login */}
              <Fade in={true} timeout={1000}>
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Already have an account?
                  </Typography>
                  <motion.div
                    variants={buttonHoverTap}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      component={Link}
                      to="/login"
                      variant="outlined"
                      fullWidth
                      disabled={loading}
                      sx={{
                        py: 1.2,
                        borderRadius: 6,
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        borderWidth: 1.5,
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          backgroundColor: `${theme.palette.primary.main}10`,
                          borderColor: theme.palette.primary.dark,
                          color: theme.palette.primary.dark,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 4px 12px rgba(101, 168, 166, 0.15)`, // Updated to match theme teal
                        }
                      }}
                    >
                      Sign In Instead
                    </Button>
                  </motion.div>
                </Box>
              </Fade>
            </CardContent>
          </Card>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default SignupPage; 