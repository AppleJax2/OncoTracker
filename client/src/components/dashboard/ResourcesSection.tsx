import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Card, CardContent, useTheme, alpha } from '@mui/material';
import { 
  HealthAndSafetyOutlined, 
  SupportOutlined, 
  CalendarMonthOutlined, 
  MenuBookOutlined,
  TimerOutlined,
  EmojiEventsOutlined,
  ArrowForwardIos
} from '@mui/icons-material';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  color: string;
  delay: number;
  onClick: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  title, 
  description, 
  icon, 
  buttonText, 
  color, 
  delay,
  onClick 
}) => {
  const theme = useTheme();
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: delay,
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Card
        sx={{
          height: '100%',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: color,
          }
        }}
      >
        <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2, duration: 0.3 }}
            >
              <Box 
                sx={{ 
                  backgroundColor: alpha(color, 0.15),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  mr: 2
                }}
              >
                <Box 
                  component="div" 
                  sx={{ 
                    color: color,
                    fontSize: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {icon}
                </Box>
              </Box>
            </motion.div>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                color: theme.palette.text.primary 
              }}
            >
              {title}
            </Typography>
          </Box>
          
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 2.5, 
              color: alpha(theme.palette.text.primary, 0.7),
              lineHeight: 1.6,
              flex: 1
            }}
          >
            {description}
          </Typography>
          
          <motion.div
            whileHover={{ x: 3 }}
            whileTap={{ x: 0 }}
          >
            <Button 
              onClick={onClick}
              endIcon={<ArrowForwardIos sx={{ fontSize: '0.7rem' }} />}
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                color: color,
                p: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                }
              }}
            >
              {buttonText}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ResourcesSection: React.FC = () => {
  const theme = useTheme();

  // Simulated resource card click handlers
  const handleResourceClick = () => {
    console.log('Resource clicked');
    // In a real app, this would open a modal, navigate to a page, etc.
  };

  // Animation for section container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const titleVariants = {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={titleVariants}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700, 
            mb: 3, 
            color: theme.palette.text.primary,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <SupportOutlined sx={{ mr: 1, color: theme.palette.primary.main }} />
          Supportive Resources
        </Typography>
      </motion.div>

      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)'
          },
          gap: 3
        }}
      >
        <ResourceCard
          title="Symptom Tracking Guide"
          description="Learn how to effectively track and report your pet's symptoms to help your veterinarian provide the best care during cancer treatment."
          icon={<HealthAndSafetyOutlined />}
          buttonText="Read Guide"
          color={theme.palette.primary.main}
          delay={0.1}
          onClick={handleResourceClick}
        />
        
        <ResourceCard
          title="Pet Parent Support"
          description="Connect with other pet parents who understand what you're going through. Find emotional support and practical advice for your pet's cancer journey."
          icon={<SupportOutlined />}
          buttonText="Find Support"
          color={theme.palette.secondary.main}
          delay={0.2}
          onClick={handleResourceClick}
        />

        <ResourceCard
          title="Treatment Calendar"
          description="Learn how to organize your pet's treatment schedule, manage medication reminders, and keep track of important appointments."
          icon={<CalendarMonthOutlined />}
          buttonText="View Tips"
          color={theme.palette.info.main}
          delay={0.3}
          onClick={handleResourceClick}
        />

        <ResourceCard
          title="Self-Care Reminder"
          description="Caring for a pet with cancer can be emotionally challenging. Find resources to help you maintain your own wellbeing during this journey."
          icon={<EmojiEventsOutlined />}
          buttonText="Explore Resources"
          color={theme.palette.success.main}
          delay={0.4}
          onClick={handleResourceClick}
        />
      </Box>
    </motion.div>
  );
};

export default ResourcesSection; 