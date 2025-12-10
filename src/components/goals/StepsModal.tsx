import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { WeekSelector } from "./WeekSelector";
import { useGoals } from "@/contexts/GoalContext";
import { toast } from "sonner";

interface StepsModalProps {
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

export function StepsModal({ open, onClose }: StepsModalProps) {
  const [selectedDay, setSelectedDay] = useState(1);
  const { goals, updateGoal } = useGoals();
  const [stepsAmount, setStepsAmount] = useState(goals.steps);

  const handleSave = () => {
    updateGoal("steps", stepsAmount);
    toast.success(`Steps logged: ${stepsAmount.toLocaleString()}`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 gap-0 max-w-md border-0 overflow-hidden [&>button]:hidden">
        {/* Header with background */}
        <div className="relative h-48 bg-gradient-to-br from-muted to-secondary flex items-end p-6">
          <h2 className="text-2xl font-serif text-foreground">Steps</h2>
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
            weekNumber={6}
            dateRange="December 8 - 14"
            selectedDay={selectedDay}
            onDaySelect={setSelectedDay}
            onPrevWeek={() => {}}
            onNextWeek={() => {}}
            days={days}
          />

          {/* Steps input */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-3">Enter your steps</p>
            <div className="bg-secondary/50 rounded-2xl py-6 px-8 inline-block mb-2">
              <Input
                type="number"
                value={stepsAmount}
                onChange={(e) => setStepsAmount(Number(e.target.value))}
                className="text-4xl font-serif font-light text-foreground text-center bg-transparent border-0 w-40"
              />
            </div>
            <p className="text-muted-foreground">of 8,000</p>
          </div>

          {/* Quick add buttons */}
          <div className="flex justify-center gap-2 mb-6">
            {[1000, 2500, 5000].map(amount => (
              <Button 
                key={amount}
                variant="outline" 
                size="sm"
                className="rounded-full"
                onClick={() => setStepsAmount(prev => prev + amount)}
              >
                +{amount.toLocaleString()}
              </Button>
            ))}
          </div>

          {/* Average */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-2">
              Your average daily steps in this Program are:
            </p>
            <div className="text-4xl font-serif font-light text-foreground">
              {stepsAmount.toLocaleString()} <span className="text-lg">steps</span>
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={handleSave}>
            SAVE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
