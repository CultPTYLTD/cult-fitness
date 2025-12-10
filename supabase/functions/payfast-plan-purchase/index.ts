import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PAYFAST_MERCHANT_ID = Deno.env.get('PAYFAST_MERCHANT_ID');
const PAYFAST_MERCHANT_KEY = Deno.env.get('PAYFAST_MERCHANT_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// PayFast sandbox or live URL
const PAYFAST_URL = 'https://www.payfast.co.za/eng/process';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    const { userId, planName, planType, amount, accessWeeks, returnUrl, cancelUrl, notifyUrl } = await req.json();
    
    console.log('Creating PayFast one-time purchase for user:', userId, 'plan:', planName);

    // Get user email from profiles
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email, first_name, last_name')
      .eq('user_id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      throw new Error('User profile not found');
    }

    // Generate unique payment ID
    const paymentId = `plan-${userId}-${Date.now()}`;

    // PayFast payment data for one-time purchase (no subscription fields)
    const paymentData: Record<string, string> = {
      merchant_id: PAYFAST_MERCHANT_ID!,
      merchant_key: PAYFAST_MERCHANT_KEY!,
      return_url: returnUrl,
      cancel_url: cancelUrl,
      notify_url: notifyUrl,
      name_first: profile.first_name || '',
      name_last: profile.last_name || '',
      email_address: profile.email || '',
      m_payment_id: paymentId,
      amount: amount.toFixed(2),
      item_name: `CULT Fitness - ${planName}`,
      item_description: `One-time purchase: ${planName} (${accessWeeks} weeks access)`,
      custom_str1: userId,
      custom_str2: planType,
      custom_str3: planName,
      custom_int1: accessWeeks.toString(),
    };

    console.log('PayFast one-time purchase created successfully');

    return new Response(
      JSON.stringify({
        success: true,
        payfast_url: PAYFAST_URL,
        payment_data: paymentData,
        payment_id: paymentId,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating PayFast one-time purchase:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
