import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Dumbbell, Utensils, Target, TrendingUp, ChevronRight, Loader2, Eye, EyeOff } from 'lucide-react';
import heroImage from '@/assets/hero-fitness.jpg';
import { toast } from 'sonner';

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
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password');
          } else {
            toast.error(error.message);
          }
          return;
        }
        
        // Check onboarding status
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: onboarding } = await supabase
            .from('user_onboarding')
            .select('id')
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (onboarding) {
            navigate('/home');
          } else {
            navigate('/onboarding');
          }
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName
            },
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Please log in instead.');
            setIsLogin(true);
          } else {
            toast.error(error.message);
          }
          return;
        }
        
        // Create profile
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('profiles').insert({
            user_id: user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email
          });
          navigate('/onboarding');
        }
      }
    } catch (error: any) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
        className="h-[40vh] bg-cover bg-center relative"
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

      {/* Content Section */}
      <div className="flex-1 bg-background px-6 py-6 -mt-8 rounded-t-3xl relative z-10">
        <AnimatePresence mode="wait">
          {!showAuth ? (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-foreground text-center mb-4">
                Everything you need to reach your goals
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    className="bg-secondary/50 rounded-2xl p-3 text-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mx-auto mb-2">
                      <feature.icon className="w-5 h-5 text-foreground" />
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="space-y-3"
              >
                <Button 
                  className="w-full py-6 text-lg font-semibold"
                  onClick={() => { setShowAuth(true); setIsLogin(false); }}
                >
                  GET STARTED
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full py-6 text-lg font-semibold"
                  onClick={() => { setShowAuth(true); setIsLogin(true); }}
                >
                  I ALREADY HAVE AN ACCOUNT
                </Button>
              </motion.div>

              <p className="text-center text-xs text-muted-foreground mt-4">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-foreground text-center mb-2">
                {isLogin ? 'Welcome Back' : 'Create Your Account'}
              </h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                {isLogin ? 'Log in to continue your fitness journey' : 'Start your transformation today'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                      className="h-12"
                    />
                    <Input
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      required
                      className="h-12"
                    />
                  </div>
                )}
                
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="h-12"
                />
                
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    minLength={6}
                    className="h-12 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : isLogin ? 'LOG IN' : 'CREATE ACCOUNT'}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <Button
                  variant="link"
                  className="text-muted-foreground"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
                </Button>
              </div>

              <Button
                variant="ghost"
                className="w-full mt-2"
                onClick={() => setShowAuth(false)}
              >
                Back
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Welcome;
