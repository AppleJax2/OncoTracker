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
      style={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        borderRadius: '16px',
        padding: isMobile ? '24px 20px' : '32px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.15)} 0%, transparent 70%)`,
          zIndex: 0
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '-5%',
          left: '5%',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.light, 0.1)} 0%, transparent 70%)`,
          zIndex: 0
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center' }}>
          <Box>
            <motion.div variants={itemVariants}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <motion.div animate={pulseAnimation}>
                  <PetsRounded
                    sx={{
                      fontSize: 32,
                      color: theme.palette.primary.main,
                      mr: 1.5
                    }}
                  />
                </motion.div>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
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
                  maxWidth: '600px',
                  color: alpha(theme.palette.text.primary, 0.8),
                  mb: 2.5,
                  fontSize: '1.05rem',
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
                    maxWidth: isMobile ? '100%' : '520px',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: 'italic',
                      color: theme.palette.text.primary,
                      fontWeight: 500,
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
                  borderRadius: '12px',
                  padding: '10px 20px',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                  }
                }}
              >
                Add New Pet
              </Button>
            </motion.div>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
};

export default WelcomeSection; 