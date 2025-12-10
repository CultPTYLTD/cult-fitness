import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Minus } from "lucide-react";
import { WeekSelector } from "./WeekSelector";
import { useGoals } from "@/contexts/GoalContext";
import { toast } from "sonner";

interface HydrationModalProps {
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

export function HydrationModal({ open, onClose }: HydrationModalProps) {
  const [selectedDay, setSelectedDay] = useState(1);
  const { goals, updateGoal } = useGoals();
  const [waterAmount, setWaterAmount] = useState(goals.water);

  const handleSave = () => {
    updateGoal("water", waterAmount);
    toast.success(`Hydration logged: ${waterAmount} ml`);
    onClose();
  };

  const addWater = (amount: number) => {
    setWaterAmount(prev => Math.max(0, prev + amount));
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 gap-0 max-w-md border-0 overflow-hidden [&>button]:hidden">
        {/* Header with background */}
        <div className="relative h-48 bg-gradient-to-br from-accent to-secondary flex items-end p-6">
          <h2 className="text-2xl font-serif text-foreground">Hydration</h2>
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

          {/* Hydration input */}
          <div className="text-center mb-6">
            <p className="text-muted-foreground mb-3">Enter water consumption (ml)</p>
            <div className="flex items-center justify-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-12 w-12"
                onClick={() => addWater(-250)}
              >
                <Minus className="w-5 h-5" />
              </Button>
              <Input
                type="number"
                value={waterAmount}
                onChange={(e) => setWaterAmount(Number(e.target.value))}
                className="w-32 text-center text-2xl font-serif bg-secondary/50 border-0 rounded-xl"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-12 w-12"
                onClick={() => addWater(250)}
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-muted-foreground mt-2">of 2,500 ml</p>
          </div>

          {/* Quick add buttons */}
          <div className="flex justify-center gap-2 mb-6">
            {[250, 500, 750].map(amount => (
              <Button 
                key={amount}
                variant="outline" 
                size="sm"
                className="rounded-full"
                onClick={() => addWater(amount)}
              >
                +{amount}ml
              </Button>
            ))}
          </div>

          {/* Average */}
          <div className="text-center mb-6">
            <p className="text-muted-foreground mb-2">
              Your average daily water consumption in this Program is:
            </p>
            <div className="text-4xl font-serif font-light text-foreground">
              {waterAmount} <span className="text-lg">ml</span>
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
