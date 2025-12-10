import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Search, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface MacroCircle {
  label: string;
  value: number;
  unit: string;
}

const macroCircles: MacroCircle[] = [
  { label: "Protein", value: 500, unit: "kcal" },
  { label: "Fats", value: 90, unit: "kcal" },
  { label: "Carbs", value: 100, unit: "kcal" },
  { label: "Fiber", value: 500, unit: "cel" },
];

const mealCategories = [
  { id: "breakfast", label: "Breakfast", calories: 350 },
  { id: "dinner", label: "Dinner", calories: 600 },
];

const suggestedMeals = [
  {
    id: "1",
    title: "Sample Meal",
    calories: 400,
    protein: 35,
    carbs: 25,
    fat: 10,
  },
  {
    id: "2",
    title: "Sample Meal",
    calories: 400,
    protein: 35,
    carbs: 25,
    fat: 10,
  },
  {
    id: "3",
    title: "Sample Meal",
    calories: 400,
    protein: 35,
    carbs: 25,
    fat: 10,
  },
];

const weekDays = ["T", "M", "W", "T", "F", "S", "S"];

export default function Meals() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  if (showSearch) {
    return (
      <MobileLayout>
        <div className="px-4 pt-12 pb-8">
          {/* Search Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for meal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 rounded-full bg-secondary border-0"
                autoFocus
              />
            </div>
            <Button 
              variant="ghost" 
              className="mt-2 text-muted-foreground"
              onClick={() => setShowSearch(false)}
            >
              Cancel
            </Button>
          </motion.div>

          {/* Search Results */}
          <div className="mb-4">
            <p className="text-muted-foreground text-sm mb-4">Sorted for meal</p>
            <div className="space-y-3">
              {suggestedMeals.map((meal, index) => (
                <Link to={`/meals/recipe/${meal.id}`} key={meal.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between py-4 border-b border-border/50"
                  >
                    <div>
                      <h4 className="font-medium text-foreground">{meal.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {meal.calories} kcal - {meal.protein} g | {meal.carbs} g - {meal.fat} g
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MobileLayout>
    );
  }

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
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSearch(true)}
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {/* Week Days */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-between mb-6"
        >
          {weekDays.map((day, i) => (
            <span 
              key={i} 
              className="w-8 h-8 flex items-center justify-center text-sm text-muted-foreground"
            >
              {day}
            </span>
          ))}
        </motion.div>

        {/* Macro Circles */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-4 gap-2 mb-8"
        >
          {macroCircles.map((macro, index) => (
            <motion.div
              key={macro.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              className="flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full border-2 border-secondary flex items-center justify-center mb-1">
                {/* Empty circle placeholder */}
              </div>
              <span className="text-xs text-muted-foreground">{macro.label}</span>
              <span className="text-xs text-muted-foreground">{macro.value} {macro.unit}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Meal Categories */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Breakfast</h3>
            <span className="text-muted-foreground text-sm">330 kcal</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {mealCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + index * 0.05 }}
                className="aspect-square bg-secondary rounded-2xl flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-muted rounded-xl mb-2 flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">✕</span>
                </div>
                <span className="text-foreground text-sm">{category.label}</span>
                <span className="text-muted-foreground text-xs">{category.calories} kcal</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </MobileLayout>
  );
}
