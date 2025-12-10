import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface GoalRing {
  id: string;
  label: string;
  current: number;
  target: number;
  color: string;
}

const goalRings: GoalRing[] = [
  { id: "cardio", label: "Cardio", current: 15, target: 30, color: "stroke-rose-500" },
  { id: "steps", label: "Steps", current: 4500, target: 8000, color: "stroke-amber-500" },
  { id: "training", label: "Training", current: 2, target: 5, color: "stroke-emerald-500" },
  { id: "move", label: "Move", current: 25, target: 60, color: "stroke-sky-500" },
];

function CircularProgress({ 
  current, 
  target, 
  color, 
  size = 80 
}: { 
  current: number; 
  target: number; 
  color: string; 
  size?: number;
}) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min((current / target) * 100, 100);
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
        className="stroke-secondary"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className={color}
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
    </svg>
  );
}

export default function Goals() {
  return (
    <MobileLayout>
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-serif font-light text-foreground"
          >
            Goals
          </motion.h1>
        </div>

        {/* Goal Rings Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-6 mb-8"
        >
          {goalRings.slice(0, 3).map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-2">
                <CircularProgress
                  current={goal.current}
                  target={goal.target}
                  color={goal.color}
                  size={80}
                />
              </div>
              <span className="text-foreground font-medium text-sm">{goal.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Move Ring - Centered below */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative mb-2">
            <CircularProgress
              current={goalRings[3].current}
              target={goalRings[3].target}
              color={goalRings[3].color}
              size={80}
            />
          </div>
          <span className="text-foreground font-medium text-sm">{goalRings[3].label}</span>
        </motion.div>

        {/* Goal Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          {goalRings.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="flex items-center justify-between bg-card rounded-2xl px-5 py-4 border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${goal.color.replace('stroke-', 'bg-')}`} />
                <span className="text-foreground font-medium">{goal.label}</span>
              </div>
              <span className="text-muted-foreground">
                {goal.current} / {goal.target}
                {goal.id === "steps" ? "" : goal.id === "training" ? " sessions" : " min"}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MobileLayout>
  );
}
