import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Camera, Plus, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface TrackingItem {
  label: string;
  value: number;
  unit: string;
  change?: number;
}

const bodyMeasurements: TrackingItem[] = [
  { label: "Weight", value: 64, unit: "KG", change: -2 },
  { label: "Chest", value: 88, unit: "CM", change: 0 },
  { label: "Waist", value: 68, unit: "CM", change: -3 },
  { label: "Hips", value: 96, unit: "CM", change: -1 },
  { label: "Arms", value: 28, unit: "CM", change: 1 },
  { label: "Thighs", value: 54, unit: "CM", change: -2 },
];

const weightHistory = [
  { date: "Week 1", weight: 66 },
  { date: "Week 2", weight: 65.5 },
  { date: "Week 3", weight: 65 },
  { date: "Week 4", weight: 64.5 },
  { date: "Week 5", weight: 64.2 },
  { date: "Week 6", weight: 64 },
];

const nutritionData = {
  calories: { current: 1650, target: 2000, average: 1720 },
  protein: { current: 95, target: 120, average: 88 },
  carbs: { current: 180, target: 200, average: 175 },
  fat: { current: 58, target: 65, average: 62 },
  fibre: { current: 22, target: 30, average: 24 },
};

const progressPhotos = [
  { id: 1, date: "Jan 1", type: "Front" },
  { id: 2, date: "Feb 1", type: "Front" },
  { id: 3, date: "Mar 1", type: "Front" },
];

export default function Tracking() {
  const [activeTab, setActiveTab] = useState("measurements");

  return (
    <MobileLayout>
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-serif font-light text-foreground"
          >
            Tracking
          </motion.h1>
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarFallback className="bg-secondary text-foreground font-medium">
              CF
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full bg-secondary/50 rounded-full p-1">
            <TabsTrigger
              value="measurements"
              className="flex-1 rounded-full data-[state=active]:bg-background text-xs"
            >
              Measurements
            </TabsTrigger>
            <TabsTrigger
              value="photos"
              className="flex-1 rounded-full data-[state=active]:bg-background text-xs"
            >
              Photos
            </TabsTrigger>
            <TabsTrigger
              value="nutrition"
              className="flex-1 rounded-full data-[state=active]:bg-background text-xs"
            >
              Nutrition
            </TabsTrigger>
          </TabsList>

          {/* Measurements Tab */}
          <TabsContent value="measurements" className="mt-6">
            {/* Weight Chart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-4 mb-6 border border-border/50"
            >
              <h3 className="font-semibold text-foreground mb-4">Weight Progress</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis
                      domain={["dataMin - 1", "dataMax + 1"]}
                      tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="hsl(var(--foreground))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--foreground))", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Body Measurements */}
            <div className="space-y-3">
              {bodyMeasurements.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between bg-card rounded-2xl px-5 py-4 border border-border/50"
                >
                  <span className="text-foreground font-medium">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-foreground font-semibold">
                      {item.value} {item.unit}
                    </span>
                    {item.change !== undefined && item.change !== 0 && (
                      <span
                        className={`flex items-center text-sm ${
                          item.change < 0 ? "text-emerald-500" : "text-rose-500"
                        }`}
                      >
                        {item.change < 0 ? (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(item.change)}
                      </span>
                    )}
                    {item.change === 0 && (
                      <span className="flex items-center text-sm text-muted-foreground">
                        <Minus className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <Button className="w-full mt-6 bg-foreground hover:bg-foreground/80 text-background rounded-full">
              <Plus className="w-4 h-4 mr-2" />
              Log Measurement
            </Button>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-5 mb-6 border border-border/50"
            >
              <div className="flex items-center justify-center flex-col py-8">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Upload Progress Photo</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Track your transformation with photos
                </p>
                <Button className="bg-foreground hover:bg-foreground/80 text-background rounded-full">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </motion.div>

            {/* Photo Grid */}
            <h3 className="font-semibold text-foreground mb-3">Progress Photos</h3>
            <div className="grid grid-cols-3 gap-3">
              {progressPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-[3/4] bg-secondary rounded-xl flex items-center justify-center"
                >
                  <div className="text-center">
                    <span className="text-muted-foreground text-xs">{photo.date}</span>
                    <p className="text-xs text-muted-foreground">{photo.type}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="mt-6">
            {/* Calorie Overview */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-5 mb-6 border border-border/50"
            >
              <h3 className="font-semibold text-foreground mb-4">Daily Calories</h3>
              <div className="text-center mb-4">
                <span className="text-4xl font-semibold text-foreground">
                  {nutritionData.calories.current}
                </span>
                <span className="text-muted-foreground ml-1">
                  / {nutritionData.calories.target}
                </span>
              </div>
              <Progress
                value={(nutritionData.calories.current / nutritionData.calories.target) * 100}
                className="h-3 bg-secondary mb-4"
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Avg: {nutritionData.calories.average} cal/day
                </span>
                <span className="text-emerald-500">
                  {Math.round((nutritionData.calories.current / nutritionData.calories.target) * 100)}% of goal
                </span>
              </div>
            </motion.div>

            {/* Macro Breakdown */}
            <h3 className="font-semibold text-foreground mb-3">Macros Breakdown</h3>
            <div className="space-y-3">
              {[
                { label: "Protein", data: nutritionData.protein, color: "from-rose-400 to-rose-500" },
                { label: "Carbs", data: nutritionData.carbs, color: "from-amber-400 to-orange-500" },
                { label: "Fat", data: nutritionData.fat, color: "from-sky-400 to-blue-500" },
                { label: "Fibre", data: nutritionData.fibre, color: "from-emerald-400 to-teal-500" },
              ].map((macro, index) => (
                <motion.div
                  key={macro.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-2xl p-4 border border-border/50"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${macro.color}`} />
                    <span className="text-foreground font-medium flex-1">{macro.label}</span>
                    <span className="text-foreground font-semibold">
                      {macro.data.current}g
                      <span className="text-muted-foreground font-normal"> / {macro.data.target}g</span>
                    </span>
                  </div>
                  <Progress
                    value={(macro.data.current / macro.data.target) * 100}
                    className="h-2 bg-secondary"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Weekly avg: {macro.data.average}g/day
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Nutrition Tips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-secondary/50 rounded-2xl p-4 mt-6"
            >
              <h4 className="font-medium text-foreground mb-2">💡 Quick Tip</h4>
              <p className="text-sm text-muted-foreground">
                You're doing great with protein intake! Try adding more fiber-rich vegetables to reach your daily fiber goal.
              </p>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}
