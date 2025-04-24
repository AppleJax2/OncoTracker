import React from 'react';
import { Box, Container, Typography, Link, Divider, useTheme, useMediaQuery } from '@mui/material';
import SocialIcons from '../common/SocialIcons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'rgba(5, 150, 105, 0.05)', 
        color: 'text.secondary',
        py: { xs: 3, md: 4 }, 
        mt: { xs: 4, md: 6 },
        borderTop: '1px solid',
        borderColor: 'rgba(5, 150, 105, 0.1)',
        width: '100%'
      }}
    >
      <Container 
        maxWidth={false}
        sx={{ 
          maxWidth: isMobile ? null : isLargeScreen ? '1600px' : '1200px',
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: 3
        }}>
          {/* Copyright and links */}
          <Box>
            <Typography 
              variant="body2" 
              align="center"
              color="inherit"
              sx={{ 
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' },
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
                mb: { xs: 1, md: 0 }
              }}
            >
              <span>&copy; {currentYear} <span style={{ color: '#059669', fontWeight: 500 }}>Onco</span>Tracker. All Rights Reserved.</span>
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 2, sm: 3 }, 
              justifyContent: { xs: 'center', md: 'flex-start' },
              mt: 1,
              flexWrap: 'wrap'
            }}>
              <Link href="/privacy" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>Privacy Policy</Link>
              <Link href="/terms" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>Terms of Service</Link>
              <Link href="/about" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>About Us</Link>
            </Box>
          </Box>

          {/* Social Icons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-end' } }}>
            <Typography variant="body2" color="inherit" sx={{ mb: 1 }}>
              Connect with us
            </Typography>
            <SocialIcons 
              iconColor="text.secondary"
              iconHoverColor="primary.main"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 