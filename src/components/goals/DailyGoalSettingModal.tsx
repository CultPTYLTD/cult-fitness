import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";

interface DailyGoalSettingModalProps {
  open: boolean;
  onClose: () => void;
}

export function DailyGoalSettingModal({ open, onClose }: DailyGoalSettingModalProps) {
  const [sleepHours, setSleepHours] = useState(6);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 gap-0 max-w-md border-0 overflow-hidden bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
          <Button variant="ghost" onClick={onClose} className="text-muted-foreground">
            Skip This Step
          </Button>
        </div>

        <div className="p-6">
          <h2 className="text-3xl font-serif font-light text-foreground mb-2">
            Daily Goal Setting
          </h2>
          <p className="text-muted-foreground mb-8">
            How many hours of beauty sleep did you get?
          </p>

          {/* Sleep image placeholder */}
          <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center mb-8 overflow-hidden">
            <span className="text-5xl font-serif font-light text-foreground">
              {sleepHours} hours
            </span>
          </div>

          {/* Slider */}
          <Slider
            value={[sleepHours]}
            onValueChange={(v) => setSleepHours(v[0])}
            min={0}
            max={12}
            step={0.5}
            className="mb-8"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
