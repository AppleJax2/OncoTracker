import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  Button
} from '@mui/material';
import {
  Home as HomeIcon,
  AddCircle as PlusCircleIcon,
  Group as UserGroupIcon,
  Settings as SettingsIcon,
  AssignmentTurnedIn as ClipboardIcon,
  Favorite as HeartIcon,
  Person as UserIcon
} from '@mui/icons-material';

interface SidebarProps {
  closeSidebar?: () => void;
}

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Define navigation based on user role
  const ownerNavigation = [
    { name: 'Dashboard', href: '/owner/dashboard', icon: HomeIcon },
    { name: 'Add New Pet', href: '/owner/pets/new', icon: PlusCircleIcon },
    { name: 'Find Veterinarian', href: '/owner/find-vets', icon: UserGroupIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];
  
  const vetNavigation = [
    { name: 'Dashboard', href: '/vet/dashboard', icon: HomeIcon },
    { name: 'Link Requests', href: '/vet/link-requests', icon: UserGroupIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];
  
  const navigation = user?.role === 'vet' ? vetNavigation : ownerNavigation;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', pt: 2, pb: 2, overflow: 'auto' }}>
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, mb: 3 }}>
        <Box sx={{ bgcolor: 'rgba(5, 150, 105, 0.1)', p: 1, borderRadius: 1 }}>
          <HeartIcon sx={{ color: 'primary.main', fontSize: 32 }} />
        </Box>
        <Typography variant="h6" sx={{ ml: 1.5, fontWeight: 700 }}>
          <span style={{ color: '#059669' }}>Onco</span>Tracker
        </Typography>
      </Box>
      
      {/* User info at top for mobile view */}
      {user && (
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', px: 2, mb: 3 }}>
          <Avatar sx={{ bgcolor: 'rgba(5, 150, 105, 0.1)', color: 'primary.dark', width: 40, height: 40 }}>
            {user.firstName ? user.firstName.charAt(0) : 'U'}
          </Avatar>
          <Box sx={{ ml: 1.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
              {user.firstName || 'User'} {user.lastName || ''}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {user.role || 'Unknown'}
            </Typography>
          </Box>
        </Box>
      )}
      
      {/* Navigation */}
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ px: 2, mb: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Main
          </Typography>
        </Box>
        
        <List sx={{ px: 1 }} component="nav">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={NavLink}
                  to={item.href}
                  onClick={closeSidebar}
                  sx={{
                    borderRadius: 1.5,
                    py: 1,
                    bgcolor: isActive ? 'rgba(5, 150, 105, 0.1)' : 'transparent',
                    color: isActive ? 'primary.main' : 'text.primary',
                    '&:hover': {
                      bgcolor: 'rgba(5, 150, 105, 0.05)',
                      color: 'primary.main',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: isActive ? 'primary.main' : 'text.secondary',
                    minWidth: 36
                  }}>
                    <item.icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.name} 
                    primaryTypographyProps={{ 
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        
        {user?.role === 'owner' && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ px: 2, mb: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Resources
              </Typography>
            </Box>
            <List sx={{ px: 1 }}>
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/resources"
                  onClick={closeSidebar}
                  sx={{
                    borderRadius: 1.5,
                    py: 1,
                    bgcolor: location.pathname === '/resources' ? 'rgba(5, 150, 105, 0.1)' : 'transparent',
                    color: location.pathname === '/resources' ? 'primary.main' : 'text.primary',
                    '&:hover': {
                      bgcolor: 'rgba(5, 150, 105, 0.05)',
                      color: 'primary.main',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: location.pathname === '/resources' ? 'primary.main' : 'text.secondary',
                    minWidth: 36
                  }}>
                    <ClipboardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Cancer Resources" 
                    primaryTypographyProps={{ 
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}
      </Box>
      
      {/* User info at bottom for desktop view */}
      {user && (
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          flexDirection: 'column',
          borderTop: 1, 
          borderColor: 'divider',
          pt: 2,
          px: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'rgba(5, 150, 105, 0.1)', color: 'primary.dark', width: 36, height: 36 }}>
              <UserIcon fontSize="small" />
            </Avatar>
            <Box sx={{ ml: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                {user.firstName || 'User'} {user.lastName || ''}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {user.role || 'Unknown'}
              </Typography>
            </Box>
          </Box>
          <Button 
            onClick={() => {/* Handle profile */}}
            sx={{ 
              mt: 1, 
              justifyContent: 'flex-start', 
              color: 'primary.main',
              fontSize: '0.75rem',
              fontWeight: 500,
              '&:hover': { bgcolor: 'transparent', color: 'primary.dark' }
            }}
          >
            View Profile
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar; 