import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import heroImage from '@/assets/hero-fitness.jpg';

interface OnboardingData {
  training_goal: string;
  experience_level: string;
  recommended_plan: string;
  training_days_per_week: number;
}

const goalLabels: Record<string, string> = {
  fat_loss: 'fat loss',
  increase_strength: 'strength gain',
  improve_fitness: 'improved fitness',
  gain_muscle: 'muscle gain',
};

const OnboardingResult = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOnboarding = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/welcome');
        return;
      }

      const { data: onboarding, error } = await supabase
        .from('user_onboarding')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !onboarding) {
        navigate('/onboarding');
        return;
      }

      setData(onboarding as OnboardingData);
      setLoading(false);
    };

    fetchOnboarding();
  }, [navigate]);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-6 text-center">
        <h1 className="text-xl font-serif font-bold text-primary tracking-wide">
          YOUR PERSONALISED PLAN
        </h1>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        <div className="flex items-start gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-primary flex-shrink-0" />
          <p className="text-foreground leading-relaxed">
            You chose a <strong>{goalLabels[data.training_goal] || data.training_goal}</strong> goal 
            with moderate urgency and a training focus on strength gain. Based on your availability, 
            experience and preferences, we've built a personalised training and nutrition approach to match.
          </p>
        </div>

        {/* Recommended Plan */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg font-semibold text-foreground">TRAINING</h2>
            <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs text-muted-foreground">i</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Tap to select your program</p>

          {/* Main Program Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate('/programs')}
          >
            <img 
              src={heroImage} 
              alt="Recommended program" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="inline-block bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white mb-2">
                SPECIALITY SERIES
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                {data.recommended_plan?.toUpperCase() || 'GLUTE BUILDER'}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-white/80 text-sm">↗ {data.experience_level?.toUpperCase()}</span>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
              <span className="text-white text-sm font-medium">{data.training_days_per_week} DAYS</span>
            </div>
          </motion.div>

          {/* Other Options */}
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-3">OTHER OPTIONS</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {['Build', 'Shred', 'Tone'].map((plan, i) => (
                <motion.div
                  key={plan}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex-shrink-0 w-36 relative rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => navigate('/programs')}
                >
                  <img 
                    src={heroImage} 
                    alt={plan} 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <span className="text-white font-semibold">{plan.toUpperCase()}</span>
                    <div className="text-xs text-white/70">TRANSFORMATION SERIES</div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Heart className="w-4 h-4 text-white/50" />
                  </div>
                  <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white">
                    4 DAYS
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
        <Button 
          className="w-full py-6 text-lg font-semibold"
          onClick={() => navigate('/home')}
        >
          GET STARTED
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingResult;
