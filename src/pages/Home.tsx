import { MobileLayout } from "@/components/MobileLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import heroImage from "@/assets/hero-fitness.jpg";
import workoutYoga from "@/assets/workout-yoga.jpg";
import workoutStrength from "@/assets/workout-strength.jpg";

// Goal tracker items with background images
const goalTrackerItems = [
  { 
    id: "water", 
    label: "Water", 
    value: 0, 
    target: 2500, 
    unit: "ml",
    image: workoutYoga,
  },
  { 
    id: "steps", 
    label: "Steps", 
    value: 0, 
    target: 10000, 
    unit: "",
    image: workoutStrength,
  },
  { 
    id: "sleep", 
    label: "Sleep", 
    value: 0, 
    target: 8, 
    unit: "hrs",
    image: heroImage,
  },
];

const featuredWorkouts = [
  {
    id: 1,
    title: "10 MINUTES TO TONED ARMS",
    image: heroImage
  }, 
  {
    id: 2,
    title: "FULL BODY BURN",
    image: workoutYoga
  }, 
  {
    id: 3,
    title: "CORE STRENGTH",
    image: workoutStrength
  }
];

const macros = [
  { label: "Protein", value: 0, target: 130 },
  { label: "Fats", value: 0, target: 65 },
  { label: "Carbs", value: 0, target: 200 },
  { label: "Fibre", value: 0, target: 30 },
];

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"program" | "ondemand">("program");
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Calculate consumed calories (mock data - this would come from meals eaten)
  const consumedCalories = 1250;
  const targetCalories = 2360;
  const calorieProgress = (consumedCalories / targetCalories) * 100;

  const handleTabChange = (tab: "program" | "ondemand") => {
    setActiveTab(tab);
    if (tab === "ondemand") {
      navigate("/on-demand");
    }
  };

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-8 bg-background">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-xl tracking-[0.3em] font-serif">
              <span className="font-bold">CULT</span>
              <span className="font-light"> FITNESS</span>
            </h1>
          </motion.div>
          <Link to="/profile">
            <Avatar className="h-12 w-12 border-2 border-primary/20 cursor-pointer">
              <AvatarImage src="" />
              <AvatarFallback className="bg-secondary text-foreground font-medium">
                CF
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>

        {/* Tab Switcher */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }} 
          className="flex bg-secondary/50 rounded-full p-1 mb-6"
        >
          <button 
            onClick={() => handleTabChange("program")} 
            className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
              activeTab === "program" 
                ? "bg-card text-foreground shadow-sm" 
                : "text-muted-foreground"
            }`}
          >
            My Program
          </button>
          <button 
            onClick={() => handleTabChange("ondemand")} 
            className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
              activeTab === "ondemand" 
                ? "bg-card text-foreground shadow-sm" 
                : "text-muted-foreground"
            }`}
          >
            On-Demand
          </button>
        </motion.div>

        {/* Featured Workout Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }} 
          className="mb-6"
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <img 
              src={featuredWorkouts[activeSlide].image} 
              alt={featuredWorkouts[activeSlide].title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
              <h2 className="text-2xl font-serif text-center leading-tight mb-4">
                {featuredWorkouts[activeSlide].title}
              </h2>
              <Link to="/programs">
                <Button className="rounded-full px-8 uppercase tracking-wider text-sm">
                  Learn More
                </Button>
              </Link>
            </div>
            {/* Carousel Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {featuredWorkouts.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveSlide(idx)} 
                  className={`h-2 rounded-full transition-all ${
                    idx === activeSlide ? "w-6 bg-white" : "w-2 bg-white/50"
                  }`} 
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Today's Workout Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }} 
          className="mb-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-3">
            PREGNANCY TRIMESTER 1   
          </h3>
          <Link to="/workouts">
            <Button className="w-full rounded-full py-6 uppercase tracking-wider text-sm font-medium">
              TODAY'S WORKOUT
            </Button>
          </Link>
        </motion.div>

        {/* My Meals Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }} 
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">MY MEALS</h3>
            <Link to="/meals">
              <Button variant="ghost" size="sm" className="text-muted-foreground p-0">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Calorie Total: {consumedCalories} / {targetCalories} cal
          </p>
          <Progress value={calorieProgress} className="h-2 mb-6 bg-secondary" />

          {/* Macros */}
          <div className="grid grid-cols-4 gap-3">
            {macros.map(macro => (
              <div key={macro.label} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-secondary flex items-center justify-center mb-2">
                  <span className="text-lg font-semibold text-foreground">
                    {macro.value}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{macro.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Goal Tracker Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">GOAL TRACKER</h3>
            <Link to="/goals">
              <Button variant="ghost" size="sm" className="text-muted-foreground p-0">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {goalTrackerItems.map((goal, index) => {
              const progress = (goal.value / goal.target) * 100;
              return (
                <Link to="/goals" key={goal.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                  >
                    <img 
                      src={goal.image} 
                      alt={goal.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2">
                      <p className="text-xs font-medium mb-1">{goal.label}</p>
                      <p className="text-xl font-semibold">
                        {goal.value}
                        <span className="text-xs font-normal ml-0.5">{goal.unit}</span>
                      </p>
                      <p className="text-xs opacity-80">of {goal.target}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </MobileLayout>
  );
}
