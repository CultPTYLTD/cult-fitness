import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "500+ on-demand workouts",
  "Personalized programs",
  "Expert guidance",
  "Supportive community",
];

export function CTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-primary">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60 mb-6"
          >
            Begin your journey
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-primary-foreground mb-8"
          >
            Ready to transform?
          </motion.h2>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
          >
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 text-primary-foreground/80"
              >
                <Check className="w-4 h-4" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-xs uppercase tracking-widest"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary text-xs uppercase tracking-widest"
            >
              View Pricing
            </Button>
          </motion.div>

          {/* Trust Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-xs text-primary-foreground/50 uppercase tracking-widest"
          >
            No credit card required • Cancel anytime
          </motion.p>
        </div>
      </div>
    </section>
  );
}