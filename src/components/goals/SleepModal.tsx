import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { toast } from "sonner";

interface SleepModalProps {
  open: boolean;
  onClose: () => void;
}

export function SleepModal({ open, onClose }: SleepModalProps) {
  const [sleepHours, setSleepHours] = useState(7);
  const weekData = [8, 7.5, 6, 7, 8, 0, 0];
  const averageSleep = weekData.filter(h => h > 0).reduce((a, b) => a + b, 0) / weekData.filter(h => h > 0).length || 0;

  const handleSave = () => {
    toast.success(`Sleep logged: ${sleepHours} hours`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 gap-0 max-w-md border-0 overflow-hidden bg-background max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5" /></Button>
          <span className="font-medium text-foreground">SLEEP TRACKING</span>
          <div className="w-10" />
        </div>

        <div className="p-6">
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-medium text-foreground mb-4">HOW MANY HOURS DID YOU SLEEP?</h3>
            <div className="text-center mb-6">
              <span className="text-5xl font-serif font-light text-foreground">{sleepHours}</span>
              <span className="text-xl text-muted-foreground ml-2">hours</span>
            </div>
            <Slider value={[sleepHours]} onValueChange={(v) => setSleepHours(v[0])} min={0} max={12} step={0.5} className="mb-4" />
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border/50 mb-6">
            <h4 className="font-medium text-foreground mb-3">THIS WEEK</h4>
            <div className="flex justify-between items-end h-20 mb-2">
              {weekData.map((hours, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-6 bg-purple-300 rounded-t" style={{ height: `${(hours / 12) * 60}px` }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (<span key={i} className="w-6 text-center">{day}</span>))}
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-muted-foreground">Average sleep this week</p>
            <p className="text-2xl font-semibold text-foreground">{averageSleep.toFixed(1)} hours</p>
          </div>

          <Button className="w-full" size="lg" onClick={handleSave}>SAVE</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
