import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkoutCard } from "./WorkoutCard";
import strengthImg from "@/assets/workout-strength.jpg";
import hiitImg from "@/assets/workout-hiit.jpg";
import yogaImg from "@/assets/workout-yoga.jpg";
import pilatesImg from "@/assets/workout-pilates.jpg";

const workouts = [
  {
    title: "Full Body Strength",
    category: "Strength",
    duration: "45 min",
    calories: "350 cal",
    image: strengthImg,
  },
  {
    title: "HIIT Cardio Burn",
    category: "HIIT",
    duration: "30 min",
    calories: "400 cal",
    image: hiitImg,
  },
  {
    title: "Yoga Flow & Stretch",
    category: "Yoga",
    duration: "40 min",
    calories: "180 cal",
    image: yogaImg,
  },
  {
    title: "Core Pilates",
    category: "Pilates",
    duration: "35 min",
    calories: "220 cal",
    image: pilatesImg,
  },
];

export function FeaturedWorkouts() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Featured Workouts
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
              Train with purpose
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg">
              From high-intensity cardio to mindful yoga flows, find the perfect 
              workout to match your mood and goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="soft" className="group">
              View All Workouts
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workouts.map((workout, index) => (
            <WorkoutCard key={workout.title} {...workout} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
