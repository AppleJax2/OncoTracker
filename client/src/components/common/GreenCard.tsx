import React, { ReactNode } from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

interface GreenCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  variant?: 'default' | 'outlined' | 'gradient' | 'dots';
  className?: string;
}

const GreenCard: React.FC<GreenCardProps> = ({
  title,
  subtitle,
  children,
  icon,
  action,
  variant = 'default',
  className = '',
}) => {
  const getCardStyle = () => {
    const baseStyle = {
      position: 'relative',
      overflow: 'visible',
      height: '100%',
    };

    switch (variant) {
      case 'outlined':
        return {
          ...baseStyle,
          border: '1px solid',
          borderColor: 'rgba(5, 150, 105, 0.2)',
          boxShadow: 'none',
        };
      case 'gradient':
        return {
          ...baseStyle,
          background: 'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(5, 150, 105, 0.05) 100%)',
          border: '1px solid',
          borderColor: 'rgba(5, 150, 105, 0.1)',
        };
      case 'dots':
        return {
          ...baseStyle,
          border: '1px dashed',
          borderColor: 'rgba(5, 150, 105, 0.3)',
          backgroundColor: 'rgba(5, 150, 105, 0.02)',
        };
      default:
        return {
          ...baseStyle,
          border: 'none',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        };
    }
  };

  return (
    <Card 
      sx={{ 
        ...getCardStyle(),
        '&:before': variant === 'gradient' ? {
          content: '""',
          position: 'absolute',
          top: '-5px',
          left: '-5px',
          height: '10px',
          width: '10px',
          backgroundColor: '#059669',
          borderRadius: '50%',
          zIndex: 1,
        } : {},
      }}
      className={className}
    >
      {variant === 'dots' && (
        <Box sx={{
          position: 'absolute',
          top: -3,
          right: -3,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#059669',
        }} />
      )}
      
      {title && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            pb: subtitle ? 0 : 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {icon && (
              <Box sx={{ color: '#059669' }}>
                {icon}
              </Box>
            )}
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
              {title}
            </Typography>
          </Box>
          
          {action || (
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      )}
      
      {subtitle && (
        <Box sx={{ px: 2, mt: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
      )}
      
      <CardContent sx={{ pt: title ? 2 : 3 }}>
        {children}
      </CardContent>
    </Card>
  );
};

export default GreenCard; 