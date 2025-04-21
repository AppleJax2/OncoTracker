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
  Paper, 
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
  StepConnector, // For custom connector line
  stepConnectorClasses, // For styling connector
  StepIconProps, // For custom step icon
  useTheme,
  styled, // For custom styled components
  alpha,
  Collapse, // For animating conditional field
  FormHelperText // For validation messages under fields
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  Person, 
  Business, 
  MedicalServices, // Vet icon
  Pets, // Owner icon
  CheckCircle, // Custom step icon
  ErrorOutline, // Error icon
  RadioButtonUnchecked, // Custom step icon
  TaskAlt // Completed step icon
} from '@mui/icons-material';

// --- Custom Stepper Styling ---

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.divider,
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean, completed?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.divider,
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: theme.palette.primary.main,
    }),
    '& .QontoStepIcon-circle': {
      width: 24, // Make circle slightly larger
      height: 24,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.8rem', // Font size for number inside circle
      color: theme.palette.getContrastText(theme.palette.divider), // Text color for inactive
      ...(ownerState.active && { // Style for active step number
         color: theme.palette.getContrastText(theme.palette.primary.main),
      }),
       ...(ownerState.completed && { // Style for completed step icon color
         color: theme.palette.primary.main,
      }),
    },
     ...(ownerState.completed && {
      color: theme.palette.primary.main,
      zIndex: 1,
      fontSize: 24, // Size of completed icon
    }),
  }),
);


function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;

  return (
    <QontoStepIconRoot ownerState={{ active, completed }} className={className}>
      {completed ? (
        <TaskAlt className="QontoStepIcon-completedIcon" fontSize="inherit"/>
      ) : (
        <div className="QontoStepIcon-circle">
          {/* Display step number */}
          {typeof icon === 'number' ? icon : <RadioButtonUnchecked fontSize="small"/>}
        </div>
      )}
    </QontoStepIconRoot>
  );
}

// --- Custom Radio Button Styling ---

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1.5, 2),
  margin: theme.spacing(0, 1, 1, 0),
  transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
  width: '100%', // Make labels take full width in column layout
  [`@media (min-width: ${theme.breakpoints.values.sm}px)`]: {
     width: 'auto', // Auto width on larger screens for row layout
     marginRight: theme.spacing(2),
  },
  '&:hover': {
    borderColor: theme.palette.primary.light,
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  },
  '&.Mui-focused, &.Mui-checked': { // Use .Mui-checked pseudo class
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
  '& .MuiRadio-root': {
    display: 'none', // Hide the actual radio button
  },
  '& .MuiFormControlLabel-label': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    fontWeight: 500,
  }
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
  });
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>({}); // For real-time field validation
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null); // Separate API error state
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const { firstName, lastName, email, password, passwordConfirm, role, clinicName } = formData;

  const steps = ['Account Type', 'Personal Details', 'Set Password'];

  // --- Real-time Validation ---
  const validateField = (name: string, value: string): string | null => {
     switch (name) {
        case 'firstName':
           return value.trim() ? null : 'First name is required';
        case 'lastName':
           return value.trim() ? null : 'Last name is required';
        case 'email':
           if (!value.trim()) return 'Email is required';
           return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email format';
        case 'password':
           if (!value) return 'Password is required';
           return value.length >= 8 ? null : 'Password must be at least 8 characters';
        case 'passwordConfirm':
           if (!value) return 'Please confirm your password';
           return value === formData.password ? null : 'Passwords do not match';
        case 'clinicName':
           // Only validate if role is 'vet'
           return formData.role === 'vet' && !value.trim() ? 'Clinic name is required for veterinarians' : null;
         case 'role':
            return value ? null : 'Please select an account type';
        default:
           return null;
     }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear API error on input change
    if (apiError) setApiError(null);

    // Validate the field that changed
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
     setFormData({ ...formData, role: newRole, clinicName: newRole === 'owner' ? '' : formData.clinicName }); // Clear clinic name if switching to owner

     // Clear API error on input change
    if (apiError) setApiError(null);

     const roleError = validateField('role', newRole);
     const clinicError = validateField('clinicName', newRole === 'vet' ? formData.clinicName : ''); // Validate clinic name based on new role

     setFormErrors(prevErrors => ({ ...prevErrors, role: roleError, clinicName: clinicError }));
  };


  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // --- Stepper Logic with Validation ---
  const validateStepFields = (stepIndex: number): boolean => {
    let fieldsToValidate: string[] = [];
    switch(stepIndex) {
      case 0: fieldsToValidate = ['role']; if (formData.role === 'vet') fieldsToValidate.push('clinicName'); break;
      case 1: fieldsToValidate = ['firstName', 'lastName', 'email']; break;
      case 2: fieldsToValidate = ['password', 'passwordConfirm']; break;
      default: return false;
    }

    let isValid = true;
    const currentStepErrors: Record<string, string | null> = {};

    fieldsToValidate.forEach(field => {
      // Need to cast field to keyof formData
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
        // This should technically be caught by the button disable logic, but good as a fallback
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
        passwordConfirm, // Send confirmation for backend validation if needed
        role,
        ...(role === 'vet' && { clinicName: clinicName.trim() })
      };
      console.log("Submitting signup data:", userData); // Log before sending
      await signup(userData);
      console.log("Signup successful");
      // Optionally show a success message before navigating
      navigate('/login', { state: { signupSuccess: true } }); // Pass state to login page if needed
    } catch (err: any) {
      console.error('Signup Failed:', err);
      let errorMessage = 'Signup failed. Please check your details and try again.';
       if (err?.response?.data?.message) {
           errorMessage = err.response.data.message;
       } else if (err?.message && !err.message.includes('Network Error')) {
           // Avoid generic messages if possible, maybe check for specific status codes
           errorMessage = `An error occurred: ${err.message}`;
       } else if (err.message.includes('Network Error') || !navigator.onLine) {
           errorMessage = 'Network error. Please check your connection.';
       }
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Memoize button disabled state calculation
  const isNextDisabled = useMemo(() => {
    if (loading) return true;
    if (activeStep === 0) {
      return !role || formErrors.role !== null || (role === 'vet' && (!clinicName.trim() || formErrors.clinicName !== null));
    } else if (activeStep === 1) {
      return !firstName.trim() || !lastName.trim() || !email.trim() || formErrors.firstName !== null || formErrors.lastName !== null || formErrors.email !== null;
    } else if (activeStep === 2) {
      return !password || !passwordConfirm || formErrors.password !== null || formErrors.passwordConfirm !== null;
    }
    return true; // Should not happen
  }, [activeStep, role, clinicName, firstName, lastName, email, password, passwordConfirm, formErrors, loading]);

  // Background consistent with LoginPage
  const soothingBlueGradient = `linear-gradient(135deg, ${theme.palette.info.light} 0%, ${theme.palette.info.main} 100%)`;
  const medicalBlueGradient = `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: soothingBlueGradient, // Consistent background
        backgroundAttachment: 'fixed',
        py: { xs: 4, sm: 6, md: 8 },
        px: 2,
        transition: 'background 0.5s ease-in-out',
      }}
    >
      {/* Use sm or md for max width depending on preference */}
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 }, // Consistent padding
            borderRadius: 3, // Consistent rounding
            backgroundColor: 'rgba(255, 255, 255, 0.85)', // Consistent card style
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease-in-out',
            overflow: 'hidden', // Prevent content overflow during transitions
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            {/* Consider a Logo component */}
            <Typography
              variant="h4"
              component="h1"
              fontWeight={700}
              color="primary.dark"
              gutterBottom
              sx={{ mb: 1 }}
            >
              Create OncoTracker Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start managing pet cancer care today
            </Typography>
          </Box>

          {/* Styled Stepper */}
          <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} sx={{ mb: 4 }}>
            {steps.map((label, index) => (
              <Step key={label}>
                {/* Pass index + 1 as icon number */}
                <StepLabel StepIconComponent={QontoStepIcon} StepIconProps={{icon: index + 1}}>
                    {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Centralized API Error Alert */}
           {apiError && (
            <Alert
              severity="error"
              icon={<ErrorOutline fontSize="inherit" />}
              sx={{
                mb: 3,
                borderRadius: 1,
                backgroundColor: 'error.light',
                color: 'error.dark',
                border: `1px solid ${theme.palette.error.main}`
              }}
              variant="filled"
            >
              {apiError}
            </Alert>
          )}

          {/* Form with transitions */}
          <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
             {/* Use Box with consistent height and overflow for smooth transitions */}
             <Box sx={{ minHeight: 250, position: 'relative' /* Animation context */ }}>
                 {/* Step 0: Account Type */}
                 <Collapse in={activeStep === 0} timeout={300} unmountOnExit>
                     <Stack spacing={3} sx={{ width: '100%', p: 1 }}>
                         <FormControl component="fieldset" error={!!formErrors.role}>
                           <FormLabel component="legend" sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}>
                             Select Account Type:
                           </FormLabel>
                           {/* Use Grid for better responsive layout of radios */}
                           <RadioGroup
                             name="role"
                             value={role}
                             onChange={handleRoleChange}
                             sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' }, // Column on small, row on larger
                                gap: { xs: 1, sm: 0 }
                             }}
                           >
                             <StyledFormControlLabel
                               value="owner"
                               control={<Radio checked={role === 'owner'} />} // Controlled component
                               label={<><Pets fontSize="small" /> Pet Owner</>}
                               checked={role === 'owner'} // Apply checked style
                             />
                             <StyledFormControlLabel
                               value="vet"
                               control={<Radio checked={role === 'vet'} />}
                               label={<><MedicalServices fontSize="small" /> Veterinarian</>}
                               checked={role === 'vet'}
                             />
                           </RadioGroup>
                            {formErrors.role && <FormHelperText error>{formErrors.role}</FormHelperText>}
                         </FormControl>

                         {/* Conditional Veterinarian Field with Animation */}
                         <Collapse in={role === 'vet'} timeout={300} unmountOnExit>
                             <TextField
                               fullWidth
                               id="clinicName"
                               name="clinicName"
                               label="Clinic Name"
                               variant="outlined" // Consistent input style
                               required={role === 'vet'}
                               value={clinicName}
                               onChange={handleChange}
                               disabled={loading}
                               error={!!formErrors.clinicName}
                               helperText={formErrors.clinicName || (role === 'vet' ? 'Required for veterinarian accounts' : '')}
                               InputProps={{
                                 startAdornment: (
                                   <InputAdornment position="start">
                                     <Business color="action" sx={{ mr: 1 }} />
                                   </InputAdornment>
                                 ),
                                 sx: { borderRadius: 2, bgcolor: alpha(theme.palette.info.light, 0.1) } // Accent color hint
                               }}
                               InputLabelProps={{ shrink: true }}
                             />
                         </Collapse>
                     </Stack>
                 </Collapse>

                {/* Step 1: Personal Details */}
                 <Collapse in={activeStep === 1} timeout={300} unmountOnExit>
                     <Stack spacing={2.5} sx={{ width: '100%', p: 1 }}>
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
                               helperText={formErrors.firstName}
                               InputProps={{
                                 startAdornment: ( <InputAdornment position="start"><Person color="action" sx={{ mr: 1 }} /></InputAdornment> ),
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
                               helperText={formErrors.lastName}
                               InputProps={{
                                 startAdornment: ( <InputAdornment position="start"><Person color="action" sx={{ mr: 1 }} /></InputAdornment> ),
                                 sx: { borderRadius: 2 }
                               }}
                                InputLabelProps={{ shrink: true }}
                             />
                           </Grid>
                         </Grid>

                         <TextField
                           fullWidth
                           id="email-address"
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
                           helperText={formErrors.email}
                           InputProps={{
                             startAdornment: ( <InputAdornment position="start"><Email color="action" sx={{ mr: 1 }} /></InputAdornment> ),
                             sx: { borderRadius: 2 }
                           }}
                            InputLabelProps={{ shrink: true }}
                         />
                     </Stack>
                 </Collapse>

                {/* Step 2: Set Password */}
                <Collapse in={activeStep === 2} timeout={300} unmountOnExit>
                     <Stack spacing={2.5} sx={{ width: '100%', p: 1 }}>
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
                           helperText={formErrors.password || "Password must be at least 8 characters"} // Show validation error or hint
                           InputProps={{
                             startAdornment: ( <InputAdornment position="start"><Lock color="action" sx={{ mr: 1 }} /></InputAdornment> ),
                             endAdornment: (
                               <InputAdornment position="end">
                                 <IconButton aria-label="toggle password visibility" onClick={handleTogglePasswordVisibility} edge="end" color={showPassword ? "primary" : "default"}>
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
                           type={showPassword ? 'text' : 'password'} // Toggle confirmation field visibility too
                           label="Confirm Password"
                           variant="outlined"
                           autoComplete="new-password"
                           required
                           value={passwordConfirm}
                           onChange={handleChange}
                           disabled={loading}
                           error={!!formErrors.passwordConfirm}
                           helperText={formErrors.passwordConfirm} // Show validation error
                           InputProps={{
                             startAdornment: ( <InputAdornment position="start"><Lock color="action" sx={{ mr: 1 }} /></InputAdornment> ),
                             sx: { borderRadius: 2 }
                           }}
                            InputLabelProps={{ shrink: true }}
                         />
                     </Stack>
                </Collapse>
             </Box>

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0 || loading}
                variant="text" // Use text button for Back for less emphasis
                sx={{ textTransform: 'none', px: 3, color: 'text.secondary' }}
              >
                Back
              </Button>
              <Button
                type="submit" // This button progresses or submits
                variant="contained"
                disabled={isNextDisabled} // Use memoized disable logic
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'white',
                  background: medicalBlueGradient, // Consistent gradient button
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 15px rgba(0, 0, 0, 0.2)`,
                  },
                   '&:disabled': {
                    background: theme.palette.grey[400],
                    cursor: 'not-allowed',
                  }
                  // No pulsing animation needed here unless specifically for submit step
                }}
              >
                {loading && activeStep === steps.length - 1 ? (
                  <LoadingSpinner size="small" color="inherit" /> // Standard spinner for submit
                ) : activeStep === steps.length - 1 ? (
                  'Create Account'
                ) : (
                  'Next'
                )}
              </Button>
            </Box>
          </form>

          {/* Optional Veterinarian Note */}
          <Collapse in={role === 'vet' && activeStep === steps.length - 1} timeout={300} unmountOnExit>
             <Typography
                variant="caption" // Use caption for less important notes
                color="text.secondary"
                sx={{ mt: 2, display: 'block', textAlign: 'center' }}
             >
                Note: Veterinarian accounts require manual verification after signup.
             </Typography>
          </Collapse>


          {/* Link back to Login */}
          <Divider sx={{ my: 3, borderColor: 'rgba(0, 0, 0, 0.2)' }}>
            <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
              OR
            </Typography>
          </Divider>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Already have an account?
            </Typography>
            <Button
              component={Link}
              to="/login"
              variant="outlined" // Consistent secondary button style
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
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  borderColor: theme.palette.primary.dark,
                  color: theme.palette.primary.dark,
                }
              }}
            >
              Sign In Instead
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignupPage; 