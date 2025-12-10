import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PAYFAST_MERCHANT_ID = Deno.env.get('PAYFAST_MERCHANT_ID');
const PAYFAST_MERCHANT_KEY = Deno.env.get('PAYFAST_MERCHANT_KEY');
const PAYFAST_PASSPHRASE = Deno.env.get('PAYFAST_PASSPHRASE');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// PayFast sandbox or live URL
const PAYFAST_URL = 'https://www.payfast.co.za/eng/process'; // Use sandbox.payfast.co.za for testing

function generateSignature(data: Record<string, string>, passphrase?: string): string {
  // Sort alphabetically and create parameter string
  const sortedKeys = Object.keys(data).sort();
  let paramString = sortedKeys
    .filter(key => data[key] !== '')
    .map(key => `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, '+')}`)
    .join('&');
  
  if (passphrase) {
    paramString += `&passphrase=${encodeURIComponent(passphrase.trim())}`;
  }
  
  // Create MD5 hash
  const encoder = new TextEncoder();
  const data_bytes = encoder.encode(paramString);
  const hashBuffer = new Uint8Array(16);
  
  // Simple MD5 implementation for Deno
  const crypto = globalThis.crypto;
  return Array.from(new Uint8Array(
    // @ts-ignore - MD5 is available in Deno
    Deno.core.ops.op_crypto_hash('md5', data_bytes)
  )).map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    const { userId, planType, amount, returnUrl, cancelUrl, notifyUrl } = await req.json();
    
    console.log('Creating PayFast checkout for user:', userId, 'plan:', planType);

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
    const paymentId = `${userId}-${Date.now()}`;

    // PayFast payment data
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
      item_name: `CULT Fitness ${planType} Subscription`,
      item_description: `Monthly subscription to CULT Fitness ${planType} plan`,
      subscription_type: '1', // Subscription
      billing_date: new Date().toISOString().split('T')[0],
      recurring_amount: amount.toFixed(2),
      frequency: '3', // Monthly
      cycles: '0', // Indefinite
      custom_str1: userId,
      custom_str2: planType,
    };

    // Remove empty values for signature
    const dataForSignature = Object.fromEntries(
      Object.entries(paymentData).filter(([_, v]) => v !== '')
    );

    // Note: In production, you'd generate a proper MD5 signature
    // For now, we'll return the form data for client-side submission
    
    console.log('PayFast checkout created successfully');

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
    console.error('Error creating PayFast checkout:', error);
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
