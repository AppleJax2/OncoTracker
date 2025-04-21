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
    fontFamily: '"Nunito Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif', // Prioritize Nunito Sans
    h1: {
      fontSize: '2.2rem', // Slightly larger H1 for impact
      fontWeight: 700,
      lineHeight: 1.2,
      color: darkText, // Ensure headings use primary text color
    },
    h2: {
      fontSize: '1.8rem', // Adjust heading sizes for hierarchy
      fontWeight: 700,
      lineHeight: 1.3,
      color: darkText,
    },
    h3: {
      fontSize: '1.4rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: darkText,
    },
    h4: {
      fontSize: '1.1rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: darkText,
    },
    h5: {
      fontSize: '1rem', // Adjust smaller headings too
      fontWeight: 600,
      lineHeight: 1.5,
      color: darkText,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.6,
      color: darkText,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6, // Slightly more line height for readability
      color: mediumText, // Default body text uses secondary color for softness
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: mediumText,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600, // Slightly bolder buttons
      letterSpacing: '0.5px', // Add subtle letter spacing
    },
  },
  shape: {
    borderRadius: 12, // Increase border radius for softer corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Start with no shadow
          padding: '10px 24px', // Increase padding slightly
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease', // Smooth transitions
          '&:hover': {
            boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.1)', // Softer hover shadow
          },
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
          // '&:hover': { // Optional: subtle lift on hover
          //   transform: 'translateY(-3px)',
          //   boxShadow: '0 5px 15px 0 rgba(0, 0, 0, 0.12)',
          // },
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
          color: softTeal,
          textDecorationColor: 'rgba(101, 168, 166, 0.4)', // Lighter underline
           '&:hover': {
            textDecorationColor: softTeal, // Stronger underline on hover
           },
        },
      },
    },
  },
});

export default theme; 