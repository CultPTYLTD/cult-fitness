import { useState, useEffect, useCallback } from "react";
import {
  isNativeApp,
  isHealthKitAvailable,
  requestHealthKitAuthorization,
  syncHealthKitSteps,
} from "@/services/healthKit";

interface UseHealthKitReturn {
  isAvailable: boolean;
  isAuthorized: boolean;
  isLoading: boolean;
  lastSyncedSteps: number | null;
  requestAuthorization: () => Promise<boolean>;
  syncSteps: () => Promise<void>;
}

export const useHealthKit = (): UseHealthKitReturn => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSyncedSteps, setLastSyncedSteps] = useState<number | null>(null);

  useEffect(() => {
    const checkAvailability = async () => {
      if (!isNativeApp()) {
        setIsLoading(false);
        return;
      }

      const available = await isHealthKitAvailable();
      setIsAvailable(available);
      setIsLoading(false);
    };

    checkAvailability();
  }, []);

  const requestAuthorization = useCallback(async (): Promise<boolean> => {
    const authorized = await requestHealthKitAuthorization();
    setIsAuthorized(authorized);
    return authorized;
  }, []);

  const syncSteps = useCallback(async () => {
    setIsLoading(true);
    const result = await syncHealthKitSteps();
    if (result.success && result.steps !== undefined) {
      setLastSyncedSteps(result.steps);
    }
    setIsLoading(false);
  }, []);

  return {
    isAvailable,
    isAuthorized,
    isLoading,
    lastSyncedSteps,
    requestAuthorization,
    syncSteps,
  };
};
