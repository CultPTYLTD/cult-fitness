import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { format, addDays, subDays, startOfWeek, isSameDay } from "date-fns";

const mealCategories = [
  { id: "breakfast", label: "Breakfast", icon: "🌅" },
  { id: "lunch", label: "Lunch", icon: "☀️" },
  { id: "dinner", label: "Dinner", icon: "🌙" },
  { id: "snacks", label: "Snacks", icon: "🍎" },
];

const suggestedMeals = [
  {
    id: "1",
    title: "Avocado Toast with Eggs",
    calories: 380,
    time: "15 min",
    category: "Breakfast",
    protein: 18,
    carbs: 32,
    fat: 22,
  },
  {
    id: "2",
    title: "Grilled Chicken Salad",
    calories: 420,
    time: "20 min",
    category: "Lunch",
    protein: 42,
    carbs: 18,
    fat: 20,
  },
  {
    id: "3",
    title: "Salmon with Vegetables",
    calories: 520,
    time: "30 min",
    category: "Dinner",
    protein: 45,
    carbs: 24,
    fat: 28,
  },
];

const dailyMacros = {
  calories: { current: 1240, target: 2000 },
  protein: { current: 85, target: 120 },
  carbs: { current: 142, target: 200 },
  fat: { current: 52, target: 65 },
};

export default function Meals() {
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
            Meals
          </motion.h1>
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarFallback className="bg-secondary text-foreground font-medium">
              CF
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Calendar Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-4 mb-6 border border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon" onClick={() => navigateWeek("prev")}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="font-medium text-foreground">
              {format(selectedDate, "MMMM yyyy")}
            </span>
            <Button variant="ghost" size="icon" onClick={() => navigateWeek("next")}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day) => {
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`flex flex-col items-center py-2 rounded-xl transition-colors ${
                    isSelected
                      ? "bg-foreground text-background"
                      : isToday
                      ? "bg-secondary"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  <span className="text-xs text-inherit opacity-70">
                    {format(day, "EEE")}
                  </span>
                  <span className="text-lg font-medium">{format(day, "d")}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Daily Macros Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-4 mb-6 border border-border/50"
        >
          <h3 className="font-semibold text-foreground mb-4">Daily Macros</h3>
          
          {/* Calories */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Calories</span>
              <span className="text-sm text-foreground font-medium">
                {dailyMacros.calories.current} / {dailyMacros.calories.target}
              </span>
            </div>
            <Progress
              value={(dailyMacros.calories.current / dailyMacros.calories.target) * 100}
              className="h-3 bg-secondary"
            />
          </div>

          {/* Macro Breakdown */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-secondary/50 rounded-xl p-3 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center mb-2">
                <span className="text-white text-xs font-medium">
                  {dailyMacros.protein.current}g
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Protein</span>
              <Progress
                value={(dailyMacros.protein.current / dailyMacros.protein.target) * 100}
                className="h-1 mt-2 bg-secondary"
              />
            </div>
            <div className="bg-secondary/50 rounded-xl p-3 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-2">
                <span className="text-white text-xs font-medium">
                  {dailyMacros.carbs.current}g
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Carbs</span>
              <Progress
                value={(dailyMacros.carbs.current / dailyMacros.carbs.target) * 100}
                className="h-1 mt-2 bg-secondary"
              />
            </div>
            <div className="bg-secondary/50 rounded-xl p-3 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center mb-2">
                <span className="text-white text-xs font-medium">
                  {dailyMacros.fat.current}g
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Fat</span>
              <Progress
                value={(dailyMacros.fat.current / dailyMacros.fat.target) * 100}
                className="h-1 mt-2 bg-secondary"
              />
            </div>
          </div>
        </motion.div>

        {/* Meal Categories */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="font-semibold text-foreground mb-3">Log Your Meals</h3>
          <div className="grid grid-cols-4 gap-2">
            {mealCategories.map((category) => (
              <button
                key={category.id}
                className="bg-card rounded-2xl p-3 border border-border/50 hover:bg-secondary/50 transition-colors"
              >
                <span className="text-2xl mb-1 block">{category.icon}</span>
                <span className="text-xs text-muted-foreground">{category.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Suggested Meals */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Suggested Recipes</h3>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              See All
            </Button>
          </div>
          <div className="space-y-3">
            {suggestedMeals.map((meal, index) => (
              <Link to={`/meals/recipe/${meal.id}`} key={meal.id}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-card rounded-2xl p-4 border border-border/50 flex items-center gap-4 hover:bg-secondary/30 transition-colors"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-muted rounded-xl flex-shrink-0 flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">Photo</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{meal.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {meal.calories} cal • {meal.time}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">P: {meal.protein}g</span>
                      <span className="text-xs text-muted-foreground">C: {meal.carbs}g</span>
                      <span className="text-xs text-muted-foreground">F: {meal.fat}g</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Plus className="w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </MobileLayout>
  );
}
