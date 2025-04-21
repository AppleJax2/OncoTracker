// Placeholder HomePage Component
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Button, Grid, Paper, useTheme } from '@mui/material';
import { motion } from 'framer-motion'; // Import motion
import { HeartPulse, ClipboardList, Users } from 'lucide-react'; // Import Lucide icons

// Animation variants for Framer Motion
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const HomePage: React.FC = () => {
  const theme = useTheme(); // Use theme hook to access palette

  return (
    <Box
      sx={{
        // Remove the gradient background - rely on theme background
        minHeight: 'calc(100vh - 64px)', // Adjust if there's an AppBar
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default, // Apply theme background
      }}
    >
      {/* Hero Section - Enhanced */}
      <Box
        component={motion.div}
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        sx={{
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
          px: 3,
          textAlign: 'center',
          position: 'relative', // Needed for pseudo-element positioning
          overflow: 'hidden', // Prevent gradient bleed
          backgroundColor: theme.palette.primary.light, // Use a light primary background
          // Add a subtle gradient overlay or image placeholder effect
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // Example: Soft radial gradient from center
            background:
              `radial-gradient(circle at center, 
                ${theme.palette.background.default} 0%, 
                ${theme.palette.primary.light} 100%
              )`,
            // Example: Placeholder for an image with overlay
            // backgroundImage: 'url(/path/to/soft-background.jpg)', 
            // backgroundSize: 'cover',
            // backgroundPosition: 'center',
            opacity: 0.3, // Adjust opacity for subtlety
            zIndex: 0,
          },
          // Ensure content is above the pseudo-element
          '& > * ': { // Target direct children (Container)
             position: 'relative',
             zIndex: 1,
          }
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.8rem', md: '4.2rem' },
              fontWeight: 700,
              mb: 3,
              color: theme.palette.primary.contrastText, // Use contrast text on light primary bg
              // Add a subtle text shadow for readability on potentially complex bg
               textShadow: '0px 1px 3px rgba(0,0,0,0.2)', 
            }}
          >
            OncoTracker
          </Typography>

          <Typography
            variant="h5"
            component="p"
            sx={{
              fontWeight: 400,
              color: theme.palette.primary.contrastText, // Contrast text here too
              mb: 6,
              maxWidth: '750px',
              mx: 'auto',
              lineHeight: 1.7,
              opacity: 0.9, // Slight transparency can look good
            }}
          >
            Compassionate tools for veterinarians and pet parents, simplifying the journey of cancer treatment for beloved companions.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              mb: 6,
            }}
          >
            {/* Adjust button variants for contrast on the new hero background */}
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              color="secondary" // Use secondary color for contrast/visual interest
              size="large"
              sx={{ 
                 color: theme.palette.secondary.contrastText, // Ensure text is readable
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
                 borderColor: theme.palette.primary.contrastText, // White border
                 color: theme.palette.primary.contrastText, // White text
                 '&:hover': {
                   backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle hover background
                   borderColor: theme.palette.primary.contrastText, // Keep border white
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
          backgroundColor: theme.palette.background.paper, // Use paper background for contrast
          py: { xs: 8, md: 10 },
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2" // Uses h2 style from theme
            component="h2"
            align="center"
            sx={{
              // Adjusted font sizes if needed
              fontWeight: 700,
              mb: { xs: 6, md: 8 },
              color: theme.palette.primary.dark, // Use dark primary color
            }}
          >
            Dedicated Support for Every Step
          </Typography>

          <Grid
            container
            spacing={4} // Adjust spacing as needed
            component={motion.div} // Animate the grid container itself
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Feature Card 1 */}
            <Grid item xs={12} md={4}> {/* Keep Grid item standard */}
              {/* Apply motion inside the grid item, wrapping the Paper */}
              <motion.div
                variants={fadeInUp} // Entry animation
                whileHover={{ y: -6, transition: { duration: 0.2 } }} // Hover animation
                style={{ height: '100%' }} // Ensure motion div takes full height
              >
                <Paper
                  elevation={0} // Use border instead of shadow for softer look
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    borderRadius: theme.shape.borderRadius, // Use theme radius
                    border: `1px solid ${theme.palette.divider}`,
                    textAlign: 'center',
                    transition: 'border-color 0.3s ease', // Remove transform transition, motion handles it
                    backgroundColor: theme.palette.background.default, // Slightly different background
                    '&:hover': {
                        borderColor: theme.palette.primary.light,
                    }
                  }}
                 // Removed component={motion.div} and whileHover from Paper itself
                >
                  <HeartPulse // Use Lucide icon
                    size={48} // Adjust size
                    color={theme.palette.primary.main} // Use theme primary color
                    style={{ marginBottom: theme.spacing(2) }}
                  />
                  <Typography variant="h5" component="h3" fontWeight={600} mb={1.5} color={theme.palette.text.primary}>
                    Symptom Monitoring
                  </Typography>
                  <Typography variant="body1" color={theme.palette.text.secondary}>
                    Easily track treatment side effects and your pet's well-being, fostering clear communication with your vet.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>

            {/* Feature Card 2 */}
            <Grid item xs={12} md={4}> {/* Keep Grid item standard */}
              {/* Apply motion inside the grid item, wrapping the Paper */}
              <motion.div
                variants={fadeInUp} // Entry animation
                whileHover={{ y: -6, transition: { duration: 0.2 } }} // Hover animation
                style={{ height: '100%' }}
              >
                <Paper
                  elevation={0} // Use border instead of shadow
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    borderRadius: theme.shape.borderRadius,
                    border: `1px solid ${theme.palette.divider}`,
                    textAlign: 'center',
                    transition: 'border-color 0.3s ease', // Remove transform transition
                    backgroundColor: theme.palette.background.default,
                    '&:hover': {
                        borderColor: theme.palette.primary.light,
                    }
                  }}
                   // Removed component={motion.div} and whileHover from Paper itself
                >
                  <ClipboardList // Use Lucide icon
                    size={48}
                    color={theme.palette.primary.main}
                    style={{ marginBottom: theme.spacing(2) }}
                  />
                  <Typography variant="h5" component="h3" fontWeight={600} mb={1.5} color={theme.palette.text.primary}>
                    Treatment Management
                  </Typography>
                  <Typography variant="body1" color={theme.palette.text.secondary}>
                    Keep complex treatment protocols, medication schedules, and appointments organized in one central place.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>

            {/* Feature Card 3 */}
            <Grid item xs={12} md={4}> {/* Keep Grid item standard */}
              {/* Apply motion inside the grid item, wrapping the Paper */}
              <motion.div
                variants={fadeInUp} // Entry animation
                whileHover={{ y: -6, transition: { duration: 0.2 } }} // Hover animation
                style={{ height: '100%' }}
              >
                <Paper
                  elevation={0} // Use border instead of shadow
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    borderRadius: theme.shape.borderRadius,
                    border: `1px solid ${theme.palette.divider}`,
                    textAlign: 'center',
                    transition: 'border-color 0.3s ease', // Remove transform transition
                    backgroundColor: theme.palette.background.default,
                    '&:hover': {
                        borderColor: theme.palette.primary.light,
                    }
                  }}
                  // Removed component={motion.div} and whileHover from Paper itself
                >
                  <Users // Use Lucide icon
                    size={48}
                    color={theme.palette.primary.main}
                    style={{ marginBottom: theme.spacing(2) }}
                  />
                  <Typography variant="h5" component="h3" fontWeight={600} mb={1.5} color={theme.palette.text.primary}>
                    Care Coordination
                  </Typography>
                  <Typography variant="body1" color={theme.palette.text.secondary}>
                    Enhance teamwork between vet and pet parent, ensuring seamless, informed care throughout the journey.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 4, // Increased padding
          px: 2,
          mt: 'auto', // Pushes footer to bottom
          backgroundColor: theme.palette.background.default, // Match main background
          textAlign: 'center',
          borderTop: `1px solid ${theme.palette.divider}` // Add subtle top border
        }}
      >
        <Typography variant="body2" color={theme.palette.text.secondary}>
          © {new Date().getFullYear()} OncoTracker - Supporting pets and their families through cancer care. {/* Refined text */}
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage; 