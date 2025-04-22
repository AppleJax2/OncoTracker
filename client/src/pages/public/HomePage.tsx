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
      {/* Hero Section - Inspired by Hyperspace */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          pt: { xs: 10, md: 0 },
          pb: { xs: 10, md: 0 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                      color: '#fff',
                      mb: 3,
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    Track Your Pet's Cancer Symptoms with Ease
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 400,
                      fontSize: { xs: '1.1rem', sm: '1.3rem' },
                      color: 'rgba(255,255,255,0.9)',
                      mb: 4,
                      maxWidth: '600px',
                      lineHeight: 1.6
                    }}
                  >
                    Empowering pet owners and veterinarians with compassionate tools for cancer treatment management and better care coordination.
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
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
                        endIcon={<ArrowForwardIos />}
                        sx={{
                          py: 1.8,
                          px: 4,
                          borderRadius: '30px',
                          textTransform: 'none',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          backgroundColor: '#fff',
                          color: theme.palette.primary.dark,
                          boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                          '&:hover': {
                            backgroundColor: '#fff',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                          }
                        }}
                      >
                        Get Started — It's Free
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
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
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1536590158209-e9d615d525e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Pet with owner"
                  sx={{
                    width: '100%',
                    maxWidth: '500px',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    transform: 'perspective(1000px) rotateY(-5deg)',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        
        {/* Background decoration circles */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            backgroundColor: alpha(theme.palette.primary.light, 0.15),
            borderRadius: '50%',
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 400,
            height: 400,
            backgroundColor: alpha('#fff', 0.07),
            borderRadius: '50%',
            zIndex: -1,
          }}
        />
      </Box>

      {/* Feature Section */}
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          py: { xs: 10, md: 14 },
          color: theme.palette.text.primary
        }}
        id="features"
      >
        <Container maxWidth="lg">
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
                Essential Features for Cancer Care
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
                  mb: { xs: 8, md: 10 },
                  fontSize: '1.1rem'
                }}
              >
                Our comprehensive set of tools help you navigate pet cancer treatment with confidence and clarity.
              </Typography>
            </motion.div>

            <Grid container spacing={4}>
              {featureList.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    variants={cardVariants}
                    custom={index}
                    whileHover="hover"
                  >
                    <Paper
                      elevation={2}
                      sx={{
                        p: 4,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 4,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                          transform: 'translateY(-5px)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          height: 70,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          borderRadius: '20px',
                          color: theme.palette.primary.main,
                          mb: 3,
                          fontSize: '2rem'
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" component="h3" fontWeight={600} gutterBottom sx={{ mb: 1.5 }}>
                        {feature.title}
                      </Typography>
                      <Typography color="textSecondary" sx={{ lineHeight: 1.6 }}>
                        {feature.description}
                      </Typography>
                    </Paper>
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
          py: { xs: 10, md: 14 },
          background: `linear-gradient(to bottom, ${alpha(theme.palette.background.paper, 1)} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`,
        }}
      >
        <Container maxWidth="lg">
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
          py: { xs: 10, md: 14 },
          background: theme.palette.background.default,
        }}
      >
        <Container maxWidth="lg">
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
          py: { xs: 10, md: 14 },
          background: alpha(theme.palette.primary.light, 0.1),
        }}
      >
        <Container maxWidth="lg">
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
          py: { xs: 10, md: 14 },
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
          py: { xs: 10, md: 14 },
          backgroundImage: 'linear-gradient(135deg, rgba(6, 147, 227, 0.1) 0%, rgba(155, 81, 224, 0.1) 100%)',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
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
          py: { xs: 10, md: 14 },
          background: theme.palette.background.paper,
        }}
      >
        <Container maxWidth="lg">
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
        <Container maxWidth="lg">
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