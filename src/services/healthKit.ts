import { supabase } from "@/integrations/supabase/client";

// This interface matches what a HealthKit plugin would return
interface HealthKitStepsResult {
  value: number;
  startDate: string;
  endDate: string;
}

// Check if we're running in a native Capacitor environment
export const isNativeApp = (): boolean => {
  return typeof (window as any).Capacitor !== "undefined";
};

// Check if HealthKit is available (iOS only)
export const isHealthKitAvailable = async (): Promise<boolean> => {
  if (!isNativeApp()) return false;
  
  try {
    // This would check if the HealthKit plugin is installed
    const { Health } = (window as any).Capacitor.Plugins;
    if (!Health) return false;
    
    const result = await Health.isAvailable();
    return result.available;
  } catch {
    return false;
  }
};

// Request HealthKit authorization
export const requestHealthKitAuthorization = async (): Promise<boolean> => {
  if (!isNativeApp()) return false;
  
  try {
    const { Health } = (window as any).Capacitor.Plugins;
    if (!Health) return false;
    
    const result = await Health.requestAuthorization({
      read: ["steps"],
      write: [],
    });
    return result.authorized;
  } catch (error) {
    console.error("HealthKit authorization error:", error);
    return false;
  }
};

// Get today's steps from HealthKit
export const getHealthKitSteps = async (): Promise<number | null> => {
  if (!isNativeApp()) return null;
  
  try {
    const { Health } = (window as any).Capacitor.Plugins;
    if (!Health) return null;
    
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const result: HealthKitStepsResult = await Health.queryAggregated({
      dataType: "steps",
      startDate: startOfDay.toISOString(),
      endDate: today.toISOString(),
    });
    
    return result.value;
  } catch (error) {
    console.error("Error getting HealthKit steps:", error);
    return null;
  }
};

// Sync steps to the backend
export const syncStepsToBackend = async (steps: number, date: string): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.error("No session for syncing steps");
      return false;
    }

    const { error } = await supabase.functions.invoke("sync-health-data", {
      body: { steps, date },
    });

    if (error) {
      console.error("Error syncing steps:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error syncing steps:", error);
    return false;
  }
};

// Main function to sync HealthKit steps
export const syncHealthKitSteps = async (): Promise<{ success: boolean; steps?: number }> => {
  const available = await isHealthKitAvailable();
  if (!available) {
    return { success: false };
  }

  const authorized = await requestHealthKitAuthorization();
  if (!authorized) {
    return { success: false };
  }

  const steps = await getHealthKitSteps();
  if (steps === null) {
    return { success: false };
  }

  const today = new Date().toISOString().split("T")[0];
  const synced = await syncStepsToBackend(steps, today);
  
  return { success: synced, steps };
};
