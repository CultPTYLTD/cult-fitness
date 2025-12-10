import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-fitness.jpg";
import workoutYoga from "@/assets/workout-yoga.jpg";
import workoutStrength from "@/assets/workout-strength.jpg";
import workoutPilates from "@/assets/workout-pilates.jpg";
import workoutHiit from "@/assets/workout-hiit.jpg";
import { SleepModal } from "@/components/goals/SleepModal";
import { NutritionModal } from "@/components/goals/NutritionModal";
import { HydrationModal } from "@/components/goals/HydrationModal";
import { StepsModal } from "@/components/goals/StepsModal";
import { DailyGoalSettingModal } from "@/components/goals/DailyGoalSettingModal";
import { DailyReflectionModal } from "@/components/goals/DailyReflectionModal";

const goalCards = [
  { id: "sleep", label: "SLEEP", image: heroImage },
  { id: "nutrition", label: "NUTRITION", image: workoutYoga },
  { id: "hydration", label: "HYDRATION", image: workoutStrength },
  { id: "steps", label: "STEPS", image: workoutPilates },
  { id: "daily-goal", label: "DAILY GOAL SETTING", image: workoutHiit },
  { id: "daily-reflection", label: "DAILY REFLECTION", image: heroImage },
];

export default function Goals() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-serif font-light text-foreground"
          >
            GOALS
          </motion.h1>
        </div>

        {/* Goal Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          {goalCards.map((goal, index) => (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              onClick={() => setActiveModal(goal.id)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
            >
              <img
                src={goal.image}
                alt={goal.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-semibold text-sm text-center px-2">
                  {goal.label}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Modals */}
      <SleepModal open={activeModal === "sleep"} onClose={() => setActiveModal(null)} />
      <NutritionModal open={activeModal === "nutrition"} onClose={() => setActiveModal(null)} />
      <HydrationModal open={activeModal === "hydration"} onClose={() => setActiveModal(null)} />
      <StepsModal open={activeModal === "steps"} onClose={() => setActiveModal(null)} />
      <DailyGoalSettingModal open={activeModal === "daily-goal"} onClose={() => setActiveModal(null)} />
      <DailyReflectionModal open={activeModal === "daily-reflection"} onClose={() => setActiveModal(null)} />
    </MobileLayout>
  );
}
