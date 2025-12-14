import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import heroImage from '@/assets/hero-fitness.jpg';

const Welcome = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Check if user has completed onboarding
        const { data: onboarding } = await supabase
          .from('user_onboarding')
          .select('id')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        if (onboarding) {
          navigate('/');
        } else {
          navigate('/onboarding');
        }
      }
      setCheckingAuth(false);
    };
    checkSession();
  }, [navigate]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col justify-end p-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-bold text-white tracking-wide">
              CULT FITNESS
            </h1>
            <p className="text-lg text-white/80">
              Transform your body. Elevate your mind.
            </p>
          </div>

          <p className="text-white/70 text-sm leading-relaxed">
            Personalized workouts, meal plans, and expert guidance designed to help you achieve your fitness goals.
          </p>

          <div className="space-y-3 pt-4">
            <Button 
              className="w-full py-6 text-lg font-semibold bg-white text-black hover:bg-white/90"
              onClick={() => navigate('/auth')}
            >
              GET STARTED
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full py-6 text-lg font-semibold border-white/30 text-white hover:bg-white/10"
              onClick={() => navigate('/auth?mode=login')}
            >
              I ALREADY HAVE AN ACCOUNT
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;