-- Add unique constraint on user_id and date for upsert operations
ALTER TABLE public.user_goal_tracking 
ADD CONSTRAINT user_goal_tracking_user_id_date_unique 
UNIQUE (user_id, date);