import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Heart, 
  SlidersHorizontal, 
  X,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-fitness.jpg";
import workoutYoga from "@/assets/workout-yoga.jpg";
import workoutStrength from "@/assets/workout-strength.jpg";
import workoutHiit from "@/assets/workout-hiit.jpg";

interface Video {
  id: string;
  title: string;
  duration: string;
  image: string;
  isNew?: boolean;
  category: string;
}

const videos: Video[] = [
  { id: "1", title: "Upper Body Burn", duration: "14 Mins", image: heroImage, isNew: true, category: "10 Mins to Toned Arms" },
  { id: "2", title: "Toned Shoulders", duration: "13 Mins", image: workoutYoga, category: "10 Mins to Toned Arms" },
  { id: "3", title: "Merry Lower Body", duration: "21 Mins", image: workoutStrength, isNew: true, category: "7 Day Training Split" },
  { id: "4", title: "Sleigh the Upper", duration: "13 Mins", image: workoutHiit, category: "7 Day Training Split" },
];

const filterOptions = {
  duration: ["10 To 20 Minutes", "20 To 30 Minutes", "30 To 40 Minutes", "Longer Than 40 Minutes"],
  focusArea: ["Lower Body", "Upper Body", "Full Body"],
  experienceLevel: ["Beginner", "Intermediate", "Advanced", "Pre & Post Natal Friendly"],
  equipment: ["No Equipment", "Minimal Equipment"],
};

export default function OnDemand() {
  const [showFilter, setShowFilter] = useState(false);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [filters, setFilters] = useState<Record<string, string[]>>({
    duration: [],
    focusArea: [],
    experienceLevel: [],
    equipment: [],
  });

  const toggleFavourite = (id: string) => {
    setFavourites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const toggleFilter = (category: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(f => f !== value)
        : [...prev[category], value]
    }));
  };

  const groupedVideos = videos.reduce((acc, video) => {
    if (!acc[video.category]) acc[video.category] = [];
    acc[video.category].push(video);
    return acc;
  }, {} as Record<string, Video[]>);

  if (showFilter) {
    return (
      <MobileLayout showNav={false}>
        <div className="min-h-screen bg-background px-4 pt-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-serif">FILTER</h1>
            <Button variant="ghost" size="icon" onClick={() => setShowFilter(false)}>
              <X className="w-6 h-6" />
            </Button>
          </div>

          <p className="text-muted-foreground mb-6">Select one or multiple options</p>

          {/* Duration */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-3">DURATION</h3>
            {filterOptions.duration.map((option) => (
              <label key={option} className="flex items-center gap-3 py-2 cursor-pointer">
                <Checkbox 
                  checked={filters.duration.includes(option)}
                  onCheckedChange={() => toggleFilter("duration", option)}
                />
                <span className="text-foreground">{option}</span>
              </label>
            ))}
          </div>

          {/* Focus Area */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-3">FOCUS AREA</h3>
            {filterOptions.focusArea.map((option) => (
              <label key={option} className="flex items-center gap-3 py-2 cursor-pointer">
                <Checkbox 
                  checked={filters.focusArea.includes(option)}
                  onCheckedChange={() => toggleFilter("focusArea", option)}
                />
                <span className="text-foreground">{option}</span>
              </label>
            ))}
          </div>

          {/* Experience Level */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-3">EXPERIENCE LEVEL</h3>
            {filterOptions.experienceLevel.map((option) => (
              <label key={option} className="flex items-center gap-3 py-2 cursor-pointer">
                <Checkbox 
                  checked={filters.experienceLevel.includes(option)}
                  onCheckedChange={() => toggleFilter("experienceLevel", option)}
                />
                <span className="text-foreground">{option}</span>
              </label>
            ))}
          </div>

          {/* Equipment */}
          <div className="mb-8">
            <h3 className="font-semibold text-foreground mb-3">EQUIPMENT</h3>
            {filterOptions.equipment.map((option) => (
              <label key={option} className="flex items-center gap-3 py-2 cursor-pointer">
                <Checkbox 
                  checked={filters.equipment.includes(option)}
                  onCheckedChange={() => toggleFilter("equipment", option)}
                />
                <span className="text-foreground">{option}</span>
              </label>
            ))}
          </div>

          <Button 
            className="w-full rounded-full uppercase tracking-wider"
            onClick={() => setShowFilter(false)}
          >
            FIND WORKOUTS
          </Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-8">
        {/* Favourites & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <Button 
            variant="outline" 
            className="flex-1 rounded-full border-border justify-start gap-2"
          >
            <Heart className="w-5 h-5" />
            {favourites.length > 0 ? `${favourites.length} Favourites` : "No Favourite Videos"}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowFilter(true)}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Video Categories */}
        {Object.entries(groupedVideos).map(([category, categoryVideos], catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + catIndex * 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">{category}</h2>
              <Button variant="link" className="text-muted-foreground p-0 h-auto underline">
                View All
              </Button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
              {categoryVideos.map((video) => (
                <Link to={`/workouts/player?video=${video.id}`} key={video.id}>
                  <div className="relative w-44 flex-shrink-0">
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-2">
                      <img
                        src={video.image}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavourite(video.id);
                        }}
                        className="absolute top-2 left-2"
                      >
                        <Heart 
                          className={`w-6 h-6 ${
                            favourites.includes(video.id) 
                              ? "fill-red-500 text-red-500" 
                              : "text-foreground"
                          }`} 
                        />
                      </button>
                      {video.isNew && (
                        <span className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1 rounded">
                          NEW
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium text-foreground text-sm">{video.title}</h4>
                    <p className="text-muted-foreground text-xs">{video.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </MobileLayout>
  );
}
