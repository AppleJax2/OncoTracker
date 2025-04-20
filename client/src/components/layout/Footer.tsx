import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'grey.100', 
        color: 'text.secondary',
        py: 2, 
        mt: 6
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="body2" 
          align="center"
          color="inherit"
        >
          &copy; {currentYear} OncoTracker. All Rights Reserved.
          {/* Add other footer links if needed */}
          {/* <span style={{ margin: '0 8px' }}>|</span>
          <Link href="/privacy" sx={{ '&:hover': { color: 'primary.main' } }}>Privacy Policy</Link> */}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 