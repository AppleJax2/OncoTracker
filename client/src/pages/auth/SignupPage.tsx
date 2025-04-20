// Placeholder SignupPage Component
import React, { useState, ChangeEvent } from 'react';
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
  StepLabel
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  Person, 
  Business, 
  Pets 
} from '@mui/icons-material';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'owner' as 'owner' | 'vet', // Typed role
    clinicName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const { firstName, lastName, email, password, passwordConfirm, role, clinicName } = formData;

  const steps = ['Account Type', 'Personal Information', 'Create Password'];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleNext = () => {
    if (activeStep === 0 && role === 'vet' && !clinicName.trim()) {
      setError('Clinic name is required for veterinarian accounts.');
      return;
    }
    
    setError(null);
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setError(null);
    setActiveStep((prevStep) => prevStep - 1);
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
      // Navigate to login after successful signup
      navigate('/login');
    } catch (err: any) {
      console.error('Signup Failed:', err);
      const message = err?.response?.data?.message || err.message || 'Signup failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const validateStep = () => {
    if (activeStep === 0) {
      return role && (role !== 'vet' || clinicName.trim() !== '');
    } else if (activeStep === 1) {
      return firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '';
    } else {
      return password !== '' && passwordConfirm !== '' && password === passwordConfirm;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #01579b 100%)',
        py: 8,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={4}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Pets 
              sx={{ 
                fontSize: 56, 
                color: '#1a237e',
                mb: 2
              }} 
            />
            <Typography 
              variant="h4" 
              component="h1" 
              fontWeight={700}
              color="primary.dark"
              gutterBottom
            >
              Create Your Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join OncoTracker to manage pet cancer care effectively
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3, borderRadius: 1 }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            {activeStep === 0 && (
              <Stack spacing={3}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ mb: 2, fontWeight: 500 }}>
                    I am registering as:
                  </FormLabel>
                  <RadioGroup
                    name="role"
                    value={role}
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel 
                      value="owner" 
                      control={<Radio />} 
                      label="Pet Owner" 
                      sx={{ mr: 4 }}
                    />
                    <FormControlLabel 
                      value="vet" 
                      control={<Radio />} 
                      label="Veterinarian" 
                    />
                  </RadioGroup>
                </FormControl>

                {role === 'vet' && (
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Stack>
            )}

            {activeStep === 1 && (
              <Stack spacing={3}>
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person color="action" />
                          </InputAdornment>
                        ),
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person color="action" />
                          </InputAdornment>
                        ),
                      }}
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            )}

            {activeStep === 2 && (
              <Stack spacing={3}>
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
                  helperText="Password must be at least 8 characters"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
                  error={password !== passwordConfirm && passwordConfirm !== ''}
                  helperText={
                    password !== passwordConfirm && passwordConfirm !== ''
                      ? 'Passwords do not match'
                      : ''
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0 || loading}
                variant="outlined"
                sx={{ textTransform: 'none', px: 3 }}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !validateStep()}
                sx={{ 
                  py: 1.2,
                  px: 4,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600
                }}
              >
                {loading ? (
                  <LoadingSpinner size="small" color="inherit" />
                ) : activeStep === steps.length - 1 ? (
                  'Create Account'
                ) : (
                  'Next'
                )}
              </Button>
            </Box>
          </form>

          {role === 'vet' && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mt: 3, textAlign: 'center' }}
            >
              Veterinarian accounts require manual verification before full access is granted.
            </Typography>
          )}

          <Divider sx={{ my: 4 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Already have an account?
            </Typography>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              fullWidth
              sx={{ 
                py: 1.2,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignupPage; 