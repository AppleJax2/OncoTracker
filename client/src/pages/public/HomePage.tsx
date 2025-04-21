// Placeholder HomePage Component
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
  Stack
} from '@mui/material';
import { 
  MonitorHeartOutlined, 
  CalendarMonthOutlined, 
  Groups2Outlined, 
  Pets, 
  HealthAndSafetyOutlined,
  MedicalInformationOutlined,
  SupportOutlined
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(180deg, ${alpha(theme.palette.primary.light, 0.08)} 0%, ${alpha(theme.palette.background.default, 0.3)} 100%)`,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 10, sm: 12, md: 15 },
          pb: { xs: 8, sm: 10, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Logo and Title */}
            <motion.div variants={itemVariants} transition={{ duration: 0.6 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  mb: 2 
                }}
              >
                <Box
                  sx={{
                    width: { xs: 60, sm: 75 },
                    height: { xs: 60, sm: 75 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    borderRadius: '50%',
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                    mb: 2
                  }}
                >
                  <Pets sx={{ fontSize: { xs: 32, sm: 40 }, color: theme.palette.primary.main }} />
                </Box>
              </Box>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                  backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  letterSpacing: '-0.02em',
                  mb: 2,
                  position: 'relative',
                  display: 'inline-block',
                }}
              >
                OncoTracker
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h5"
                component="h2"
                color="textSecondary"
                sx={{
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontWeight: 400,
                  mb: 4,
                  px: { xs: 2, sm: 0 },
                  color: alpha(theme.palette.text.primary, 0.8),
                }}
              >
                Compassionate tools for veterinarians and pet parents, simplifying the journey of cancer treatment for beloved companions.
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 3 }}
                justifyContent="center"
                alignItems="center"
                mt={4}
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    component={Link}
                    to="/login"
                    variant="contained"
                    size="large"
                    sx={{
                      py: 1.5,
                      px: 3.5,
                      borderRadius: 3,
                      textTransform: 'none',
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      fontWeight: 600,
                      background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                      boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.3)}`,
                      '&:hover': {
                        boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                        background: `linear-gradient(90deg, ${theme.palette.primary.dark} 10%, ${theme.palette.primary.main} 90%)`,
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </motion.div>

                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    component={Link}
                    to="/signup"
                    variant="outlined"
                    size="large"
                    sx={{
                      py: 1.5,
                      px: 3.5,
                      borderRadius: 3,
                      textTransform: 'none',
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      fontWeight: 600,
                      borderWidth: 2,
                      borderColor: theme.palette.primary.main,
                      '&:hover': {
                        borderWidth: 2,
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                        borderColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    Create Account
                  </Button>
                </motion.div>
              </Stack>
            </motion.div>

            {/* Background decoration */}
            <Box
              sx={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.15)} 0%, transparent 70%)`,
                borderRadius: '50%',
                zIndex: -1,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -80,
                left: -80,
                width: 250,
                height: 250,
                background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.15)} 0%, transparent 70%)`,
                borderRadius: '50%',
                zIndex: -1,
              }}
            />
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          background: '#ffffff',
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
                variant="h3"
                component="h2"
                align="center"
                sx={{
                  fontWeight: 700,
                  mb: { xs: 2, md: 3 },
                  color: theme.palette.text.primary,
                }}
              >
                Dedicated Support for Every Step
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
                  mb: { xs: 6, md: 8 },
                  fontWeight: 400,
                }}
              >
                OncoTracker provides essential tools to navigate pet cancer treatment with confidence and clarity.
              </Typography>
            </motion.div>

            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <motion.div
                  variants={cardVariants}
                  custom={0}
                  whileHover="hover"
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      transition: 'all 0.3s ease-in-out',
                      boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.07)}`,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: 8,
                        width: '100%',
                        bgcolor: theme.palette.primary.main,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                      <Box
                        sx={{
                          mb: 2.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          mx: 'auto',
                        }}
                      >
                        <MonitorHeartOutlined
                          sx={{ fontSize: 36, color: theme.palette.primary.main }}
                        />
                      </Box>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
                        align="center"
                        fontWeight={600}
                        sx={{ mb: 2 }}
                      >
                        Symptom Monitoring
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="center"
                        sx={{ lineHeight: 1.7 }}
                      >
                        Easily track treatment side effects and your pet's well-being, fostering clear communication with your vet.
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={4}>
                <motion.div
                  variants={cardVariants}
                  custom={1}
                  whileHover="hover"
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      transition: 'all 0.3s ease-in-out',
                      boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.07)}`,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: 8,
                        width: '100%',
                        bgcolor: theme.palette.primary.main,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                      <Box
                        sx={{
                          mb: 2.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          mx: 'auto',
                        }}
                      >
                        <CalendarMonthOutlined
                          sx={{ fontSize: 36, color: theme.palette.primary.main }}
                        />
                      </Box>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
                        align="center"
                        fontWeight={600}
                        sx={{ mb: 2 }}
                      >
                        Treatment Management
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="center"
                        sx={{ lineHeight: 1.7 }}
                      >
                        Keep complex treatment protocols, medication schedules, and appointments organized in one central place.
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={4}>
                <motion.div
                  variants={cardVariants}
                  custom={2}
                  whileHover="hover"
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      transition: 'all 0.3s ease-in-out',
                      boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.07)}`,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: 8,
                        width: '100%',
                        bgcolor: theme.palette.primary.main,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                      <Box
                        sx={{
                          mb: 2.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          mx: 'auto',
                        }}
                      >
                        <Groups2Outlined
                          sx={{ fontSize: 36, color: theme.palette.primary.main }}
                        />
                      </Box>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
                        align="center"
                        fontWeight={600}
                        sx={{ mb: 2 }}
                      >
                        Care Coordination
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="center"
                        sx={{ lineHeight: 1.7 }}
                      >
                        Enhance teamwork between vet and pet parent, ensuring seamless, informed care throughout the journey.
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          background: alpha(theme.palette.primary.light, 0.05),
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
                variant="h3"
                component="h2"
                align="center"
                sx={{
                  fontWeight: 700,
                  mb: { xs: 2, md: 3 },
                  color: theme.palette.text.primary,
                }}
              >
                Why Choose OncoTracker
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
                  mb: { xs: 6, md: 8 },
                  fontWeight: 400,
                }}
              >
                Created with compassion and expertise to support you during challenging times.
              </Typography>
            </motion.div>

            <Grid container spacing={4}>
              {[
                {
                  icon: <HealthAndSafetyOutlined sx={{ fontSize: 28, color: theme.palette.primary.main }} />,
                  title: 'Improved Quality of Care',
                  description: "Better tracking leads to more informed decisions for your pet's health journey."
                },
                {
                  icon: <MedicalInformationOutlined sx={{ fontSize: 28, color: theme.palette.primary.main }} />,
                  title: 'Expert-Led Design',
                  description: 'Developed with veterinary oncologists to ensure clinical relevance and usability.'
                },
                {
                  icon: <SupportOutlined sx={{ fontSize: 28, color: theme.palette.primary.main }} />,
                  title: 'Peace of Mind',
                  description: "Reduce anxiety by feeling more in control of your pet's treatment plan."
                },
                {
                  icon: <Pets sx={{ fontSize: 28, color: theme.palette.primary.main }} />,
                  title: 'Pet-Centered Approach',
                  description: "Every feature is designed with your pet's comfort and wellbeing in mind."
                }
              ].map((benefit, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <motion.div
                    variants={cardVariants}
                    custom={index}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        mb: 3,
                        px: { xs: 2, md: 3 },
                      }}
                    >
                      <Box
                        sx={{
                          mr: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 52,
                          height: 52,
                          borderRadius: '50%',
                          flexShrink: 0,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                        }}
                      >
                        {benefit.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          component="h3"
                          fontWeight={600}
                          gutterBottom
                        >
                          {benefit.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          sx={{ lineHeight: 1.7 }}
                        >
                          {benefit.description}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: '#ffffff',
          textAlign: 'center',
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
                variant="h3"
                component="h2"
                align="center"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: theme.palette.text.primary,
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
                  fontWeight: 400,
                }}
              >
                Join our community of veterinarians and pet parents dedicated to providing the best care possible during cancer treatment.
              </Typography>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                size="large"
                sx={{
                  py: 1.8,
                  px: 4,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: { xs: '1.1rem', sm: '1.2rem' },
                  fontWeight: 600,
                  background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                  boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.3)}`,
                  '&:hover': {
                    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                    background: `linear-gradient(90deg, ${theme.palette.primary.dark} 10%, ${theme.palette.primary.main} 90%)`,
                  },
                }}
              >
                Create Your Free Account
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box
        component="footer"
        sx={{
          py: 5,
          backgroundColor: alpha(theme.palette.primary.dark, 0.05),
          borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          mt: 'auto',
        }}
      >
        <Container>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <Box sx={{ mb: { xs: 3, sm: 0 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Pets sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 24 }} />
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                  }}
                >
                  OncoTracker
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Compassionate cancer care coordination for pets.
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 4 },
                alignItems: { xs: 'center', sm: 'flex-start' },
              }}
            >
              <Box>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                  Product
                </Typography>
                <Stack spacing={1}>
                  <Link to="/features" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
                    <Typography variant="body2">Features</Typography>
                  </Link>
                  <Link to="/pricing" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
                    <Typography variant="body2">Pricing</Typography>
                  </Link>
                </Stack>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                  Support
                </Typography>
                <Stack spacing={1}>
                  <Link to="/faq" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
                    <Typography variant="body2">FAQ</Typography>
                  </Link>
                  <Link to="/contact" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
                    <Typography variant="body2">Contact Us</Typography>
                  </Link>
                </Stack>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                  Legal
                </Typography>
                <Stack spacing={1}>
                  <Link to="/terms" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
                    <Typography variant="body2">Terms</Typography>
                  </Link>
                  <Link to="/privacy" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
                    <Typography variant="body2">Privacy</Typography>
                  </Link>
                </Stack>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 2 }}
          >
            © {new Date().getFullYear()} OncoTracker. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 