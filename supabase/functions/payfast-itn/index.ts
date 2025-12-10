import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const PAYFAST_MERCHANT_ID = Deno.env.get('PAYFAST_MERCHANT_ID');
const PAYFAST_PASSPHRASE = Deno.env.get('PAYFAST_PASSPHRASE');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Verify PayFast signature
async function verifySignature(data: Record<string, string>, signature: string): Promise<boolean> {
  const sortedKeys = Object.keys(data).filter(k => k !== 'signature').sort();
  let paramString = sortedKeys
    .filter(key => data[key] !== '')
    .map(key => `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, '+')}`)
    .join('&');
  
  if (PAYFAST_PASSPHRASE) {
    paramString += `&passphrase=${encodeURIComponent(PAYFAST_PASSPHRASE.trim())}`;
  }
  
  const encoder = new TextEncoder();
  const dataBytes = encoder.encode(paramString);
  const hashBuffer = await crypto.subtle.digest('MD5', dataBytes);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const calculatedSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return calculatedSignature === signature;
}

serve(async (req) => {
  try {
    // PayFast sends POST data as form-urlencoded
    const formData = await req.formData();
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    console.log('Received PayFast ITN:', JSON.stringify(data));

    // Verify merchant ID
    if (data.merchant_id !== PAYFAST_MERCHANT_ID) {
      console.error('Invalid merchant ID');
      return new Response('Invalid merchant', { status: 400 });
    }

    // Get user info from custom fields
    const userId = data.custom_str1;
    const planType = data.custom_str2;
    const planName = data.custom_str3 || null; // For one-time purchases
    const accessWeeks = data.custom_int1 ? parseInt(data.custom_int1) : null; // For one-time purchases
    const paymentStatus = data.payment_status;
    const amount = parseFloat(data.amount_gross);
    const paymentId = data.m_payment_id;

    console.log('Processing payment for user:', userId, 'status:', paymentStatus, 'planName:', planName);

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    if (paymentStatus === 'COMPLETE') {
      // Check if this is a one-time plan purchase or subscription
      const isOneTimePurchase = paymentId?.startsWith('plan-') && planName && accessWeeks;

      if (isOneTimePurchase) {
        // Handle one-time plan purchase
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + (accessWeeks * 7));

        const { error: insertError } = await supabase
          .from('user_plan_purchases')
          .insert({
            user_id: userId,
            plan_name: planName,
            plan_type: planType,
            amount_paid: amount,
            expires_at: expiresAt.toISOString(),
            payment_id: paymentId,
            is_active: true,
          });

        if (insertError) {
          console.error('Error inserting plan purchase:', insertError);
          return new Response('Database error', { status: 500 });
        }

        console.log('Plan purchase recorded for user:', userId, 'plan:', planName, 'expires:', expiresAt);
      } else {
        // Handle subscription
        const expiresAt = new Date();
        if (planType === 'annual') {
          expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        } else {
          expiresAt.setMonth(expiresAt.getMonth() + 1);
        }

        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            subscription_status: 'active',
            subscription_expires_at: expiresAt.toISOString(),
          })
          .eq('user_id', userId);

        if (updateError) {
          console.error('Error updating subscription:', updateError);
          return new Response('Database error', { status: 500 });
        }

        console.log('Subscription activated for user:', userId, 'expires:', expiresAt);
      }
    } else if (paymentStatus === 'CANCELLED') {
      // Handle cancellation
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          subscription_status: 'cancelled',
        })
        .eq('user_id', userId);

      if (updateError) {
        console.error('Error updating subscription:', updateError);
      }
      
      console.log('Subscription cancelled for user:', userId);
    }

    // PayFast expects a 200 response to confirm receipt
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Error processing PayFast ITN:', error);
    return new Response('Error', { status: 500 });
  }
});
