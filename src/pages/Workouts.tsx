import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { format, addDays, subDays, startOfWeek, isSameDay } from "date-fns";

type FilterType = "Dd" | "Fr" | "Mo" | "Av";

const filters: FilterType[] = ["Dd", "Fr", "Mo", "Av"];

const workoutCategories = [
  { id: "arms", name: "Arms", image: null },
  { id: "fullbody", name: "Full Body", image: null },
  { id: "mobility", name: "Mobility", image: null },
  { id: "logs", name: "Logs", image: null },
];

export default function Workouts() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Dd");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const navigateWeek = (direction: "prev" | "next") => {
    setSelectedDate(direction === "prev" ? subDays(selectedDate, 7) : addDays(selectedDate, 7));
  };

  return (
    <MobileLayout>
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-serif font-light text-foreground"
          >
            Workout
          </motion.h1>
          <Button variant="ghost" size="icon">
            <Calendar className="w-5 h-5" />
          </Button>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Week Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="icon" onClick={() => navigateWeek("prev")}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-1">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <span key={i} className="w-9 text-center text-xs text-muted-foreground">
                  {day}
                </span>
              ))}
            </div>
            <Button variant="ghost" size="icon" onClick={() => navigateWeek("next")}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex justify-center gap-1">
            {weekDays.map((day) => {
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-foreground text-background"
                      : isToday
                      ? "bg-secondary text-foreground"
                      : "text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Workout Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          {workoutCategories.map((category, index) => (
            <Link 
              to={category.id === "logs" ? "/tracking" : "/workouts/player"} 
              key={category.id}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="aspect-square bg-secondary rounded-2xl flex flex-col items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <div className="w-16 h-16 bg-muted rounded-xl mb-3 flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">✕</span>
                </div>
                <span className="text-foreground font-medium text-sm">{category.name}</span>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </MobileLayout>
  );
}
