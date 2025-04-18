import { createContext, useState, useEffect, ReactNode } from 'react';
import { isOnline, setupNetworkListeners, checkConnectionQuality } from '../utils/network';
import { syncOfflineSubmissions } from '../services/submissions';

interface NetworkContextType {
  online: boolean;
  connectionQuality: 'good' | 'poor' | 'offline';
  syncingOfflineData: boolean;
  offlineSubmissionsCount: number;
  updateOfflineSubmissionsCount: () => void;
  syncNow: () => Promise<void>;
}

export const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const [online, setOnline] = useState<boolean>(isOnline());
  const [connectionQuality, setConnectionQuality] = useState<'good' | 'poor' | 'offline'>(
    isOnline() ? 'good' : 'offline'
  );
  const [syncingOfflineData, setSyncingOfflineData] = useState<boolean>(false);
  const [offlineSubmissionsCount, setOfflineSubmissionsCount] = useState<number>(0);

  // Initialize with actual counts
  useEffect(() => {
    updateOfflineSubmissionsCount();
  }, []);

  // Set up network listeners
  useEffect(() => {
    const cleanup = setupNetworkListeners(
      // On online
      async () => {
        setOnline(true);
        const quality = await checkConnectionQuality();
        setConnectionQuality(quality);
        
        // Auto-sync when coming back online
        if (offlineSubmissionsCount > 0) {
          syncNow();
        }
      },
      // On offline
      () => {
        setOnline(false);
        setConnectionQuality('offline');
      }
    );

    // Check connection quality periodically
    const intervalId = setInterval(async () => {
      if (isOnline()) {
        const quality = await checkConnectionQuality();
        setConnectionQuality(quality);
      }
    }, 30000); // Check every 30 seconds

    return () => {
      cleanup();
      clearInterval(intervalId);
    };
  }, [offlineSubmissionsCount]);

  const updateOfflineSubmissionsCount = () => {
    const offlineSubmissions = localStorage.getItem('offlineSubmissions');
    setOfflineSubmissionsCount(
      offlineSubmissions ? JSON.parse(offlineSubmissions).length : 0
    );
  };

  const syncNow = async () => {
    if (!online || syncingOfflineData || offlineSubmissionsCount === 0) {
      return;
    }

    try {
      setSyncingOfflineData(true);
      await syncOfflineSubmissions();
      updateOfflineSubmissionsCount();
    } catch (error) {
      console.error('Failed to sync offline data:', error);
    } finally {
      setSyncingOfflineData(false);
    }
  };

  return (
    <NetworkContext.Provider
      value={{
        online,
        connectionQuality,
        syncingOfflineData,
        offlineSubmissionsCount,
        updateOfflineSubmissionsCount,
        syncNow
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}; 