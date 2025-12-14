import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GoalValues {
  water: number;
  steps: number;
  sleep: number;
  calories: number;
}

interface FoodScan {
  id: string;
  food_name: string | null;
  calories: number | null;
  protein_g: number | null;
  carbs_g: number | null;
  fats_g: number | null;
  scan_date: string | null;
  scan_type: string;
}

interface GoalContextType {
  goals: GoalValues;
  foodScans: FoodScan[];
  updateGoal: (key: keyof GoalValues, value: number) => void;
  refreshFoodScans: () => Promise<void>;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export function GoalProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<GoalValues>({
    water: 0,
    steps: 0,
    sleep: 0,
    calories: 0,
  });
  const [foodScans, setFoodScans] = useState<FoodScan[]>([]);

  const refreshFoodScans = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('food_scans')
      .select('*')
      .eq('user_id', user.id)
      .eq('scan_date', today)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setFoodScans(data);
      const totalCalories = data.reduce((sum, scan) => sum + (scan.calories || 0), 0);
      setGoals(prev => ({ ...prev, calories: totalCalories }));
    }
  };

  useEffect(() => {
    refreshFoodScans();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      refreshFoodScans();
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateGoal = (key: keyof GoalValues, value: number) => {
    setGoals(prev => ({ ...prev, [key]: value }));
  };

  return (
    <GoalContext.Provider value={{ goals, foodScans, updateGoal, refreshFoodScans }}>
      {children}
    </GoalContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error("useGoals must be used within a GoalProvider");
  }
  return context;
}
