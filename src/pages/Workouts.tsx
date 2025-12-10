import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Snowflake, Dumbbell, Timer, Play, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type TabType = "programs" | "challenges" | "on-demand";

const programs = [
  {
    id: 1,
    title: "10 MINUTES TO TONED ARMS PROGRAM",
    features: ["Pilates", "Minimal Equipment", "Sculpt", "Express Workouts"],
    bgClass: "bg-gradient-to-br from-secondary to-muted",
  },
  {
    id: 2,
    title: "3-2-1 METHOD DEFINE EDITION PROGRAM",
    features: ["4 Weeks", "Strength", "Pilates", "Running"],
    bgClass: "bg-gradient-to-br from-accent/30 to-secondary",
  },
];

const challenges = [
  {
    id: 1,
    title: "CHOOSE YOUR SEASON: SUMMER SHRED",
    expiryDate: "Dec 15, 2025",
    duration: "6 Weeks",
    features: ["Choose Your Team", "Sculpt Physique", "Build Muscle"],
    bgClass: "bg-gradient-to-br from-primary/20 to-accent/20",
  },
];

const onDemandCategories = [
  { id: "arms", name: "Arms & Upper Body", count: 24, duration: "10-30 min", color: "from-rose-400 to-rose-500" },
  { id: "legs", name: "Legs & Glutes", count: 32, duration: "15-45 min", color: "from-amber-400 to-orange-500" },
  { id: "core", name: "Core & Abs", count: 28, duration: "10-20 min", color: "from-emerald-400 to-teal-500" },
  { id: "fullbody", name: "Full Body", count: 42, duration: "20-45 min", color: "from-sky-400 to-blue-500" },
  { id: "mobility", name: "Mobility & Stretch", count: 18, duration: "10-30 min", color: "from-purple-400 to-violet-500" },
  { id: "cardio", name: "Cardio & HIIT", count: 36, duration: "15-40 min", color: "from-pink-400 to-rose-500" },
];

const featuredWorkouts = [
  { id: 1, title: "Express Arm Toner", duration: "10 min", category: "Arms" },
  { id: 2, title: "Booty Burn", duration: "20 min", category: "Legs" },
  { id: 3, title: "Core Crusher", duration: "15 min", category: "Core" },
];

export default function Workouts() {
  const [activeTab, setActiveTab] = useState<TabType>("programs");

  return (
    <MobileLayout>
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1 flex items-center justify-between">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-serif font-light text-foreground"
            >
              Workouts
            </motion.h1>
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              Platinum
            </Badge>
          </div>
        </div>

        {/* Current Program Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary/50 rounded-2xl p-5 mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Pregnancy Trimester 1</h3>
              <p className="text-muted-foreground text-sm">8 Weeks • Week 3 of 8</p>
            </div>
            <Link to="/workouts/player">
              <Button className="bg-foreground hover:bg-foreground/80 text-background rounded-full">
                <Play className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex bg-secondary/50 rounded-full p-1 mb-6">
          {(["programs", "challenges", "on-demand"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-medium transition-colors capitalize ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "on-demand" ? "On-Demand" : tab}
            </button>
          ))}
        </div>

        {/* Programs Content */}
        {activeTab === "programs" && (
          <div className="space-y-4">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden border border-border/50"
              >
                <div className={`h-40 ${program.bgClass}`} />
                <div className="p-5">
                  <h3 className="font-semibold text-foreground text-lg mb-4">
                    {program.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {program.features.map((feature, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center mb-1">
                          {i === 0 && <Dumbbell className="w-4 h-4 text-foreground" />}
                          {i === 1 && <Calendar className="w-4 h-4 text-foreground" />}
                          {i === 2 && <Snowflake className="w-4 h-4 text-foreground" />}
                          {i === 3 && <Timer className="w-4 h-4 text-foreground" />}
                        </div>
                        <span className="text-[10px] text-muted-foreground text-center">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link to="/workouts/player">
                    <Button variant="outline" className="w-full rounded-full">
                      START PROGRAM
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Challenges Content */}
        {activeTab === "challenges" && (
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden border border-border/50"
              >
                <div className={`h-40 ${challenge.bgClass}`} />
                <div className="p-5">
                  <h3 className="font-semibold text-foreground text-lg mb-1">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Active until {challenge.expiryDate}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center mb-1">
                        <Calendar className="w-4 h-4 text-foreground" />
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {challenge.duration}
                      </span>
                    </div>
                    {challenge.features.map((feature, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center mb-1">
                          <Snowflake className="w-4 h-4 text-foreground" />
                        </div>
                        <span className="text-[10px] text-muted-foreground text-center max-w-[60px]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link to="/workouts/player">
                    <Button variant="outline" className="w-full rounded-full">
                      CONTINUE CHALLENGE
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* On-Demand Content */}
        {activeTab === "on-demand" && (
          <div>
            {/* Categories Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {onDemandCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-2xl p-4 border border-border/50 text-left hover:bg-secondary/30 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-3`}>
                    <Dumbbell className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium text-foreground text-sm">{category.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {category.count} workouts • {category.duration}
                  </p>
                </motion.button>
              ))}
            </div>

            {/* Featured Workouts */}
            <h3 className="font-semibold text-foreground mb-3">Quick Start</h3>
            <div className="space-y-3">
              {featuredWorkouts.map((workout, index) => (
                <Link to="/workouts/player" key={workout.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-card rounded-2xl p-4 border border-border/50 flex items-center gap-4 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-secondary to-muted rounded-xl flex items-center justify-center">
                      <Play className="w-6 h-6 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{workout.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {workout.duration}
                        <span>•</span>
                        {workout.category}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Play className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </Link>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-6 rounded-full">
              Explore All Workouts
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
