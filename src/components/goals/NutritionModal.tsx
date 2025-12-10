import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import { WeekSelector } from "./WeekSelector";

interface NutritionModalProps {
  open: boolean;
  onClose: () => void;
}

const days = [
  { label: "MON", date: 8 },
  { label: "TUE", date: 9 },
  { label: "WED", date: 10 },
  { label: "THU", date: 11 },
  { label: "FRI", date: 12 },
  { label: "SAT", date: 13 },
  { label: "SUN", date: 14 },
];

const macros = [
  { label: "Protein", value: 0 },
  { label: "Fats", value: 0 },
  { label: "Carbs", value: 0 },
  { label: "Fibre", value: 0 },
];

export function NutritionModal({ open, onClose }: NutritionModalProps) {
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 gap-0 max-w-md border-0 overflow-hidden">
        {/* Header with background */}
        <div className="relative h-48 bg-gradient-to-br from-primary/30 to-accent/20 flex items-end p-6">
          <h2 className="text-2xl font-serif text-foreground">Nutrition</h2>
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-background/90"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 bg-background">
          <WeekSelector
            weekNumber={0}
            dateRange="December 8 - 14"
            selectedDay={selectedDay}
            onDaySelect={setSelectedDay}
            onPrevWeek={() => {}}
            onNextWeek={() => {}}
            days={days}
          />

          {/* Calorie Total */}
          <div className="mb-6">
            <span className="text-sm text-muted-foreground">Calorie Total</span>
            <Progress value={0} className="mt-2 h-2" />
          </div>

          {/* Macros */}
          <div className="flex justify-between mb-8">
            {macros.map((macro) => (
              <div key={macro.label} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-border flex items-center justify-center mb-2">
                  <span className="text-lg font-semibold text-foreground">{macro.value}</span>
                </div>
                <span className="text-xs text-muted-foreground">{macro.label}</span>
              </div>
            ))}
          </div>

          {/* Average */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-2">
              Your average calorie compliance percentage in this Program is:
            </p>
            <div className="text-4xl font-serif font-light text-foreground">
              0 <span className="text-lg">%</span>
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={onClose}>
            DONE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
