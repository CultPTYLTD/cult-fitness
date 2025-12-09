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
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Today's Workout
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-foreground mt-4 mb-6">
              Morning HIIT Blast
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Get your heart pumping with this high-energy interval training 
              session designed to boost your metabolism all day.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary flex items-center justify-center">
                  <Clock className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Duration</div>
                  <div className="font-serif text-foreground">22 min</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary flex items-center justify-center">
                  <Flame className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Calories</div>
                  <div className="font-serif text-foreground">280 cal</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Level</div>
                  <div className="font-serif text-foreground">Intermediate</div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-10">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Progress</span>
                <span className="text-foreground">
                  {completedCount}/{exercises.length} completed
                </span>
              </div>
              <div className="h-1 bg-border overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-foreground"
                />
              </div>
            </div>

            {/* Exercise List */}
            <div className="space-y-3 mb-10">
              {exercises.map((exercise, index) => (
                <motion.div
                  key={exercise.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 border transition-colors ${
                    exercise.completed
                      ? "bg-secondary border-border"
                      : "bg-card border-border"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 flex items-center justify-center text-xs ${
                        exercise.completed
                          ? "bg-foreground text-background"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {exercise.completed ? "✓" : index + 1}
                    </div>
                    <span className="text-foreground">
                      {exercise.name}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {exercise.duration}
                  </span>
                </motion.div>
              ))}
            </div>

            <Button size="lg" className="group text-xs uppercase tracking-widest">
              Continue Workout
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            <div className="relative overflow-hidden">
              <img
                src={hiitImg}
                alt="Today's workout"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-background flex items-center justify-center"
                >
                  <Play className="w-8 h-8 text-foreground fill-current ml-1" />
                </motion.button>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-background/90 backdrop-blur-sm flex items-center justify-center">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=trainer"
                      alt="Trainer"
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <div className="text-background font-medium">
                      Sarah Mitchell
                    </div>
                    <div className="text-background/70 text-sm">
                      Head Trainer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}