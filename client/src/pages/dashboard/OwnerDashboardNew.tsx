import React, { useState, useEffect } from 'react';
import { Container, Box, useTheme, CircularProgress, Alert, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { Pet } from '../../types';
import api from '../../services/api';
import { motion } from 'framer-motion';

// Import our new enhanced components
import WelcomeSection from '../../components/dashboard/WelcomeSection';
import AnimatedPetCard from '../../components/dashboard/AnimatedPetCard';
import ResourcesSection from '../../components/dashboard/ResourcesSection';

const OwnerDashboardNew: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/api/pets');
        if (response.data && response.data.status === 'success') {
          setPets(response.data.data.pets);
        } else {
          throw new Error('Failed to fetch pets');
        }
      } catch (err: any) {
        console.error('Error fetching pets:', err);
        const message = err?.response?.data?.message || err.message || 'Could not load your pets.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { opacity: 0 }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7,
        ease: "easeOut" 
      }
    }
  };

  // Content to render based on loading and error states
  const renderContent = () => {
    if (loading) {
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            py: 8,
            flexDirection: 'column'
          }}
        >
          <CircularProgress size={60} thickness={4} sx={{ mb: 3, color: theme.palette.primary.main }} />
          <Typography variant="body1" color="text.secondary">
            Loading your pet's information...
          </Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Alert 
          severity="error" 
          sx={{ 
            my: 2, 
            borderRadius: 2, 
            py: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          {error}
        </Alert>
      );
    }

    if (pets.length === 0) {
      return (
        <motion.div variants={sectionVariants}>
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 8, 
              px: 3,
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              maxWidth: 700,
              mx: 'auto'
            }}
          >
            <Box 
              component="img" 
              src="/placeholder-pet.svg" 
              alt="No pets" 
              sx={{ 
                width: 180, 
                height: 180, 
                mb: 3,
                opacity: 0.8 
              }} 
            />
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
              No pets found
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: theme.palette.text.secondary, maxWidth: 500, mx: 'auto' }}>
              Get started by adding your pet's information. This will help us track their cancer treatment and symptoms effectively.
            </Typography>
            
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Box 
                component="a" 
                href="/owner/pets/new"
                sx={{ 
                  display: 'inline-block',
                  py: 1.5,
                  px: 4,
                  bgcolor: theme.palette.primary.main,
                  color: '#fff',
                  fontWeight: 600,
                  borderRadius: 2,
                  textDecoration: 'none',
                  boxShadow: `0 4px 14px ${theme.palette.primary.main}40`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                    boxShadow: `0 6px 20px ${theme.palette.primary.main}60`,
                  }
                }}
              >
                Add Your First Pet
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      );
    }

    return (
      <>
        {/* Pet Cards Section */}
        <motion.div variants={sectionVariants}>
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3, 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                '&::before': {
                  content: '""',
                  display: 'block',
                  width: 3,
                  height: 24,
                  bgcolor: theme.palette.primary.main,
                  mr: 2,
                  borderRadius: 1
                }
              }}
            >
              Your Pets
            </Typography>
            
            <Box 
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)'
                },
                gap: 3
              }}
            >
              {/* Render pet cards */}
              {pets.map((pet, index) => (
                <AnimatedPetCard 
                  key={pet._id} 
                  pet={pet} 
                  index={index} 
                />
              ))}
              
              {/* Add pet card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    delay: 0.1 + pets.length * 0.05, 
                    duration: 0.5 
                  } 
                }}
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                  transition: { duration: 0.3 }
                }}
                style={{ height: '100%' }}
              >
                <Box
                  component="a"
                  href="/owner/pets/new"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 3,
                    border: '2px dashed',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    p: 4,
                    height: '100%',
                    minHeight: 200,
                    textDecoration: 'none',
                    color: 'text.primary',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      '& .add-icon': {
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        transform: 'scale(1.1)'
                      }
                    }
                  }}
                >
                  <Box 
                    className="add-icon"
                    sx={{ 
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: theme.palette.primary.light + '30',
                      color: theme.palette.primary.main,
                      fontSize: 30,
                      mb: 2,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    +
                  </Box>
                  <Typography variant="body1" fontWeight={500}>
                    Add another pet
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </Box>
        </motion.div>

        {/* Resources Section */}
        <motion.div variants={sectionVariants}>
          <Box sx={{ mb: 6 }}>
            <ResourcesSection />
          </Box>
        </motion.div>
      </>
    );
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 5 }}>
          <WelcomeSection userName={user?.firstName || ''} />
        </Box>
        
        {renderContent()}
      </Container>
    </motion.div>
  );
};

export default OwnerDashboardNew; 