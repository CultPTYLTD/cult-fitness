import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Crown, Dumbbell, Timer, ScrollText } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-fitness.jpg";
import workoutYoga from "@/assets/workout-yoga.jpg";
import workoutPilates from "@/assets/workout-pilates.jpg";

type TabType = "programs" | "challenges" | "expired";

const programs = [
  {
    id: 1,
    title: "10 MINUTES TO TONED ARMS PROGRAM",
    image: heroImage,
    tags: ["Pilates", "Minimal Equipment", "Sculpt", "Express Workouts"],
  },
  {
    id: 2,
    title: "3-2-1 METHOD DEFINE EDITION PROGRAM",
    image: workoutYoga,
    tags: ["HIIT", "Full Body", "Strength"],
  },
  {
    id: 3,
    title: "PREGNANCY TRIMESTER 1 PROGRAM",
    image: workoutPilates,
    tags: ["Low Impact", "Prenatal", "Safe"],
  },
];

export default function Programs() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("programs");

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-serif font-light text-foreground"
          >
            MY ACTIVE PROGRAM
          </motion.h1>
          <div className="bg-olive text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Platinum
          </div>
        </div>

        {/* Current Program */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-secondary rounded-2xl p-4 mb-6"
        >
          <h3 className="font-semibold text-foreground">FIT Program Level 4</h3>
          <p className="text-muted-foreground text-sm">4 Weeks</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex bg-secondary/50 rounded-full p-1 mb-6"
        >
          {(["programs", "challenges", "expired"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 px-3 rounded-full text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? "bg-olive text-white shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Programs List */}
        <div className="space-y-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden border border-border/50"
            >
              <div className="aspect-[16/10] relative">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg font-medium text-foreground mb-3">
                  {program.title}
                </h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  {program.tags.map((tag, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
                      {i === 0 && <Dumbbell className="w-4 h-4" />}
                      {i === 1 && <ScrollText className="w-4 h-4" />}
                      {i === 2 && <Timer className="w-4 h-4" />}
                      {tag}
                    </div>
                  ))}
                </div>
                <Button className="w-full rounded-full uppercase tracking-wider">
                  START PROGRAM
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
