import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Camera } from "lucide-react";
import { motion } from "framer-motion";

export default function Tracking() {
  return (
    <MobileLayout>
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif font-light text-foreground mb-6"
        >
          Tracking
        </motion.h1>

        {/* Upload Photo Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="aspect-video bg-secondary rounded-2xl flex items-center justify-center mb-4"
        >
          <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center">
            <span className="text-muted-foreground text-xs">✕</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <Button 
            variant="ghost" 
            className="w-full justify-start text-foreground font-medium p-0"
          >
            <Camera className="w-5 h-5 mr-2" />
            Upload Progress Photo
          </Button>
        </motion.div>

        {/* Weight Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-8"
        >
          <span className="text-foreground font-medium">Weight</span>
          <span className="text-foreground">164.5 lb</span>
        </motion.div>

        {/* Nutrition Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="text-2xl font-serif font-light text-foreground mb-6">Nutrition</h2>

          {/* Daily Calories */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground font-medium">Daily Calories</span>
            </div>
            <Progress value={65} className="h-2 bg-secondary mb-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>210 g</span>
              <span>35 g | 80 g</span>
            </div>
          </div>

          {/* Protein */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground font-medium">Protein</span>
            </div>
            <Progress value={75} className="h-2 bg-secondary mb-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>150 g</span>
              <span>25 g | 10 g</span>
            </div>
          </div>

          {/* Daily Calories Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl p-5 border border-border/50 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground font-medium">Daily Goals</span>
              <span className="text-muted-foreground">›</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground text-sm">Daily Calories</span>
                  <span className="text-foreground text-sm">2100 / 2360 cal</span>
                </div>
                <Progress value={89} className="h-2 bg-secondary" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground text-sm">Protein</span>
                  <span className="text-foreground text-sm">150 g / 130 g</span>
                </div>
                <Progress value={100} className="h-2 bg-secondary" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground text-sm">Carbs</span>
                  <span className="text-foreground text-sm">200 g | 250 g</span>
                </div>
                <Progress value={80} className="h-2 bg-secondary" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground text-sm">Fat</span>
                  <span className="text-foreground text-sm">65 g / 130 g</span>
                </div>
                <Progress value={50} className="h-2 bg-secondary" />
              </div>
            </div>
          </motion.div>

          {/* Example Tip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-secondary/50 rounded-2xl p-4"
          >
            <p className="text-sm text-muted-foreground">
              Example tip or message
            </p>
          </motion.div>
        </motion.div>
      </div>
    </MobileLayout>
  );
}
