import { createTheme } from '@mui/material/styles';

// Create a theme instance suitable for medical/veterinary applications
const theme = createTheme({
  palette: {
    primary: {
      main: '#059669', // Rich emerald green - professional and fresh
      light: '#10b981',
      dark: '#047857',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0d9488', // Teal - common in medical interfaces
      light: '#14b8a6',
      dark: '#0f766e',
      contrastText: '#ffffff',
    },
    error: {
      main: '#dc2626', // Red for critical alerts/errors
      light: '#ef4444',
      dark: '#b91c1c',
    },
    warning: {
      main: '#ea580c', // Orange for warnings
      light: '#f97316',
      dark: '#c2410c',
    },
    info: {
      main: '#0ea5e9', // Light blue for informational elements
      light: '#38bdf8',
      dark: '#0284c7',
    },
    success: {
      main: '#16a34a', // Green for success states
      light: '#22c55e',
      dark: '#15803d',
    },
    background: {
      default: '#f9fafb', // Light gray background - easy on the eyes for long sessions
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#4b5563',
      disabled: '#9ca3af',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    button: {
      textTransform: 'none', // Buttons with normal case text (not all uppercase)
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#047857',
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#0f766e',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          borderRadius: '0.5rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: '0.5rem',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme; 