import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Info, User, Shuffle } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { format, addDays, subDays, startOfWeek, isSameDay } from "date-fns";

const dayNames = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
const dayShort = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface Exercise {
  id: string;
  code: string;
  name: string;
  rounds: number;
  duration: string;
  hasVideo: boolean;
  completed: boolean;
}

interface Circuit {
  id: string;
  name: string;
  exercises: Exercise[];
}

// Mock workout data per day
const workoutsByDay: Record<number, { title: string; circuits: Circuit[] }> = {
  1: { 
    title: "LOWER BODY & GLUTES",
    circuits: [
      {
        id: "a",
        name: "Circuit A",
        exercises: [
          { id: "a1", code: "A1", name: "Barbell Sumo Deadlifts", rounds: 3, duration: "45 Secs", hasVideo: true, completed: false },
          { id: "a2", code: "A2", name: "Dumbbell Floor Lat Pull Backs", rounds: 3, duration: "30 Secs", hasVideo: false, completed: false },
          { id: "a3", code: "A3", name: "Dumbbell T Raises", rounds: 3, duration: "30 Secs", hasVideo: true, completed: false },
        ]
      },
      {
        id: "b",
        name: "Circuit B",
        exercises: [
          { id: "b1", code: "B1", name: "Dumbbell Reverse Fly Complex", rounds: 3, duration: "45 Secs", hasVideo: false, completed: false },
          { id: "b2", code: "B2", name: "Dumbbell Staggered Squats", rounds: 3, duration: "30 Secs E/S", hasVideo: true, completed: false },
          { id: "b3", code: "B3", name: "Barbell Hip Thrust Pulses", rounds: 3, duration: "30 Secs", hasVideo: true, completed: false },
        ]
      },
      {
        id: "c",
        name: "Circuit C",
        exercises: [
          { id: "c1", code: "C1", name: "Dumbbell Superman Raises", rounds: 3, duration: "45 Secs", hasVideo: false, completed: false },
          { id: "c2", code: "C2", name: "Ankle Weight Bird Dogs", rounds: 3, duration: "30 Secs", hasVideo: true, completed: false },
          { id: "c3", code: "C3", name: "Ankle Weight Angled Kickbacks", rounds: 3, duration: "30 Secs E/S", hasVideo: true, completed: false },
        ]
      }
    ]
  },
  2: { title: "UPPER BODY & ARMS", circuits: [] },
  3: { title: "FULL BODY HIIT", circuits: [] },
  4: { title: "CORE & MOBILITY", circuits: [] },
  5: { title: "LOWER BODY FOCUS", circuits: [] },
  6: { title: "REST DAY", circuits: [] },
  0: { title: "ACTIVE RECOVERY", circuits: [] },
};

export default function Workouts() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showExerciseList, setShowExerciseList] = useState(false);
  const [selectedCircuit, setSelectedCircuit] = useState<Circuit | null>(null);
  const [showExerciseDetail, setShowExerciseDetail] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [checkedExercises, setCheckedExercises] = useState<string[]>([]);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const dayOfWeek = selectedDate.getDay();
  const todayWorkout = workoutsByDay[dayOfWeek] || { title: "REST DAY", circuits: [] };

  const navigateWeek = (direction: "prev" | "next") => {
    setSelectedDate(direction === "prev" ? subDays(selectedDate, 7) : addDays(selectedDate, 7));
  };

  const handleCircuitClick = (circuit: Circuit) => {
    setSelectedCircuit(circuit);
    setShowExerciseList(true);
  };

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseDetail(true);
  };

  const toggleExercise = (exerciseId: string) => {
    setCheckedExercises(prev =>
      prev.includes(exerciseId)
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const startWorkout = () => {
    setIsWorkoutStarted(true);
    let count = 3;
    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(timer);
        // Navigate to workout player after countdown
        navigate("/workouts/player");
      }
    }, 1000);
  };

  // Countdown Screen
  if (isWorkoutStarted && countdown > 0) {
    return (
      <MobileLayout showNav={false}>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <motion.div
            key={countdown}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="text-white text-9xl font-serif"
          >
            {countdown}
          </motion.div>
        </div>
      </MobileLayout>
    );
  }

  // Exercise Detail Modal
  if (showExerciseDetail && selectedExercise) {
    return (
      <MobileLayout showNav={false}>
        <div className="min-h-screen bg-background">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" size="icon" onClick={() => setShowExerciseDetail(false)}>
              <X className="w-6 h-6" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Gym</span>
              <Shuffle className="w-5 h-5" />
            </div>
          </div>

          <div className="px-4">
            {/* Video Placeholder */}
            <div className="aspect-video bg-secondary rounded-2xl mb-6 flex items-center justify-center">
              <span className="text-muted-foreground">Exercise Video</span>
            </div>

            <h1 className="text-2xl font-serif font-light text-foreground mb-2">
              {selectedExercise.name}
            </h1>
            <p className="text-muted-foreground mb-6">
              {selectedExercise.rounds} Rounds, {selectedExercise.duration}
            </p>

            {/* Instructions */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">INSTRUCTIONS</h3>
              <ol className="space-y-3 text-foreground">
                <li className="flex gap-3">
                  <span className="font-semibold">1.</span>
                  <span>Stand with feet wider than hip-width apart, toes pointed slightly outward.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold">2.</span>
                  <span>Hold the barbell with an overhand grip at arm's length.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold">3.</span>
                  <span>Push your hips back and lower until thighs are parallel to the floor.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold">4.</span>
                  <span>Drive through your heels to return to standing position.</span>
                </li>
              </ol>
            </div>

            {/* Workout Notes */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">WORKOUT NOTES</h3>
              <p className="text-muted-foreground">
                Focus on keeping your chest up and core engaged throughout the movement. 
                Control the descent for maximum muscle activation.
              </p>
            </div>

            {/* Exercise Swap */}
            <Button variant="outline" className="w-full rounded-full mb-4">
              <Shuffle className="w-4 h-4 mr-2" />
              SWAP EXERCISE
            </Button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  // Exercise List Modal
  if (showExerciseList && selectedCircuit) {
    return (
      <MobileLayout showNav={false}>
        <div className="min-h-screen bg-background">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" size="icon" onClick={() => setShowExerciseList(false)}>
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Gym</span>
              <Shuffle className="w-5 h-5" />
            </div>
          </div>

          <div className="px-4">
            <Button 
              className="w-full rounded-full py-6 mb-6 uppercase tracking-wider"
              onClick={startWorkout}
              variant="olive"
            >
              START WORKOUT
            </Button>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-serif">EXERCISES</h2>
              <Button variant="ghost" size="icon">
                <Info className="w-5 h-5" />
              </Button>
            </div>

            {/* All Circuits */}
            {todayWorkout.circuits.map((circuit) => (
              <div key={circuit.id} className="bg-card rounded-2xl p-4 mb-4 border border-border/50">
                {circuit.exercises.map((exercise) => (
                  <div 
                    key={exercise.id}
                    className="flex items-center justify-between py-3 border-b border-border/30 last:border-0"
                  >
                    <div 
                      className="flex items-center gap-3 flex-1 cursor-pointer"
                      onClick={() => handleExerciseClick(exercise)}
                    >
                      <span className="font-semibold text-foreground w-8">{exercise.code}</span>
                      <div>
                        <p className="font-medium text-foreground">{exercise.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {exercise.rounds} Rounds, {exercise.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {exercise.hasVideo && <User className="w-5 h-5 text-foreground" />}
                      <Checkbox 
                        checked={checkedExercises.includes(exercise.id)}
                        onCheckedChange={() => toggleExercise(exercise.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <Button 
              className="w-full rounded-full py-6 mt-4 uppercase tracking-wider"
              onClick={() => navigate("/")}
            >
              COMPLETE WORKOUT
            </Button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-serif font-light text-foreground"
          >
            WORKOUTS
          </motion.h1>
          <p className="text-sm text-muted-foreground">WEEK 6 OF 12</p>
        </div>

        {/* Week Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="icon" onClick={() => navigateWeek("prev")}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="text-foreground font-medium">
              {format(weekStart, "MMMM d")} - {format(addDays(weekStart, 6), "d, yyyy")}
            </span>
            <Button variant="ghost" size="icon" onClick={() => navigateWeek("next")}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayShort.map((day, i) => (
              <span key={i} className="text-center text-xs text-muted-foreground">
                {day}
              </span>
            ))}
          </div>

          {/* Day Numbers */}
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day) => {
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`h-10 rounded-full text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-black text-white"
                      : isToday
                      ? "bg-olive/20 text-foreground"
                      : "text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Today's Workout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <h2 className="text-xl font-serif mb-4">
            {dayNames[selectedDate.getDay() === 0 ? 6 : selectedDate.getDay() - 1]}
          </h2>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {todayWorkout.title}
          </h3>

          {todayWorkout.circuits.length > 0 ? (
            <div className="space-y-3">
              {todayWorkout.circuits.map((circuit, index) => (
                <motion.button
                  key={circuit.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  onClick={() => handleCircuitClick(circuit)}
                  className="w-full bg-card rounded-2xl p-4 border border-border/50 text-left hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{circuit.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {circuit.exercises.length} exercises
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-8 text-center border border-border/50">
              <p className="text-muted-foreground">
                {todayWorkout.title === "REST DAY" 
                  ? "Take today to rest and recover. Your body needs it!" 
                  : "No workout scheduled for this day."}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </MobileLayout>
  );
}
