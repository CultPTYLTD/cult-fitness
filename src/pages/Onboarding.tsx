import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, MapPin, Sparkles, Clock, ClipboardList, Moon, Dumbbell, Flame, Zap, AlarmClock, Weight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import heroImage from '@/assets/hero-fitness.jpg';

interface QuizStep {
  id: string;
  question: string;
  subtitle?: string;
  type: 'single' | 'multi';
  options: { value: string; label: string; icon?: React.ReactNode }[];
}

const quizSteps: QuizStep[] = [
  {
    id: 'pregnant',
    question: 'Are you Currently Pregnant or Post-Partum?',
    type: 'single',
    options: [
      { value: 'pregnant', label: 'Pregnant' },
      { value: 'post_partum', label: 'Post-Partum' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    id: 'goal',
    question: 'What is your Primary Fitness Goal?',
    subtitle: 'This will help us tailor your program options',
    type: 'single',
    options: [
      { value: 'build_muscle', label: 'Build Muscle', icon: <Dumbbell className="w-5 h-5" /> },
      { value: 'lose_weight', label: 'Lose Weight', icon: <Flame className="w-5 h-5" /> },
      { value: 'improve_performance', label: 'Improve Performance', icon: <Zap className="w-5 h-5" /> },
      { value: 'fit_lifestyle', label: 'Fit Your Lifestyle', icon: <AlarmClock className="w-5 h-5" /> },
      { value: 'build_muscle_lose_weight', label: 'Build Muscle & Lose Weight', icon: <Weight className="w-5 h-5" /> },
    ],
  },
  {
    id: 'struggle',
    question: 'What is your Biggest Fitness Struggle?',
    type: 'single',
    options: [
      { value: 'knowing_where_to_start', label: 'Knowing Where to Start', icon: <MapPin className="w-5 h-5" /> },
      { value: 'lacking_confidence', label: 'Lacking Confidence', icon: <Sparkles className="w-5 h-5" /> },
      { value: 'finding_time', label: 'Finding Time to Workout', icon: <Clock className="w-5 h-5" /> },
      { value: 'staying_consistent', label: 'Staying Consistent', icon: <ClipboardList className="w-5 h-5" /> },
      { value: 'getting_bored', label: 'Getting Bored With Current Training', icon: <Moon className="w-5 h-5" /> },
    ],
  },
  {
    id: 'experience',
    question: 'What is your Current Fitness Level?',
    type: 'single',
    options: [
      { value: 'brand_new', label: 'Brand New To Fitness' },
      { value: 'getting_back', label: 'Getting Back Into It' },
      { value: 'some_experience', label: 'Some Training Experience' },
      { value: 'confident', label: 'Confident In The Gym' },
    ],
  },
  {
    id: 'training_style',
    question: 'What is your Favourite Style of Training?',
    type: 'single',
    options: [
      { value: 'weighted', label: 'Weighted Workouts', icon: <Dumbbell className="w-5 h-5" /> },
      { value: 'pilates', label: 'Pilates' },
      { value: 'running', label: 'Running' },
      { value: 'hiit', label: 'High Intensity Interval Training', icon: <Flame className="w-5 h-5" /> },
    ],
  },
  {
    id: 'lifts',
    question: 'Select all lifts you can confidently perform with good technique.',
    subtitle: 'Check all that apply',
    type: 'multi',
    options: [
      { value: 'overhead_press', label: 'Overhead Press' },
      { value: 'bench_press', label: 'Bench Press' },
      { value: 'barbell_squat', label: 'Barbell Squat' },
      { value: 'deadlift', label: 'Deadlift' },
    ],
  },
  {
    id: 'days',
    question: 'How Many Days Per Week Can You Train?',
    type: 'single',
    options: [
      { value: '2', label: '2 Days' },
      { value: '3', label: '3 Days' },
      { value: '4', label: '4 Days' },
      { value: '5', label: '5+ Days' },
    ],
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/welcome');
        return;
      }
      setUserId(user.id);

      // Check if already completed onboarding
      const { data } = await supabase
        .from('user_onboarding')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (data) {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  const currentQuiz = quizSteps[currentStep];
  const progress = ((currentStep + 1) / quizSteps.length) * 100;

  const handleSingleSelect = (value: string) => {
    setAnswers({ ...answers, [currentQuiz.id]: value });
  };

  const handleMultiSelect = (value: string) => {
    const current = (answers[currentQuiz.id] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setAnswers({ ...answers, [currentQuiz.id]: updated });
  };

  const canProceed = () => {
    const answer = answers[currentQuiz.id];
    if (currentQuiz.type === 'multi') {
      return Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  };

  const handleNext = async () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await submitOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRecommendedPlan = () => {
    const goal = answers.goal as string;
    const experience = answers.experience as string;
    const pregnant = answers.pregnant as string;
    const trainingStyle = answers.training_style as string;
    
    if (pregnant === 'pregnant') {
      return 'Pregnancy Fitness';
    }
    if (pregnant === 'post_partum') {
      return 'Post-Partum Recovery';
    }
    if (trainingStyle === 'pilates') {
      return 'Pilates Fundamentals';
    }
    if (trainingStyle === 'hiit') {
      return 'HIIT Fat Burner';
    }
    if (goal === 'lose_weight' || goal === 'build_muscle_lose_weight') {
      return experience === 'brand_new' ? 'Fat Loss Fundamentals' : 'Advanced Fat Burner';
    }
    if (goal === 'build_muscle') {
      return experience === 'brand_new' ? 'Muscle Building Basics' : 'Glute Builder';
    }
    return 'General Fitness';
  };

  const submitOnboarding = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.from('user_onboarding').insert({
        user_id: userId,
        training_goal: answers.goal as string,
        experience_level: answers.experience as string,
        confident_lifts: answers.lifts as string[],
        training_days_per_week: parseInt(answers.days as string),
        recommended_plan: getRecommendedPlan(),
      });

      if (error) throw error;
      
      toast.success('Your personalized plan is ready!');
      navigate('/onboarding/result');
    } catch (error: any) {
      console.error('Error saving onboarding:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Header */}
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h1 className="text-2xl font-serif font-bold text-white">
            LET'S PERSONALISE YOUR PLAN
          </h1>
          <p className="text-white/80 text-sm mt-1">
            Answer a few questions to help us create your perfect fitness and nutrition plan
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-secondary">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question Content */}
      <div className="flex-1 bg-background p-6">
        <div className="flex items-center justify-between mb-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBack}
            disabled={currentStep === 0}
            className="text-muted-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentStep + 1} of {quizSteps.length} questions
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 mt-4"
          >
            <div>
              <h2 className="text-xl font-serif text-foreground">
                {currentQuiz.question}
              </h2>
              {currentQuiz.subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{currentQuiz.subtitle}</p>
              )}
            </div>

            <div className="space-y-3">
              {currentQuiz.options.map((option) => {
                const isSelected = currentQuiz.type === 'multi'
                  ? ((answers[currentQuiz.id] as string[]) || []).includes(option.value)
                  : answers[currentQuiz.id] === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => currentQuiz.type === 'multi' 
                      ? handleMultiSelect(option.value) 
                      : handleSingleSelect(option.value)
                    }
                    className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-3 ${
                      isSelected 
                        ? 'bg-secondary border-2 border-foreground' 
                        : 'bg-secondary/50 border-2 border-transparent hover:bg-secondary'
                    }`}
                  >
                    {option.icon && (
                      <span className="text-foreground">{option.icon}</span>
                    )}
                    <span className={`flex-1 font-medium ${isSelected ? 'text-foreground' : 'text-foreground'}`}>
                      {option.label}
                    </span>
                    {currentQuiz.type === 'multi' ? (
                      <Checkbox checked={isSelected} />
                    ) : isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
                        <Check className="w-3 h-3 text-background" />
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-6 bg-background border-t border-border">
        <Button 
          onClick={handleNext} 
          disabled={!canProceed() || loading}
          className="w-full py-6"
        >
          {loading ? 'SAVING...' : currentStep === quizSteps.length - 1 ? 'SEE MY PLAN' : 'CONTINUE'}
        </Button>
        
        <p className="text-center text-xs text-muted-foreground mt-4">
          We use this information to create personalized daily recommendations tailored to your goals.
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
