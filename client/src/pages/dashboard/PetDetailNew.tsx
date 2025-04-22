import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Container, 
  Box, 
  Typography, 
  Alert, 
  CircularProgress, 
  Divider,
  Paper,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import { 
  BarChart as ChartBarRounded, 
  InfoOutlined, 
  ArrowBackRounded 
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { Pet, Report, ReportEntry } from '../../types';
import api from '../../services/api';

// Import our custom components
import PetDetailHeader from '../../components/dashboard/PetDetailHeader';

interface ReportEntryType {
  symptom: string;
  grade: number;
  notes?: string;
}

const PetDetailNew: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useAuth();
  
  const [pet, setPet] = useState<Pet | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loadingPet, setLoadingPet] = useState(true);
  const [loadingReports, setLoadingReports] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPet = async () => {
      if (!petId) return;
      setLoadingPet(true);
      setError(null);
      try {
        const response = await api.get(`/api/pets/${petId}`);
        if (response.data?.status === 'success') {
          setPet(response.data.data.pet);
        } else {
          throw new Error('Failed to fetch pet details');
        }
      } catch (err: any) {
        console.error('Error fetching pet:', err);
        setError(err?.response?.data?.message || err.message || 'Could not load pet information.');
      } finally {
        setLoadingPet(false);
      }
    };

    const fetchReports = async () => {
      if (!petId) return;
      setLoadingReports(true);
      try {
        const response = await api.get(`/api/pets/${petId}/reports`);
        if (response.data?.status === 'success') {
          setReports(response.data.data.reports);
        } else {
          throw new Error('Failed to fetch reports');
        }
      } catch (err: any) {
        console.error('Error fetching reports:', err);
        // We don't set error here because it's not critical
      } finally {
        setLoadingReports(false);
      }
    };

    fetchPet();
    fetchReports();
  }, [petId]);

  // Handlers
  const handleSubmitReport = () => {
    navigate(`/pet-parent/pets/${petId}/report/new`);
  };

  const handleLinkToVet = () => {
    navigate(`/pet-parent/find-vets?petId=${petId}`);
  };

  const handleBackToDashboard = () => {
    navigate('/pet-parent/dashboard');
  };

  // Format date helper
  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

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

  if (loadingPet) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            py: 10,
            flexDirection: 'column'
          }}
        >
          <CircularProgress size={60} thickness={4} sx={{ mb: 3, color: theme.palette.primary.main }} />
          <Typography variant="body1" color="text.secondary">
            Loading pet information...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error || !pet) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <IconButton 
            onClick={handleBackToDashboard} 
            color="primary"
            sx={{ mr: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }}
          >
            <ArrowBackRounded />
          </IconButton>
          <Typography variant="h5" fontWeight={600}>
            Pet Details
          </Typography>
        </Box>
        <Alert 
          severity="error" 
          sx={{ 
            borderRadius: 2, 
            py: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          {error || 'Pet not found'}
        </Alert>
      </Container>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <IconButton 
            onClick={handleBackToDashboard} 
            color="primary"
            size="small"
            sx={{ 
              mr: 2, 
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.2)
              }
            }}
          >
            <ArrowBackRounded fontSize="small" />
          </IconButton>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline', cursor: 'pointer' }
            }}
            onClick={handleBackToDashboard}
          >
            Back to Dashboard
          </Typography>
        </Box>

        {/* Pet Header Section */}
        <motion.div variants={sectionVariants}>
          <Box sx={{ mb: 5 }}>
            <PetDetailHeader 
              pet={pet} 
              onSubmitReport={handleSubmitReport} 
              onLinkToVet={handleLinkToVet} 
            />
          </Box>
        </motion.div>

        {/* Report History Section */}
        <motion.div variants={sectionVariants}>
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3, 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ChartBarRounded sx={{ mr: 1, color: theme.palette.primary.main }} />
              Health Report History
            </Typography>

            {loadingReports && (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <CircularProgress size={40} thickness={4} sx={{ color: theme.palette.primary.light }} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Loading report history...
                </Typography>
              </Box>
            )}

            {!loadingReports && reports.length === 0 && (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: 'center',
                  border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                  bgcolor: alpha(theme.palette.primary.light, 0.05)
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.light, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <InfoOutlined sx={{ fontSize: 32, color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.primary }}>
                  No Reports Yet
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary, maxWidth: 500, mx: 'auto' }}>
                  Start tracking {pet.name}'s symptoms and treatment progress by submitting your first report.
                </Typography>
                <motion.div
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box 
                    component="a" 
                    onClick={handleSubmitReport}
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
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark,
                        boxShadow: `0 6px 20px ${theme.palette.primary.main}60`,
                      }
                    }}
                  >
                    Submit First Report
                  </Box>
                </motion.div>
              </Paper>
            )}

            {!loadingReports && reports.length > 0 && (
              <Box>
                {/* Future enhancement: Visualize symptom trends here */}
                {/* <Box sx={{ height: 300, mb: 4 }}>
                  <ReportHistoryChart reports={reports} />
                </Box> */}
                
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                    Recent Reports:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {reports.slice(0, 10).map((report, index) => (
                      <motion.div
                        key={report._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { 
                            delay: index * 0.05, 
                            duration: 0.4 
                          }
                        }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                              Report from {formatDate(report.reportDate)}
                            </Typography>
                            <Tooltip title="Overall wellbeing score">
                              <Box
                                sx={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  bgcolor: getWellbeingColor(report.overallWellbeing || 3),
                                  color: '#fff',
                                  fontWeight: 'bold',
                                  fontSize: '0.8rem'
                                }}
                              >
                                {report.overallWellbeing || 3}
                              </Box>
                            </Tooltip>
                          </Box>
                          <Divider sx={{ mb: 2 }} />
                          
                          {report.entries && report.entries.length > 0 ? (
                            <Box>
                              <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                                Symptoms:
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                {report.entries
                                  .filter((entry: ReportEntryType) => entry.grade > 0)
                                  .map((entry: ReportEntryType, i: number) => (
                                    <Chip
                                      key={`${entry.symptom}-${i}`}
                                      label={`${entry.symptom}: Grade ${entry.grade}`}
                                      size="small"
                                      sx={{
                                        bgcolor: getGradeColor(entry.grade),
                                        color: '#fff',
                                        fontWeight: 500
                                      }}
                                    />
                                  ))}
                                {report.entries.filter((entry: ReportEntryType) => entry.grade > 0).length === 0 && (
                                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                    No significant symptoms reported.
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          ) : (
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2 }}>
                              No symptom details recorded.
                            </Typography>
                          )}
                          
                          {report.ownerNotes && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="body2" fontWeight={500}>
                                Notes:
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {report.ownerNotes}
                              </Typography>
                            </Box>
                          )}
                        </Paper>
                      </motion.div>
                    ))}
                  </Box>
                  
                  {reports.length > 10 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                      Showing the 10 most recent reports.
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </motion.div>
      </Container>
    </motion.div>
  );
};

// Helper function to get color based on wellbeing score
const getWellbeingColor = (score: number) => {
  switch (score) {
    case 1: return '#e53935'; // Red
    case 2: return '#f57c00'; // Orange
    case 3: return '#7cb342'; // Light green
    case 4: return '#43a047'; // Green
    case 5: return '#2e7d32'; // Dark green
    default: return '#7cb342'; // Default to light green
  }
};

// Helper function to get color based on symptom grade
const getGradeColor = (grade: number) => {
  switch (grade) {
    case 1: return '#4fc3f7'; // Light blue
    case 2: return '#ffa726'; // Orange
    case 3: return '#ef5350'; // Light red
    case 4: return '#d32f2f'; // Dark red
    default: return '#78909c'; // Gray
  }
};

export default PetDetailNew; 