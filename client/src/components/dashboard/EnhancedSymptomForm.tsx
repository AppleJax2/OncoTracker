import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Slider, 
  RadioGroup, 
  Radio, 
  FormControlLabel, 
  TextField, 
  Button, 
  useTheme, 
  alpha, 
  Paper,
  Tooltip,
  IconButton
} from '@mui/material';
import { 
  HelpOutlineRounded, 
  CheckCircleOutlined,
  InfoOutlined,
  ArrowBackRounded,
  SendRounded
} from '@mui/icons-material';

// Mock symptom definition based on the VCOG scale
interface SymptomGradeDefinition {
  grade: number;
  description: string;
  longDescription?: string;
}

interface SymptomDefinition {
  symptom: string;
  description: string;
  grades: SymptomGradeDefinition[];
}

interface SymptomFormProps {
  symptomDefinitions: SymptomDefinition[];
  values: Record<string, number>;
  notes: string;
  overallWellbeing: number;
  onGradeChange: (symptom: string, grade: number) => void;
  onNotesChange: (notes: string) => void;
  onWellbeingChange: (value: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  petName: string;
}

const EnhancedSymptomForm: React.FC<SymptomFormProps> = ({
  symptomDefinitions,
  values,
  notes,
  overallWellbeing,
  onGradeChange,
  onNotesChange,
  onWellbeingChange,
  onSubmit,
  onCancel,
  petName
}) => {
  const theme = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Get color for grade visualization
  const getGradeColor = (grade: number) => {
    if (grade === 0) return theme.palette.success.main;
    if (grade === 1) return theme.palette.info.main;
    if (grade === 2) return theme.palette.warning.main;
    if (grade === 3) return theme.palette.warning.dark;
    return theme.palette.error.main;
  };

  // Get wellbeing color
  const getWellbeingColor = (value: number) => {
    if (value <= 1) return theme.palette.error.main;
    if (value === 2) return theme.palette.warning.main;
    if (value === 3) return theme.palette.info.main;
    if (value === 4) return theme.palette.success.light;
    return theme.palette.success.main;
  };

  // Tooltip descriptions for wellbeing scale
  const wellbeingDescriptions = [
    "",
    "Very poor - Significant discomfort, not eating, minimal movement",
    "Poor - Noticeably uncomfortable, reduced appetite and activity",
    "Fair - Some discomfort but maintaining most normal activities",
    "Good - Minor symptoms, otherwise normal behavior",
    "Excellent - Appears comfortable and behaving normally"
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box
        component={Paper}
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: theme.palette.background.paper,
          boxShadow: '0 8px 30px rgba(0,0,0,0.07)',
          mb: 4,
        }}
      >
        <motion.div variants={itemVariants}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box sx={{ mr: 2 }}>
              <IconButton 
                onClick={onCancel}
                size="small"
                color="primary"
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <ArrowBackRounded fontSize="small" />
              </IconButton>
            </Box>
            <div>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                Submit Report for {petName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Report symptoms observed since the last report (or within the last 24 hours).
              </Typography>
            </div>
          </Box>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Box 
            sx={{ 
              mb: 4, 
              p: 2, 
              borderRadius: 2, 
              backgroundColor: alpha(theme.palette.primary.light, 0.08),
              borderLeft: `3px solid ${theme.palette.primary.main}`
            }}
          >
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <InfoOutlined fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
              Reporting symptoms accurately helps your veterinarian understand how {petName} is responding to treatment.
              Grade 0 means normal, while higher grades indicate increasing severity.
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={itemVariants} style={{ marginBottom: 32 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            Symptom Grades
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              (0 = Normal)
            </Typography>
          </Typography>
        </motion.div>

        {symptomDefinitions.map((symptom, index) => (
          <motion.div 
            key={symptom.symptom}
            variants={itemVariants}
            custom={index}
          >
            <Paper
              elevation={0}
              sx={{ 
                mb: 4, 
                p: 3, 
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(0,0,0,0.05)',
                  borderColor: alpha(theme.palette.primary.main, 0.2)
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {symptom.symptom}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {symptom.description}
                  </Typography>
                </Box>
                <Tooltip title="Click for detailed descriptions of each grade">
                  <IconButton size="small" sx={{ color: theme.palette.primary.main }}>
                    <HelpOutlineRounded fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box sx={{ px: 2, mb: 3 }}>
                <Slider
                  value={values[symptom.symptom] || 0}
                  min={0}
                  max={4}
                  step={1}
                  marks
                  onChange={(_, newValue) => onGradeChange(symptom.symptom, newValue as number)}
                  sx={{
                    '& .MuiSlider-thumb': {
                      height: 24,
                      width: 24,
                      backgroundColor: 'white',
                      border: `2px solid ${getGradeColor(values[symptom.symptom] || 0)}`,
                      '&:before': {
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      },
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: `0 0 0 8px ${alpha(getGradeColor(values[symptom.symptom] || 0), 0.16)}`,
                      },
                    },
                    '& .MuiSlider-track': {
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: getGradeColor(values[symptom.symptom] || 0),
                    },
                    '& .MuiSlider-rail': {
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: alpha(theme.palette.grey[300], 0.5),
                    },
                    '& .MuiSlider-mark': {
                      backgroundColor: theme.palette.grey[400],
                      height: 4,
                      width: 4,
                      borderRadius: '50%',
                    },
                    '& .MuiSlider-markActive': {
                      backgroundColor: 'white',
                    },
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
                {symptom.grades.map((grade) => (
                  <Box 
                    key={grade.grade} 
                    sx={{ 
                      textAlign: 'center',
                      width: '20%',
                      transition: 'all 0.2s ease',
                      opacity: values[symptom.symptom] === grade.grade ? 1 : 0.7,
                      transform: values[symptom.symptom] === grade.grade ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      fontWeight={values[symptom.symptom] === grade.grade ? 700 : 400}
                      sx={{ 
                        color: values[symptom.symptom] === grade.grade 
                          ? getGradeColor(grade.grade) 
                          : theme.palette.text.secondary,
                        mb: 0.5
                      }}
                    >
                      Grade {grade.grade}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        color: theme.palette.text.secondary,
                        fontSize: '0.7rem'
                      }}
                    >
                      {grade.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <Paper
            elevation={0}
            sx={{ 
              mb: 4, 
              p: 3, 
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
              Overall Wellbeing
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              How has {petName}'s general wellbeing been since the last report?
            </Typography>

            <Box sx={{ px: 2, mb: 1 }}>
              <Slider
                value={overallWellbeing}
                min={1}
                max={5}
                step={1}
                marks
                onChange={(_, newValue) => onWellbeingChange(newValue as number)}
                sx={{
                  '& .MuiSlider-thumb': {
                    height: 24,
                    width: 24,
                    backgroundColor: 'white',
                    border: `2px solid ${getWellbeingColor(overallWellbeing)}`,
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: `0 0 0 8px ${alpha(getWellbeingColor(overallWellbeing), 0.16)}`,
                    },
                  },
                  '& .MuiSlider-track': {
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: getWellbeingColor(overallWellbeing),
                  },
                  '& .MuiSlider-rail': {
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: alpha(theme.palette.grey[300], 0.5),
                  },
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
              {[1, 2, 3, 4, 5].map((value) => (
                <Tooltip key={value} title={wellbeingDescriptions[value]} placement="top">
                  <Box 
                    sx={{ 
                      textAlign: 'center',
                      width: '20%',
                      transition: 'all 0.2s ease',
                      opacity: overallWellbeing === value ? 1 : 0.7,
                      transform: overallWellbeing === value ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      fontWeight={overallWellbeing === value ? 700 : 400}
                      sx={{ 
                        color: overallWellbeing === value 
                          ? getWellbeingColor(value) 
                          : theme.palette.text.secondary,
                      }}
                    >
                      {value === 1 && "Very Poor"}
                      {value === 2 && "Poor"}
                      {value === 3 && "Fair"}
                      {value === 4 && "Good"}
                      {value === 5 && "Excellent"}
                    </Typography>
                  </Box>
                </Tooltip>
              ))}
            </Box>
          </Paper>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Paper
            elevation={0}
            sx={{ 
              mb: 4, 
              p: 3, 
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
              Additional Notes
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Any other comments or observations for the veterinary team?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder={`Share any other observations about ${petName}'s behavior, appetite, or other symptoms...`}
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                }
              }}
            />
          </Paper>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <Button 
            variant="outlined" 
            size="large" 
            onClick={onCancel}
            sx={{ 
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              textTransform: 'none'
            }}
          >
            Cancel
          </Button>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button 
              variant="contained" 
              size="large" 
              onClick={onSubmit}
              endIcon={<SendRounded />}
              sx={{ 
                borderRadius: 2,
                px: 4,
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`
              }}
            >
              Submit Report
            </Button>
          </motion.div>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default EnhancedSymptomForm; 