import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronLeft, Search, Plus, Share2, Mail, MessageCircle, GripVertical } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Meal {
  id: string;
  title: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
}

const mockMeals: Meal[] = [
  { id: "1", title: "Avocado Toast with Eggs", image: "", calories: 420, protein: 18, carbs: 35, fat: 24, category: "breakfast" },
  { id: "2", title: "Greek Yogurt Parfait", image: "", calories: 280, protein: 15, carbs: 40, fat: 8, category: "breakfast" },
  { id: "3", title: "Grilled Chicken Salad", image: "", calories: 380, protein: 42, carbs: 12, fat: 18, category: "lunch" },
  { id: "4", title: "Quinoa Buddha Bowl", image: "", calories: 450, protein: 16, carbs: 58, fat: 18, category: "lunch" },
  { id: "5", title: "Salmon with Vegetables", image: "", calories: 520, protein: 45, carbs: 25, fat: 28, category: "dinner" },
  { id: "6", title: "Turkey Stir Fry", image: "", calories: 380, protein: 35, carbs: 32, fat: 14, category: "dinner" },
  { id: "7", title: "Protein Smoothie", image: "", calories: 220, protein: 25, carbs: 22, fat: 6, category: "snack" },
];

const mealGuides = [
  { id: "1", title: "High Protein Meals", count: 24 },
  { id: "2", title: "Low Carb Options", count: 18 },
  { id: "3", title: "Quick & Easy", count: 32 },
];

export default function Meals() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealOrder, setMealOrder] = useState(["breakfast", "lunch", "dinner", "snack"]);

  // Generate week dates
  const getWeekDates = () => {
    const dates = [];
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay() + 1); // Start from Monday
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();
  const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const calorieGoal = 2000;
  const consumedCalories = mockMeals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = mockMeals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = mockMeals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFat = mockMeals.reduce((sum, m) => sum + m.fat, 0);

  const navigateWeek = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction * 7);
    setSelectedDate(newDate);
  };

  const getMealsByCategory = (category: string) => {
    return mockMeals.filter((m) => m.category === category);
  };

  const filteredMeals = searchQuery
    ? mockMeals.filter((m) => m.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : mockMeals;

  if (showSearch) {
    return (
      <MobileLayout>
        <div className="px-4 pt-12 pb-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
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
            <Button variant="ghost" className="mt-2 text-muted-foreground" onClick={() => setShowSearch(false)}>
              Cancel
            </Button>
          </motion.div>

          <div className="space-y-3">
            {filteredMeals.map((meal, index) => (
              <Link to={`/meals/recipe/${meal.id}`} key={meal.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between py-4 border-b border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary rounded-lg" />
                    <div>
                      <h4 className="font-medium text-foreground">{meal.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {meal.calories} kcal - P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </Link>
            ))}
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
            MEALS
          </motion.h1>
          <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {/* Week Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="icon" onClick={() => navigateWeek(-1)}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="font-medium text-foreground">
              {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <Button variant="ghost" size="icon" onClick={() => navigateWeek(1)}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekDates.map((date, i) => {
              const isSelected = date.toDateString() === selectedDate.toDateString();
              const isToday = date.toDateString() === new Date().toDateString();
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center py-2 rounded-lg transition-colors ${
                    isSelected ? "bg-black text-white" : isToday ? "bg-secondary" : ""
                  }`}
                >
                  <span className="text-xs">{dayNames[i]}</span>
                  <span className="text-lg font-medium">{date.getDate()}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Calorie Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-2xl p-4 mb-6 border border-border/50"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">CALORIE GOAL</span>
            <span className="font-semibold text-foreground">
              {consumedCalories} / {calorieGoal} kcal
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-black rounded-full transition-all"
              style={{ width: `${Math.min((consumedCalories / calorieGoal) * 100, 100)}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-lg font-semibold text-foreground">{totalProtein}g</span>
              <p className="text-xs text-muted-foreground">PROTEIN</p>
            </div>
            <div>
              <span className="text-lg font-semibold text-foreground">{totalCarbs}g</span>
              <p className="text-xs text-muted-foreground">CARBS</p>
            </div>
            <div>
              <span className="text-lg font-semibold text-foreground">{totalFat}g</span>
              <p className="text-xs text-muted-foreground">FAT</p>
            </div>
          </div>
        </motion.div>

        {/* Meal Guides */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="font-semibold text-foreground mb-3">MEAL GUIDES & RECIPES</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {mealGuides.map((guide) => (
              <div
                key={guide.id}
                className="flex-shrink-0 bg-secondary rounded-xl px-4 py-3 min-w-[140px]"
              >
                <span className="text-sm font-medium text-foreground">{guide.title}</span>
                <p className="text-xs text-muted-foreground">{guide.count} recipes</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Meals by Category */}
        {mealOrder.map((category, categoryIndex) => {
          const meals = getMealsByCategory(category);
          if (meals.length === 0) return null;
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + categoryIndex * 0.05 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  <h3 className="font-semibold text-foreground capitalize">{category}</h3>
                </div>
                <span className="text-sm text-muted-foreground">
                  {meals.reduce((sum, m) => sum + m.calories, 0)} kcal
                </span>
              </div>

              <div className="space-y-2">
                {meals.map((meal) => (
                  <Link to={`/meals/recipe/${meal.id}`} key={meal.id}>
                    <div className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border/50">
                      <div className="w-16 h-16 bg-secondary rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">{meal.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {meal.calories} kcal | P: {meal.protein}g C: {meal.carbs}g F: {meal.fat}g
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Change Meal Plan Button */}
        <Button variant="outline" className="w-full">
          CHANGE MEAL PLAN
        </Button>
      </div>
    </MobileLayout>
  );
}
