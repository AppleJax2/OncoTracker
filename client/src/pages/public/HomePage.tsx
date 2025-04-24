// Redesigned HomePage Component inspired by 21st Hero Section
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
  Paper,
  IconButton,
  Avatar,
} from '@mui/material';
import { 
  MonitorHeartOutlined, 
  CalendarMonthOutlined, 
  Groups2Outlined, 
  Pets, // Placeholder Icon
  HealthAndSafetyOutlined, // Placeholder Icon
  PsychologyOutlined,
  FavoriteBorderOutlined,
  EmojiObjectsOutlined,
  ArrowForwardIos,
  CheckCircleOutlined,
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
  Download // For Install Button
} from '@mui/icons-material';

// Corrected import path assuming HomePage.tsx is in client/src/pages/public/
import PWAInstallButton from '../../components/common/PWAInstallButton'; 

// Placeholder image URLs - Replace with relevant, high-quality graphics/illustrations
const heroImageUrlLight = '/images/hero-placeholder-light.svg'; // Example: Illustration of vet & pet
const heroImageUrlDark = '/images/hero-placeholder-dark.svg';
const benefitsImageUrl = '/images/benefits-placeholder.svg'; // Example: Happy pet illustration

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  // Animation variants (reuse existing ones, adjust timing)
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number = 1) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" }
    })
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation for children
      }
    }
  };

  // Testimonials data (keep as is)
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

  // Feature list data (keep as is)
  const featureList = [
        {
      icon: <MonitorHeartOutlined sx={{ fontSize: 'inherit' }} />,
      title: "Daily Symptom Tracking",
      description: "Log and monitor your pet's symptoms with our easy-to-use tracking system."
    },
    {
      icon: <BarChart sx={{ fontSize: 'inherit' }} />,
      title: "Progress Charts",
      description: "Visualize your pet's health journey with comprehensive charts and analytics."
    },
    {
      icon: <CalendarMonthOutlined sx={{ fontSize: 'inherit' }} />,
      title: "Treatment Reminders",
      description: "Never miss a medication or appointment with our smart reminder system."
    },
    {
      icon: <Share sx={{ fontSize: 'inherit' }} />,
      title: "Vet Communication",
      description: "Share reports directly with your veterinarian for better coordinated care."
    },
    {
      icon: <DataSaverOn sx={{ fontSize: 'inherit' }} />,
      title: "Custom Health Logs",
      description: "Customize tracking parameters based on your pet's specific condition."
    },
    {
      icon: <PhoneIphone sx={{ fontSize: 'inherit' }} />,
      title: "Mobile Friendly",
      description: "Access your pet's health information anytime, anywhere on any device."
    }
  ];

  const heroImageSrc = theme.palette.mode === 'dark' ? heroImageUrlDark : heroImageUrlLight;

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: 'background.default',
      color: 'text.primary'
    }}>
      {/* Hero Section - Adapted from 21st Inspiration */}
      <Box
        component={motion.section}
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariants}
        sx={{
          // background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
          overflow: 'hidden',
          position: 'relative',
          pt: { xs: 12, sm: 16, md: 20 },
          pb: { xs: 8, sm: 12, md: 16 },
          textAlign: 'center',
        }}
      >
        {/* Optional Background Glow Effect */}
        <Box
          sx={{
            position: 'absolute',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '150%',
            height: '600px',
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 60%)`,
            filter: 'blur(100px)',
            opacity: 0.6,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={fadeInUpVariants}>
            <Typography
              variant="h1" // Using theme typography
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 3,
                // Responsive font size directly from theme
                background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' }, // Adjusted sizes
                letterSpacing: '-0.02em',
              }}
            >
              Navigate Your Pet's Cancer Journey with Confidence
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUpVariants}>
            <Typography
              variant="h5"
              component="p"
              color="text.secondary"
              sx={{
                mb: 5,
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.7,
                fontSize: { xs: '1.1rem', md: '1.25rem' }, // Adjusted sizes
              }}
            >
              Managing cancer care can feel overwhelming. OncoTracker simplifies symptom tracking, streamlines vet communication, and empowers you to focus on your pet's comfort and quality of life.
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUpVariants}>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              sx={{ justifyContent: 'center', mb: 10 }}
            >
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                size="large"
                color="primary"
                endIcon={<ArrowForwardIos />}
                sx={{ 
                  px: 4,
                  py: 1.5, 
                  borderRadius: '30px', 
                  boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.3)}`
                }}
              >
                Get Started Free
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                color="primary"
                sx={{ px: 4, py: 1.5, borderRadius: '30px' }}
              >
                Sign In
              </Button>
            </Stack>
          </motion.div>

          {/* Hero Image - Placeholder */}
          <motion.div 
            variants={fadeInUpVariants} 
            style={{ 
              maxWidth: '900px', 
              margin: '0 auto',
              borderRadius: theme.shape.borderRadius * 1.5, 
              overflow: 'hidden',
              boxShadow: theme.shadows[10], 
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}>
            <Box
              component="img"
              src={heroImageSrc}
              alt="OncoTracker application preview showing symptom tracking"
              sx={{
                display: 'block',
                width: '100%',
                height: 'auto',
              }}
            />
          </motion.div>
          
          {/* Scroll Down Indicator - Optional */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{ marginTop: theme.spacing(8) }}
          >
            <IconButton 
              size="large"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              sx={{ color: 'text.secondary' }}
            >
              <KeyboardArrowDown fontSize="large" />
            </IconButton>
          </motion.div>
        </Container>
      </Box>

      {/* Feature Section - Reverted Grid/Motion implementation */}
      <Box
        id="features"
        sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 } }}
      >
        <Container maxWidth="lg">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUpVariants}>
            <Typography variant="h2" component="h2" textAlign="center" sx={{ fontWeight: 700, mb: 1 }}>
              Powerful Tools for Pet Parents
            </Typography>
            <Typography variant="h6" component="p" color="text.secondary" textAlign="center" sx={{ mb: 8, maxWidth: '600px', mx: 'auto' }}>
              Everything you need to manage care effectively and collaborate with your vet.
            </Typography>
          </motion.div>
          <Grid container spacing={4} component={motion.div} variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {featureList.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} component={motion.div} variants={fadeInUpVariants}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  p: 3,
                  boxShadow: 'none',
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: 'transparent',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    transform: 'translateY(-4px)',
                  }
                }}>
                  <Box sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2, alignSelf: 'flex-start' }}>
                    {feature.icon}
                  </Box>
                  <CardContent sx={{ p: 0, flexGrow: 1, textAlign: 'left' }}>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section - Reverted Grid/Motion implementation */}
      <Box sx={{ bgcolor: 'background.default', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUpVariants}>
            <Typography variant="h2" component="h2" textAlign="center" sx={{ fontWeight: 700, mb: 8 }}>
              Focus on Quality of Life
            </Typography>
          </motion.div>
          <Grid container spacing={6} alignItems="center" component={motion.div} variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Grid item xs={12} md={6} component={motion.div} variants={fadeInUpVariants}>
              <Box 
                component="img" 
                src={benefitsImageUrl} // Placeholder
                alt="Illustration of a happy pet and owner" 
                sx={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: 2, 
                  boxShadow: theme.shadows[6]
                }} 
              />
            </Grid>
            <Grid item xs={12} md={6} component={motion.div} variants={fadeInUpVariants}>
              <Stack spacing={4}>
                {[
                  { icon: <FavoriteBorderOutlined color="primary" />, title: "Enhanced Comfort", description: "Monitor trends and adjust care plans proactively to maximize your pet's comfort and well-being." },
                  { icon: <Groups2Outlined color="primary" />, title: "Improved Vet Collaboration", description: "Provide your veterinarian with clear, concise data for more informed decision-making." },
                  { icon: <PsychologyOutlined color="primary" />, title: "Reduced Caregiver Stress", description: "Stay organized and feel more in control with reminders and centralized health records." },
                  { icon: <EmojiObjectsOutlined color="primary" />, title: "Empowered Pet Advocacy", description: "Gain insights into your pet's condition, enabling better communication and advocacy for their needs." }
                ].map((benefit, index) => (
                  <motion.div key={index} variants={fadeInUpVariants}>
                    <Stack direction="row" spacing={2.5} alignItems="flex-start">
                      <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, mt: 0.5 }}>
                        {benefit.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>{benefit.title}</Typography>
                        <Typography variant="body1" color="text.secondary">{benefit.description}</Typography>
                      </Box>
                    </Stack>
                  </motion.div>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section - Reverted Grid/Motion implementation */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUpVariants}>
            <Typography variant="h2" component="h2" textAlign="center" sx={{ fontWeight: 700, mb: 8 }}>
              Simple Steps to Better Care
            </Typography>
          </motion.div>
          <Grid container spacing={5} textAlign="center" component={motion.div} variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: <HowToReg />, title: "1. Sign Up", description: "Create your free account and add your pet's profile in minutes." },
              { icon: <TrackChanges />, title: "2. Track Daily", description: "Log symptoms, medications, and activities easily on any device." },
              { icon: <Send />, title: "3. Share Insights", description: "Generate reports and share them instantly with your vet." }
            ].map((step, index) => (
              <Grid item xs={12} md={4} key={index} component={motion.div} variants={fadeInUpVariants}>
                <Stack spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.primary.contrastText, width: 60, height: 60, mb: 2 }}>
                    {React.cloneElement(step.icon, { sx: { fontSize: 30 } })}
                  </Avatar>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>{step.title}</Typography>
                  <Typography variant="body1" color="text.secondary">{step.description}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section - Reverted Grid/Motion implementation, fixed mapping */}
      <Box sx={{ bgcolor: 'background.default', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUpVariants}>
            <Typography variant="h2" component="h2" textAlign="center" sx={{ fontWeight: 700, mb: 8 }}>
              Hear From Our Community
            </Typography>
          </motion.div>
          <Grid container spacing={4} justifyContent="center" component={motion.div} variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} md={4} key={testimonial.id} component={motion.div} variants={fadeInUpVariants} style={{ height: '100%' }}>
                <Paper elevation={0} sx={{ 
                    p: 3, 
                    height: '100%', 
                    border: `1px solid ${theme.palette.divider}`,
                    bgcolor: 'background.paper',
                    display: 'flex', 
                    flexDirection: 'column',
                  }}> 
                  <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2, flexGrow: 1 }}>
                    " {testimonial.content} "
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 'auto' }}>
                    <Avatar src={testimonial.avatar} alt={testimonial.name} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{testimonial.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{testimonial.role}</Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section - Simple and Clear */}
      <Box sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.primary.contrastText, py: { xs: 8, md: 10 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInUpVariants}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
              Ready to Improve Your Pet's Care Journey?
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, color: alpha(theme.palette.primary.contrastText, 0.85), maxWidth: '650px', mx: 'auto' }}>
              Join the OncoTracker community today. It's free to sign up and start making a difference in your pet's health management.
            </Typography>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              size="large"
              color="secondary" // Use secondary for contrast on primary background
              endIcon={<ArrowForwardIos />}
              sx={{
                py: 1.5,
                px: 5,
                borderRadius: '30px',
                fontWeight: 600,
                boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.4)}`,
                '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                }
              }}
            >
              Sign Up Now - It's Free!
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Footer - Simplified */}
      <Box component="footer" sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.secondary, py: 5, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>
                OncoTracker
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Empowering pet care.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <IconButton size="small" href="#" aria-label="Facebook" sx={{ color: 'text.secondary' }}><Facebook fontSize="small" /></IconButton>
                <IconButton size="small" href="#" aria-label="Twitter" sx={{ color: 'text.secondary' }}><Twitter fontSize="small" /></IconButton>
                <IconButton size="small" href="#" aria-label="Instagram" sx={{ color: 'text.secondary' }}><Instagram fontSize="small" /></IconButton>
                <IconButton size="small" href="#" aria-label="LinkedIn" sx={{ color: 'text.secondary' }}><LinkedIn fontSize="small" /></IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 3 }} justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}>
                <Link to="/about" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}><Typography variant="body2">About Us</Typography></Link>
                <Link to="/contact" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}><Typography variant="body2">Contact</Typography></Link>
                <Link to="/privacy" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}><Typography variant="body2">Privacy</Typography></Link>
                <Link to="/terms" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}><Typography variant="body2">Terms</Typography></Link>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body2" textAlign="center">
            © {new Date().getFullYear()} OncoTracker. All rights reserved.
          </Typography>
        </Container>
      </Box>

      {/* PWA Install Button */} 
      <PWAInstallButton /> 

    </Box>
  );
};

export default HomePage; 