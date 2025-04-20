// Placeholder HomePage Component
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #01579b 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
          px: 3,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 800,
              color: 'white',
              mb: 3,
              textShadow: '0px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            <PetsIcon fontSize="large" sx={{ mr: 1, verticalAlign: 'middle' }} />
            OncoTracker
          </Typography>
          
          <Typography
            variant="h2"
            component="p"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.8rem' },
              fontWeight: 400,
              color: 'white',
              mb: 6,
              maxWidth: '800px',
              mx: 'auto',
              opacity: 0.9,
            }}
          >
            Empowering veterinarians and pet owners with advanced tools to track, monitor, and improve cancer treatments for beloved companions.
          </Typography>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 3,
              justifyContent: 'center',
              mb: 6,
            }}
          >
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                backgroundColor: 'white',
                color: '#1a237e',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                }
              }}
            >
              Sign In
            </Button>
            <Button
              component={RouterLink}
              to="/signup"
              variant="outlined"
              size="large"
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              Create Account
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          backgroundColor: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 6,
              color: '#1a237e',
            }}
          >
            Comprehensive Cancer Care Tracking
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 2,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 8,
                  }
                }}
              >
                <MonitorHeartIcon 
                  sx={{ 
                    fontSize: 60, 
                    color: '#1a237e', 
                    mb: 2 
                  }} 
                />
                <Typography variant="h5" component="h3" fontWeight={600} mb={2}>
                  Symptom Monitoring
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Track treatment side effects and symptoms with an easy-to-use interface for both veterinarians and pet owners.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 2,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 8,
                  }
                }}
              >
                <MedicalServicesIcon 
                  sx={{ 
                    fontSize: 60, 
                    color: '#1a237e', 
                    mb: 2 
                  }} 
                />
                <Typography variant="h5" component="h3" fontWeight={600} mb={2}>
                  Treatment Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Organize and manage complex treatment protocols, medication schedules, and appointment reminders in one place.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 2,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 8,
                  }
                }}
              >
                <VolunteerActivismIcon 
                  sx={{ 
                    fontSize: 60, 
                    color: '#1a237e', 
                    mb: 2 
                  }} 
                />
                <Typography variant="h5" component="h3" fontWeight={600} mb={2}>
                  Care Coordination
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Enhance communication between veterinarians and pet owners to provide the best possible care for pets with cancer.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: '#f5f5f5',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} OncoTracker - Dedicated to improving pet cancer care
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage; 