import React, { useState, useEffect } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import { Download } from '@mui/icons-material';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>;
  prompt(): Promise<void>;
}

const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Update UI notify the user they can install the PWA
      setShowInstallButton(true);
      console.log('`beforeinstallprompt` event fired.');
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setShowInstallButton(false);
      console.log('App is already installed (standalone mode).');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      setSnackbarMessage('Installation prompt not available.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, discard it
    setDeferredPrompt(null);
    setShowInstallButton(false);

    if (outcome === 'accepted') {
      setSnackbarMessage('App installed successfully!');
      setSnackbarSeverity('success');
    } else {
      setSnackbarMessage('App installation dismissed.');
      setSnackbarSeverity('info');
    }
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (!showInstallButton) {
    return null; // Don't render anything if install isn't available or app is installed
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Download />}
        onClick={handleInstallClick}
        sx={{
          position: 'fixed',
          bottom: { xs: 80, sm: 20 }, // Adjust position based on screen size, avoid overlap with potential bottom nav on mobile
          right: 20,
          zIndex: 1300, // Ensure it's above other elements like AppBars
          boxShadow: 3,
        }}
      >
        Install App
      </Button>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PWAInstallButton; 