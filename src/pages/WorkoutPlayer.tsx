import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, SkipForward, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

interface Exercise {
  id: number;
  name: string;
  steps: string[];
  sets: number;
  reps: number;
  tempo: string;
}

const workoutExercises: Exercise[] = [
  {
    id: 1,
    name: "Dumbbell Bench Press",
    steps: ["Steps", "Step F- stres"],
    sets: 3,
    reps: 3,
    tempo: "2-0-1",
  },
  {
    id: 2,
    name: "Bicep Curls",
    steps: ["Curl up", "Lower down"],
    sets: 3,
    reps: 12,
    tempo: "2-0-2",
  },
  {
    id: 3,
    name: "Shoulder Press",
    steps: ["Press up", "Lower down"],
    sets: 3,
    reps: 10,
    tempo: "2-1-2",
  },
];

type WorkoutState = "exercise" | "rest" | "complete";

export default function WorkoutPlayer() {
  const navigate = useNavigate();
  const [workoutState, setWorkoutState] = useState<WorkoutState>("exercise");
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [restTime, setRestTime] = useState(30);
  const [isPaused, setIsPaused] = useState(false);

  const currentExercise = workoutExercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / workoutExercises.length) * 100;

  useEffect(() => {
    if (workoutState === "rest" && !isPaused && restTime > 0) {
      const timer = setTimeout(() => setRestTime(restTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (workoutState === "rest" && restTime === 0) {
      goToNextExercise();
    }
  }, [workoutState, restTime, isPaused]);

  const completeExercise = () => {
    if (currentExerciseIndex < workoutExercises.length - 1) {
      setWorkoutState("rest");
      setRestTime(30);
    } else {
      setWorkoutState("complete");
    }
  };

  const goToNextExercise = () => {
    if (currentExerciseIndex < workoutExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setWorkoutState("exercise");
    }
  };

  const skipRest = () => {
    goToNextExercise();
  };

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background flex flex-col">
        <AnimatePresence mode="wait">
          {/* Exercise State */}
          {workoutState === "exercise" && (
            <motion.div
              key="exercise"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 px-4 pt-12"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <Link to="/workouts">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>
                <h1 className="text-2xl font-serif font-light text-foreground leading-tight">
                  {currentExercise.name.split(' ').slice(0, 2).join(' ')}<br />
                  {currentExercise.name.split(' ').slice(2).join(' ')}
                </h1>
              </div>

              {/* Exercise Image */}
              <div className="aspect-square bg-secondary rounded-2xl flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-muted rounded-xl flex items-center justify-center">
                  <span className="text-muted-foreground text-lg">✕</span>
                </div>
              </div>

              {/* Exercise Details */}
              <div className="space-y-4 mb-8">
                {currentExercise.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-foreground font-medium">{index + 1}</span>
                    <span className="text-foreground">{step}</span>
                  </div>
                ))}
                
                <div className="h-px bg-border my-4" />
                
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">{currentExercise.sets} Sets</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">{currentExercise.reps} Reps</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">{currentExercise.tempo}</span>
                </div>
              </div>

              {/* Continue Button */}
              <Button
                onClick={completeExercise}
                className="w-full bg-foreground hover:bg-foreground/80 text-background rounded-full py-6 text-lg font-medium"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {/* Rest State */}
          {workoutState === "rest" && (
            <motion.div
              key="rest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center px-4"
            >
              <p className="text-muted-foreground mb-2">Rest</p>
              <div className="relative w-40 h-40 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="hsl(var(--foreground))"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={440}
                    strokeDashoffset={440 - (440 * restTime) / 30}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-5xl font-serif text-foreground">
                  {restTime}
                </span>
              </div>
              <p className="text-foreground mb-8">
                Next: {workoutExercises[currentExerciseIndex + 1]?.name}
              </p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsPaused(!isPaused)}
                  className="rounded-full px-6"
                >
                  {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
                  {isPaused ? "Resume" : "Pause"}
                </Button>
                <Button onClick={skipRest} className="rounded-full px-6 bg-foreground text-background">
                  <SkipForward className="w-4 h-4 mr-2" />
                  Skip Rest
                </Button>
              </div>
            </motion.div>
          )}

          {/* Complete State */}
          {workoutState === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col items-center justify-center px-4"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-6">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-serif text-foreground mb-2">Workout Complete!</h2>
              <p className="text-muted-foreground mb-8">Great job! You crushed it.</p>
              <Button
                onClick={() => navigate("/workouts")}
                className="w-full max-w-xs bg-foreground hover:bg-foreground/80 text-background rounded-full py-6 uppercase tracking-wider"
              >
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileLayout>
  );
}
