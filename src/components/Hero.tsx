import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-fitness.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fitness hero"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent"
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-20">
        <div className="max-w-xl">
          {/* Badge */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8"
          >
            The modern fitness collective
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-foreground mb-8 leading-[0.95]"
          >
            Move with
            <br />
            <span className="italic">intention</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base text-muted-foreground mb-10 max-w-md leading-relaxed"
          >
            Curated workouts, mindful movement, and a community dedicated 
            to becoming the best version of yourself.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="group text-xs uppercase tracking-widest">
              Begin Your Journey
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="text-xs uppercase tracking-widest">
              Explore Programs
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-12 mt-16 pt-8 border-t border-border/50"
          >
            {[
              { value: "500+", label: "Workouts" },
              { value: "50+", label: "Programs" },
              { value: "100k+", label: "Members" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-serif font-light text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}