import { motion } from "framer-motion";
import { Clock, Flame, Play } from "lucide-react";

interface WorkoutCardProps {
  title: string;
  category: string;
  duration: string;
  calories: string;
  image: string;
  index?: number;
}

export function WorkoutCard({
  title,
  category,
  duration,
  calories,
  image,
  index = 0,
}: WorkoutCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-500 cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full gradient-coral flex items-center justify-center shadow-glow">
            <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground border border-primary-foreground/20">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-coral" />
            <span>{calories}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
