// Redesigned HomePage Component inspired by Hyperspace template
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  PhoneIphone
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5, 
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -8,
      boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.03, transition: { duration: 0.2 } },
    tap: { scale: 0.98 }
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
      background: `linear-gradient(150deg, ${alpha(theme.palette.primary.dark, 0.9)} 0%, ${alpha(theme.palette.primary.main, 0.85)} 35%, ${alpha(theme.palette.secondary.light, 0.8)} 100%)`,
      color: '#fff'
    }}>
      {/* Hero Section - New Creative Design */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 12, md: 0 },
          pb: { xs: 12, md: 0 },
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        >
          {/* Large floating circle */}
              <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 0.7, 
              scale: 1,
              y: [0, 15, 0],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            style={{
              position: 'absolute',
              top: '10%',
              right: '-5%',
              width: '45%',
              height: '45%',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha(theme.palette.secondary.light, 0.4)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 70%)`,
            }}
          />
          
          {/* Medium floating circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 0.5, 
              scale: 1,
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1 
            }}
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '-10%',
              width: '35%',
              height: '35%',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.3)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 70%)`,
            }}
          />
          
          {/* Small floating elements */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
              }}
              animate={{ 
                opacity: 0.3 + (Math.random() * 0.4), 
                x: [Math.random() * 20 - 10, Math.random() * 20 - 10],
                y: [Math.random() * 20 - 10, Math.random() * 20 - 10],
                rotate: [0, Math.random() * 360],
              }}
              transition={{ 
                duration: 7 + Math.random() * 8, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.5
              }}
              style={{
                position: 'absolute',
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                width: `${20 + Math.random() * 50}px`,
                height: `${20 + Math.random() * 50}px`,
                borderRadius: `${(Math.random() > 0.5) ? '50%' : '30%'}`,
                background: `${theme.palette.primary.main}`,
                filter: 'blur(8px)',
              }}
            />
          ))}
        </Box>
        
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            position: 'relative',
          }}>
            
            {/* Main Content */}
            <Box
              sx={{
                width: { xs: '100%', md: '50%' },
                position: 'relative',
                zIndex: 3,
                pr: { md: 4 },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                      mb: 3,
                    position: 'relative',
                  }}
                >
                  Track Your Pet's Cancer Journey
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      color: '#fff',
                      textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      mt: 1,
                    }}
                  >
                    with Compassion
                  </Box>
                  </Typography>
                </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 400,
                      fontSize: { xs: '1.1rem', sm: '1.3rem' },
                      color: 'rgba(255,255,255,0.9)',
                    mb: 5,
                    maxWidth: { xs: '100%', md: '90%' },
                      lineHeight: 1.6
                    }}
                  >
                  Empowering pet owners and veterinarians with intuitive tools to monitor 
                  symptoms, track treatments, and improve quality of life.
                  </Typography>
                </motion.div>

                    <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={3}
                  sx={{
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    mb: { xs: 8, md: 0 }
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
                        endIcon={<ArrowForwardIos />}
                        sx={{
                          py: 1.8,
                          px: 4,
                          borderRadius: '30px',
                          textTransform: 'none',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                        backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        color: '#fff',
                        boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
                          '&:hover': {
                          boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.6)}`,
                          }
                        }}
                      >
                        Get Started — It's Free
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
                          py: 1.8,
                          px: 4,
                          borderRadius: '30px',
                          textTransform: 'none',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          borderColor: 'rgba(255,255,255,0.7)',
                          color: '#fff',
                          borderWidth: 2,
                        backdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(255,255,255,0.05)',
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
            </Box>
            
            {/* Image and Decorative Elements */}
            <Box
              sx={{
                width: { xs: '100%', md: '55%' },
                position: 'relative',
                mt: { xs: 0, md: -5 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: { xs: 'auto', md: '600px' },
              }}
            >
              {/* Main image with floating animation */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ 
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {/* Floating animation wrapper */}
                <motion.div
                  animate={{ 
                    y: [0, 15, 0],
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                >
                  {/* Image with frame and shadow effect */}
                  <Box
                    sx={{
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        right: -20,
                        bottom: -20,
                        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)} 0%, ${alpha(theme.palette.secondary.main, 0.3)} 100%)`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                      }
                    }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1536590158209-e9d615d525e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Pet with owner"
                  sx={{
                    width: '100%',
                        maxWidth: { xs: '80%', sm: '400px', md: '450px' },
                        height: 'auto',
                        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                        border: '5px solid rgba(255,255,255,0.2)',
                        display: 'block',
                        mx: 'auto',
                      }}
                    />
                  </Box>
              </motion.div>
              </motion.div>
              
              {/* Decorative feature highlights */}
              {[
                { 
                  icon: <MonitorHeartOutlined />, 
                  label: 'Symptom Tracking',
                  position: { top: '10%', right: { xs: '5%', md: '0%' } } 
                },
                { 
                  icon: <CalendarMonthOutlined />, 
                  label: 'Treatment Reminders',
                  position: { bottom: '15%', right: { xs: '10%', md: '5%' } } 
                },
                { 
                  icon: <FavoriteBorderOutlined />, 
                  label: 'Quality of Life',
                  position: { top: '35%', left: { xs: '5%', md: '0%' } } 
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.7 + (index * 0.2)
                  }}
                  style={{
            position: 'absolute',
                    ...item.position,
                    zIndex: 3,
                    display: { xs: 'none', sm: 'flex' },
                  }}
                >
                  <Paper
                    elevation={6}
          sx={{
                      display: 'flex',
                      alignItems: 'center',
                      px: 2,
                      py: 1,
                      borderRadius: '20px',
                      backdropFilter: 'blur(8px)',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      boxShadow: `0 10px 30px ${alpha(theme.palette.primary.dark, 0.2)}`,
                    }}
                  >
                    <Box sx={{ 
                      color: theme.palette.primary.main,
                      display: 'flex',
                      mr: 1,
                      fontSize: '1.2rem'
                    }}>
                      {item.icon}
                    </Box>
                    <Typography 
                      variant="body2" 
                      fontWeight={600}
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {item.label}
                    </Typography>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </Box>
          
          {/* Stats or trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              marginTop: { xs: '2rem', md: '-1rem' },
              position: 'relative',
              zIndex: 4,
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Box sx={{ 
              mt: { xs: 6, md: 0 },
              py: 3,
              px: 4,
              mx: 'auto',
              width: 'fit-content',
              borderRadius: '20px',
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 5,
            }}>
              {[
                { value: '10,000+', label: 'Pet Owners' },
                { value: '500+', label: 'Veterinarians' },
                { value: '98%', label: 'Satisfaction' }
              ].map((stat, index) => (
                <Box key={index} sx={{ textAlign: 'center', px: 2 }}>
                  <Typography variant="h4" fontWeight={700} color="white" gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.8)">
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Feature Section - Redesigned */}
      <Box
        sx={{
          // Subtle gradient background
          background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
          py: { xs: 8, sm: 10, md: 12, lg: 16 }, // Adjusted padding
          color: theme.palette.text.primary,
          overflow: 'hidden', // Prevent animation overflow
        }}
        id="features"
      >
        <Container maxWidth="xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {/* Section Header */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                component="h2"
                align="center"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2.2rem', md: '2.8rem' }
                }}
              >
                Everything You Need
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                component="p"
                align="center"
                color="textSecondary"
                sx={{
                  maxWidth: '800px',
                  mx: 'auto',
                  mb: { xs: 8, md: 12 },
                  fontSize: '1.1rem',
                  lineHeight: 1.7
                }}
              >
                OncoTracker provides a suite of tools designed for clarity and confidence 
                throughout your pet's cancer treatment journey.
              </Typography>
            </motion.div>

            {/* Redesigned Feature Grid */}
            <Grid container spacing={5} alignItems="stretch">
              {featureList.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    variants={cardVariants} // Reuse existing card variants for consistency
                    custom={index} // Stagger animation
                    whileHover="hover" // Reuse hover effect
                    style={{ height: '100%' }} // Ensure motion div fills grid item height
                  >
                    <Box
                      sx={{
                        p: { xs: 3, md: 4 },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        borderRadius: 4,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                        background: alpha(theme.palette.background.paper, 0.8),
                        backdropFilter: 'blur(5px)', // Subtle glass effect
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                        '&:hover': {
                          borderColor: alpha(theme.palette.primary.main, 0.4),
                          background: alpha(theme.palette.background.paper, 0.95),
                          boxShadow: '0 10px 30px rgba(0,0,0,0.07)',
                          // Icon color change on hover is handled below
                        },
                      }}
                    >
                      {/* Icon with background */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 64,
                          height: 64,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          borderRadius: '18px', // Squircle shape
                          color: theme.palette.primary.main,
                          mb: 3,
                          transition: 'all 0.3s ease',
                          fontSize: '2rem',
                          [`.MuiGrid-item:hover &`]: { // Target icon color on parent hover
                            backgroundColor: theme.palette.primary.main,
                            color: '#fff',
                          },
                        }}
                      >
                        {feature.icon}
                      </Box>
                      {/* Title */}
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        fontWeight={600} 
                        gutterBottom 
                        sx={{ mb: 1.5 }}
                      >
                        {feature.title}
                      </Typography>
                      {/* Description */}
                      <Typography 
                        color="textSecondary" 
                        sx={{ lineHeight: 1.6, flexGrow: 1 }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Key Benefits Section */}
      <Box
        sx={{
          py: { xs: 8, sm: 10, md: 12, lg: 14 },
          background: `linear-gradient(to bottom, ${alpha(theme.palette.background.paper, 1)} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      fontSize: { xs: '2rem', md: '2.5rem' }
                    }}
                  >
                    Why Choose OncoTracker
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    sx={{ mb: 4, fontWeight: 400 }}
                  >
                    Created with compassion and expertise to support you during challenging times.
                  </Typography>
                </motion.div>

                <List disablePadding>
                  {[
                    {
                      title: "Improved Quality of Care",
                      description: "Better tracking leads to more informed decisions for your pet's health journey."
                    },
                    {
                      title: "Expert-Led Design",
                      description: "Developed with veterinary oncologists to ensure clinical relevance and usability."
                    },
                    {
                      title: "Peace of Mind",
                      description: "Reduce anxiety by feeling more in control of your pet's treatment plan."
                    },
                    {
                      title: "Pet-Centered Approach",
                      description: "Every feature is designed with your pet's comfort and wellbeing in mind."
                    }
                  ].map((item, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <ListItem 
                        sx={{ 
                          px: 0, 
                          py: 2,
                          alignItems: "flex-start"
                        }}
                      >
                        <ListItemIcon sx={{ 
                          minWidth: 40,
                          mt: 0.5
                        }}>
                          <CheckCircleOutlined sx={{ color: theme.palette.primary.main }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 0.5 }}>
                              {item.title}
                            </Typography>
                          } 
                          secondary={
                            <Typography variant="body1" color="textSecondary">
                              {item.description}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Veterinarian with pet"
                  sx={{
                    width: '100%',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box
        sx={{
          py: { xs: 8, sm: 10, md: 12, lg: 14 },
          background: theme.palette.background.default,
        }}
      >
        <Container maxWidth="xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                component="h2"
                align="center"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                What Our Users Say
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                component="p"
                align="center"
                color="textSecondary"
                sx={{
                  maxWidth: '700px',
                  mx: 'auto',
                  mb: { xs: 8, md: 10 },
                  fontSize: '1.1rem'
                }}
              >
                Join hundreds of pet parents and veterinarians who trust OncoTracker for their cancer care management.
              </Typography>
            </motion.div>

            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={testimonial.id}>
                  <motion.div
                    variants={cardVariants}
                    custom={index}
                    whileHover="hover"
                  >
                    <Card
                      elevation={3}
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 4,
                        p: 3,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <CardContent sx={{ 
                        flexGrow: 1,
                        p: 0,
                        "&:last-child": { pb: 0 }
                      }}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          paragraph
                          sx={{ 
                            mb: 3,
                            fontStyle: 'italic',
                            fontSize: '1.1rem',
                            lineHeight: 1.6
                          }}
                        >
                          "{testimonial.content}"
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            sx={{ width: 50, height: 50, mr: 2 }}
                          />
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {testimonial.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {testimonial.role}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Privacy Section */}
      <Box
        sx={{
          py: { xs: 8, sm: 10, md: 12, lg: 14 },
          background: alpha(theme.palette.primary.light, 0.1),
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Security sx={{ 
                  fontSize: 60, 
                  color: theme.palette.primary.main,
                  mb: 2
                }} />
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '1.8rem', md: '2.2rem' }
                  }}
                >
                  Your Data Privacy & Security
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ mb: 3, fontSize: '1.1rem', maxWidth: '500px', lineHeight: 1.6 }}
                >
                  We prioritize your privacy. All pet health data is encrypted and stored securely, ensuring your information remains confidential and protected.
                </Typography>
                <Button
                  component={Link}
                  to="/privacy"
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ 
                    borderRadius: '30px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    py: 1.2,
                    px: 3,
                  }}
                >
                  Learn About Our Privacy Policy
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                {[
                  {
                    title: "End-to-End Encryption",
                    description: "Your pet's health data is encrypted in transit and at rest."
                  },
                  {
                    title: "HIPAA-Inspired Practices",
                    description: "We've adopted healthcare-grade security protocols."
                  },
                  {
                    title: "User Controlled Sharing",
                    description: "You decide who can access your pet's health information."
                  },
                  {
                    title: "Regular Security Audits",
                    description: "We continuously test and improve our security measures."
                  }
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    >
                      <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 1 }}>
                        {item.title}
                      </Typography>
                      <Typography color="textSecondary" variant="body2" sx={{ lineHeight: 1.6 }}>
                        {item.description}
                      </Typography>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box
        sx={{
          py: { xs: 8, sm: 10, md: 12, lg: 14 },
          background: theme.palette.primary.main,
          color: '#fff'
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            style={{ textAlign: 'center' }}
          >
            <motion.div variants={itemVariants}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Stay Updated
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography
                sx={{
                  mb: 4,
                  maxWidth: '600px',
                  mx: 'auto',
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.6
                }}
              >
                Subscribe to our newsletter for the latest OncoTracker updates, pet cancer care tips, and resources.
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  maxWidth: '550px',
                  mx: 'auto'
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Your email address"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined sx={{ color: 'rgba(255,255,255,0.7)' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: 'rgba(255,255,255,0.15)',
                      borderRadius: '30px',
                      color: '#fff',
                      '& input': {
                        padding: '14px 14px 14px 5px',
                      },
                      '& input::placeholder': {
                        color: 'rgba(255,255,255,0.7)',
                        opacity: 1
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.3)'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.5)'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.7)'
                      }
                    }
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: '30px',
                    px: 4,
                    py: 1.5,
                    bgcolor: '#fff',
                    color: theme.palette.primary.dark,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)'
                    },
                    minWidth: { xs: '100%', sm: 'auto' },
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none'
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 8, sm: 10, md: 12, lg: 14 },
          backgroundImage: 'linear-gradient(135deg, rgba(6, 147, 227, 0.1) 0%, rgba(155, 81, 224, 0.1) 100%)',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                component="h2"
                align="center"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2.2rem', md: '2.8rem' }
                }}
              >
                Ready to Get Started?
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                component="p"
                align="center"
                color="textSecondary"
                sx={{
                  maxWidth: '700px',
                  mx: 'auto',
                  mb: 5,
                  fontSize: '1.1rem',
                  lineHeight: 1.6
                }}
              >
                Join our community of veterinarians and pet parents dedicated to providing the best care possible during cancer treatment.
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                justifyContent="center"
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    size="large"
                    color="primary"
                    endIcon={<ArrowForwardIos />}
                    sx={{
                      py: 2,
                      px: 5,
                      borderRadius: '30px',
                      textTransform: 'none',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      boxShadow: `0 6px 15px ${alpha(theme.palette.primary.main, 0.4)}`,
                    }}
                  >
                    Begin Your Free Account
                  </Button>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    component={Link}
                    to="/contact"
                    variant="outlined"
                    size="large"
                    color="primary"
                    sx={{
                      py: 2,
                      px: 5,
                      borderRadius: '30px',
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderWidth: 2,
                    }}
                  >
                    Contact Us
                  </Button>
                </motion.div>
              </Stack>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Form Section */}
      <Box
        sx={{
          py: { xs: 8, sm: 10, md: 12, lg: 14 },
          background: theme.palette.background.paper,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 4,
                    fontSize: { xs: '2rem', md: '2.5rem' }
                  }}
                >
                  Get in Touch
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ mb: 4, maxWidth: '400px' }}
                >
                  Have questions about OncoTracker? We're here to help you navigate pet cancer care with confidence.
                </Typography>
                
                <List disablePadding>
                  <ListItem sx={{ px: 0, py: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 45 }}>
                      <EmailOutlined sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email Us"
                      secondary="support@oncotracker.com"
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                  <Divider component="li" sx={{ my: 1 }} />
                  <ListItem sx={{ px: 0, py: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 45 }}>
                      <PhoneIphone sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Call Us" 
                      secondary="(555) 123-4567"
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                </List>
                
                <Box sx={{ mt: 5 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Follow Us
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    {[
                      { icon: <Facebook />, color: '#1877F2' },
                      { icon: <Twitter />, color: '#1DA1F2' },
                      { icon: <Instagram />, color: '#E4405F' },
                      { icon: <LinkedIn />, color: '#0A66C2' },
                    ].map((social, index) => (
                      <IconButton 
                        key={index}
                        sx={{ 
                          color: social.color,
                          bgcolor: alpha(social.color, 0.1),
                          '&:hover': {
                            bgcolor: alpha(social.color, 0.2),
                          }
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Stack>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: 4,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.07)'
                  }}
                >
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Send us a Message
                  </Typography>
                  <Box component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Name"
                          variant="outlined"
                          placeholder="Your name"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonOutline color="action" />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          variant="outlined"
                          placeholder="Your email address"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailOutlined color="action" />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          variant="outlined"
                          multiline
                          rows={5}
                          placeholder="How can we help you?"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" sx={{ mt: 2 }}>
                                <MessageOutlined color="action" />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          size="large"
                          sx={{
                            py: 1.5,
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontSize: '1.1rem',
                            fontWeight: 600
                          }}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
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
          py: { xs: 6, md: 8 },
          px: 2,
          bgcolor: theme.palette.grey[900],
          color: 'rgba(255,255,255,0.8)',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                <Pets sx={{ fontSize: 32, color: theme.palette.primary.main }} />
                <Typography variant="h5" color="white" fontWeight={700}>
                  OncoTracker
                </Typography>
              </Stack>
              <Typography sx={{ mb: 3, maxWidth: '300px' }}>
                Compassionate tools for veterinarians and pet parents, simplifying the journey of cancer treatment for beloved companions.
              </Typography>
              <Stack direction="row" spacing={1}>
                {[
                  { icon: <Facebook />, label: 'Facebook' },
                  { icon: <Twitter />, label: 'Twitter' },
                  { icon: <Instagram />, label: 'Instagram' },
                  { icon: <LinkedIn />, label: 'LinkedIn' },
                ].map((social, index) => (
                  <IconButton 
                    key={index}
                    size="small"
                    aria-label={social.label}
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      '&:hover': {
                        color: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" color="white" fontWeight={600} gutterBottom>
                Product
              </Typography>
              <List disablePadding>
                {['Features', 'Pricing', 'Examples', 'Tutorials'].map((item) => (
                  <ListItem key={item} disablePadding sx={{ mb: 1 }}>
                    <Link to={`/${item.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                      <Typography 
                        color="inherit" 
                        sx={{ 
                          '&:hover': { color: theme.palette.primary.light } 
                        }}
                      >
                        {item}
                      </Typography>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" color="white" fontWeight={600} gutterBottom>
                Support
              </Typography>
              <List disablePadding>
                {['FAQ', 'Help Center', 'Contact', 'Resources'].map((item) => (
                  <ListItem key={item} disablePadding sx={{ mb: 1 }}>
                    <Link to={`/${item.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                      <Typography 
                        color="inherit" 
                        sx={{ 
                          '&:hover': { color: theme.palette.primary.light } 
                        }}
                      >
                        {item}
                      </Typography>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" color="white" fontWeight={600} gutterBottom>
                Company
              </Typography>
              <List disablePadding>
                {['About', 'Blog', 'Careers', 'Partners'].map((item) => (
                  <ListItem key={item} disablePadding sx={{ mb: 1 }}>
                    <Link to={`/${item.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                      <Typography 
                        color="inherit" 
                        sx={{ 
                          '&:hover': { color: theme.palette.primary.light } 
                        }}
                      >
                        {item}
                      </Typography>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" color="white" fontWeight={600} gutterBottom>
                Legal
              </Typography>
              <List disablePadding>
                {['Terms', 'Privacy', 'Cookies', 'Licenses'].map((item) => (
                  <ListItem key={item} disablePadding sx={{ mb: 1 }}>
                    <Link to={`/${item.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                      <Typography 
                        color="inherit" 
                        sx={{ 
                          '&:hover': { color: theme.palette.primary.light } 
                        }}
                      >
                        {item}
                      </Typography>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
          <Typography variant="body2" align="center" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            © {new Date().getFullYear()} OncoTracker. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 