// Placeholder HomePage Component
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Box 
      sx={{ 
        minHeight: 'calc(100vh - 64px - 57px)', // Adjust based on header/footer height if needed
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        py: 4, 
        background: (theme) => `linear-gradient(to bottom right, ${theme.palette.primary.light}1A, ${theme.palette.secondary.light}1A)`, // Subtle gradient
        bgcolor: 'grey.50', // Fallback background
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={4} 
          sx={{ 
            p: { xs: 3, sm: 5 }, 
            textAlign: 'center', 
            borderRadius: 3,
          }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ fontWeight: 'bold', color: 'text.primary' }}
          >
            Welcome to OncoTracker
          </Typography>
          <Typography 
            variant="h6" 
            component="p" 
            color="text.secondary" 
            sx={{ mb: 5 }}
          >
            Monitor pet cancer treatment side effects easily and effectively.
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: 2, // Spacing between buttons
            }}
          >
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              color="primary"
              size="large"
              sx={{ width: { xs: '100%', sm: 'auto' }, px: 4, py: 1.5 }}
            >
              Login
            </Button>
            <Button
              component={RouterLink}
              to="/signup"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ width: { xs: '100%', sm: 'auto' }, px: 4, py: 1.5 }}
            >
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage; 