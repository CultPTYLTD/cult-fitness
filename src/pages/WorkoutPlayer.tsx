import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, SkipForward, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

interface Exercise {
  id: number;
  name: string;
  duration: number;
  reps?: string;
  sets?: string;
  tempo?: string;
  notes?: string;
  equipment: string[];
  image: string;
}

const workoutExercises: Exercise[] = [
  {
    id: 1,
    name: "Warm Up - Arm Circles",
    duration: 30,
    reps: "10 each direction",
    equipment: ["None"],
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Bicep Curls",
    duration: 45,
    reps: "12",
    sets: "3",
    tempo: "2-0-2",
    notes: "Keep elbows close to body",
    equipment: ["Dumbbells"],
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Tricep Dips",
    duration: 45,
    reps: "10",
    sets: "3",
    equipment: ["Chair or Bench"],
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Shoulder Press",
    duration: 45,
    reps: "12",
    sets: "3",
    tempo: "2-1-2",
    equipment: ["Dumbbells"],
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Cool Down Stretch",
    duration: 60,
    notes: "Hold each stretch for 15 seconds",
    equipment: ["None"],
    image: "/placeholder.svg",
  },
];

type WorkoutState = "preview" | "countdown" | "exercise" | "rest" | "complete";

export default function WorkoutPlayer() {
  const navigate = useNavigate();
  const [workoutState, setWorkoutState] = useState<WorkoutState>("preview");
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3);
  const [restTime, setRestTime] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const currentExercise = workoutExercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / workoutExercises.length) * 100;

  useEffect(() => {
    if (workoutState === "countdown" && !isPaused && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (workoutState === "countdown" && timeRemaining === 0) {
      setWorkoutState("exercise");
      setTimeRemaining(currentExercise.duration);
    }
  }, [workoutState, timeRemaining, isPaused, currentExercise]);

  useEffect(() => {
    if (workoutState === "rest" && !isPaused && restTime > 0) {
      const timer = setTimeout(() => setRestTime(restTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (workoutState === "rest" && restTime === 0) {
      goToNextExercise();
    }
  }, [workoutState, restTime, isPaused]);

  const startWorkout = () => {
    setWorkoutState("countdown");
    setTimeRemaining(3);
  };

  const completeExercise = () => {
    setCompletedExercises([...completedExercises, currentExercise.id]);
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
      setWorkoutState("countdown");
      setTimeRemaining(3);
    }
  };

  const skipRest = () => {
    goToNextExercise();
  };

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="px-4 pt-6 pb-4 flex items-center justify-between">
          <Link to="/workouts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <span className="text-sm text-muted-foreground">
            {currentExerciseIndex + 1} / {workoutExercises.length}
          </span>
          <div className="w-10" />
        </div>

        {/* Progress Bar */}
        <div className="px-4 mb-4">
          <Progress value={progress} className="h-1.5 bg-secondary" />
        </div>

        <AnimatePresence mode="wait">
          {/* Preview State */}
          {workoutState === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 px-4 flex flex-col"
            >
              <h1 className="text-2xl font-serif font-light text-foreground mb-2">
                10 Minutes to Toned Arms
              </h1>
              <p className="text-muted-foreground mb-6">Upper Body • 10 min</p>

              <div className="bg-card rounded-2xl p-4 mb-6 border border-border/50">
                <h3 className="font-semibold text-foreground mb-3">Equipment Needed</h3>
                <div className="flex flex-wrap gap-2">
                  {["Dumbbells", "Chair or Bench"].map((item) => (
                    <span
                      key={item}
                      className="bg-secondary px-3 py-1.5 rounded-full text-sm text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl p-4 mb-6 border border-border/50">
                <h3 className="font-semibold text-foreground mb-3">Exercises</h3>
                <div className="space-y-3">
                  {workoutExercises.map((ex, idx) => (
                    <div key={ex.id} className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs text-foreground">
                        {idx + 1}
                      </span>
                      <span className="text-foreground flex-1">{ex.name}</span>
                      <span className="text-sm text-muted-foreground">{ex.duration}s</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pb-8">
                <Button
                  onClick={startWorkout}
                  className="w-full bg-foreground hover:bg-foreground/80 text-background rounded-full py-6 uppercase tracking-wider"
                >
                  Start Workout
                </Button>
              </div>
            </motion.div>
          )}

          {/* Countdown State */}
          {workoutState === "countdown" && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col items-center justify-center px-4"
            >
              <p className="text-muted-foreground mb-4">Get Ready</p>
              <motion.span
                key={timeRemaining}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-8xl font-serif text-foreground"
              >
                {timeRemaining}
              </motion.span>
              <p className="text-xl font-medium text-foreground mt-6">{currentExercise.name}</p>
            </motion.div>
          )}

          {/* Exercise State */}
          {workoutState === "exercise" && (
            <motion.div
              key="exercise"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 px-4 flex flex-col"
            >
              {/* Exercise Image */}
              <div className="aspect-video bg-secondary rounded-2xl mb-6 flex items-center justify-center">
                <span className="text-muted-foreground">Exercise Demo</span>
              </div>

              <h2 className="text-2xl font-serif text-foreground mb-2">{currentExercise.name}</h2>

              {/* Exercise Details */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {currentExercise.reps && (
                  <div className="bg-card rounded-xl p-3 text-center border border-border/50">
                    <p className="text-xs text-muted-foreground">Reps</p>
                    <p className="font-semibold text-foreground">{currentExercise.reps}</p>
                  </div>
                )}
                {currentExercise.sets && (
                  <div className="bg-card rounded-xl p-3 text-center border border-border/50">
                    <p className="text-xs text-muted-foreground">Sets</p>
                    <p className="font-semibold text-foreground">{currentExercise.sets}</p>
                  </div>
                )}
                {currentExercise.tempo && (
                  <div className="bg-card rounded-xl p-3 text-center border border-border/50">
                    <p className="text-xs text-muted-foreground">Tempo</p>
                    <p className="font-semibold text-foreground">{currentExercise.tempo}</p>
                  </div>
                )}
              </div>

              {currentExercise.notes && (
                <div className="bg-secondary/50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-foreground">{currentExercise.notes}</p>
                </div>
              )}

              {/* Equipment */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Equipment</p>
                <div className="flex gap-2">
                  {currentExercise.equipment.map((item) => (
                    <span
                      key={item}
                      className="bg-secondary px-3 py-1 rounded-full text-sm text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Next Exercise Preview */}
              {currentExerciseIndex < workoutExercises.length - 1 && (
                <div className="bg-card rounded-xl p-4 mb-6 border border-border/50 flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">Up Next:</span>
                  <span className="text-sm text-foreground flex-1">
                    {workoutExercises[currentExerciseIndex + 1].name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              )}

              <div className="mt-auto pb-8">
                <Button
                  onClick={completeExercise}
                  className="w-full bg-foreground hover:bg-foreground/80 text-background rounded-full py-6 uppercase tracking-wider"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Complete Movement
                </Button>
              </div>
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
              <div className="grid grid-cols-3 gap-4 w-full max-w-xs mb-8">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-foreground">10</p>
                  <p className="text-xs text-muted-foreground">Minutes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-foreground">{workoutExercises.length}</p>
                  <p className="text-xs text-muted-foreground">Exercises</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-foreground">85</p>
                  <p className="text-xs text-muted-foreground">Calories</p>
                </div>
              </div>
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
