import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

// Mock data for charts
const generateChartData = (months: number) => {
  const data = [];
  const now = new Date();
  for (let i = months; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);
    data.push({
      month: date.toLocaleString('default', { month: 'short' }),
      chest: 95 + Math.random() * 5 - i * 0.3,
      waist: 80 + Math.random() * 3 - i * 0.5,
      hips: 100 + Math.random() * 4 - i * 0.4,
      arm: 32 + Math.random() * 2 - i * 0.2,
      thigh: 55 + Math.random() * 3 - i * 0.3,
      weight: 75 + Math.random() * 2 - i * 0.4,
    });
  }
  return data;
};

const mockEntries = [
  { date: "Dec 10, 2024", weight: 74.5, chest: 94, waist: 78, hips: 99, arm: 31, thigh: 54 },
  { date: "Dec 3, 2024", weight: 75.0, chest: 95, waist: 79, hips: 100, arm: 32, thigh: 55 },
  { date: "Nov 26, 2024", weight: 75.5, chest: 95, waist: 80, hips: 100, arm: 32, thigh: 55 },
  { date: "Nov 19, 2024", weight: 76.0, chest: 96, waist: 81, hips: 101, arm: 33, thigh: 56 },
];

type TimeRange = "1m" | "3m" | "6m";
type ViewMode = "stats" | "entries";

export default function Tracking() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1m");
  const [viewMode, setViewMode] = useState<ViewMode>("stats");
  const [showInput, setShowInput] = useState(false);
  const [measurements, setMeasurements] = useState({
    chest: "",
    waist: "",
    hips: "",
    arm: "",
    thigh: "",
    weight: "",
  });

  const chartData = generateChartData(timeRange === "1m" ? 1 : timeRange === "3m" ? 3 : 6);

  const stats = [
    { label: "Chest", current: "94 cm", change: "-1 cm", positive: true },
    { label: "Waist", current: "78 cm", change: "-2 cm", positive: true },
    { label: "Hips", current: "99 cm", change: "-1 cm", positive: true },
    { label: "Arm", current: "31 cm", change: "-1 cm", positive: true },
    { label: "Thigh", current: "54 cm", change: "-1 cm", positive: true },
    { label: "Weight", current: "74.5 kg", change: "-1.5 kg", positive: true },
  ];

  const handleSubmitMeasurements = () => {
    console.log("Submitting measurements:", measurements);
    setShowInput(false);
    setMeasurements({ chest: "", waist: "", hips: "", arm: "", thigh: "", weight: "" });
  };

  return (
    <MobileLayout>
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif font-light text-foreground mb-6"
        >
          TRACKING
        </motion.h1>

        {/* Upload Photo Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="aspect-video bg-secondary rounded-2xl flex items-center justify-center mb-4"
        >
          <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center">
            <Camera className="w-8 h-8 text-muted-foreground" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <Button variant="ghost" className="w-full justify-start text-foreground font-medium p-0">
            <Camera className="w-5 h-5 mr-2" />
            UPLOAD PROGRESS PHOTO
          </Button>
        </motion.div>

        {/* Time Range Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-6"
        >
          {(["1m", "3m", "6m"] as TimeRange[]).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="flex-1"
            >
              {range === "1m" ? "1 MONTH" : range === "3m" ? "3 MONTHS" : "6 MONTHS"}
            </Button>
          ))}
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-card rounded-2xl p-4 mb-6 border border-border/50"
        >
          <h3 className="font-medium text-foreground mb-4">PROGRESS GRAPH</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#000" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="waist" stroke="#666" strokeWidth={1} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-black"></span> Weight
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-gray-500"></span> Waist
            </span>
          </div>
        </motion.div>

        {/* Input Measurements Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Button className="w-full" onClick={() => setShowInput(!showInput)}>
            {showInput ? "CANCEL" : "INPUT MEASUREMENTS"}
          </Button>
        </motion.div>

        {/* Input Form */}
        {showInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-card rounded-2xl p-4 mb-6 border border-border/50 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Chest (cm)</label>
                <Input
                  type="number"
                  value={measurements.chest}
                  onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
                  placeholder="94"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Waist (cm)</label>
                <Input
                  type="number"
                  value={measurements.waist}
                  onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                  placeholder="78"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Hips (cm)</label>
                <Input
                  type="number"
                  value={measurements.hips}
                  onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })}
                  placeholder="99"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Arm (cm)</label>
                <Input
                  type="number"
                  value={measurements.arm}
                  onChange={(e) => setMeasurements({ ...measurements, arm: e.target.value })}
                  placeholder="31"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Thigh (cm)</label>
                <Input
                  type="number"
                  value={measurements.thigh}
                  onChange={(e) => setMeasurements({ ...measurements, thigh: e.target.value })}
                  placeholder="54"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Weight (kg)</label>
                <Input
                  type="number"
                  value={measurements.weight}
                  onChange={(e) => setMeasurements({ ...measurements, weight: e.target.value })}
                  placeholder="74.5"
                />
              </div>
            </div>
            <Button className="w-full" onClick={handleSubmitMeasurements}>
              SAVE MEASUREMENTS
            </Button>
          </motion.div>
        )}

        {/* Stats / Entries Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex border-b border-border mb-4"
        >
          <button
            onClick={() => setViewMode("stats")}
            className={`flex-1 py-3 text-center font-medium ${
              viewMode === "stats" ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground"
            }`}
          >
            MY STATS
          </button>
          <button
            onClick={() => setViewMode("entries")}
            className={`flex-1 py-3 text-center font-medium ${
              viewMode === "entries" ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground"
            }`}
          >
            MY ENTRIES
          </button>
        </motion.div>

        {/* Stats View */}
        {viewMode === "stats" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="flex items-center justify-between py-3 border-b border-border/50"
              >
                <span className="text-foreground font-medium">{stat.label}</span>
                <div className="flex items-center gap-4">
                  <span className="text-foreground">{stat.current}</span>
                  <span className={stat.positive ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Entries View */}
        {viewMode === "entries" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {mockEntries.map((entry, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-4 border border-border/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{entry.date}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <span>Weight: {entry.weight}kg</span>
                  <span>Chest: {entry.chest}cm</span>
                  <span>Waist: {entry.waist}cm</span>
                  <span>Hips: {entry.hips}cm</span>
                  <span>Arm: {entry.arm}cm</span>
                  <span>Thigh: {entry.thigh}cm</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </MobileLayout>
  );
}
