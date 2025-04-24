import { createTheme } from '@mui/material/styles';

// Define a softer, warmer color palette
const softTeal = '#65a8a6';
const lightTeal = '#84bdbb'; // Lighter shade for hover/light variants
const darkTeal = '#4a8a88';  // Darker shade for active/dark variants

const warmBeige = '#f5f0e8'; // Warm background
const softGold = '#b08d57';  // Secondary/Accent
const lightGold = '#c8a97a';
const darkGold = '#98713a';

const softGray = '#f8f8f8'; // Alternative background/paper if needed, slightly cooler than beige
const darkText = '#3a3a3a';  // Primary text, softer than black
const mediumText = '#6b6b6b'; // Secondary text

// Create a theme instance suitable for medical/veterinary applications
const theme = createTheme({
  palette: {
    primary: {
      main: softTeal,
      light: lightTeal,
      dark: darkTeal,
      contrastText: '#ffffff',
    },
    secondary: {
      main: softGold,
      light: lightGold,
      dark: darkGold,
      contrastText: '#ffffff',
    },
    error: { // Keep standard error/warning colors for clarity
      main: '#dc2626',
      light: '#ef4444',
      dark: '#b91c1c',
    },
    warning: {
      main: '#ea580c',
      light: '#f97316',
      dark: '#c2410c',
    },
    info: {
      main: '#0ea5e9', // Keep standard info blue
      light: '#38bdf8',
      dark: '#0284c7',
    },
    success: { // Keep standard success green
      main: '#16a34a',
      light: '#22c55e',
      dark: '#15803d',
    },
    background: {
      default: warmBeige, // Use warm beige for the main background
      paper: '#ffffff',   // Keep paper white for contrast on cards/dialogs
    },
    text: {
      primary: darkText,
      secondary: mediumText,
      disabled: '#b0b0b0', // Slightly lighter disabled text
    },
  },
  typography: {
    // Implement Roboto as the primary font with consistent weights
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: darkText,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
      color: darkText,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: darkText,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: darkText,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: darkText,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 600,
      lineHeight: 1.6,
      color: darkText,
    },
    body1: {
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.6,
      color: mediumText,
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
      color: mediumText,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.5px',
      fontSize: '1.125rem',
    },
    subtitle1: {
      fontWeight: 500,
      lineHeight: 1.6,
      fontSize: '1.125rem',
    },
    subtitle2: {
      fontWeight: 500,
      lineHeight: 1.6,
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 12, // Maintain border radius for softer corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Start with no shadow
          padding: '12px 28px', // Increased padding for better touch targets
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease', // Smooth transitions
          '&:hover': {
            boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.1)', // Softer hover shadow
          },
          fontSize: '1.125rem', // Ensure consistent button text size
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: darkTeal, // Use the dark shade for hover
            boxShadow: '0 3px 7px 0 rgba(0, 0, 0, 0.15)', // Slightly deeper shadow on hover
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: darkGold,
             boxShadow: '0 3px 7px 0 rgba(0, 0, 0, 0.15)',
          },
        },
        outlinedPrimary: {
          borderColor: softTeal, // Ensure outline matches primary
           '&:hover': {
             backgroundColor: 'rgba(101, 168, 166, 0.08)', // Very subtle background tint on hover
             borderColor: darkTeal,
           },
        },
         outlinedSecondary: {
          borderColor: softGold,
           '&:hover': {
             backgroundColor: 'rgba(176, 141, 87, 0.08)',
             borderColor: darkGold,
           },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.08)', // Default softer shadow for cards
          borderRadius: '12px', // Match global radius
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: '12px', // Match global radius
        },
        elevation1: { boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.06)'}, // Define specific elevation shadows if needed
        elevation2: { boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.08)'},
        elevation3: { boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.1)'},
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(0, 0, 0, 0.07)', // Lighter table cell border
          padding: '16px', // Increased padding for better readability
          fontSize: '1rem', // Ensure consistent font size
        },
        head: {
          fontWeight: 600, // Make headers more prominent
          fontSize: '1.1rem',
        },
      },
    },
    MuiAppBar: { // Style the AppBar if used for navigation
      styleOverrides: {
        root: {
           backgroundColor: warmBeige, // Match background
           boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)', // Very subtle shadow
           color: darkText, // Ensure text is readable
        },
      },
    },
    MuiLink: { // Style links to match the theme
      styleOverrides: {
        root: {
          color: darkTeal, // Darker for better contrast
          textDecorationColor: 'rgba(101, 168, 166, 0.4)', // Lighter underline
          fontSize: '1.125rem', // Consistent sizing
          fontWeight: 500, // Slightly bolder for better visibility
          '&:hover': {
            textDecorationColor: darkTeal, // Stronger underline on hover
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            transition: 'all 0.3s ease',
            fontSize: '1.125rem', // Consistent with body text
          },
          '& .MuiInputLabel-root': {
            fontSize: '1.125rem', // Match input text size
          },
          '& .MuiFormHelperText-root': {
            fontSize: '0.875rem', // Slightly smaller but still readable
            marginTop: '4px',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '1.125rem', // Consistent with body text
        },
        input: {
          padding: '14px', // Increased padding for better touch targets
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '48px', // Increased for better alignment with larger text
          display: 'flex',
          alignItems: 'center',
          '& .MuiSvgIcon-root': {
            fontSize: '1.5rem', // Larger icons for better visibility
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: '6px 0', // Slightly increased
        },
        primary: {
          fontSize: '1.125rem', // Match body1
        },
        secondary: {
          fontSize: '1rem', // Match body2
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '12px 16px', // Increased padding for better touch targets
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.875rem', // Ensure tooltip text is readable
          padding: '8px 12px', // More padding for better readability
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem', // Slightly larger for better readability
          height: '32px', // Taller for better touch targets
        },
        label: {
          padding: '0 12px', // More horizontal padding
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem', // Larger default icon size
        },
        fontSizeSmall: {
          fontSize: '1.25rem', // Increased small icon size
        },
        fontSizeLarge: {
          fontSize: '2rem', // Increased large icon size
        },
      },
    },
  },
});

export default theme; 