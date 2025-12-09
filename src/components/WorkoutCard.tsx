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
      className="group relative overflow-hidden bg-card border border-border hover:border-foreground/20 transition-all duration-500 cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-background flex items-center justify-center">
            <Play className="w-5 h-5 text-foreground fill-current ml-0.5" />
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs uppercase tracking-widest bg-background/90 backdrop-blur-sm text-foreground">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-serif text-card-foreground mb-3">
          {title}
        </h3>
        <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3 h-3" />
            <span>{calories}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}