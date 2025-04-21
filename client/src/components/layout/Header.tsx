import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Container
} from '@mui/material';
import {
  LogoutOutlined as LogoutIcon,
  SettingsOutlined as SettingsIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    // Navigate might happen automatically via context/route changes, or redirect here
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      color="inherit" 
      sx={{ 
        borderBottom: '1px solid', 
        borderColor: 'rgba(5, 150, 105, 0.1)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 0.5, px: { xs: 1, sm: 2 } }}>
          {/* Logo/Brand */}
          <Box
            component={Link}
            to="/"
            sx={{
              typography: 'h6',
              fontWeight: 'bold',
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': { color: 'primary.dark' },
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <span style={{ color: '#059669' }}>Onco</span>Tracker
          </Box>

          {/* Navigation/User Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            {isAuthenticated && user ? (
              <>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  Welcome, {user.firstName} ({user.role === 'vet' ? 'Veterinarian' : 'Pet Owner'})
                </Typography>
                
                {/* Settings Link */}
                <IconButton
                  component={Link}
                  to="/settings"
                  color="inherit"
                  aria-label="settings"
                  edge="end"
                  size="medium"
                  sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                >
                  <SettingsIcon />
                </IconButton>
                
                {/* Logout Button */}
                <IconButton
                  onClick={handleLogout}
                  color="inherit"
                  aria-label="logout"
                  edge="end"
                  size="medium"
                  sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Button 
                  component={Link} 
                  to="/login" 
                  color="inherit"
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  color="primary"
                  disableElevation
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 