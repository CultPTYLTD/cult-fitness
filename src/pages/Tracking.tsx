import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface TrackingItem {
  label: string;
  value: number;
  unit: string;
}

const initialTracking: TrackingItem[] = [
  { label: "Start Weight", value: 64, unit: "KG" },
  { label: "Weight Difference", value: 0, unit: "KG" },
  { label: "Start Chest", value: 0, unit: "CM" },
  { label: "Chest Difference", value: 0, unit: "CM" },
  { label: "Start Waist", value: 0, unit: "CM" },
  { label: "Waist Difference", value: 0, unit: "CM" },
  { label: "Start Hips", value: 0, unit: "CM" },
  { label: "Hips Difference", value: 0, unit: "CM" },
  { label: "Start Arm", value: 0, unit: "CM" },
  { label: "Arm Difference", value: 0, unit: "CM" },
];

export default function Tracking() {
  const [tracking] = useState<TrackingItem[]>(initialTracking);

  return (
    <MobileLayout>
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-serif font-light text-foreground"
          >
            Tracking
          </motion.h1>
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarFallback className="bg-secondary text-foreground font-medium">
              CF
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Tracking Items */}
        <div className="space-y-3">
          {tracking.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between bg-card rounded-2xl px-5 py-4 border border-border/50"
            >
              <span className="text-foreground font-medium">{item.label}</span>
              <span className="text-foreground font-semibold">
                {item.value} {item.unit}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
