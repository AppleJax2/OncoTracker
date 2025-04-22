import React from 'react';
import { motion } from 'framer-motion';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Button, 
  Link, 
  useTheme, 
  alpha,
  Chip
} from '@mui/material';
import { 
  ArrowForward as ArrowForwardIcon,
  LocalHospital as LocalHospitalIcon,
  Pets as PetsIcon,
  MenuBook as MenuBookIcon,
  SupportAgent as SupportAgentIcon,
  Science as ScienceIcon,
  School as SchoolIcon
} from '@mui/icons-material';

const ResourcesPage: React.FC = () => {
  const theme = useTheme();

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
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };

  // Resource categories
  const resourceCategories = [
    {
      title: "Educational Resources",
      description: "Learn more about pet cancer, treatments, and care options.",
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main
    },
    {
      title: "Support Networks",
      description: "Connect with other pet parents for emotional support and advice.",
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.secondary.main
    },
    {
      title: "Veterinary Oncology Information",
      description: "Find specialized information about veterinary cancer treatments.",
      icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.error.main
    },
    {
      title: "Research & Clinical Trials",
      description: "Discover the latest advancements in animal cancer research.",
      icon: <ScienceIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.info.main
    }
  ];

  // Featured resources
  const featuredResources = [
    {
      title: "American College of Veterinary Internal Medicine (ACVIM)",
      description: "Official organization for board-certified veterinary specialists in oncology.",
      link: "https://www.acvim.org/",
      image: "/assets/images/resources/acvim.jpg",
      tags: ["professional", "oncology"]
    },
    {
      title: "Animal Cancer Foundation",
      description: "Nonprofit organization funding research in comparative oncology.",
      link: "https://acfoundation.org/",
      image: "/assets/images/resources/acf.jpg",
      tags: ["nonprofit", "research"]
    },
    {
      title: "Veterinary Cancer Society",
      description: "Professional organization dedicated to veterinary oncology education and research.",
      link: "https://vetcancersociety.org/",
      image: "/assets/images/resources/vcs.jpg",
      tags: ["professional", "education"]
    },
    {
      title: "Flint Animal Cancer Center",
      description: "Leading veterinary cancer center at Colorado State University.",
      link: "https://www.csuanimalcancercenter.org/",
      image: "/assets/images/resources/flint.jpg",
      tags: ["academic", "treatment"]
    },
    {
      title: "Tripawds",
      description: "Support community for pet parents of three-legged pets, many affected by cancer.",
      link: "https://tripawds.org/",
      image: "/assets/images/resources/tripawds.jpg",
      tags: ["community", "support"]
    },
    {
      title: "Pet Cancer Support",
      description: "Online community and resources for pet parents navigating cancer diagnosis.",
      link: "https://petcancersupport.org/",
      image: "/assets/images/resources/pcs.jpg",
      tags: ["community", "support"]
    }
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 2
            }}
          >
            Cancer Resources for Pet Parents
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 800, 
              mx: 'auto', 
              lineHeight: 1.6,
              fontWeight: 400
            }}
          >
            Browse our collection of trusted resources to help you navigate your pet's cancer journey. 
            From educational materials to support communities, we've gathered everything you need in one place.
          </Typography>
        </Box>

        {/* Resource Categories */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 3
          }}>
            {resourceCategories.map((category, index) => (
              <Box 
                key={index} 
                sx={{ 
                  flex: { 
                    xs: '1 1 100%', 
                    sm: '1 1 calc(50% - 12px)', 
                    md: '1 1 calc(25% - 18px)' 
                  }
                }}
              >
                <motion.div
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      borderRadius: 3,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      overflow: 'hidden',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        backgroundColor: category.color
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'center', 
                          mb: 2,
                          color: category.color,
                          backgroundColor: alpha(category.color, 0.1),
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          alignItems: 'center',
                          mx: 'auto'
                        }}
                      >
                        {category.icon}
                      </Box>
                      <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 600 }}>
                        {category.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align="center">
                        {category.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Featured Resources */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 4, 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              '&::before': {
                content: '""',
                display: 'block',
                width: 4,
                height: 24,
                bgcolor: theme.palette.primary.main,
                mr: 2,
                borderRadius: 1
              }
            }}
          >
            Featured Resources
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 3
          }}>
            {featuredResources.map((resource, index) => (
              <Box 
                key={index} 
                sx={{ 
                  flex: { 
                    xs: '1 1 100%', 
                    sm: '1 1 calc(50% - 12px)', 
                    md: '1 1 calc(33.333% - 16px)' 
                  }
                }}
              >
                <motion.div
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Box 
                      sx={{
                        height: 140,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <PetsIcon sx={{ fontSize: 60, color: alpha(theme.palette.primary.main, 0.5) }} />
                    </Box>
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      <Box sx={{ mb: 1 }}>
                        {resource.tags.map((tag, i) => (
                          <Chip 
                            key={i}
                            label={tag}
                            size="small"
                            sx={{ 
                              mr: 0.5, 
                              mb: 0.5,
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                              fontWeight: 500,
                              fontSize: '0.7rem'
                            }}
                          />
                        ))}
                      </Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                        {resource.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {resource.description}
                      </Typography>
                      <Box sx={{ mt: 'auto' }}>
                        <Button 
                          component="a"
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          endIcon={<ArrowForwardIcon />}
                          sx={{ 
                            textTransform: 'none',
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                            p: 0,
                            '&:hover': {
                              backgroundColor: 'transparent',
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          Visit Resource
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Additional Resources */}
        <Box sx={{ mt: 8, p: 4, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            <MenuBookIcon sx={{ mr: 1, verticalAlign: 'middle', color: theme.palette.primary.main }} />
            Additional Reading
          </Typography>
          <Typography variant="body1" paragraph>
            We've compiled a list of books, articles, and academic resources that may be helpful in understanding your pet's cancer diagnosis and treatment options.
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" sx={{ mb: 1 }}>
              <Link href="#" underline="hover" color="primary.main" fontWeight={500}>Pets Living with Cancer: A Pet Owner's Resource</Link> by Robin Downing
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              <Link href="#" underline="hover" color="primary.main" fontWeight={500}>The Dog Cancer Survival Guide</Link> by Demian Dressler and Susan Ettinger
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              <Link href="#" underline="hover" color="primary.main" fontWeight={500}>Help Your Dog Fight Cancer</Link> by Laurie Kaplan
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              <Link href="#" underline="hover" color="primary.main" fontWeight={500}>Cancer and Your Pet: The Complete Guide to the Latest Research, Treatments, and Options</Link> by Debra Eldredge and Margaret Bonham
            </Typography>
          </Box>
        </Box>
      </Container>
    </motion.div>
  );
};

export default ResourcesPage; 