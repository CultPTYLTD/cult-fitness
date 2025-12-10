-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Subscribers can view meal plans" ON public.meal_plans;
DROP POLICY IF EXISTS "Subscribers can view workout plans" ON public.workout_plans;

-- Create new policies that allow your email OR active subscribers
CREATE POLICY "Allow owner and subscribers to view meal plans" 
ON public.meal_plans 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND (profiles.email = 'lauren.vankeirsbilck@gmail.com' OR profiles.subscription_status = 'active')
  )
);

CREATE POLICY "Allow owner and subscribers to view workout plans" 
ON public.workout_plans 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND (profiles.email = 'lauren.vankeirsbilck@gmail.com' OR profiles.subscription_status = 'active')
  )
);