import { motion } from "framer-motion";
import { TrendingUp, Target, Flame, Calendar } from "lucide-react";

const stats = [
  {
    icon: Calendar,
    value: "12",
    label: "Day Streak",
    trend: "+3 this week",
    color: "primary",
  },
  {
    icon: Flame,
    value: "2,847",
    label: "Calories Burned",
    trend: "This week",
    color: "coral",
  },
  {
    icon: Target,
    value: "8/10",
    label: "Weekly Goal",
    trend: "2 more to go",
    color: "accent",
  },
  {
    icon: TrendingUp,
    value: "15%",
    label: "Improvement",
    trend: "vs last month",
    color: "sage",
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
          className="text-center mb-12"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Your Progress
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Keep crushing your goals
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                  stat.color === "primary"
                    ? "bg-primary/10"
                    : stat.color === "coral"
                    ? "bg-coral/10"
                    : stat.color === "accent"
                    ? "bg-accent/20"
                    : "bg-sage/20"
                }`}
              >
                <stat.icon
                  className={`w-6 h-6 ${
                    stat.color === "primary"
                      ? "text-primary"
                      : stat.color === "coral"
                      ? "text-coral"
                      : stat.color === "accent"
                      ? "text-accent"
                      : "text-sage"
                  }`}
                />
              </div>

              {/* Value */}
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-muted-foreground font-medium mb-2">
                {stat.label}
              </div>

              {/* Trend */}
              <div className="text-sm text-primary/80">{stat.trend}</div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
