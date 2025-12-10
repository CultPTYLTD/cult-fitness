import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WeekSelectorProps {
  weekNumber: number;
  dateRange: string;
  selectedDay: number;
  onDaySelect: (day: number) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  days: { label: string; date: number }[];
}

export function WeekSelector({
  weekNumber,
  dateRange,
  selectedDay,
  onDaySelect,
  onPrevWeek,
  onNextWeek,
  days,
}: WeekSelectorProps) {
  return (
    <div className="mb-6">
      {/* Week navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={onPrevWeek}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <span className="font-medium text-foreground">
          {weekNumber ? `Week ${weekNumber}: ` : ""}{dateRange}
        </span>
        <Button variant="ghost" size="icon" onClick={onNextWeek}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Day selector */}
      <div className="flex justify-between border-b border-border pb-4">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => onDaySelect(index)}
            className={cn(
              "flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors",
              selectedDay === index
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="text-[10px] font-medium uppercase">{day.label}</span>
            <span className="text-sm font-semibold">{day.date}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
