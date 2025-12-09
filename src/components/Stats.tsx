import { motion } from "framer-motion";
import { TrendingUp, Target, Flame, Calendar } from "lucide-react";

const stats = [
  {
    icon: Calendar,
    value: "12",
    label: "Day Streak",
    trend: "+3 this week",
  },
  {
    icon: Flame,
    value: "2,847",
    label: "Calories Burned",
    trend: "This week",
  },
  {
    icon: Target,
    value: "8/10",
    label: "Weekly Goal",
    trend: "2 more to go",
  },
  {
    icon: TrendingUp,
    value: "15%",
    label: "Improvement",
    trend: "vs last month",
  },
];

export function Stats() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Your Progress
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-foreground mt-4">
            Keep moving forward
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group p-8 bg-background hover:bg-secondary/50 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-10 h-10 bg-secondary flex items-center justify-center mb-6">
                <stat.icon className="w-5 h-5 text-foreground" />
              </div>

              {/* Value */}
              <div className="text-4xl md:text-5xl font-serif font-light text-foreground mb-2">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                {stat.label}
              </div>

              {/* Trend */}
              <div className="text-sm text-muted-foreground">{stat.trend}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}