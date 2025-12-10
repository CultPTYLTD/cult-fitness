import { Link, useLocation } from "react-router-dom";
import { Home, Dumbbell, UtensilsCrossed, BarChart3, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Dumbbell, label: "Workouts", path: "/workouts" },
  { icon: UtensilsCrossed, label: "Meals", path: "/meals" },
  { icon: BarChart3, label: "Tracking", path: "/tracking" },
  { icon: Target, label: "Goals", path: "/goals" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
