import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 199,
    period: "month",
    features: [
      "Access to all workouts",
      "Basic meal plans",
      "Goal tracking",
      "Progress photos",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 399,
    period: "month",
    popular: true,
    features: [
      "Everything in Basic",
      "Personalized meal plans",
      "1-on-1 coaching support",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 699,
    period: "month",
    features: [
      "Everything in Premium",
      "Live group sessions",
      "Nutrition consultation",
      "Custom workout programs",
      "VIP community access",
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
        // Create and submit PayFast form
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
            className="text-center mb-8"
          >
            <Crown className="w-12 h-12 mx-auto mb-4 text-foreground" />
            <h1 className="text-3xl font-serif mb-2">Choose Your Plan</h1>
            <p className="text-muted-foreground">
              Start your fitness journey today
            </p>
          </motion.div>

          <div className="space-y-4">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className={`relative bg-card rounded-2xl p-6 border ${
                  plan.popular ? "border-foreground" : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">R{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
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
                  {loading === plan.id ? "Processing..." : "Subscribe"}
                </Button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Cancel anytime. Secure payment via PayFast.
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}
