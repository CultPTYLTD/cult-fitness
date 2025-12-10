import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Check, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const recipes = {
  "1": {
    id: 1,
    title: "Avocado Toast with Eggs",
    category: "Breakfast",
    time: "15 min",
    servings: 2,
    calories: 380,
    protein: 18,
    carbs: 32,
    fat: 22,
    fibre: 8,
    image: "/placeholder.svg",
    ingredients: [
      "2 slices sourdough bread",
      "1 ripe avocado",
      "2 large eggs",
      "1 tbsp olive oil",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
      "Fresh herbs (optional)",
    ],
    method: [
      "Toast the sourdough bread until golden and crispy.",
      "While bread is toasting, cut the avocado in half, remove the pit, and scoop the flesh into a bowl.",
      "Mash the avocado with a fork, adding salt and pepper to taste.",
      "Heat olive oil in a non-stick pan over medium heat.",
      "Crack eggs into the pan and cook to your preference (sunny side up or over easy).",
      "Spread the mashed avocado evenly on the toasted bread.",
      "Top each slice with a fried egg.",
      "Season with additional salt, pepper, and red pepper flakes if desired.",
      "Garnish with fresh herbs and serve immediately.",
    ],
  },
  "2": {
    id: 2,
    title: "Grilled Chicken Salad",
    category: "Lunch",
    time: "20 min",
    servings: 2,
    calories: 420,
    protein: 42,
    carbs: 18,
    fat: 20,
    fibre: 6,
    image: "/placeholder.svg",
    ingredients: [
      "2 chicken breasts",
      "Mixed salad greens",
      "Cherry tomatoes",
      "Cucumber",
      "Red onion",
      "Feta cheese",
      "Olive oil and lemon dressing",
    ],
    method: [
      "Season chicken breasts with salt, pepper, and herbs.",
      "Grill chicken for 6-7 minutes each side until cooked through.",
      "Let chicken rest for 5 minutes, then slice.",
      "Arrange salad greens on plates.",
      "Top with tomatoes, cucumber, and red onion.",
      "Add sliced chicken on top.",
      "Crumble feta cheese over the salad.",
      "Drizzle with olive oil and lemon dressing.",
    ],
  },
  "3": {
    id: 3,
    title: "Salmon with Vegetables",
    category: "Dinner",
    time: "30 min",
    servings: 2,
    calories: 520,
    protein: 45,
    carbs: 24,
    fat: 28,
    fibre: 7,
    image: "/placeholder.svg",
    ingredients: [
      "2 salmon fillets",
      "Broccoli florets",
      "Asparagus",
      "Cherry tomatoes",
      "Garlic",
      "Lemon",
      "Olive oil",
      "Fresh dill",
    ],
    method: [
      "Preheat oven to 200°C (400°F).",
      "Place salmon fillets on a baking sheet lined with parchment.",
      "Arrange vegetables around the salmon.",
      "Drizzle everything with olive oil and season with salt and pepper.",
      "Add minced garlic and lemon slices.",
      "Bake for 20-25 minutes until salmon is cooked through.",
      "Garnish with fresh dill before serving.",
    ],
  },
};

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);

  const recipe = recipes[id as keyof typeof recipes] || recipes["1"];

  const handleAddToMeal = () => {
    setIsAdded(true);
    toast.success("Meal added!", {
      description: `${recipe.title} has been logged to your meals.`,
    });
  };

  const macros = [
    { label: "Protein", value: recipe.protein, unit: "g", color: "from-rose-400 to-rose-500" },
    { label: "Carbs", value: recipe.carbs, unit: "g", color: "from-amber-400 to-orange-500" },
    { label: "Fat", value: recipe.fat, unit: "g", color: "from-sky-400 to-blue-500" },
    { label: "Fibre", value: recipe.fibre, unit: "g", color: "from-emerald-400 to-teal-500" },
  ];

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Header Image */}
        <div className="relative h-64 bg-secondary">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-muted-foreground">Recipe Image</span>
          </div>
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="bg-background/80 backdrop-blur-sm rounded-full"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 -mt-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-5 border border-border/50 shadow-soft"
          >
            <span className="text-sm text-muted-foreground">{recipe.category}</span>
            <h1 className="text-2xl font-serif text-foreground mt-1 mb-4">{recipe.title}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {recipe.time}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                {recipe.servings} servings
              </div>
            </div>

            {/* Calories */}
            <div className="bg-secondary/50 rounded-xl p-4 mb-4">
              <div className="text-center">
                <span className="text-3xl font-semibold text-foreground">{recipe.calories}</span>
                <span className="text-muted-foreground ml-1">cal</span>
              </div>
            </div>

            {/* Macros */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {macros.map((macro) => (
                <div key={macro.label} className="text-center">
                  <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${macro.color} flex items-center justify-center mb-1`}>
                    <span className="text-white text-sm font-medium">{macro.value}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{macro.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="ingredients" className="mt-6">
            <TabsList className="w-full bg-secondary/50 rounded-full p-1">
              <TabsTrigger
                value="ingredients"
                className="flex-1 rounded-full data-[state=active]:bg-background"
              >
                Ingredients
              </TabsTrigger>
              <TabsTrigger
                value="method"
                className="flex-1 rounded-full data-[state=active]:bg-background"
              >
                Method
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ingredients" className="mt-4">
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border/50"
                  >
                    <div className="w-2 h-2 bg-foreground rounded-full" />
                    <span className="text-foreground">{ingredient}</span>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="method" className="mt-4">
              <div className="space-y-4">
                {recipe.method.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4"
                  >
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-foreground">{index + 1}</span>
                    </div>
                    <p className="text-foreground pt-1">{step}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Add to Meal Button */}
          <div className="py-6">
            <Button
              onClick={handleAddToMeal}
              disabled={isAdded}
              className="w-full bg-foreground hover:bg-foreground/80 text-background rounded-full py-6 uppercase tracking-wider"
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Added to Meals
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Add to Meal
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
