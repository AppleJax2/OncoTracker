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
  LocalHospitalOutlined,
  PsychologyOutlined,
  FavoriteBorderOutlined,
  EmojiObjectsOutlined
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
        background: `linear-gradient(170deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.background.default, 0.1)} 30%, ${theme.palette.background.paper} 100%)`,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 10, sm: 14, md: 18 },
          pb: { xs: 10, sm: 12, md: 16 },
          textAlign: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`,
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
                  mb: 3 
                }}
              >
                <Box
                  sx={{
                    width: { xs: 70, sm: 85 },
                    height: { xs: 70, sm: 85 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    borderRadius: '50%',
                    boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                    mb: 2
                  }}
                >
                  <Pets sx={{ fontSize: { xs: 38, sm: 48 }, color: theme.palette.primary.dark }} />
                </Box>
              </Box>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.25rem' },
                  backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: `0 3px 8px ${alpha(theme.palette.primary.dark, 0.15)}`,
                  letterSpacing: '-0.02em',
                  mb: 2.5,
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
                  maxWidth: '850px',
                  mx: 'auto',
                  lineHeight: 1.65,
                  fontWeight: 400,
                  fontSize: { xs: '1.1rem', sm: '1.25rem'},
                  mb: 5,
                  px: { xs: 2, sm: 0 },
                  color: alpha(theme.palette.text.primary, 0.85),
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
                      py: 1.8,
                      px: 4,
                      borderRadius: 8,
                      textTransform: 'none',
                      fontSize: { xs: '1rem', sm: '1.15rem' },
                      fontWeight: 700,
                      background: `linear-gradient(95deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.35)}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.45)}`,
                        background: `linear-gradient(95deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
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
                      py: 1.8,
                      px: 4,
                      borderRadius: 8,
                      textTransform: 'none',
                      fontSize: { xs: '1rem', sm: '1.15rem' },
                      fontWeight: 600,
                      borderWidth: 2,
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.dark,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderWidth: 2,
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        borderColor: theme.palette.primary.dark,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.light, 0.1)}`,
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
                top: -150,
                right: -150,
                width: 400,
                height: 400,
                background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.12)} 0%, transparent 65%)`,
                borderRadius: '50%',
                zIndex: -1,
                opacity: 0.8,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -120,
                left: -120,
                width: 350,
                height: 350,
                background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.1)} 0%, transparent 70%)`,
                borderRadius: '50%',
                zIndex: -1,
                opacity: 0.7,
              }}
            />
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: alpha(theme.palette.primary.light, 0.05),
          borderTop: `1px solid ${theme.palette.divider}`,
          borderBottom: `1px solid ${theme.palette.divider}`,
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
                  mb: 2,
                  color: theme.palette.text.primary,
                  letterSpacing: '-0.01em',
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
                  mb: { xs: 8, md: 10 },
                  fontWeight: 400,
                  fontSize: '1.1rem',
                }}
              >
                OncoTracker provides essential tools to navigate pet cancer treatment with confidence and clarity.
              </Typography>
            </motion.div>

            <Grid container spacing={isMedium ? 3 : 5}>
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
                      borderRadius: 4,
                      transition: 'all 0.3s ease-in-out',
                      boxShadow: `0 6px 24px ${alpha(theme.palette.common.black, 0.06)}`,
                      overflow: 'visible',
                      background: theme.palette.background.paper,
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: `0 12px 30px ${alpha(theme.palette.primary.light, 0.15)}`,
                      }
                    }}
                  >
                    <Box
                      sx={{
                        height: 8,
                        width: '100%',
                        bgcolor: theme.palette.primary.main,
                        borderTopLeftRadius: theme.shape.borderRadius * 2,
                        borderTopRightRadius: theme.shape.borderRadius * 2,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: { xs: 3, md: 4 } }}>
                      <Box
                        sx={{
                          mb: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 75,
                          height: 75,
                          borderRadius: '50%',
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          mx: 'auto',
                          mt: -4,
                          boxShadow: `0 4px 10px ${alpha(theme.palette.primary.light, 0.1)}`,
                        }}
                      >
                        <MonitorHeartOutlined
                          sx={{ fontSize: 40, color: theme.palette.primary.dark }}
                        />
                      </Box>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
                        align="center"
                        fontWeight={600}
                        sx={{ mb: 1.5 }}
                      >
                        Symptom Monitoring
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="center"
                        sx={{ lineHeight: 1.7, px: 1 }}
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
                      borderRadius: 4,
                      transition: 'all 0.3s ease-in-out',
                      boxShadow: `0 6px 24px ${alpha(theme.palette.common.black, 0.06)}`,
                      overflow: 'visible',
                      background: theme.palette.background.paper,
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: `0 12px 30px ${alpha(theme.palette.primary.light, 0.15)}`,
                      }
                    }}
                  >
                    <Box
                      sx={{
                        height: 8,
                        width: '100%',
                        bgcolor: theme.palette.primary.main,
                        borderTopLeftRadius: theme.shape.borderRadius * 2,
                        borderTopRightRadius: theme.shape.borderRadius * 2,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: { xs: 3, md: 4 } }}>
                      <Box
                        sx={{
                          mb: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 75,
                          height: 75,
                          borderRadius: '50%',
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          mx: 'auto',
                          mt: -4,
                          boxShadow: `0 4px 10px ${alpha(theme.palette.primary.light, 0.1)}`,
                        }}
                      >
                        <CalendarMonthOutlined
                          sx={{ fontSize: 40, color: theme.palette.primary.dark }}
                        />
                      </Box>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
                        align="center"
                        fontWeight={600}
                        sx={{ mb: 1.5 }}
                      >
                        Treatment Management
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="center"
                        sx={{ lineHeight: 1.7, px: 1 }}
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
                      borderRadius: 4,
                      transition: 'all 0.3s ease-in-out',
                      boxShadow: `0 6px 24px ${alpha(theme.palette.common.black, 0.06)}`,
                      overflow: 'visible',
                      background: theme.palette.background.paper,
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: `0 12px 30px ${alpha(theme.palette.primary.light, 0.15)}`,
                      }
                    }}
                  >
                    <Box
                      sx={{
                        height: 8,
                        width: '100%',
                        bgcolor: theme.palette.primary.main,
                        borderTopLeftRadius: theme.shape.borderRadius * 2,
                        borderTopRightRadius: theme.shape.borderRadius * 2,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: { xs: 3, md: 4 } }}>
                      <Box
                        sx={{
                          mb: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 75,
                          height: 75,
                          borderRadius: '50%',
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          mx: 'auto',
                          mt: -4,
                          boxShadow: `0 4px 10px ${alpha(theme.palette.primary.light, 0.1)}`,
                        }}
                      >
                        <Groups2Outlined
                          sx={{ fontSize: 40, color: theme.palette.primary.dark }}
                        />
                      </Box>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
                        align="center"
                        fontWeight={600}
                        sx={{ mb: 1.5 }}
                      >
                        Care Coordination
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="center"
                        sx={{ lineHeight: 1.7, px: 1 }}
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
          py: { xs: 8, md: 12 },
          bgcolor: theme.palette.background.paper,
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
                  mb: 2,
                  color: theme.palette.text.primary,
                  letterSpacing: '-0.01em',
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
                  mb: { xs: 8, md: 10 },
                  fontWeight: 400,
                  fontSize: '1.1rem',
                }}
              >
                Created with compassion and expertise to support you during challenging times.
              </Typography>
            </motion.div>

            <Grid container spacing={isMedium ? 3 : 4}>
              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  variants={cardVariants}
                  custom={0}
                  whileHover="hover"
                >
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      borderRadius: 3,
                      borderColor: alpha(theme.palette.primary.light, 0.5),
                      transition: 'all 0.3s ease-in-out',
                      bgcolor: alpha(theme.palette.primary.light, 0.03),
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.light, 0.1)}`,
                        transform: 'translateY(-4px)',
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: {xs: 2.5, md: 3.5} }}>
                      <Box
                        sx={{
                          mb: 2.5,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                        }}
                      >
                        <EmojiObjectsOutlined
                          sx={{ fontSize: 32, color: theme.palette.primary.dark }}
                        />
                      </Box>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h3"
                        fontWeight={600}
                        sx={{ mb: 1 }}
                      >
                        Improved Quality of Care
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        Better tracking leads to more informed decisions for your pet's health journey.
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  variants={cardVariants}
                  custom={1}
                  whileHover="hover"
                >
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      borderRadius: 3,
                      borderColor: alpha(theme.palette.primary.light, 0.5),
                      transition: 'all 0.3s ease-in-out',
                      bgcolor: alpha(theme.palette.primary.light, 0.03),
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.light, 0.1)}`,
                        transform: 'translateY(-4px)',
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: {xs: 2.5, md: 3.5} }}>
                      <Box sx={{ mb: 2.5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: '50%', bgcolor: alpha(theme.palette.primary.main, 0.1), }}>
                        <LocalHospitalOutlined
                          sx={{ fontSize: 32, color: theme.palette.primary.dark }}
                        />
                      </Box>
                      <Typography gutterBottom variant="h6" component="h3" fontWeight={600} sx={{ mb: 1 }}>
                        Expert-Led Design
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.6 }}>
                        Developed with veterinary oncologists to ensure clinical relevance and usability.
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  variants={cardVariants}
                  custom={2}
                  whileHover="hover"
                >
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      borderRadius: 3,
                      borderColor: alpha(theme.palette.primary.light, 0.5),
                      transition: 'all 0.3s ease-in-out',
                      bgcolor: alpha(theme.palette.primary.light, 0.03),
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.light, 0.1)}`,
                        transform: 'translateY(-4px)',
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: {xs: 2.5, md: 3.5} }}>
                      <Box sx={{ mb: 2.5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: '50%', bgcolor: alpha(theme.palette.primary.main, 0.1), }}>
                        <PsychologyOutlined
                          sx={{ fontSize: 32, color: theme.palette.primary.dark }}
                        />
                      </Box>
                      <Typography gutterBottom variant="h6" component="h3" fontWeight={600} sx={{ mb: 1 }}>
                        Peace of Mind
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.6 }}>
                         Reduce anxiety by feeling more in control of your pet's treatment plan.
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  variants={cardVariants}
                  custom={3}
                  whileHover="hover"
                >
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      borderRadius: 3,
                      borderColor: alpha(theme.palette.primary.light, 0.5),
                      transition: 'all 0.3s ease-in-out',
                      bgcolor: alpha(theme.palette.primary.light, 0.03),
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.light, 0.1)}`,
                        transform: 'translateY(-4px)',
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: {xs: 2.5, md: 3.5} }}>
                      <Box sx={{ mb: 2.5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: '50%', bgcolor: alpha(theme.palette.primary.main, 0.1), }}>
                        <FavoriteBorderOutlined
                          sx={{ fontSize: 32, color: theme.palette.primary.dark }}
                        />
                      </Box>
                      <Typography gutterBottom variant="h6" component="h3" fontWeight={600} sx={{ mb: 1 }}>
                        Pet-Centered Approach
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.6 }}>
                         Every feature is designed with your pet's comfort and wellbeing in mind.
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: alpha(theme.palette.primary.dark, 0.9),
          color: theme.palette.common.white,
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
                  mb: 2,
                  color: 'inherit',
                  textShadow: `0 2px 5px ${alpha(theme.palette.common.black, 0.3)}`,
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
                sx={{
                  maxWidth: '700px',
                  mx: 'auto',
                  mb: 5,
                  fontWeight: 400,
                  color: alpha(theme.palette.common.white, 0.85),
                  lineHeight: 1.7,
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
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                style={{ display: 'inline-block' }}
              >
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  size="large"
                  color="secondary"
                  sx={{
                    py: 2,
                    px: 5,
                    borderRadius: 8,
                    textTransform: 'none',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.primary.dark,
                    boxShadow: `0 6px 18px ${alpha(theme.palette.common.black, 0.2)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px) scale(1.02)',
                      bgcolor: theme.palette.background.paper,
                      boxShadow: `0 10px 25px ${alpha(theme.palette.common.black, 0.3)}`,
                    },
                  }}
                >
                  Create Your Free Account
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box
        component="footer"
        sx={{
          py: { xs: 4, md: 6 },
          px: 2,
          bgcolor: theme.palette.background.default,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between" alignItems="center">
            <Grid item md="auto" xs={12}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                 <Box
                  sx={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Pets sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h6" color="text.primary" fontWeight={600}>
                  OncoTracker
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Compassionate cancer care coordination for pets.
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid container spacing={4} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                <Grid item xs={6} sm={4} md="auto">
                  <Typography variant="overline" color="text.secondary" gutterBottom>
                    Product
                  </Typography>
                  <Stack spacing={1}>
                    <Link to="/features" style={{ textDecoration: 'none' }}>
                      <Typography variant="body2" color="text.primary" sx={{ '&:hover': { color: theme.palette.primary.main }}}>Features</Typography>
                    </Link>
                    <Link to="/pricing" style={{ textDecoration: 'none' }}>
                       <Typography variant="body2" color="text.primary" sx={{ '&:hover': { color: theme.palette.primary.main }}}>Pricing</Typography>
                    </Link>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4} md="auto">
                  <Typography variant="overline" color="text.secondary" gutterBottom>
                    Support
                  </Typography>
                  <Stack spacing={1}>
                    <Link to="/faq" style={{ textDecoration: 'none' }}>
                       <Typography variant="body2" color="text.primary" sx={{ '&:hover': { color: theme.palette.primary.main }}}>FAQ</Typography>
                    </Link>
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                       <Typography variant="body2" color="text.primary" sx={{ '&:hover': { color: theme.palette.primary.main }}}>Contact Us</Typography>
                    </Link>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4} md="auto">
                  <Typography variant="overline" color="text.secondary" gutterBottom>
                    Legal
                  </Typography>
                  <Stack spacing={1}>
                    <Link to="/terms" style={{ textDecoration: 'none' }}>
                       <Typography variant="body2" color="text.primary" sx={{ '&:hover': { color: theme.palette.primary.main }}}>Terms</Typography>
                    </Link>
                    <Link to="/privacy" style={{ textDecoration: 'none' }}>
                      <Typography variant="body2" color="text.primary" sx={{ '&:hover': { color: theme.palette.primary.main }}}>Privacy</Typography>
                    </Link>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} OncoTracker. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 