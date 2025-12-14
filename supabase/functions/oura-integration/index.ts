import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, code, redirectUri } = await req.json();
    
    const OURA_CLIENT_ID = Deno.env.get("OURA_CLIENT_ID");
    const OURA_CLIENT_SECRET = Deno.env.get("OURA_CLIENT_SECRET");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!OURA_CLIENT_ID || !OURA_CLIENT_SECRET) {
      return new Response(
        JSON.stringify({ 
          error: "Oura credentials not configured. Please add OURA_CLIENT_ID and OURA_CLIENT_SECRET to your secrets." 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    
    // Get the user from the authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid user token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-auth-url") {
      // Generate OAuth URL for Oura
      const scopes = ["daily", "heartrate", "personal", "session", "sleep", "workout"];
      const authUrl = `https://cloud.ouraring.com/oauth/authorize?` +
        `client_id=${OURA_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&response_type=code` +
        `&scope=${scopes.join("+")}`;
      
      return new Response(
        JSON.stringify({ authUrl }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "exchange-code") {
      // Exchange authorization code for access token
      const tokenResponse = await fetch("https://api.ouraring.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
          client_id: OURA_CLIENT_ID,
          client_secret: OURA_CLIENT_SECRET,
        }),
      });

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok) {
        console.error("Oura token error:", tokenData);
        return new Response(
          JSON.stringify({ error: tokenData.error_description || "Failed to exchange code" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Store the tokens securely (you'd want a dedicated table for this)
      // For now, we'll return them to be stored client-side (less secure but simpler)
      return new Response(
        JSON.stringify({ 
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_in: tokenData.expires_in,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-daily-data") {
      const { accessToken, date } = await req.json();
      
      // Fetch sleep data
      const sleepResponse = await fetch(
        `https://api.ouraring.com/v2/usercollection/daily_sleep?start_date=${date}&end_date=${date}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const sleepData = await sleepResponse.json();

      // Fetch activity data
      const activityResponse = await fetch(
        `https://api.ouraring.com/v2/usercollection/daily_activity?start_date=${date}&end_date=${date}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const activityData = await activityResponse.json();

      // Fetch readiness data
      const readinessResponse = await fetch(
        `https://api.ouraring.com/v2/usercollection/daily_readiness?start_date=${date}&end_date=${date}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const readinessData = await readinessResponse.json();

      return new Response(
        JSON.stringify({
          sleep: sleepData.data?.[0] || null,
          activity: activityData.data?.[0] || null,
          readiness: readinessData.data?.[0] || null,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Unknown action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Oura integration error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
