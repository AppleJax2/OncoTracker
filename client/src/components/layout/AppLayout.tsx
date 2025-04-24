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

const drawerWidth = 280;

const Main = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  width: '100%',
}));

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default', width: '100%' }}>
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

          {/* Desktop header for non-mobile */}
          {!isMobile && (
            <AppBar
              position="fixed"
              elevation={0}
              sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
                bgcolor: 'background.default',
                borderBottom: 1,
                borderColor: 'divider',
                color: 'text.primary',
                zIndex: theme.zIndex.drawer - 1,
              }}
            >
              <Toolbar sx={{ justifyContent: 'flex-end' }}>
                {/* Add desktop header elements if needed */}
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
          <Main 
            sx={{ 
              mt: isMobile ? 8 : 8, // Add top margin for AppBar on both mobile and desktop
              ml: isMobile ? 0 : `${drawerWidth}px`, // Add left margin for desktop to account for drawer
              width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
              bgcolor: 'background.default',
              flexGrow: 1,
              p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
              maxWidth: isLargeScreen ? 'calc(1600px - 280px)' : 'none', // Limit max width on large screens
              mx: isLargeScreen ? 'auto' : 0,
            }}
          >
            <Box 
              sx={{ 
                maxWidth: isMobile ? 'none' : isLargeScreen ? '100%' : '1200px',
                mx: 'auto', 
                width: '100%'
              }}
            >
              <Outlet />
            </Box>
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
              width: '100%',
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 3, md: 4 }
            }}
          >
            <Container 
              maxWidth="lg" 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                width: '100%'
              }}
            >
              <Outlet />
            </Container>
          </Box>
          <Footer />
        </Box>
      )}
    </Box>
  );
};

export default AppLayout; 