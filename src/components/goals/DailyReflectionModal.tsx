import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import { toast } from "sonner";
import { WeekSelector } from "./WeekSelector";

interface DailyReflectionModalProps {
  open: boolean;
  onClose: () => void;
}

export function DailyReflectionModal({ open, onClose }: DailyReflectionModalProps) {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() || 7);

  // Mock data - would come from state management in real app
  const hydration = 1800;
  const hydrationGoal = 2500;
  const steps = 6500;
  const stepsGoal = 10000;
  const sleepHours = 7.5;
  const sleepGoal = 8;
  const caloriesConsumed = 1650;
  const calorieGoal = 1900;

  const macros = [
    { label: "Protein", value: 95, goal: 130 },
    { label: "Fats", value: 52, goal: 65 },
    { label: "Carbs", value: 180, goal: 200 },
    { label: "Fibre", value: 22, goal: 30 },
  ];

  const reflectionCards = [
    { 
      id: "hydration", 
      label: "HYDRATION", 
      value: `${hydration} of ${hydrationGoal} ml`,
      progress: (hydration / hydrationGoal) * 100,
      bgClass: "bg-gradient-to-r from-blue-200/80 to-blue-100/60" 
    },
    { 
      id: "steps", 
      label: "STEPS", 
      value: `${steps.toLocaleString()} of ${stepsGoal.toLocaleString()}`,
      progress: (steps / stepsGoal) * 100,
      bgClass: "bg-gradient-to-r from-green-200/80 to-green-100/60" 
    },
    { 
      id: "sleep", 
      label: "SLEEP", 
      value: `${sleepHours} of ${sleepGoal} hours`,
      progress: (sleepHours / sleepGoal) * 100,
      bgClass: "bg-gradient-to-r from-purple-200/80 to-purple-100/60" 
    },
  ];

  const handleComplete = () => {
    toast.success("Day completed! Great work!");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 gap-0 max-w-md border-0 overflow-hidden bg-background max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-end p-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="px-6 pb-6">
          <h2 className="text-3xl font-serif font-light text-foreground mb-4">
            DAILY REFLECTION
          </h2>

          {/* Week Selector */}
          <div className="mb-6">
            <WeekSelector selectedDay={selectedDay} onSelectDay={setSelectedDay} />
          </div>

          {/* Reflection cards */}
          <div className="space-y-3 mb-6">
            {reflectionCards.map((card) => (
              <div
                key={card.id}
                className={`${card.bgClass} rounded-2xl p-4`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground font-medium">{card.label}</span>
                  <span className="text-foreground font-semibold">{card.value}</span>
                </div>
                <Progress value={card.progress} className="h-2" />
              </div>
            ))}
          </div>

          {/* Calorie Goal */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground font-medium">CALORIE GOAL</span>
              <span className="text-foreground font-semibold">{caloriesConsumed} of {calorieGoal}</span>
            </div>
            <Progress value={(caloriesConsumed / calorieGoal) * 100} className="h-2" />
          </div>

          {/* Macros */}
          <div className="flex justify-between mb-8">
            {macros.map((macro) => (
              <div key={macro.label} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border-2 border-black/30 flex items-center justify-center mb-2 relative">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      className="text-black/20"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={`${(macro.value / macro.goal) * 150.8} 150.8`}
                      className="text-black"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-foreground">{macro.value}</span>
                </div>
                <span className="text-xs text-muted-foreground">{macro.label}</span>
              </div>
            ))}
          </div>

          <Button className="w-full" size="lg" onClick={handleComplete}>
            COMPLETE MY DAY
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
