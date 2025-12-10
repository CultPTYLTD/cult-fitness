import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";

interface DailyReflectionModalProps {
  open: boolean;
  onClose: () => void;
}

const reflectionCards = [
  { id: "hydration", label: "Hydration", value: "0 of 2,500 ml", bgClass: "bg-gradient-to-r from-accent/80 to-accent/60" },
  { id: "steps", label: "Steps", value: "0 of 8 000", bgClass: "bg-gradient-to-r from-muted to-secondary/80" },
  { id: "sleep", label: "Sleep", value: "0 hours", bgClass: "bg-gradient-to-r from-secondary to-muted/80" },
];

const macros = [
  { label: "Protein", value: 0 },
  { label: "Fats", value: 0 },
  { label: "Carbs", value: 0 },
  { label: "Fibre", value: 0 },
];

export function DailyReflectionModal({ open, onClose }: DailyReflectionModalProps) {
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
          <h2 className="text-3xl font-serif font-light text-foreground mb-6">
            Daily Reflection
          </h2>

          {/* Reflection cards */}
          <div className="space-y-3 mb-6">
            {reflectionCards.map((card) => (
              <div
                key={card.id}
                className={`${card.bgClass} rounded-2xl p-4 flex items-center justify-between`}
              >
                <span className="text-foreground font-medium">{card.label}</span>
                <span className="text-foreground font-semibold">{card.value}</span>
              </div>
            ))}
          </div>

          {/* Calorie Goal */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground">Calorie Goal</span>
              <span className="text-foreground font-semibold">0 of 1900</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>

          {/* Macros */}
          <div className="flex justify-between mb-8">
            {macros.map((macro) => (
              <div key={macro.label} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center mb-2">
                  <span className="text-lg font-semibold text-foreground">{macro.value}</span>
                </div>
                <span className="text-xs text-muted-foreground">{macro.label}</span>
              </div>
            ))}
          </div>

          <Button className="w-full" size="lg" onClick={onClose}>
            COMPLETE MY DAY
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
