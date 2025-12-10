import { MobileLayout } from "@/components/MobileLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const todayWorkout = {
  title: "Full Body Sculpt",
  duration: "35 min",
  calories: "280 cal",
  level: "Intermediate",
};

const quickStats = [
  { label: "Day Streak", value: "12" },
  { label: "This Week", value: "4/5" },
  { label: "Calories", value: "1,247" },
];

export default function Home() {
  return (
    <MobileLayout>
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-muted-foreground text-sm">Good morning</p>
            <h1 className="text-2xl font-serif font-light text-foreground">
              Welcome back
            </h1>
          </motion.div>
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarFallback className="bg-secondary text-foreground font-medium">
              CF
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-secondary/50 rounded-2xl p-4 text-center"
            >
              <div className="text-2xl font-serif font-light text-foreground">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Today's Workout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-light text-foreground">
              Today's Workout
            </h2>
            <Link to="/workouts">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="bg-card rounded-2xl overflow-hidden border border-border/50">
            <div className="relative h-48 bg-gradient-to-br from-secondary to-muted">
              <button className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-background/90 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-foreground ml-1" />
                </div>
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-foreground text-lg mb-2">
                {todayWorkout.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span>{todayWorkout.duration}</span>
                <span>•</span>
                <span>{todayWorkout.calories}</span>
                <span>•</span>
                <span>{todayWorkout.level}</span>
              </div>
              <Button className="w-full">Start Workout</Button>
            </div>
          </div>
        </motion.div>

        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-serif font-light text-foreground mb-4">
            Weekly Progress
          </h2>
          <div className="bg-card rounded-2xl p-5 border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground">Workouts completed</span>
              <span className="text-foreground font-semibold">4 of 5</span>
            </div>
            <Progress value={80} className="h-2 mb-4" />
            <p className="text-sm text-muted-foreground">
              Great progress! Just 1 more workout to hit your weekly goal.
            </p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-3"
        >
          <Link to="/goals">
            <Button variant="outline" className="w-full h-auto py-4 flex-col rounded-2xl">
              <span className="text-lg mb-1">🎯</span>
              <span>Daily Goals</span>
            </Button>
          </Link>
          <Link to="/meals">
            <Button variant="outline" className="w-full h-auto py-4 flex-col rounded-2xl">
              <span className="text-lg mb-1">🥗</span>
              <span>Meal Plans</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </MobileLayout>
  );
}
