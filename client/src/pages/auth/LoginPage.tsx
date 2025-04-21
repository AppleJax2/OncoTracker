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
  Stack
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Pets } from '@mui/icons-material';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

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
        setError('Login succeeded but failed to retrieve user data. Please try again.');
      }
    } catch (err: any) {
      console.error('Login form error:', err);
      
      // Enhanced error handling
      let message = 'Login failed. Please check your credentials.';
      
      if (err.message) {
        message = err.message;
      } else if (err.details?.message) {
        message = err.details.message;
      } else if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (!navigator.onLine) {
        message = 'You appear to be offline. Please check your internet connection.';
      }
      
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
      <Container maxWidth="sm">
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
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to access your OncoTracker account
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3, borderRadius: 1 }}
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
                      <Email color="action" />
                    </InputAdornment>
                  ),
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ 
                  py: 1.5,
                  mt: 1,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: 2
                }}
              >
                {loading ? <LoadingSpinner size="small" color="inherit" /> : 'Sign In'}
              </Button>
            </Stack>
          </form>

          <Divider sx={{ my: 4 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Don't have an account?
            </Typography>
            <Button
              component={Link}
              to="/signup"
              variant="outlined"
              fullWidth
              sx={{ 
                py: 1.2,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Create Account
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage; 