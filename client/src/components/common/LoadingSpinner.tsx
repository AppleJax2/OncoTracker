import React from 'react';
import { CircularProgress, Box } from '@mui/material';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'primary', 
  className = '' 
}) => {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 56,
  };

  return (
    <Box className={className} display="flex" justifyContent="center" alignItems="center" role="status" aria-live="polite">
      <CircularProgress 
        size={sizeMap[size]} 
        color={color} 
        thickness={4}
      />
      <span style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: '0' }}>
        Loading...
      </span>
    </Box>
  );
};

export default LoadingSpinner; 