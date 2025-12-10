import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UpdateMacros() {
  const navigate = useNavigate();
  const [macros, setMacros] = useState({
    calories: 1500,
    protein: 130,
    fats: 52,
    carbs: 128,
    fibre: 25
  });

  const handleReset = () => {
    setMacros({
      calories: 1500,
      protein: 130,
      fats: 52,
      carbs: 128,
      fibre: 25
    });
  };

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <button 
            className="text-foreground font-medium"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        <div className="px-4">
          <h1 className="text-3xl font-serif mb-4">Update My Macros</h1>
          
          <p className="text-foreground mb-6">
            Up for a change? This feature enables you to change your goal, adjust your intake or update your dietary requirements! Don't worry, you can always revert back to recommended targets by pressing the "Reset" button! Your current targets are:
          </p>

          {/* Macros List */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-border/30 pb-3">
                <span className="text-muted-foreground">Calories</span>
                <Input 
                  type="number"
                  value={macros.calories}
                  onChange={(e) => setMacros({...macros, calories: parseInt(e.target.value)})}
                  className="text-right border-none p-0 h-auto w-20 bg-transparent font-semibold text-foreground"
                />
              </div>
              
              <div className="flex justify-between items-center border-b border-border/30 pb-3">
                <span className="text-muted-foreground">Protein</span>
                <Input 
                  type="number"
                  value={macros.protein}
                  onChange={(e) => setMacros({...macros, protein: parseInt(e.target.value)})}
                  className="text-right border-none p-0 h-auto w-20 bg-transparent font-semibold text-foreground"
                />
              </div>
              
              <div className="flex justify-between items-center border-b border-border/30 pb-3">
                <span className="text-muted-foreground">Fats</span>
                <Input 
                  type="number"
                  value={macros.fats}
                  onChange={(e) => setMacros({...macros, fats: parseInt(e.target.value)})}
                  className="text-right border-none p-0 h-auto w-20 bg-transparent font-semibold text-foreground"
                />
              </div>
              
              <div className="flex justify-between items-center border-b border-border/30 pb-3">
                <span className="text-muted-foreground">Carbs</span>
                <Input 
                  type="number"
                  value={macros.carbs}
                  onChange={(e) => setMacros({...macros, carbs: parseInt(e.target.value)})}
                  className="text-right border-none p-0 h-auto w-20 bg-transparent font-semibold text-foreground"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Fibre</span>
                <Input 
                  type="number"
                  value={macros.fibre}
                  onChange={(e) => setMacros({...macros, fibre: parseInt(e.target.value)})}
                  className="text-right border-none p-0 h-auto w-20 bg-transparent font-semibold text-foreground"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Update Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background">
          <Button variant="default" className="w-full rounded-full">
            UPDATE MACROS
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
