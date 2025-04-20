import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string; // e.g., 'text-sky-600'
  className?: string; // Allow additional classes
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'text-sky-600', 
  className = '' 
}) => {
  const sizeClasses = {
    small: 'h-5 w-5',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  return (
    <div
      className={`animate-spin rounded-full border-t-2 border-b-2 border-transparent ${sizeClasses[size]} ${color} ${className}`}
      style={{ borderTopColor: 'currentColor', borderBottomColor: 'currentColor' }} // Use currentColor for spinner segments
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner; 