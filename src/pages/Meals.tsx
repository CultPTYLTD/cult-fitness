import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronLeft, Search, GripVertical, Loader2, Camera, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { FoodScanner } from "@/components/FoodScanner";
import { useGoals } from "@/contexts/GoalContext";
import { toast } from "sonner";

interface MealPlan {
  id: string;
  name: string;
  description: string | null;
  calories: number | null;
  protein_g: number | null;
  carbs_g: number | null;
  fats_g: number | null;
  fibre_g: number | null;
  image_url: string | null;
  meal_type: string | null;
  recipe_instructions: string | null;
  ingredients: any;
}

const mealGuides = [
  { id: "1", title: "High Protein Meals", count: 24 },
  { id: "2", title: "Low Carb Options", count: 18 },
  { id: "3", title: "Quick & Easy", count: 32 },
];

export default function Meals() {
  const navigate = useNavigate();
  const { foodScans, refreshFoodScans, goals } = useGoals();
  const [meals, setMeals] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealOrder] = useState(["breakfast", "lunch", "dinner", "snack"]);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    fetchMeals();
    refreshFoodScans();
  }, []);

  const fetchMeals = async () => {
    try {
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMeals(data || []);
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate week dates
  const getWeekDates = () => {
    const dates = [];
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay() + 1);
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
  const scannedCalories = foodScans.reduce((sum, s) => sum + (s.calories || 0), 0);
  const consumedCalories = scannedCalories;
  const scannedProtein = foodScans.reduce((sum, s) => sum + (s.protein_g || 0), 0);
  const scannedCarbs = foodScans.reduce((sum, s) => sum + (s.carbs_g || 0), 0);
  const scannedFat = foodScans.reduce((sum, s) => sum + (s.fats_g || 0), 0);
  const totalProtein = scannedProtein;
  const totalCarbs = scannedCarbs;
  const totalFat = scannedFat;

  const deleteFoodScan = async (id: string) => {
    try {
      const { error } = await supabase.from('food_scans').delete().eq('id', id);
      if (error) throw error;
      toast.success('Food removed from log');
      refreshFoodScans();
    } catch (error) {
      toast.error('Failed to remove food');
    }
  };

  const navigateWeek = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction * 7);
    setSelectedDate(newDate);
  };

  const getMealsByCategory = (category: string) => {
    return meals.filter((m) => m.meal_type === category);
  };

  const filteredMeals = searchQuery
    ? meals.filter((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : meals;

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </MobileLayout>
    );
  }

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
                    {meal.image_url ? (
                      <img src={meal.image_url} alt={meal.name} className="w-12 h-12 rounded-lg object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-secondary rounded-lg" />
                    )}
                    <div>
                      <h4 className="font-medium text-foreground">{meal.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {meal.calories} kcal - P: {meal.protein_g}g | C: {meal.carbs_g}g | F: {meal.fats_g}g
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
        {/* Food Scanner Modal */}
        <FoodScanner 
          open={showScanner} 
          onClose={() => setShowScanner(false)}
          onScanComplete={() => refreshFoodScans()}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-serif font-light text-foreground"
          >
            MEALS
          </motion.h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowScanner(true)}>
              <Camera className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
              <Search className="w-5 h-5" />
            </Button>
          </div>
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

        {/* Today's Food Log */}
        {foodScans.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h3 className="font-semibold text-foreground mb-3">TODAY'S FOOD LOG</h3>
            <div className="space-y-2">
              {foodScans.map((scan) => (
                <div 
                  key={scan.id} 
                  className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border/50"
                >
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Camera className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{scan.food_name || 'Unknown Food'}</h4>
                    <p className="text-sm text-muted-foreground">
                      {scan.calories} kcal | P: {scan.protein_g}g C: {scan.carbs_g}g F: {scan.fats_g}g
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => deleteFoodScan(scan.id)}
                    className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Meal Guides */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
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
          const categoryMeals = getMealsByCategory(category);
          if (categoryMeals.length === 0) return null;
          
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
                  {categoryMeals.reduce((sum, m) => sum + (m.calories || 0), 0)} kcal
                </span>
              </div>

              <div className="space-y-2">
                {categoryMeals.map((meal) => (
                  <Link to={`/meals/recipe/${meal.id}`} key={meal.id}>
                    <div className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border/50">
                      {meal.image_url ? (
                        <img src={meal.image_url} alt={meal.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-16 h-16 bg-secondary rounded-lg flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">{meal.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {meal.calories} kcal | P: {meal.protein_g}g C: {meal.carbs_g}g F: {meal.fats_g}g
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

        {meals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No meal plans available yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Check back soon!</p>
          </div>
        )}

        {/* Change Meal Plan Button */}
        <Button variant="outline" className="w-full">
          CHANGE MEAL PLAN
        </Button>
      </div>
    </MobileLayout>
  );
}
