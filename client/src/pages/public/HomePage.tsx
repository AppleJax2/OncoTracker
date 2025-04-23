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
  KeyboardArrowDown,
  HowToReg,
  TrackChanges,
  Send
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
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInVariants}>
            <Typography variant="h3" component="h2" gutterBottom textAlign="center" sx={{ fontWeight: 700, mb: 6 }}>
              Key Features
            </Typography>
          </motion.div>
          <Grid container spacing={4}>
            {featureList.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, amount: 0.3 }} 
                  variants={fadeInVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    textAlign: 'center', 
                    p: 3, 
                    boxShadow: theme.shadows[3], 
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': { 
                      transform: 'translateY(-5px)', 
                      boxShadow: theme.shadows[6] 
                    } 
                  }}>
                    <Box sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 0 }}>
                      <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
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
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ background: theme.palette.background.default, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInVariants}>
            <Typography variant="h3" component="h2" gutterBottom textAlign="center" sx={{ fontWeight: 700, mb: 6 }}>
              Why Choose OncoTracker?
            </Typography>
          </motion.div>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInVariants}>
                <img 
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Happy dog" 
                  style={{ width: '100%', borderRadius: '12px', boxShadow: theme.shadows[4] }} 
                />
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                {[
                  { icon: <FavoriteBorderOutlined color="primary" />, title: "Enhanced Quality of Life", description: "Monitor trends and adjust care plans proactively to maximize your pet's comfort and well-being." },
                  { icon: <Groups2Outlined color="primary" />, title: "Improved Vet Collaboration", description: "Provide your veterinarian with clear, concise data for more informed decision-making." },
                  { icon: <PsychologyOutlined color="primary" />, title: "Reduced Caregiver Stress", description: "Stay organized and feel more in control with reminders and centralized health records." },
                  { icon: <EmojiObjectsOutlined color="primary" />, title: "Empowered Pet Advocacy", description: "Gain insights into your pet's condition, enabling better communication and advocacy for their needs." }
                ].map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, amount: 0.2 }} 
                    variants={fadeInVariants}
                    transition={{ delay: index * 0.15 }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                        {benefit.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>{benefit.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{benefit.description}</Typography>
                      </Box>
                    </Stack>
                  </motion.div>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ background: theme.palette.background.paper, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInVariants}>
            <Typography variant="h3" component="h2" gutterBottom textAlign="center" sx={{ fontWeight: 700, mb: 6 }}>
              Simple Steps to Better Care
            </Typography>
          </motion.div>
          <Grid container spacing={4} textAlign="center">
            {[
              { icon: <HowToReg />, title: "Sign Up", description: "Create your free account and add your pet's profile." },
              { icon: <TrackChanges />, title: "Track Daily", description: "Log symptoms, medications, and activities easily." },
              { icon: <Send />, title: "Share Insights", description: "Generate reports and share them with your vet." }
            ].map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                 <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, amount: 0.3 }} 
                    variants={fadeInVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                  <Stack spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 60, height: 60, mb: 2 }}>
                      {React.cloneElement(step.icon, { sx: { fontSize: 30 } })}
                    </Avatar>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>{step.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{step.description}</Typography>
                  </Stack>
                 </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ background: theme.palette.background.default, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInVariants}>
            <Typography variant="h3" component="h2" gutterBottom textAlign="center" sx={{ fontWeight: 700, mb: 6 }}>
              Hear From Our Community
            </Typography>
          </motion.div>
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} md={4} key={testimonial.id}>
                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, amount: 0.3 }} 
                  variants={fadeInVariants}
                  transition={{ delay: index * 0.15 }}
                  style={{ height: '100%' }}
                >
                  <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2, flexGrow: 1 }}>
                      "{testimonial.content}"
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar src={testimonial.avatar} alt={testimonial.name} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{testimonial.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{testimonial.role}</Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ background: theme.palette.primary.main, color: theme.palette.primary.contrastText, py: { xs: 6, md: 8 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInVariants}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
              Ready to Improve Your Pet's Care Journey?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: alpha(theme.palette.primary.contrastText, 0.85) }}>
              Join the OncoTracker community today and start making a difference in your pet's health management.
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                size="large"
                color="secondary"
                endIcon={<ArrowForwardIos sx={{ fontSize: '1rem' }}/>}
                sx={{
                  py: 1.5,
                  px: 5,
                  borderRadius: '30px',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: `0 5px 15px ${alpha(theme.palette.secondary.main, 0.4)}`,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                    boxShadow: `0 8px 20px ${alpha(theme.palette.secondary.dark, 0.5)}`,
                  }
                }}
              >
                Sign Up Now - It's Free!
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ background: theme.palette.grey[900], color: theme.palette.grey[400], py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom sx={{ color: theme.palette.common.white }}>OncoTracker</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Empowering pet owners and veterinarians in the journey of cancer care.
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton size="small" href="#" sx={{ color: theme.palette.grey[400] }}><Facebook /></IconButton>
                <IconButton size="small" href="#" sx={{ color: theme.palette.grey[400] }}><Twitter /></IconButton>
                <IconButton size="small" href="#" sx={{ color: theme.palette.grey[400] }}><Instagram /></IconButton>
                <IconButton size="small" href="#" sx={{ color: theme.palette.grey[400] }}><LinkedIn /></IconButton>
              </Stack>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" gutterBottom sx={{ color: theme.palette.common.white, fontWeight: 600 }}>Product</Typography>
              <Link component="a" href="#features" sx={{ display: 'block', color: 'inherit', textDecoration: 'none', mb: 1 }}>Features</Link>
              <Link component="a" href="/pricing" sx={{ display: 'block', color: 'inherit', textDecoration: 'none', mb: 1 }}>Pricing</Link>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" gutterBottom sx={{ color: theme.palette.common.white, fontWeight: 600 }}>Company</Typography>
              <Link component="a" href="/about" sx={{ display: 'block', color: 'inherit', textDecoration: 'none', mb: 1 }}>About Us</Link>
              <Link component="a" href="/contact" sx={{ display: 'block', color: 'inherit', textDecoration: 'none', mb: 1 }}>Contact</Link>
            </Grid>
            <Grid item xs={12} md={4}>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3, borderColor: theme.palette.grey[700] }} />
          <Typography variant="body2" textAlign="center">
            © {new Date().getFullYear()} OncoTracker. All rights reserved. |
            <Link component="a" href="/privacy" sx={{ color: 'inherit', mx: 1 }}>Privacy Policy</Link> |
            <Link component="a" href="/terms" sx={{ color: 'inherit', mx: 1 }}>Terms of Service</Link>
          </Typography>
        </Container>
      </Box>

    </Box>
  );
};

export default HomePage; 