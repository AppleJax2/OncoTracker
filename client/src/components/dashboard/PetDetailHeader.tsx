import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Chip, 
  Tooltip, 
  useTheme, 
  alpha,
  LinearProgress,
  Paper
} from '@mui/material';
import { 
  PetsRounded, 
  CalendarMonthOutlined, 
  FavoriteOutlined, 
  AddCircleOutlineRounded, 
  LinkRounded,
  LocalHospitalOutlined
} from '@mui/icons-material';
import { Pet } from '../../types';

interface PetDetailHeaderProps {
  pet: Pet;
  onSubmitReport: () => void;
  onLinkToVet: () => void;
}

interface InfoItemProps {
  label: string;
  value: string;
  secondaryValue?: string;
  icon: React.ReactNode;
}

const PetDetailHeader: React.FC<PetDetailHeaderProps> = ({ pet, onSubmitReport, onLinkToVet }) => {
  const theme = useTheme();
  
  // Calculate a simulated treatment progress for visualization
  // In a real app, this would come from the actual treatment data
  const treatmentProgress = Math.random() * 100; // Random progress for demo
  
  // Format date helper
  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };
  
  // Helper to get diagnosis-appropriate colors
  const getDiagnosisColor = () => {
    const diagnosisLower = (pet.diagnosis || '').toLowerCase();
    if (diagnosisLower.includes('lymphoma')) return theme.palette.error.light;
    if (diagnosisLower.includes('sarcoma')) return theme.palette.warning.light;
    if (diagnosisLower.includes('carcinoma')) return theme.palette.info.light;
    return theme.palette.primary.main;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
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

  // Animation for the pulsing heart icon
  const pulseAnimation = {
    scale: [1, 1.1, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box 
        sx={{ 
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          p: { xs: 3, md: 4 }
        }}
      >
        {/* Decorative elements */}
        <Paper 
          elevation={0}
          sx={{
            borderRadius: 4,
            p: { xs: 2, sm: 3, md: 4 },
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              backgroundColor: alpha(theme.palette.primary.light, 0.1),
              filter: 'blur(30px)',
              opacity: 0.7,
              zIndex: 0
            }} 
          />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 3, md: 4 } }}>
              {/* Pet Avatar & Name Section */}
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box 
                    sx={{ 
                      position: 'relative',
                      mr: 3
                    }}
                  >
                    <motion.div animate={pulseAnimation}>
                      <FavoriteOutlined 
                        sx={{ 
                          position: 'absolute',
                          top: -5,
                          right: -5,
                          color: theme.palette.secondary.light,
                          fontSize: 14,
                          zIndex: 2
                        }} 
                      />
                    </motion.div>
                    <Box 
                      sx={{ 
                        width: 80,
                        height: 80,
                        borderRadius: '16px',
                        backgroundColor: alpha(getDiagnosisColor(), 0.15),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 4px 12px ${alpha(getDiagnosisColor(), 0.2)}`
                      }}
                    >
                      <PetsRounded 
                        sx={{ 
                          fontSize: 40,
                          color: getDiagnosisColor()
                        }} 
                      />
                    </Box>
                  </Box>
                  
                  <Box>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 700,
                          mb: 0.5,
                          color: theme.palette.text.primary
                        }}
                      >
                        {pet.name || 'Unnamed Pet'}
                      </Typography>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <Typography 
                        sx={{ 
                          fontSize: '1rem',
                          color: theme.palette.text.secondary,
                          textTransform: 'capitalize',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {pet.species || 'N/A'} - {pet.breed || 'N/A'}
                        {pet.diagnosis && (
                          <Chip 
                            size="small" 
                            label={pet.diagnosis} 
                            sx={{ 
                              ml: 2, 
                              backgroundColor: alpha(getDiagnosisColor(), 0.15),
                              color: getDiagnosisColor(),
                              fontWeight: 500
                            }}
                          />
                        )}
                      </Typography>
                    </motion.div>
                  </Box>
                </Box>
                
                {/* Treatment Progress Section */}
                <Box sx={{ mb: 3, mt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                      Treatment Progress
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Math.round(treatmentProgress)}%
                    </Typography>
                  </Box>
                  <Box sx={{ position: 'relative', height: 8, width: '100%', borderRadius: 4, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${treatmentProgress}%` }}
                      transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                    >
                      <LinearProgress 
                        variant="determinate" 
                        value={100} 
                        sx={{ 
                          height: '100%',
                          backgroundColor: alpha(getDiagnosisColor(), 0.15),
                          '.MuiLinearProgress-bar': {
                            backgroundColor: getDiagnosisColor(),
                          }
                        }} 
                      />
                    </motion.div>
                  </Box>
                </Box>
              </motion.div>
              
              {/* Pet Details Section */}
              <motion.div variants={itemVariants}>
                <Box 
                  sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      backgroundColor: alpha(theme.palette.background.paper, 0.7),
                      borderRadius: 2,
                      mb: 2
                    }}
                  >
                    <Box 
                      sx={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 2
                      }}
                    >
                      <Box>
                        <InfoItem 
                          label="Age" 
                          value={pet.age || 'N/A'} 
                          secondaryValue={pet.dateOfBirth ? `DOB: ${formatDate(pet.dateOfBirth)}` : undefined}
                          icon={<CalendarMonthOutlined fontSize="small" />}
                        />
                      </Box>
                      <Box>
                        <InfoItem 
                          label="Weight" 
                          value={pet.weightKg ? `${pet.weightKg} kg` : 'N/A'} 
                          icon={<FavoriteOutlined fontSize="small" />}
                        />
                      </Box>
                      <Box>
                        <InfoItem 
                          label="Treatment Type" 
                          value={pet.treatmentType || 'Not specified'} 
                          icon={<LocalHospitalOutlined fontSize="small" />}
                        />
                      </Box>
                      <Box>
                        <InfoItem 
                          label="Diagnosis Date" 
                          value={(pet as any).diagnosisDate ? formatDate((pet as any).diagnosisDate) : 'N/A'} 
                          icon={<CalendarMonthOutlined fontSize="small" />}
                        />
                      </Box>
                    </Box>
                  </Paper>
                  
                  {/* Additional info or encouragement message */}
                  <Box 
                    sx={{ 
                      p: 2,
                      backgroundColor: alpha(theme.palette.primary.light, 0.1),
                      borderRadius: 2,
                      borderLeft: `3px solid ${theme.palette.primary.main}`,
                      mb: 3
                    }}
                  >
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.primary }}>
                      Tracking symptoms consistently helps your veterinarian provide the best care for {pet.name || 'your pet'}.
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Box>
            
            {/* Action buttons */}
            <motion.div 
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleOutlineRounded />}
                  onClick={onSubmitReport}
                  sx={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                    fontWeight: 600,
                    padding: '10px 20px',
                    textTransform: 'none'
                  }}
                >
                  Submit New Report
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<LinkRounded />}
                  onClick={onLinkToVet}
                  sx={{
                    borderRadius: '12px',
                    fontWeight: 600,
                    padding: '10px 20px',
                    textTransform: 'none'
                  }}
                >
                  Link to Vet
                </Button>
              </motion.div>
            </motion.div>
          </Box>
        </Paper>
      </Box>
    </motion.div>
  );
};

// Helper component for displaying info items
const InfoItem: React.FC<InfoItemProps> = ({ label, value, secondaryValue, icon }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
      <Box 
        sx={{ 
          mr: 1.5, 
          mt: 0.5, 
          color: theme.palette.primary.main,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            color: theme.palette.text.secondary,
            mb: 0.5,
            fontWeight: 500
          }}
        >
          {label}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary,
            textTransform: 'capitalize'
          }}
        >
          {value}
        </Typography>
        {secondaryValue && (
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block', 
              color: theme.palette.text.secondary,
              mt: 0.5
            }}
          >
            {secondaryValue}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PetDetailHeader; 