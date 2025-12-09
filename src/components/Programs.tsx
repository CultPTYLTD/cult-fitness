import { motion } from "framer-motion";
import { ArrowRight, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    title: "Lean & Tone",
    description: "Build lean muscle and sculpt your body with targeted strength training.",
    duration: "8 Weeks",
    rating: "4.9",
    level: "Beginner",
    gradient: "from-coral to-accent",
  },
  {
    title: "HIIT Revolution",
    description: "High-intensity intervals to maximize fat burn and boost metabolism.",
    duration: "6 Weeks",
    rating: "4.8",
    level: "Intermediate",
    gradient: "from-primary to-coral",
  },
  {
    title: "Mindful Movement",
    description: "Yoga and pilates fusion for flexibility, strength, and inner peace.",
    duration: "4 Weeks",
    rating: "4.9",
    level: "All Levels",
    gradient: "from-sage to-primary",
  },
];

export function Programs() {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Programs
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
              Structured plans for results
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg">
              Follow our expertly designed programs to achieve your fitness goals 
              with step-by-step guidance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="soft" className="group">
              Browse All Programs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-card p-6 md:p-8 shadow-card hover:shadow-elevated transition-all duration-500"
            >
              {/* Gradient Accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${program.gradient}`}
              />

              {/* Level Badge */}
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium mb-4">
                {program.level}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                {program.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-6">
                {program.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">
                    {program.duration}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Star className="w-4 h-4 text-coral fill-current" />
                  <span className="text-foreground font-medium">
                    {program.rating}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Button variant="outline" className="w-full group/btn">
                Start Program
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
