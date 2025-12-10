-- Create table for tracking one-time plan purchases
CREATE TABLE public.user_plan_purchases (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  plan_name text NOT NULL,
  plan_type text NOT NULL,
  amount_paid numeric NOT NULL,
  purchased_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone NOT NULL,
  payment_id text,
  is_active boolean DEFAULT true
);

-- Enable RLS
ALTER TABLE public.user_plan_purchases ENABLE ROW LEVEL SECURITY;

-- Users can view their own purchases
CREATE POLICY "Users can view their own purchases"
ON public.user_plan_purchases
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own purchases (via ITN webhook with service role)
CREATE POLICY "Users can insert their own purchases"
ON public.user_plan_purchases
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_user_plan_purchases_user_id ON public.user_plan_purchases(user_id);
CREATE INDEX idx_user_plan_purchases_expires ON public.user_plan_purchases(expires_at);