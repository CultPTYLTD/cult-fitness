import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { WeekSelector } from "./WeekSelector";

interface SleepModalProps {
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

export function SleepModal({ open, onClose }: SleepModalProps) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [sleepHours, setSleepHours] = useState(6);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 gap-0 max-w-md border-0 overflow-hidden">
        {/* Header with background */}
        <div className="relative h-48 bg-gradient-to-br from-secondary to-muted flex items-end p-6">
          <h2 className="text-2xl font-serif text-foreground">Sleep</h2>
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

          {/* Sleep value */}
          <div className="text-center mb-8">
            <div className="text-5xl font-serif font-light text-foreground mb-2">
              {sleepHours} hours
            </div>
            <Slider
              value={[sleepHours]}
              onValueChange={(v) => setSleepHours(v[0])}
              min={0}
              max={12}
              step={0.5}
              className="my-6"
            />
          </div>

          {/* Average */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-2">
              Your average nightly sleep in this Program is:
            </p>
            <div className="text-4xl font-serif font-light text-foreground">
              0.0 <span className="text-lg">hours</span>
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
