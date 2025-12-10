import { MobileLayout } from "@/components/MobileLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Heart, Footprints, Dumbbell, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import heroImage from "@/assets/hero-fitness.jpg";
import { cn } from "@/lib/utils";

const goalCards = [
  { id: "cardio", label: "Cardio", icon: Heart, value: 0, target: 30, unit: "min", color: "from-rose-400 to-rose-500" },
  { id: "steps", label: "Steps", icon: Footprints, value: 0, target: 8000, unit: "", color: "from-amber-400 to-orange-500" },
  { id: "training", label: "Training", icon: Dumbbell, value: 0, target: 5, unit: "sessions", color: "from-emerald-400 to-teal-500" },
  { id: "move", label: "Move", icon: Timer, value: 0, target: 60, unit: "min", color: "from-sky-400 to-blue-500" },
];
const featuredWorkouts = [{
  id: 1,
  title: "10 Minutes to Toned Arms",
  image: heroImage
}, {
  id: 2,
  title: "Full Body Burn",
  image: heroImage
}, {
  id: 3,
  title: "Core Strength",
  image: heroImage
}];
const macros = [{
  label: "Protein",
  value: 0
}, {
  label: "Fats",
  value: 0
}, {
  label: "Carbs",
  value: 0
}, {
  label: "Fibre",
  value: 0
}];
export default function Home() {
  const [activeTab, setActiveTab] = useState<"program" | "ondemand">("program");
  const [activeSlide, setActiveSlide] = useState(0);
  return <MobileLayout>
      <div className="px-4 pt-6 pb-8 bg-accent">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <motion.div initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }}>
            <h1 className="text-xl tracking-[0.3em] font-serif">
              <span className="font-bold">CULT</span>
              <span className="font-light"> FITNESS</span>
            </h1>
          </motion.div>
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-secondary text-foreground font-medium">
              CF
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Tab Switcher */}
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }} className="flex bg-secondary/50 rounded-full p-1 mb-6">
          <button onClick={() => setActiveTab("program")} className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${activeTab === "program" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>
            My Program
          </button>
          <button onClick={() => setActiveTab("ondemand")} className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${activeTab === "ondemand" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>
            On-Demand
          </button>
        </motion.div>

        {/* Featured Workout Carousel */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className="mb-6">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <img src={featuredWorkouts[activeSlide].image} alt={featuredWorkouts[activeSlide].title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
              <h2 className="text-2xl font-serif text-center leading-tight mb-4">
                {featuredWorkouts[activeSlide].title}
              </h2>
              <Button variant="secondary" className="bg-foreground hover:bg-foreground/80 text-background border-0 rounded-full px-8 uppercase tracking-wider text-sm">
                Learn More
              </Button>
            </div>
            {/* Carousel Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {featuredWorkouts.map((_, idx) => <button key={idx} onClick={() => setActiveSlide(idx)} className={`h-2 rounded-full transition-all ${idx === activeSlide ? "w-6 bg-white" : "w-2 bg-white/50"}`} />)}
            </div>
          </div>
        </motion.div>

        {/* Today's Workout Section */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3
      }} className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            PREGNANCY TRIMESTER 1   
          </h3>
          <Link to="/workouts">
            <Button className="w-full bg-foreground hover:bg-foreground/80 text-background rounded-full py-6 uppercase tracking-wider text-sm font-medium">
              Today's Workout
            </Button>
          </Link>
        </motion.div>

        {/* My Meals Section */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">My Meals</h3>
            <Link to="/meals">
              <Button variant="ghost" size="sm" className="text-muted-foreground p-0">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Calorie Total</p>
          <Progress value={0} className="h-2 mb-6 bg-secondary" />

          {/* Macros */}
          <div className="grid grid-cols-4 gap-3">
            {macros.map(macro => <div key={macro.label} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-secondary flex items-center justify-center mb-2">
                  <span className="text-lg font-semibold text-foreground">
                    {macro.value}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{macro.label}</span>
              </div>)}
          </div>
        </motion.div>

        {/* Goal Tracking Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Daily Goals</h3>
            <Link to="/goals">
              <Button variant="ghost" size="sm" className="text-muted-foreground p-0">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {goalCards.map((goal, index) => {
              const Icon = goal.icon;
              const progress = (goal.value / goal.target) * 100;
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="bg-card rounded-2xl p-4 border border-border/50 shadow-soft"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br",
                    goal.color
                  )}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{goal.label}</p>
                  <p className="text-xl font-semibold text-foreground">
                    {goal.value}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      / {goal.target} {goal.unit}
                    </span>
                  </p>
                  <Progress value={progress} className="h-1.5 mt-2 bg-secondary" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </MobileLayout>;
}