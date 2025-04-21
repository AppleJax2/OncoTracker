import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pet } from '../../types';
import { useTheme } from '@mui/material';
import { PetsRounded } from '@mui/icons-material';

interface AnimatedPetCardProps {
  pet: Pet;
  index: number;
}

const AnimatedPetCard: React.FC<AnimatedPetCardProps> = ({ pet, index }) => {
  const theme = useTheme();

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + index * 0.05,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1], // Material easing
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.15
      }
    }
  };

  // Diagnosis color indicator
  const getDiagnosisColor = () => {
    const diagnosisLower = (pet.diagnosis || '').toLowerCase();
    if (diagnosisLower.includes('lymphoma')) return theme.palette.error.light;
    if (diagnosisLower.includes('sarcoma')) return theme.palette.warning.light;
    if (diagnosisLower.includes('carcinoma')) return theme.palette.info.light;
    return theme.palette.primary.light; // Default color
  };

  // Treatment progress calculation (placeholder)
  const treatmentProgress = Math.random() * 0.8 + 0.1; // Random between 10-90% for demo

  // Age formatting
  const getFormattedAge = (age: string | undefined) => {
    if (!age) return 'N/A';
    return age;
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      className="h-full"
    >
      <Link to={`/owner/pets/${pet._id}`} className="block h-full">
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            border: '1px solid rgba(0,0,0,0.04)'
          }}
        >
          {/* Treatment progress indicator line */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '4px',
              width: `${treatmentProgress * 100}%`,
              backgroundColor: getDiagnosisColor(),
              borderTopLeftRadius: '16px',
              transition: 'width 1s ease-in-out'
            }}
          />

          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                style={{
                  backgroundColor: `${theme.palette.primary.light}20`, // 20% opacity
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}
              >
                <PetsRounded 
                  style={{ 
                    color: theme.palette.primary.main,
                    fontSize: '28px'
                  }} 
                />
              </motion.div>
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.05, duration: 0.3 }}
                  style={{
                    margin: 0,
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    color: theme.palette.text.primary
                  }}
                >
                  {pet.name || 'Unnamed Pet'}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                  style={{ 
                    margin: '4px 0 0 0',
                    fontSize: '0.85rem',
                    color: theme.palette.text.secondary
                  }}
                >
                  {pet.diagnosis || 'No diagnosis recorded'}
                </motion.p>
              </div>
            </div>

            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ 
                  fontSize: '0.85rem', 
                  width: '70px', 
                  color: theme.palette.text.secondary,
                  flexShrink: 0
                }}>
                  Type:
                </span>
                <span style={{ 
                  fontSize: '0.9rem', 
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                  textTransform: 'capitalize'
                }}>
                  {pet.species || 'N/A'} - {pet.breed || 'N/A'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ 
                  fontSize: '0.85rem', 
                  width: '70px', 
                  color: theme.palette.text.secondary,
                  flexShrink: 0
                }}>
                  Age:
                </span>
                <span style={{ 
                  fontSize: '0.9rem', 
                  color: theme.palette.text.primary,
                  fontWeight: 500
                }}>
                  {getFormattedAge(pet.age)}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  fontSize: '0.85rem', 
                  width: '70px', 
                  color: theme.palette.text.secondary,
                  flexShrink: 0
                }}>
                  Treatment:
                </span>
                <span style={{ 
                  fontSize: '0.9rem', 
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                  textTransform: 'capitalize'
                }}>
                  {pet.treatmentType || 'Not specified'}
                </span>
              </div>
            </div>
          </div>

          {/* Card footer with action link */}
          <div 
            style={{ 
              marginTop: 'auto',
              backgroundColor: `${theme.palette.background.default}80`, // 80% opacity
              borderTop: `1px solid ${theme.palette.divider}`,
              padding: '12px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${treatmentProgress * 100}%` }}
              transition={{ delay: 0.5 + index * 0.05, duration: 1 }}
              style={{ 
                height: '4px', 
                backgroundColor: getDiagnosisColor(),
                borderRadius: '2px',
                maxWidth: '60%'
              }}
            />
            <motion.span
              whileHover={{ x: 3 }}
              style={{ 
                fontSize: '0.9rem', 
                fontWeight: 600, 
                color: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              View Details
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ marginLeft: '4px' }}
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AnimatedPetCard; 