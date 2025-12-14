-- Create table to store user quiz responses and personalized plan recommendations
CREATE TABLE public.user_onboarding (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  training_goal TEXT,
  experience_level TEXT,
  confident_lifts TEXT[],
  training_days_per_week INTEGER,
  recommended_plan TEXT,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_onboarding ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own onboarding" 
ON public.user_onboarding 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding" 
ON public.user_onboarding 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding" 
ON public.user_onboarding 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create table to store food scan history
CREATE TABLE public.food_scans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  scan_type TEXT NOT NULL, -- 'photo' or 'barcode'
  image_url TEXT,
  barcode TEXT,
  food_name TEXT,
  calories INTEGER,
  protein_g NUMERIC,
  carbs_g NUMERIC,
  fats_g NUMERIC,
  fibre_g NUMERIC,
  serving_size TEXT,
  scan_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.food_scans ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own food scans" 
ON public.food_scans 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own food scans" 
ON public.food_scans 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own food scans" 
ON public.food_scans 
FOR DELETE 
USING (auth.uid() = user_id);