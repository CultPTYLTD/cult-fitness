import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface OuraData {
  sleep: {
    score: number;
    total_sleep_duration: number;
    rem_sleep_duration: number;
    deep_sleep_duration: number;
  } | null;
  activity: {
    score: number;
    steps: number;
    active_calories: number;
    total_calories: number;
  } | null;
  readiness: {
    score: number;
    temperature_deviation: number;
    recovery_index: number;
  } | null;
}

export function useOura() {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OuraData | null>(null);

  useEffect(() => {
    // Check if we have stored Oura tokens
    const token = localStorage.getItem('oura_access_token');
    setIsConnected(!!token);
  }, []);

  const connect = async () => {
    setLoading(true);
    try {
      const redirectUri = `${window.location.origin}/profile/settings`;
      
      const { data, error } = await supabase.functions.invoke('oura-integration', {
        body: { action: 'get-auth-url', redirectUri }
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      // Redirect to Oura OAuth
      window.location.href = data.authUrl;
    } catch (error: any) {
      console.error('Oura connect error:', error);
      toast.error('Failed to connect to Oura. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthCallback = async (code: string) => {
    setLoading(true);
    try {
      const redirectUri = `${window.location.origin}/profile/settings`;
      
      const { data, error } = await supabase.functions.invoke('oura-integration', {
        body: { action: 'exchange-code', code, redirectUri }
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return false;
      }

      // Store tokens
      localStorage.setItem('oura_access_token', data.access_token);
      localStorage.setItem('oura_refresh_token', data.refresh_token);
      localStorage.setItem('oura_token_expires', String(Date.now() + data.expires_in * 1000));
      
      setIsConnected(true);
      toast.success('Successfully connected to Oura!');
      return true;
    } catch (error: any) {
      console.error('Oura OAuth error:', error);
      toast.error('Failed to complete Oura connection.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchDailyData = async (date?: string) => {
    const accessToken = localStorage.getItem('oura_access_token');
    if (!accessToken) {
      toast.error('Please connect to Oura first');
      return null;
    }

    setLoading(true);
    try {
      const targetDate = date || new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase.functions.invoke('oura-integration', {
        body: { action: 'get-daily-data', accessToken, date: targetDate }
      });

      if (error) throw error;

      setData(data);
      return data;
    } catch (error: any) {
      console.error('Oura fetch error:', error);
      toast.error('Failed to fetch Oura data.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    localStorage.removeItem('oura_access_token');
    localStorage.removeItem('oura_refresh_token');
    localStorage.removeItem('oura_token_expires');
    setIsConnected(false);
    setData(null);
    toast.success('Disconnected from Oura');
  };

  return {
    isConnected,
    loading,
    data,
    connect,
    disconnect,
    handleOAuthCallback,
    fetchDailyData,
  };
}
