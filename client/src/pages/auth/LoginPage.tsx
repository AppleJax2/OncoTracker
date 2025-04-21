import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  useTheme,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  CardHeader,
  Fade,
  Grow,
  Slide,
  useMediaQuery,
  LinearProgress
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  ErrorOutline, 
  Pets,
  CheckCircleOutline
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Animation component wrapper
const MotionBox = motion(Box);

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      <Container maxWidth="xs">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
                      <Box 
                        sx={{ 
                          width: 70, 
                          height: 70, 
                          borderRadius: '50%', 
                          backgroundColor: 'rgba(5, 150, 105, 0.1)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          boxShadow: '0 4px 14px rgba(5, 150, 105, 0.15)'
                        }}
                      >
                        <Pets sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                      </Box>
                    </Box>
                  </Fade>
                  <Typography 
                    variant="h4" 
                    component="h1" 
                    fontWeight={700}
                    color="primary.dark"
                    sx={{ 
                      backgroundImage: 'linear-gradient(90deg, #047857, #059669)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}
                  >
                    OncoTracker
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mt: 1,
                      fontWeight: 500
                    }}
                  >
                    Veterinary oncology management system
                  </Typography>
                </Box>
              }
              sx={{ pb: 0 }}
            />
            
            <CardContent>
              {success && (
                <Grow in={true} timeout={800}>
                  <Alert 
                    severity="success" 
                    icon={<CheckCircleOutline fontSize="inherit" />}
                    sx={{ 
                      mb: 3, 
                      borderRadius: 2, 
                      backgroundColor: 'success.light',
                      color: 'success.dark',
                      border: `1px solid ${theme.palette.success.main}`
                    }}
                    onClose={() => setSuccess(null)}
                  >
                    {success}
                  </Alert>
                </Grow>
              )}

              {error && (
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
                    onClose={() => setError(null)}
                  >
                    {error}
                  </Alert>
                </Grow>
              )}

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
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
                    onChange={handleEmailChange}
                    disabled={loading}
                    error={!!emailError}
                    helperText={emailError}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => {
                      setEmailFocused(false);
                      if (email) validateEmail(email);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color={emailFocused ? "primary" : "action"} sx={{ mr: 1 }} />
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
                        color: emailFocused ? theme.palette.primary.main : undefined
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    variant="outlined"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color={passwordFocused ? "primary" : "action"} sx={{ mr: 1 }} />
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
                        color: passwordFocused ? theme.palette.primary.main : undefined
                      }
                    }}
                  />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          color="primary"
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">Remember me</Typography>}
                    />
                    <Link to="/forgot-password" style={{ 
                      textDecoration: 'none', 
                      color: theme.palette.primary.main,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      transition: 'color 0.2s ease'
                    }}>
                      Forgot password?
                    </Link>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{ 
                      py: 1.5,
                      mt: 2,
                      borderRadius: 6,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'white',
                      background: 'linear-gradient(90deg, #047857 0%, #059669 100%)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.25s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 20px rgba(5, 150, 105, 0.3)`,
                        background: 'linear-gradient(90deg, #047857 10%, #059669 90%)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                        boxShadow: `0 2px 10px rgba(5, 150, 105, 0.2)`,
                      },
                      '&:disabled': {
                        background: theme.palette.grey[400],
                        cursor: 'not-allowed',
                      }
                    }}
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size="small" color="inherit" />
                        <Box sx={{ width: '100%', position: 'absolute', bottom: 0, left: 0 }}>
                          <LinearProgress color="inherit" sx={{ height: 3, borderRadius: 3 }} />
                        </Box>
                      </>
                    ) : 'Sign In'}
                  </Button>
                </Stack>
              </form>

              <Divider sx={{ my: 3, borderColor: 'rgba(0, 0, 0, 0.15)' }}>
                <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                  OR
                </Typography>
              </Divider>
              
              <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={800}>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    Don't have an account yet?
                  </Typography>
                  <Button
                    component={Link}
                    to="/signup"
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
                        boxShadow: `0 4px 12px rgba(5, 150, 105, 0.15)`,
                      }
                    }}
                  >
                    Create New Account
                  </Button>
                </Box>
              </Slide>
            </CardContent>
          </Card>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default LoginPage; 