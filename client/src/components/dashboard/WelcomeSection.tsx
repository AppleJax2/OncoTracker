import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, useTheme, alpha, useMediaQuery } from '@mui/material';
import { PetsRounded, AddCircleRounded } from '@mui/icons-material';

interface WelcomeSectionProps {
  userName: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userName }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [supportMessage, setSupportMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);

  // Supportive messages that rotate
  const supportMessages = [
    "Remember to take care of yourself as you care for your pet.",
    "Every small step in treatment is progress worth celebrating.",
    "You're doing great managing your pet's journey.",
    "We're here to support you through every stage of treatment.",
    "Tracking symptoms helps your vet provide the best care possible."
  ];

  // Change support message every 10 seconds
  useEffect(() => {
    setSupportMessage(supportMessages[messageIndex]);
    
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % supportMessages.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [messageIndex]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Animation for the pulsing icon
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{
        borderRadius: { xs: 2, md: 3 },
        backgroundColor: alpha(theme.palette.primary.light, 0.08),
        p: { xs: 3, md: 4, lg: 5 },
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        width: '100%'
      }}>
        {/* Decorative elements - larger and more spread out on desktop */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '10%', md: '15%' },
            right: { xs: '5%', md: '8%' },
            backgroundColor: alpha(theme.palette.primary.light, 0.15),
            borderRadius: '50%',
            width: { xs: '120px', sm: '150px', md: '180px', lg: '220px' },
            height: { xs: '120px', sm: '150px', md: '180px', lg: '220px' },
            zIndex: 0,
            display: { xs: 'none', sm: 'block' }
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: '10%', md: '15%' },
            left: { xs: '5%', md: '12%' },
            backgroundColor: alpha(theme.palette.secondary.light, 0.1),
            borderRadius: '50%',
            width: { xs: '80px', sm: '100px', md: '120px', lg: '150px' },
            height: { xs: '80px', sm: '100px', md: '120px', lg: '150px' },
            zIndex: 0,
            display: { xs: 'none', sm: 'block' }
          }}
        />

        {/* Additional decorative element for large screens */}
        {isLargeScreen && (
          <Box
            sx={{
              position: 'absolute',
              top: '40%',
              left: '35%',
              backgroundColor: alpha(theme.palette.primary.dark, 0.05),
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              zIndex: 0
            }}
          />
        )}

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', md: 'center' },
            maxWidth: { lg: '1200px' }
          }}>
            <Box sx={{ 
              maxWidth: { xs: '100%', md: '60%', lg: '70%' },
              pr: { md: 4 }
            }}>
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <motion.div animate={pulseAnimation}>
                    <PetsRounded
                      sx={{
                        fontSize: { xs: 28, sm: 32, md: 36 },
                        color: theme.palette.primary.main,
                        mr: 1.5
                      }}
                    />
                  </motion.div>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem', lg: '2.2rem' },
                      backgroundColor: theme.palette.primary.main,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '-0.5px'
                    }}
                  >
                    Welcome back, {userName || 'Friend'}
                  </Typography>
                </Box>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    maxWidth: { xs: '100%', md: '600px', lg: '800px' },
                    color: alpha(theme.palette.text.primary, 0.8),
                    mb: 2.5,
                    fontSize: { xs: '1rem', md: '1.05rem', lg: '1.1rem' },
                    lineHeight: 1.6
                  }}
                >
                  Track your pet's cancer treatment progress, monitor symptoms, and share reports with your veterinarian all in one place.
                </Typography>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={messageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    sx={{
                      background: alpha(theme.palette.primary.light, 0.15),
                      borderLeft: `3px solid ${theme.palette.primary.main}`,
                      borderRadius: '0 8px 8px 0',
                      padding: '12px 16px',
                      maxWidth: { xs: '100%', md: '520px', lg: '600px' }
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: 'italic',
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                        fontSize: { xs: '0.875rem', md: '0.9rem' }
                      }}
                    >
                      "{supportMessage}"
                    </Typography>
                  </Box>
                </motion.div>
              </AnimatePresence>
            </Box>

            <motion.div 
              variants={itemVariants}
              style={{ marginTop: isMobile ? 24 : 0, alignSelf: isMobile ? 'flex-start' : 'center' }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  component={Link}
                  to="/owner/pets/new"
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleRounded />}
                  sx={{
                    py: { xs: 1.5, md: 1.75 },
                    px: { xs: 3, md: 4, lg: 5 },
                    borderRadius: '30px',
                    backgroundColor: theme.palette.primary.main,
                    color: '#fff',
                    boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', md: '0.95rem', lg: '1rem' },
                    textTransform: 'none',
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                      backgroundColor: theme.palette.primary.dark,
                    }
                  }}
                >
                  Add New Pet
                </Button>
              </motion.div>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default WelcomeSection; 