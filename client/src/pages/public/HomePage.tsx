// Modern responsive HomePage for OncoTracker
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
  CardMedia,
  useTheme, 
  alpha,
  useMediaQuery,
  Divider,
  Stack,
  Paper,
  IconButton,
  Avatar,
  TextField,
  InputAdornment
} from '@mui/material';
import { 
  MonitorHeartOutlined, 
  CalendarMonthOutlined, 
  Groups2Outlined, 
  Pets, 
  HealthAndSafetyOutlined,
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
  DataSaverOn,
  BarChart,
  Share,
  PhoneIphone,
  KeyboardArrowDown,
  HowToReg,
  TrackChanges,
  Send,
  Phone,
  LocationOn,
  AccessTime
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
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

  // Benefits data
  const benefits = [
    { 
      icon: <FavoriteBorderOutlined />, 
      title: "Enhanced Quality of Life", 
      description: "Monitor trends and adjust care plans proactively to maximize your pet's comfort and well-being." 
    },
    { 
      icon: <Groups2Outlined />, 
      title: "Improved Vet Collaboration", 
      description: "Provide your veterinarian with clear, concise data for more informed decision-making." 
    },
    { 
      icon: <HealthAndSafetyOutlined />, 
      title: "Reduced Caregiver Stress", 
      description: "Stay organized and feel more in control with reminders and centralized health records." 
    },
    { 
      icon: <EmojiObjectsOutlined />, 
      title: "Empowered Pet Advocacy", 
      description: "Gain insights into your pet's condition, enabling better communication and advocacy for their needs." 
    }
  ];

  // How it works steps
  const steps = [
    { 
      icon: <HowToReg />, 
      title: "Sign Up", 
      description: "Create your free account and add your pet's profile.",
      color: theme.palette.primary.main
    },
    { 
      icon: <TrackChanges />, 
      title: "Track Daily", 
      description: "Log symptoms, medications, and activities easily.",
      color: theme.palette.primary.dark
    },
    { 
      icon: <Send />, 
      title: "Share Insights", 
      description: "Generate reports and share them with your vet.",
      color: theme.palette.secondary.main
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box 
        sx={{
          position: 'relative',
          bgcolor: 'background.paper',
          pt: { xs: 8, sm: 12, md: 16 },
          pb: { xs: 8, sm: 12, md: 16 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  color="primary.main"
                  fontWeight="700"
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    lineHeight: 1.2
                  }}
                >
                  Navigate Your Pet's Cancer Journey with Confidence
                </Typography>
              </motion.div>
              
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                <Typography 
                  variant="h6" 
                  color="text.secondary"
                  sx={{ 
                    mb: 4,
                    lineHeight: 1.6,
                    fontWeight: 400
                  }}
                >
                  Managing cancer care can feel overwhelming. OncoTracker simplifies symptom tracking, streamlines vet communication, and empowers you to focus on your pet's comfort and quality of life.
                </Typography>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.4 }}
              >
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2}
                  sx={{ mt: 4 }}
                >
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIos />}
                    sx={{
                      py: 2,
                      px: 4,
                      borderRadius: '50px',
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                    }}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="large"
                    sx={{
                      py: 2,
                      px: 4,
                      borderRadius: '50px',
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderWidth: 2,
                    }}
                  >
                    Sign In
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1559757146-5c227217afda?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="A dog being examined by a veterinarian"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    transform: 'perspective(1000px) rotateY(-5deg)',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {/* Decorative elements */}
        <Box 
          sx={{
            position: 'absolute',
            top: '15%',
            left: '5%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${alpha(theme.palette.primary.light, 0.2)}, ${alpha(theme.palette.primary.main, 0.1)})`,
            filter: 'blur(40px)',
            zIndex: -1,
          }}
        />
        <Box 
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '8%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${alpha(theme.palette.secondary.light, 0.2)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
            filter: 'blur(50px)',
            zIndex: -1,
          }}
        />
      </Box>

      {/* Trusted by Section */}
      <Box sx={{ py: 6, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <Typography 
              variant="subtitle1" 
              color="text.secondary" 
              align="center" 
              sx={{ mb: 4 }}
            >
              Trusted by pet owners and veterinarians across the country
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={{ xs: 4, md: 8 }}
              alignItems="center"
              justifyContent="center"
              sx={{ 
                opacity: 0.7,
              }}
            >
              {['PetCare Alliance', 'VetMed Association', 'PetWell Clinics', 'Animal Health Network'].map((partner, index) => (
                <Typography 
                  key={index} 
                  variant="h6" 
                  color="text.secondary"
                  sx={{ 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 1
                  }}
                >
                  {partner}
                </Typography>
              ))}
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              align="center"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              Key Features
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              align="center"
              fontWeight={400}
              sx={{ mb: 8, maxWidth: 800, mx: 'auto' }}
            >
              Our comprehensive suite of tools designed specifically for pet cancer management
            </Typography>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            <Grid container spacing={4}>
              {featureList.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Card 
                      elevation={0} 
                      sx={{ 
                        height: '100%',
                        p: 3,
                        borderRadius: 4,
                        transition: 'all 0.3s ease',
                        backgroundColor: alpha(theme.palette.background.paper, 0.6),
                        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                        '&:hover': {
                          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                          transform: 'translateY(-5px)',
                        }
                      }}
                    >
                      <Box 
                        sx={{ 
                          mb: 2, 
                          color: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          height: 70,
                          borderRadius: '20px',
                          backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        }}
                      >
                        <Box sx={{ fontSize: 32 }}>
                          {feature.icon}
                        </Box>
                      </Box>
                      <CardContent sx={{ p: 0 }}>
                        <Typography variant="h6" component="h3" fontWeight={600} gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              align="center"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              Simple Steps to Better Care
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              align="center"
              fontWeight={400}
              sx={{ mb: 8, maxWidth: 800, mx: 'auto' }}
            >
              Getting started with OncoTracker is quick and easy
            </Typography>
          </motion.div>

          <Box sx={{ position: 'relative' }}>
            {/* Progress Line */}
            {!isMobile && (
              <Box sx={{
                position: 'absolute',
                top: '35%',
                left: '15%',
                right: '15%',
                height: 4,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                zIndex: 0,
              }} />
            )}

            <Grid container spacing={6} justifyContent="center">
              {steps.map((step, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Box sx={{ 
                      textAlign: 'center',
                      position: 'relative',
                      zIndex: 1,
                      py: 2,
                    }}>
                      <Box sx={{ 
                        width: 80,
                        height: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        bgcolor: step.color,
                        color: 'white',
                        fontSize: 32,
                        mx: 'auto',
                        mb: 2,
                        boxShadow: `0 10px 20px ${alpha(step.color, 0.3)}`,
                      }}>
                        <Typography variant="h5" component="span" fontWeight={700}>
                          {index + 1}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="h5" component="h3" fontWeight={600} gutterBottom>
                          {step.title}
                        </Typography>
                        <Typography color="text.secondary">
                          {step.description}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Benefits/Why Choose Us Section with Image */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
              >
                <Typography 
                  variant="h3" 
                  component="h2"
                  fontWeight={700}
                  sx={{ mb: 4 }}
                >
                  Why Choose OncoTracker?
                </Typography>
                
                <Stack spacing={4}>
                  {benefits.map((benefit, index) => (
                    <motion.div 
                      key={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={fadeInUp}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Stack direction="row" spacing={3} alignItems="flex-start">
                        <Box 
                          sx={{ 
                            color: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 48,
                            height: 48,
                            borderRadius: '12px',
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            flexShrink: 0,
                          }}
                        >
                          <Box sx={{ fontSize: 24 }}>
                            {benefit.icon}
                          </Box>
                        </Box>
                        <Box>
                          <Typography variant="h6" component="h3" fontWeight={600} gutterBottom>
                            {benefit.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {benefit.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Happy dog with owner" 
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              align="center"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              Hear From Our Community
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              align="center"
              fontWeight={400}
              sx={{ mb: 8, maxWidth: 800, mx: 'auto' }}
            >
              Real stories from pet owners and veterinarians using OncoTracker
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={testimonial.id}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.2 }}
                  style={{ height: '100%' }}
                >
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 4, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between',
                      borderRadius: 4,
                      border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                        transform: 'translateY(-5px)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      }
                    }}
                  >
                    <Box sx={{ fontSize: 60, color: alpha(theme.palette.primary.main, 0.1), position: 'absolute', top: 16, right: 16 }}>
                      "
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontStyle: 'italic', 
                        mb: 4, 
                        flexGrow: 1,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      "{testimonial.content}"
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ width: 48, height: 48 }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 10 }, 
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          borderRadius: { sm: '0 100px 0 0' }
        }}
      >
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
              >
                <Typography 
                  variant="h3" 
                  component="h2"
                  fontWeight={700}
                  sx={{ color: 'white', mb: 2 }}
                >
                  Ready to Improve Your Pet's Care Journey?
                </Typography>
                <Typography 
                  variant="h6"
                  fontWeight={400}
                  sx={{ 
                    color: alpha('#fff', 0.8),
                    mb: 4
                  }}
                >
                  Join the OncoTracker community today and start making a difference in your pet's health management.
                </Typography>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    size="large"
                    color="secondary"
                    endIcon={<ArrowForwardIos />}
                    sx={{
                      py: 2,
                      px: 4,
                      borderRadius: '50px',
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      boxShadow: `0 8px 20px ${alpha(theme.palette.secondary.main, 0.3)}`,
                      backgroundColor: theme.palette.secondary.main,
                      '&:hover': {
                        backgroundColor: theme.palette.secondary.dark
                      }
                    }}
                  >
                    Sign Up Now - It's Free!
                  </Button>
                </motion.div>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Pets sx={{ fontSize: 280, color: alpha('#fff', 0.1), mt: -8 }} />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
              >
                <Typography 
                  variant="h3" 
                  component="h2"
                  fontWeight={700}
                  sx={{ mb: 2 }}
                >
                  Get in Touch
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ mb: 5 }}
                >
                  Have questions about OncoTracker? We're here to help. Send us a message and we'll get back to you as soon as possible.
                </Typography>

                <Stack spacing={4}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        color: theme.palette.primary.main
                      }}
                    >
                      <EmailOutlined />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Email</Typography>
                      <Typography variant="body1">support@oncotracker.com</Typography>
                    </Box>
                  </Stack>
                  
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        color: theme.palette.primary.main
                      }}
                    >
                      <Phone />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Phone</Typography>
                      <Typography variant="body1">(555) 123-4567</Typography>
                    </Box>
                  </Stack>
                  
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        color: theme.palette.primary.main
                      }}
                    >
                      <AccessTime />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Support Hours</Typography>
                      <Typography variant="body1">Monday - Friday: 9AM - 5PM EST</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
              >
                <Paper
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    borderRadius: 4, 
                    border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                  }}
                >
                  <Stack spacing={3}>
                    <Typography variant="h5" fontWeight={600}>Send us a message</Typography>
                    
                    <TextField
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutline color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    
                    <TextField
                      fullWidth
                      label="Your Email"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlined color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    
                    <TextField
                      fullWidth
                      label="Your Message"
                      multiline
                      rows={4}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                            <MessageOutlined color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      sx={{
                        py: 1.5,
                        borderRadius: '30px',
                        textTransform: 'none',
                        alignSelf: 'flex-start'
                      }}
                    >
                      Send Message
                    </Button>
                  </Stack>
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
          backgroundColor: theme.palette.grey[900], 
          color: theme.palette.grey[400], 
          py: 6,
          borderRadius: { sm: '100px 0 0 0' }
        }}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                  OncoTracker
                </Typography>
                <Typography variant="body2">
                  Empowering pet owners and veterinarians in the journey of cancer care.
                </Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton size="small" aria-label="Facebook" sx={{ color: theme.palette.grey[400] }}>
                    <Facebook />
                  </IconButton>
                  <IconButton size="small" aria-label="Twitter" sx={{ color: theme.palette.grey[400] }}>
                    <Twitter />
                  </IconButton>
                  <IconButton size="small" aria-label="Instagram" sx={{ color: theme.palette.grey[400] }}>
                    <Instagram />
                  </IconButton>
                  <IconButton size="small" aria-label="LinkedIn" sx={{ color: theme.palette.grey[400] }}>
                    <LinkedIn />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
            
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                Product
              </Typography>
              <Link component="a" href="#features" sx={{ display: 'block', color: 'inherit', textDecoration: 'none', mb: 1.5 }}>
                Features
              </Link>
              <Link component="a" href="/pricing" sx={{ display: 'block', color: 'inherit', textDecoration: 'none', mb: 1.5 }}>
                Pricing
              </Link>
              <Link component="a" href="/faq" sx={{ display: 'block', color: 'inherit', textDecoration: 'none', mb: 1.5 }}>
                FAQ
              </Link>
            </Grid>
            
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                Company
              </Typography>
              <Link component="a" href="/about" sx={{ display: 'block', color: 'inherit', textDecoration: 'none', mb: 1.5 }}>
                About Us
              </Link>
              <Link component="a" href="/blog" sx={{ display: 'block', color: 'inherit', textDecoration: 'none', mb: 1.5 }}>
                Blog
              </Link>
              <Link component="a" href="/contact" sx={{ display: 'block', color: 'inherit', textDecoration: 'none', mb: 1.5 }}>
                Contact
              </Link>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                Subscribe to our newsletter
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Get the latest news and updates about pet cancer care
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  variant="outlined"
                  placeholder="Your email"
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: alpha(theme.palette.common.white, 0.05),
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: alpha(theme.palette.common.white, 0.2),
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: alpha(theme.palette.common.white, 0.1),
                      },
                    },
                    '& input': {
                      color: theme.palette.common.white,
                    }
                  }}
                />
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ px: 2 }}
                >
                  <Send />
                </Button>
              </Stack>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4, borderColor: alpha(theme.palette.common.white, 0.1) }} />
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            justifyContent="space-between" 
            alignItems={{ xs: 'center', sm: 'flex-start' }}
            spacing={2}
          >
            <Typography variant="body2" textAlign={{ xs: 'center', sm: 'left' }}>
              © {new Date().getFullYear()} OncoTracker. All rights reserved.
            </Typography>
            <Stack 
              direction="row" 
              spacing={2}
              divider={<Box component="span" sx={{ color: alpha(theme.palette.common.white, 0.3) }}>•</Box>}
            >
              <Link component="a" href="/privacy" sx={{ color: 'inherit', textDecoration: 'none' }}>
                Privacy Policy
              </Link>
              <Link component="a" href="/terms" sx={{ color: 'inherit', textDecoration: 'none' }}>
                Terms of Service
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 