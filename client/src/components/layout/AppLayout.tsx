import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography,
  useTheme,
  useMediaQuery,
  styled,
  Container
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import NotificationBanner from '../common/NotificationBanner';

const drawerWidth = 240;

const Main = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
}));

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {isAuthenticated ? (
        <>
          {/* Mobile/tablet header */}
          {isMobile && (
            <AppBar
              position="fixed"
              sx={{
                width: '100%',
                boxShadow: 1,
                zIndex: theme.zIndex.drawer + 1,
                bgcolor: 'background.paper',
                color: 'text.primary'
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img style={{ height: 32, width: 'auto' }} src="/logo.svg" alt="OncoTracker" />
                  <Typography variant="h6" component="div" sx={{ ml: 1, fontWeight: 700, color: 'primary.main' }}>
                    OncoTracker
                  </Typography>
                </Box>
              </Toolbar>
            </AppBar>
          )}

          {/* Sidebar for mobile (drawer) and desktop (permanent) */}
          <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? sidebarOpen : true}
            onClose={isMobile ? handleDrawerToggle : undefined}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { 
                width: drawerWidth, 
                boxSizing: 'border-box',
                boxShadow: isMobile ? 3 : 1,
                bgcolor: 'background.paper'
              },
            }}
          >
            {isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 1 }}>
                <IconButton onClick={handleDrawerToggle}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
            <Sidebar closeSidebar={isMobile ? handleDrawerToggle : undefined} />
          </Drawer>

          {/* Main content */}
          <Main sx={{ 
            mt: isMobile ? 8 : 0, // Add top margin for mobile to account for AppBar
            ml: isMobile ? 0 : `${drawerWidth}px`, // Add left margin for desktop to account for drawer
            width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
            bgcolor: 'background.default',
            flexGrow: 1,
            p: 3
          }}>
            {/* Welcome Banner */}
            <NotificationBanner 
              message="Welcome to the newly redesigned OncoTracker with a refreshed green theme!"
              variant="success"
              action={{
                label: "Learn More",
                onClick: () => console.log("Learn more clicked")
              }}
            />
            
            <Outlet />
          </Main>
        </>
      ) : (
        // Non-authenticated layout
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
          <Header />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              maxWidth: 'lg', 
              mx: 'auto', 
              width: '100%', 
              px: 2, 
              py: 4 
            }}
          >
            {/* Welcome Banner for non-authenticated layout */}
            <Container maxWidth="lg" sx={{ mb: 3 }}>
              <NotificationBanner 
                message="Welcome to the newly redesigned OncoTracker with a refreshed green theme!"
                variant="success"
                action={{
                  label: "Learn More",
                  onClick: () => console.log("Learn more clicked")
                }}
              />
            </Container>
            
            <Outlet />
          </Box>
          <Footer />
        </Box>
      )}
    </Box>
  );
};

export default AppLayout; 