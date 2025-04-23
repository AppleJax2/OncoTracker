// Redesigned HomePage Component inspired by Hyperspace template
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  useTheme, 
  alpha,
  useMediaQuery,
  Divider,
  Stack,
  TextField,
  Paper,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment
} from '@mui/material';
import { 
  MonitorHeartOutlined, 
  CalendarMonthOutlined, 
  Groups2Outlined, 
  Pets, 
  HealthAndSafetyOutlined,
  MedicalInformationOutlined,
  LocalHospitalOutlined,
  PsychologyOutlined,
  FavoriteBorderOutlined,
  EmojiObjectsOutlined,
  ArrowForwardIos,
  CheckCircleOutlined,
  EmailOutlined,
  PersonOutline,
  MessageOutlined,
  Instagram,
  Facebook,
  Twitter,
  LinkedIn,
  Security,
  DataSaverOn,
  BarChart,
  Share,
  PhoneIphone,
  KeyboardArrowDown
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  // Simplified Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Jane D.",
      role: "Pet Owner",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      content: "OncoTracker has been invaluable in monitoring my dog's health. Sharing updates with our vet has never been easier."
    },
    {
      id: 2,
      name: "Dr. Mark S.",
      role: "Veterinarian",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      content: "As a vet, I can now provide better care by having access to daily symptom tracking. The app makes communication with pet parents seamless."
    },
    {
      id: 3,
      name: "Sarah T.",
      role: "Pet Owner",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      content: "The medication reminder feature has been a lifesaver. I never miss giving my cat her treatments on time now."
    }
  ];

  // Feature list data
  const featureList = [
    {
      icon: <MonitorHeartOutlined />,
      title: "Daily Symptom Tracking",
      description: "Log and monitor your pet's symptoms with our easy-to-use tracking system."
    },
    {
      icon: <BarChart />,
      title: "Progress Charts",
      description: "Visualize your pet's health journey with comprehensive charts and analytics."
    },
    {
      icon: <CalendarMonthOutlined />,
      title: "Treatment Reminders",
      description: "Never miss a medication or appointment with our smart reminder system."
    },
    {
      icon: <Share />,
      title: "Vet Communication",
      description: "Share reports directly with your veterinarian for better coordinated care."
    },
    {
      icon: <DataSaverOn />,
      title: "Custom Health Logs",
      description: "Customize tracking parameters based on your pet's specific condition."
    },
    {
      icon: <PhoneIphone />,
      title: "Mobile Friendly",
      description: "Access your pet's health information anytime, anywhere on any device."
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex', 
      flexDirection: 'column',
      background: theme.palette.background.default, 
      color: theme.palette.text.primary
    }}>
      {/* Redesigned Hero Section - Cleaner Approach */}
      <Box
        sx={{
          position: 'relative',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          pt: { xs: 10, md: 0 },
          pb: { xs: 10, md: 0 },
          overflow: 'hidden',
          color: '#fff',

          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1559757141-f3a7f14635b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: alpha(theme.palette.primary.dark, 0.5),
            zIndex: 2,
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 3 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.8rem', sm: '3.5rem', md: '4.5rem' },
                mb: 2,
                textShadow: '0 3px 8px rgba(0,0,0,0.3)'
              }}
            >
              Support Your Pet Through Cancer Care
            </Typography>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ delay: 0.2 }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 400,
                fontSize: { xs: '1.1rem', sm: '1.3rem' },
                color: 'rgba(255,255,255,0.9)',
                mb: 5,
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.7,
                textShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              OncoTracker provides intuitive tools for pet owners and vets to monitor symptoms, track treatments, and enhance quality of life together.
            </Typography>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ delay: 0.4 }}
          >
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2}
              sx={{
                justifyContent: 'center',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  size="large"
                  color="primary"
                  endIcon={<ArrowForwardIos sx={{ fontSize: '1rem' }}/>}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '30px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                      boxShadow: `0 8px 20px ${alpha(theme.palette.primary.dark, 0.4)}`,
                    }
                  }}
                >
                  Get Started Free
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '30px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderColor: 'rgba(255,255,255,0.8)',
                    color: '#fff',
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#fff',
                      borderWidth: 2,
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Sign In
                </Button>
              </motion.div>
            </Stack>
          </motion.div>
        </Container>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            delay: 2, 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <Typography 
            variant="body2" 
            color="rgba(255,255,255,0.7)"
            sx={{ mb: 1 }}
          >
            Discover More
          </Typography>
          <KeyboardArrowDown sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 24 }} />
        </motion.div>
      </Box>

      {/* Feature Section - Needs review after gradient removal */}
      <Box
        sx={{
          background: theme.palette.background.paper, 
        }}
        id="features"
      >
        {/* ... Existing Feature Section Content ... */}
        {/* Review FeatureCard styling to ensure it looks good without gradients */}
      </Box>

      {/* ... Rest of the HomePage content (Benefits, Testimonials, etc.) ... */}
      {/* Ensure these sections use solid colors now */}

    </Box>
  );
};

export default HomePage; 