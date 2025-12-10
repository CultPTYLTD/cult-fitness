import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { motion } from "framer-motion";
import { SleepModal } from "@/components/goals/SleepModal";
import { NutritionModal } from "@/components/goals/NutritionModal";
import { HydrationModal } from "@/components/goals/HydrationModal";
import { StepsModal } from "@/components/goals/StepsModal";
import { DailyGoalSettingModal } from "@/components/goals/DailyGoalSettingModal";
import { DailyReflectionModal } from "@/components/goals/DailyReflectionModal";

const goalCards = [
  { id: "sleep", label: "SLEEP", bgClass: "bg-gradient-to-br from-secondary to-secondary/80" },
  { id: "nutrition", label: "NUTRITION", bgClass: "bg-gradient-to-br from-primary/30 to-primary/20" },
  { id: "hydration", label: "HYDRATION", bgClass: "bg-gradient-to-br from-accent to-accent/80" },
  { id: "steps", label: "STEPS", bgClass: "bg-gradient-to-br from-muted to-muted/80" },
  { id: "daily-goal-setting", label: "DAILY GOAL\nSETTING", bgClass: "bg-gradient-to-br from-secondary/90 to-secondary/70" },
  { id: "daily-reflection", label: "DAILY\nREFLECTION", bgClass: "bg-gradient-to-br from-muted/90 to-muted/70" },
];

export default function Goals() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <MobileLayout>
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-serif font-light text-foreground"
          >
            Goals
          </motion.h1>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Info className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarFallback className="bg-secondary text-foreground font-medium">
                CF
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Today label with Edit */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-muted-foreground">Today</span>
          <Button variant="outline" size="sm" className="rounded-full px-4">
            Edit
          </Button>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-2 gap-4">
          {goalCards.map((card, index) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => setActiveModal(card.id)}
              className={`${card.bgClass} aspect-square rounded-2xl flex items-center justify-center p-4 transition-transform hover:scale-[1.02] active:scale-[0.98]`}
            >
              <span className="text-foreground font-semibold text-sm tracking-wider text-center whitespace-pre-line">
                {card.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modals */}
      <SleepModal open={activeModal === "sleep"} onClose={() => setActiveModal(null)} />
      <NutritionModal open={activeModal === "nutrition"} onClose={() => setActiveModal(null)} />
      <HydrationModal open={activeModal === "hydration"} onClose={() => setActiveModal(null)} />
      <StepsModal open={activeModal === "steps"} onClose={() => setActiveModal(null)} />
      <DailyGoalSettingModal open={activeModal === "daily-goal-setting"} onClose={() => setActiveModal(null)} />
      <DailyReflectionModal open={activeModal === "daily-reflection"} onClose={() => setActiveModal(null)} />
    </MobileLayout>
  );
}
