import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

interface DailyGoalSettingModalProps {
  open: boolean;
  onClose: () => void;
}

type Step = "sleep" | "goals" | "grateful" | "love";

export function DailyGoalSettingModal({ open, onClose }: DailyGoalSettingModalProps) {
  const [step, setStep] = useState<Step>("sleep");
  const [sleepHours, setSleepHours] = useState(7);
  const [goals, setGoals] = useState(["", "", ""]);
  const [gratefulFor, setGratefulFor] = useState(["", "", ""]);
  const [selfLove, setSelfLove] = useState("");

  const handleNext = () => {
    if (step === "sleep") setStep("goals");
    else if (step === "goals") setStep("grateful");
    else if (step === "grateful") setStep("love");
    else {
      handleSave();
    }
  };

  const handleBack = () => {
    if (step === "goals") setStep("sleep");
    else if (step === "grateful") setStep("goals");
    else if (step === "love") setStep("grateful");
  };

  const handleSave = () => {
    toast.success("Daily goals saved!");
    onClose();
    // Reset for next time
    setStep("sleep");
    setSleepHours(7);
    setGoals(["", "", ""]);
    setGratefulFor(["", "", ""]);
    setSelfLove("");
  };

  const handleSkip = () => {
    handleNext();
  };

  const getStepTitle = () => {
    switch (step) {
      case "sleep": return "HOW MANY HOURS OF BEAUTY SLEEP DID YOU GET?";
      case "goals": return "TODAY I'M GOING TO ACCOMPLISH:";
      case "grateful": return "TODAY I'M GRATEFUL FOR:";
      case "love": return "TODAY, SOMETHING I LOVE ABOUT MYSELF IS:";
    }
  };

  const getProgress = () => {
    const steps: Step[] = ["sleep", "goals", "grateful", "love"];
    return ((steps.indexOf(step) + 1) / steps.length) * 100;
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 gap-0 max-w-md border-0 overflow-hidden bg-background max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
          <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
            Skip This Step
          </Button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-secondary">
          <div 
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${getProgress()}%` }}
          />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-serif font-light text-foreground mb-2">
            DAILY GOAL SETTING
          </h2>
          <p className="text-muted-foreground mb-8">
            {getStepTitle()}
          </p>

          {/* Sleep Step */}
          {step === "sleep" && (
            <>
              <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center mb-8 overflow-hidden">
                <div className="text-center">
                  <span className="text-6xl font-serif font-light text-foreground">
                    {sleepHours}
                  </span>
                  <p className="text-lg text-muted-foreground">hours</p>
                </div>
              </div>

              <Slider
                value={[sleepHours]}
                onValueChange={(v) => setSleepHours(v[0])}
                min={0}
                max={12}
                step={0.5}
                className="mb-8"
              />
            </>
          )}

          {/* Goals Step */}
          {step === "goals" && (
            <div className="space-y-4 mb-8">
              {[0, 1, 2].map((index) => (
                <div key={index}>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    Goal {index + 1}
                  </label>
                  <Input
                    value={goals[index]}
                    onChange={(e) => {
                      const newGoals = [...goals];
                      newGoals[index] = e.target.value;
                      setGoals(newGoals);
                    }}
                    placeholder={`What will you accomplish today?`}
                    className="bg-secondary border-0"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Grateful Step */}
          {step === "grateful" && (
            <div className="space-y-4 mb-8">
              {[0, 1, 2].map((index) => (
                <div key={index}>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    {index + 1}.
                  </label>
                  <Input
                    value={gratefulFor[index]}
                    onChange={(e) => {
                      const newGrateful = [...gratefulFor];
                      newGrateful[index] = e.target.value;
                      setGratefulFor(newGrateful);
                    }}
                    placeholder={`I'm grateful for...`}
                    className="bg-secondary border-0"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Self Love Step */}
          {step === "love" && (
            <div className="mb-8">
              <Textarea
                value={selfLove}
                onChange={(e) => setSelfLove(e.target.value)}
                placeholder="Write something you love about yourself..."
                className="bg-secondary border-0 min-h-[150px] resize-none"
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3">
            {step !== "sleep" && (
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ChevronLeft className="w-4 h-4 mr-1" /> BACK
              </Button>
            )}
            <Button onClick={handleNext} className="flex-1">
              {step === "love" ? "SAVE" : "NEXT"} 
              {step !== "love" && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
