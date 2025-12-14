import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Check, Clock, Users, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useGoals } from "@/contexts/GoalContext";

interface Ingredient {
  item: string;
  amount: string;
}

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
  ingredients: unknown;
}

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshFoodScans } = useGoals();
  const [isAdded, setIsAdded] = useState(false);
  const [recipe, setRecipe] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      setRecipe(data as MealPlan | null);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      toast.error('Failed to load recipe');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToMeal = async () => {
    if (!recipe) return;
    
    setAdding(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to add meals');
        return;
      }

      const { error } = await supabase.from('food_scans').insert({
        user_id: user.id,
        scan_type: 'meal_plan',
        food_name: recipe.name,
        calories: recipe.calories,
        protein_g: recipe.protein_g,
        carbs_g: recipe.carbs_g,
        fats_g: recipe.fats_g,
        fibre_g: recipe.fibre_g,
        serving_size: '1 serving'
      });

      if (error) throw error;

      setIsAdded(true);
      await refreshFoodScans();
      toast.success("Meal added!", {
        description: `${recipe.name} has been logged to your meals.`,
      });
    } catch (error: any) {
      console.error('Error adding meal:', error);
      toast.error('Failed to add meal. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <MobileLayout showNav={false}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </MobileLayout>
    );
  }

  if (!recipe) {
    return (
      <MobileLayout showNav={false}>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <p className="text-muted-foreground mb-4">Recipe not found</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </MobileLayout>
    );
  }

  const macros = [
    { label: "Protein", value: recipe.protein_g || 0, unit: "g", color: "from-rose-400 to-rose-500" },
    { label: "Carbs", value: recipe.carbs_g || 0, unit: "g", color: "from-amber-400 to-orange-500" },
    { label: "Fat", value: recipe.fats_g || 0, unit: "g", color: "from-sky-400 to-blue-500" },
    { label: "Fibre", value: recipe.fibre_g || 0, unit: "g", color: "from-emerald-400 to-teal-500" },
  ];

  // Parse method steps from recipe_instructions
  const methodSteps = recipe.recipe_instructions
    ? recipe.recipe_instructions.split('\n').filter(step => step.trim())
    : [];

  // Parse ingredients - handle various formats
  const parseIngredients = (): Ingredient[] => {
    if (!recipe.ingredients) return [];
    if (Array.isArray(recipe.ingredients)) return recipe.ingredients as Ingredient[];
    if (typeof recipe.ingredients === 'string') {
      try {
        return JSON.parse(recipe.ingredients);
      } catch {
        return [];
      }
    }
    return [];
  };
  
  const ingredients = parseIngredients();

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Header Image */}
        <div className="relative h-64 bg-secondary">
          {recipe.image_url ? (
            <img 
              src={recipe.image_url} 
              alt={recipe.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground">Recipe Image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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
            <span className="text-sm text-muted-foreground capitalize">{recipe.meal_type}</span>
            <h1 className="text-2xl font-serif text-foreground mt-1 mb-2">{recipe.name}</h1>
            {recipe.description && (
              <p className="text-sm text-muted-foreground mb-4">{recipe.description}</p>
            )}

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                20 min
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                2 servings
              </div>
            </div>

            {/* Calories */}
            <div className="bg-secondary/50 rounded-xl p-4 mb-4">
              <div className="text-center">
                <span className="text-3xl font-semibold text-foreground">{recipe.calories || 0}</span>
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
                {ingredients.length > 0 ? (
                  ingredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between bg-card rounded-xl p-3 border border-border/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-foreground rounded-full" />
                        <span className="text-foreground">{ingredient.item}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{ingredient.amount}</span>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No ingredients listed</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="method" className="mt-4">
              <div className="space-y-4">
                {methodSteps.length > 0 ? (
                  methodSteps.map((step, index) => (
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
                      <p className="text-foreground pt-1">{step.replace(/^\d+\.\s*/, '')}</p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No method available</p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Add to Meal Button */}
          <div className="py-6">
            <Button
              onClick={handleAddToMeal}
              disabled={isAdded || adding}
              className="w-full bg-foreground hover:bg-foreground/80 text-background rounded-full py-6 uppercase tracking-wider"
            >
              {adding ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Adding...
                </>
              ) : isAdded ? (
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
