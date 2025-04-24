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
  LinearProgress,
  Avatar
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
import { alpha } from '@mui/material/styles';
import PWAInstallButton from '../../components/common/PWAInstallButton';

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

  // Use theme colors and styles
  const backgroundColor = theme.palette.background.default;

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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: backgroundColor,
        py: { xs: 4, sm: 6, md: 8 },
        px: 2,
      }}
    >
      <Container maxWidth="xs">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card 
            elevation={6} 
            sx={{ 
              borderRadius: theme.shape.borderRadius,
              overflow: 'visible',
              boxShadow: theme.shadows[6],
              bgcolor: 'background.paper',
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardHeader
              title={
                <Box sx={{ textAlign: 'center', mt: 2, mb: 1 }}>
                  <Fade in={true} timeout={800}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Avatar 
                          sx={{ 
                            width: 72, 
                            height: 72, 
                            bgcolor: alpha(theme.palette.primary.main, 0.1), 
                            border: `2px solid ${theme.palette.primary.light}`,
                          }}
                        >
                          <Pets sx={{ fontSize: 38, color: theme.palette.primary.main }} />
                        </Avatar>
                      </motion.div>
                    </Box>
                  </Fade>
                  <motion.div variants={itemVariants}>
                    <Typography 
                      variant="h4"
                      component="h1" 
                      fontWeight={700}
                      color="text.primary"
                    >
                      Welcome Back
                    </Typography>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Typography 
                      variant="body1"
                      color="text.secondary" 
                      sx={{ mt: 0.5 }}
                    >
                      Sign in to access OncoTracker
                    </Typography>
                  </motion.div>
                </Box>
              }
              sx={{ pb: 0 }}
            />
            
            <CardContent sx={{ pt: 2 }}>
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
                <Stack spacing={2.5}>
                  <motion.div variants={itemVariants}>
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
                          <InputAdornment position="start" sx={{ ml: 0.5 }}>
                            <Email color={emailFocused ? "primary" : "action"} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
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
                          <InputAdornment position="start" sx={{ ml: 0.5 }}>
                            <Lock color={passwordFocused ? "primary" : "action"} />
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
                      }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            color="primary"
                            size="small"
                          />
                        }
                        label="Remember me"
                      />
                      <Button 
                        component={Link} 
                        to="/forgot-password" 
                        size="small" 
                        sx={{ 
                          textTransform: 'none', 
                          fontWeight: 500,
                          p: 0.5
                        }}
                      >
                        Forgot password?
                      </Button>
                    </Box>
                  </motion.div>

                  <motion.div 
                    variants={buttonHoverTap}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={loading}
                      sx={{ 
                        py: 1.5,
                      }}
                    >
                      {loading ? (
                        <>
                          <LoadingSpinner size="small" color="inherit" />
                        </>
                      ) : 'Sign In'}
                    </Button>
                  </motion.div>
                </Stack>
              </form>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              
              <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={800}>
                <Box sx={{ textAlign: 'center', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    Don't have an account?
                  </Typography>
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonHoverTap}
                  >
                    <Button
                      component={Link}
                      to="/signup"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      size="large"
                      disabled={loading}
                      sx={{ 
                        py: 1.5,
                      }}
                    >
                      Create New Account
                    </Button>
                  </motion.div>
                </Box>
              </Slide>
            </CardContent>
          </Card>
        </MotionBox>
      </Container>
      <PWAInstallButton />
    </Box>
  );
};

export default LoginPage; 