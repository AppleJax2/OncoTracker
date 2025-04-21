import React, { useState } from 'react';
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
  useTheme,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  ErrorOutline, 
  Pets 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Animation component wrapper
const MotionBox = motion(Box);

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
                    OncoTracker
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Veterinary oncology management system
                  </Typography>
                </Box>
              }
              sx={{ pb: 0 }}
            />
            
            <CardContent>
              {error && (
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
                  {error}
                </Alert>
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
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
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
                    <Link to="#" style={{ 
                      textDecoration: 'none', 
                      color: theme.palette.primary.main,
                      fontSize: '0.875rem'
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
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'white',
                      background: 'linear-gradient(90deg, #0B4F6C 0%, #01949A 100%)',
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      position: 'relative',
                      overflow: 'hidden',
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
                    {loading ? <LoadingSpinner size="small" color="inherit" /> : 'Sign In'}
                  </Button>
                </Stack>
              </form>

              <Divider sx={{ my: 3, borderColor: 'rgba(0, 0, 0, 0.2)' }}>
                <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                  OR
                </Typography>
              </Divider>
              
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
                  Create New Account
                </Button>
              </Box>
            </CardContent>
          </Card>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default LoginPage; 