import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import WorkoutPlayer from "./pages/WorkoutPlayer";
import Meals from "./pages/Meals";
import RecipeDetail from "./pages/RecipeDetail";
import Tracking from "./pages/Tracking";
import Goals from "./pages/Goals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/player" element={<WorkoutPlayer />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/meals/recipe/:id" element={<RecipeDetail />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/goals" element={<Goals />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
