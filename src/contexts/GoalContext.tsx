import { createContext, useContext, useState, ReactNode } from "react";

interface GoalValues {
  water: number;
  steps: number;
  sleep: number;
}

interface GoalContextType {
  goals: GoalValues;
  updateGoal: (key: keyof GoalValues, value: number) => void;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export function GoalProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<GoalValues>({
    water: 0,
    steps: 0,
    sleep: 0,
  });

  const updateGoal = (key: keyof GoalValues, value: number) => {
    setGoals(prev => ({ ...prev, [key]: value }));
  };

  return (
    <GoalContext.Provider value={{ goals, updateGoal }}>
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
