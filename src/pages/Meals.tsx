import { MobileLayout } from "@/components/MobileLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const mealCategories = [
  { id: "breakfast", label: "Breakfast", count: 24 },
  { id: "lunch", label: "Lunch", count: 32 },
  { id: "dinner", label: "Dinner", count: 28 },
  { id: "snacks", label: "Snacks", count: 18 },
];

const featuredMeals = [
  {
    id: 1,
    title: "Avocado Toast with Eggs",
    calories: 380,
    time: "15 min",
    category: "Breakfast",
  },
  {
    id: 2,
    title: "Grilled Chicken Salad",
    calories: 420,
    time: "20 min",
    category: "Lunch",
  },
  {
    id: 3,
    title: "Salmon with Vegetables",
    calories: 520,
    time: "30 min",
    category: "Dinner",
  },
];

export default function Meals() {
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
            Meals
          </motion.h1>
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarFallback className="bg-secondary text-foreground font-medium">
              CF
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {mealCategories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 }}
              className="bg-secondary/50 rounded-2xl p-4 text-left hover:bg-secondary transition-colors"
            >
              <h3 className="font-semibold text-foreground">{category.label}</h3>
              <p className="text-sm text-muted-foreground">{category.count} recipes</p>
            </motion.button>
          ))}
        </div>

        {/* Featured Meals */}
        <div className="mb-6">
          <h2 className="text-xl font-serif font-light text-foreground mb-4">
            Featured Recipes
          </h2>
          <div className="space-y-3">
            {featuredMeals.map((meal, index) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-4 border border-border/50 flex items-center gap-4"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-muted rounded-xl flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{meal.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {meal.calories} cal • {meal.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full rounded-full">
          Browse All Recipes
        </Button>
      </div>
    </MobileLayout>
  );
}
