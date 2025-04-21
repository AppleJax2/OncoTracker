import React, { useState } from 'react';
import { Box, Button, Typography, IconButton, Paper } from '@mui/material';
import { Info as InfoIcon, Close as CloseIcon } from '@mui/icons-material';

interface NotificationBannerProps {
  message: string;
  variant?: 'info' | 'success' | 'warning';
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  message,
  variant = 'info',
  action,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const getBgColor = () => {
    switch (variant) {
      case 'success':
        return 'rgba(5, 150, 105, 0.1)';
      case 'warning':
        return 'rgba(234, 88, 12, 0.1)';
      default:
        return 'rgba(5, 150, 105, 0.05)';
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'success':
        return 'rgba(5, 150, 105, 0.2)';
      case 'warning':
        return 'rgba(234, 88, 12, 0.2)';
      default:
        return 'rgba(5, 150, 105, 0.1)';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'success':
        return '#059669';
      case 'warning':
        return '#ea580c';
      default:
        return '#059669';
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: getBgColor(),
        borderRadius: 1,
        border: '1px solid',
        borderColor: getBorderColor(),
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        mb: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <InfoIcon sx={{ color: getIconColor() }} />
        <Typography variant="body2">{message}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {action && (
          <Button
            size="small"
            variant="outlined"
            onClick={action.onClick}
            sx={{ 
              borderColor: getIconColor(),
              color: getIconColor(),
              '&:hover': {
                borderColor: getIconColor(),
                bgcolor: 'rgba(5, 150, 105, 0.05)',
              }
            }}
          >
            {action.label}
          </Button>
        )}
        <IconButton 
          size="small" 
          onClick={handleClose}
          sx={{ 
            color: 'text.secondary',
            '&:hover': { 
              bgcolor: 'rgba(5, 150, 105, 0.1)',
              color: getIconColor() 
            }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default NotificationBanner; 