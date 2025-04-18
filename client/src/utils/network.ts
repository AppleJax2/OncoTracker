/**
 * Utility functions for handling online/offline status
 */

// Function to check if the user is online
export const isOnline = (): boolean => {
  return typeof navigator !== 'undefined' && navigator.onLine;
};

// Event listeners for online/offline events
export const setupNetworkListeners = (
  onOnline: () => void,
  onOffline: () => void
): () => void => {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);

  // Return a cleanup function
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
};

// Function to detect connection quality
export const checkConnectionQuality = async (): Promise<'good' | 'poor' | 'offline'> => {
  if (!isOnline()) {
    return 'offline';
  }

  try {
    const startTime = Date.now();
    await fetch('/api/health', { method: 'HEAD' });
    const endTime = Date.now();
    const latency = endTime - startTime;

    // Considering latency as a measure of connection quality
    if (latency < 500) {
      return 'good';
    } else {
      return 'poor';
    }
  } catch (error) {
    return 'offline';
  }
};

// Register for background sync if supported
export const registerBackgroundSync = async (): Promise<boolean> => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('sync-submissions');
      return true;
    } catch (error) {
      console.error('Background sync registration failed:', error);
      return false;
    }
  }
  return false;
};

// Get device info for submissions
export const getDeviceInfo = (): {
  browser: string;
  os: string;
  device: string;
} => {
  const userAgent = navigator.userAgent;
  let browser = 'Unknown';
  let os = 'Unknown';
  let device = 'Unknown';

  // Extract browser information
  if (userAgent.indexOf('Firefox') > -1) {
    browser = 'Firefox';
  } else if (userAgent.indexOf('Chrome') > -1) {
    browser = 'Chrome';
  } else if (userAgent.indexOf('Safari') > -1) {
    browser = 'Safari';
  } else if (userAgent.indexOf('Edge') > -1) {
    browser = 'Edge';
  } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
    browser = 'Internet Explorer';
  }

  // Extract OS information
  if (userAgent.indexOf('Windows') > -1) {
    os = 'Windows';
  } else if (userAgent.indexOf('Mac') > -1) {
    os = 'MacOS';
  } else if (userAgent.indexOf('Linux') > -1) {
    os = 'Linux';
  } else if (userAgent.indexOf('Android') > -1) {
    os = 'Android';
  } else if (userAgent.indexOf('iOS') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) {
    os = 'iOS';
  }

  // Extract device information
  if (userAgent.indexOf('Mobile') > -1) {
    device = 'Mobile';
  } else if (userAgent.indexOf('Tablet') > -1 || userAgent.indexOf('iPad') > -1) {
    device = 'Tablet';
  } else {
    device = 'Desktop';
  }

  return { browser, os, device };
};

// Get user's geolocation if available
export const getUserLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
}; 