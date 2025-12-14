import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Dumbbell, Utensils, Target, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-fitness.jpg';

const features = [
  {
    icon: Dumbbell,
    title: 'Personalized Workouts',
    description: 'Custom programs tailored to your goals and fitness level'
  },
  {
    icon: Utensils,
    title: 'Nutrition Plans',
    description: 'Delicious meal plans with macro tracking'
  },
  {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Track water, steps, sleep and calories daily'
  },
  {
    icon: TrendingUp,
    title: 'Progress Photos',
    description: 'Document your transformation journey'
  }
];

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
          navigate('/home');
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
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div 
        className="h-[45vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-serif font-bold text-white tracking-wide mb-2">
              CULT FITNESS
            </h1>
            <p className="text-lg text-white/90">
              Transform your body. Elevate your mind.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex-1 bg-background px-6 py-8 -mt-8 rounded-t-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-foreground text-center mb-6">
            Everything you need to reach your goals
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                className="bg-secondary/50 rounded-2xl p-4 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-3"
        >
          <Button 
            className="w-full py-6 text-lg font-semibold"
            onClick={() => navigate('/auth')}
          >
            GET STARTED
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg font-semibold"
            onClick={() => navigate('/auth?mode=login')}
          >
            I ALREADY HAVE AN ACCOUNT
          </Button>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Welcome;
