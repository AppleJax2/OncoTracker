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
  keyframes,
  alpha
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, ErrorOutline } from '@mui/icons-material';

const pulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0, 123, 255, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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
        if (loggedInUser.role === 'vet') {
          navigate('/vet/dashboard');
        } else {
          navigate('/owner/dashboard');
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

  const medicalBlueGradient = `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`;
  const soothingBlueGradient = `linear-gradient(135deg, ${theme.palette.info.light} 0%, ${theme.palette.info.main} 100%)`;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: soothingBlueGradient,
        backgroundAttachment: 'fixed',
        py: { xs: 4, sm: 6, md: 8 },
        px: 2,
        transition: 'background 0.5s ease-in-out',
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              fontWeight={700}
              color="primary.dark"
              gutterBottom
              sx={{ mb: 1 }}
            >
              OncoTracker Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Access your veterinary oncology portal
            </Typography>
          </Box>

          {error && (
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ 
                  py: 1.5,
                  mt: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'white',
                  background: medicalBlueGradient,
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 15px rgba(0, 0, 0, 0.2)`,
                  },
                  '&:disabled': {
                    background: theme.palette.grey[400],
                    cursor: 'not-allowed',
                  }
                }}
              >
                {loading ? (
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '100%', 
                    height: '100%' 
                  }}>
                    <Box 
                      component="span"
                      sx={{
                        display: 'inline-block',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        animation: `${pulse} 2s infinite ease-in-out`,
                      }} 
                    />
                  </Box>
                ) : (
                  'Sign In'
                )}
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
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  borderColor: theme.palette.primary.dark,
                  color: theme.palette.primary.dark,
                }
              }}
            >
              Create New Account
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage; 