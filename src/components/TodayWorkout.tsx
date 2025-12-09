import { motion } from "framer-motion";
import { Play, Clock, Flame, Dumbbell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hiitImg from "@/assets/workout-hiit.jpg";

const exercises = [
  { name: "Warm Up", duration: "5 min", completed: true },
  { name: "Squat Jumps", duration: "4 min", completed: true },
  { name: "Mountain Climbers", duration: "4 min", completed: false },
  { name: "Burpees", duration: "4 min", completed: false },
  { name: "Cool Down", duration: "5 min", completed: false },
];

export function TodayWorkout() {
  const completedCount = exercises.filter((e) => e.completed).length;
  const progress = (completedCount / exercises.length) * 100;

  return (
    <section className="py-20 md:py-28 gradient-warm">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Today's Workout
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
              Morning HIIT Blast
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Get your heart pumping with this high-energy interval training 
              session designed to boost your metabolism all day.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-semibold text-foreground">22 min</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-coral" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Calories</div>
                  <div className="font-semibold text-foreground">280 cal</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Level</div>
                  <div className="font-semibold text-foreground">Intermediate</div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">
                  {completedCount}/{exercises.length} completed
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full gradient-coral rounded-full"
                />
              </div>
            </div>

            {/* Exercise List */}
            <div className="space-y-3 mb-8">
              {exercises.map((exercise, index) => (
                <motion.div
                  key={exercise.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    exercise.completed
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-card border border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        exercise.completed
                          ? "gradient-coral text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {exercise.completed ? "✓" : index + 1}
                    </div>
                    <span
                      className={`font-medium ${
                        exercise.completed
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {exercise.name}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {exercise.duration}
                  </span>
                </motion.div>
              ))}
            </div>

            <Button variant="coral" size="lg" className="group">
              Continue Workout
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={hiitImg}
                alt="Today's workout"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full gradient-coral flex items-center justify-center shadow-glow"
                >
                  <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
                </motion.button>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=trainer"
                      alt="Trainer"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div>
                    <div className="text-primary-foreground font-medium">
                      Sarah Mitchell
                    </div>
                    <div className="text-primary-foreground/70 text-sm">
                      Head Trainer
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-peach -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-primary/10 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
