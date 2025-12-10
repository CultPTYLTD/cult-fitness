import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Snowflake, Dumbbell, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type TabType = "programs" | "challenges" | "expired";

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
              My Active Program
            </motion.h1>
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              Platinum
            </Badge>
          </div>
        </div>

        {/* Current Program Banner */}
        <div className="bg-secondary/50 rounded-2xl p-5 mb-6">
          <h3 className="font-semibold text-foreground">Pregnancy Trimester 1</h3>
          <p className="text-muted-foreground text-sm">8 Weeks</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-secondary/50 rounded-full p-1 mb-6">
          {(["programs", "challenges", "expired"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
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
                  <Button variant="outline" className="w-full rounded-full">
                    START PROGRAM
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

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
                  <Button variant="outline" className="w-full rounded-full">
                    CONTINUE CHALLENGE
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "expired" && (
          <div className="text-center py-12 text-muted-foreground">
            No expired programs
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
