import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Crown, Sparkles, Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const subscriptionPlans = [
  {
    id: "monthly",
    name: "Monthly",
    price: 250,
    period: "month",
    features: [
      "Access to all workouts",
      "Full meal plan library",
      "Goal tracking & analytics",
      "Progress photos",
      "Community access",
    ],
  },
  {
    id: "annual",
    name: "Annual",
    price: 2000,
    period: "year",
    popular: true,
    savings: "Save R1,000",
    features: [
      "Everything in Monthly",
      "2 months FREE",
      "Priority support",
      "Exclusive challenges",
      "Early access to new features",
    ],
  },
];

const oneTimePlans = [
  {
    id: "321-define",
    name: "3-2-1 Method Define Edition",
    price: 899,
    accessWeeks: 12,
    description: "Sculpt and define your physique with this targeted 12-week program",
    features: [
      "12 weeks of structured workouts",
      "Progressive overload programming",
      "Exercise video tutorials",
      "Printable workout sheets",
    ],
  },
  {
    id: "321-shred",
    name: "3-2-1 Method Shred Edition",
    price: 899,
    accessWeeks: 12,
    description: "High-intensity fat-burning program for maximum results",
    features: [
      "12 weeks of HIIT workouts",
      "Cardio & strength combo",
      "Nutrition guide included",
      "Weekly check-ins",
    ],
  },
  {
    id: "beginner-bootcamp",
    name: "Beginner Bootcamp",
    price: 499,
    accessWeeks: 8,
    description: "Perfect starting point for fitness newcomers",
    features: [
      "8 weeks of beginner workouts",
      "Form & technique focus",
      "No equipment needed",
      "Habit building tips",
    ],
  },
];

export default function Subscribe() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string, price: number) => {
    setLoading(planId);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to subscribe");
        navigate("/auth");
        return;
      }

      const baseUrl = window.location.origin;
      
      const { data, error } = await supabase.functions.invoke('payfast-checkout', {
        body: {
          userId: user.id,
          planType: planId,
          amount: price,
          returnUrl: `${baseUrl}/subscription/success`,
          cancelUrl: `${baseUrl}/subscription/cancel`,
          notifyUrl: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/payfast-itn`,
        },
      });

      if (error) throw error;

      if (data.success && data.payment_data) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.payfast_url;
        
        Object.entries(data.payment_data).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        });
        
        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error("Failed to start subscription. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const handlePlanPurchase = async (plan: typeof oneTimePlans[0]) => {
    setLoading(plan.id);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to purchase");
        navigate("/auth");
        return;
      }

      const baseUrl = window.location.origin;
      
      const { data, error } = await supabase.functions.invoke('payfast-plan-purchase', {
        body: {
          userId: user.id,
          planName: plan.name,
          planType: plan.id,
          amount: plan.price,
          accessWeeks: plan.accessWeeks,
          returnUrl: `${baseUrl}/subscription/success`,
          cancelUrl: `${baseUrl}/subscription/cancel`,
          notifyUrl: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/payfast-itn`,
        },
      });

      if (error) throw error;

      if (data.success && data.payment_data) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.payfast_url;
        
        Object.entries(data.payment_data).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        });
        
        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      console.error('Plan purchase error:', error);
      toast.error("Failed to process purchase. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background pb-8">
        {/* Header */}
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>

        <div className="px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <Crown className="w-12 h-12 mx-auto mb-4 text-foreground" />
            <h1 className="text-3xl font-serif mb-2">Choose Your Plan</h1>
            <p className="text-muted-foreground">
              Start your fitness journey today
            </p>
          </motion.div>

          <Tabs defaultValue="membership" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="membership">Memberships</TabsTrigger>
              <TabsTrigger value="programs">Programs</TabsTrigger>
            </TabsList>

            <TabsContent value="membership" className="space-y-4">
              {subscriptionPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className={`relative bg-card rounded-2xl p-6 border ${
                    plan.popular ? "border-foreground border-2" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Best Value
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-foreground">R{plan.price}</span>
                        <span className="text-muted-foreground">/{plan.period}</span>
                      </div>
                      {plan.savings && (
                        <span className="text-sm text-green-600 font-medium">{plan.savings}</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-foreground" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full rounded-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSubscribe(plan.id, plan.price)}
                    disabled={loading !== null}
                  >
                    {loading === plan.id ? "Processing..." : plan.popular ? "Get Annual" : "Get Monthly"}
                  </Button>
                </motion.div>
              ))}

              <p className="text-center text-xs text-muted-foreground mt-4">
                Cancel anytime. Secure payment via PayFast.
              </p>
            </TabsContent>

            <TabsContent value="programs" className="space-y-4">
              <p className="text-sm text-muted-foreground text-center mb-4">
                One-time purchase programs with limited-time access
              </p>

              {oneTimePlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="relative bg-card rounded-2xl p-6 border border-border"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-muted rounded-lg">
                      <Dumbbell className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-foreground">R{plan.price}</span>
                    <span className="text-muted-foreground text-sm">once-off</span>
                    <span className="ml-2 text-xs bg-muted px-2 py-1 rounded-full">
                      {plan.accessWeeks} weeks access
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-foreground" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full rounded-full"
                    variant="outline"
                    onClick={() => handlePlanPurchase(plan)}
                    disabled={loading !== null}
                  >
                    {loading === plan.id ? "Processing..." : `Get ${plan.name.split(' ')[0]} Plan`}
                  </Button>
                </motion.div>
              ))}

              <p className="text-center text-xs text-muted-foreground mt-4">
                Secure one-time payment via PayFast. Access starts immediately.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MobileLayout>
  );
}
