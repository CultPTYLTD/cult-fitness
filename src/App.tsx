import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoalProvider } from "@/contexts/GoalContext";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import WorkoutPlayer from "./pages/WorkoutPlayer";
import Meals from "./pages/Meals";
import RecipeDetail from "./pages/RecipeDetail";
import Tracking from "./pages/Tracking";
import Goals from "./pages/Goals";
import Profile from "./pages/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Settings from "./pages/profile/Settings";
import UpdateMacros from "./pages/profile/UpdateMacros";
import ProgressPhotos from "./pages/profile/ProgressPhotos";
import Membership from "./pages/profile/Membership";
import Help from "./pages/profile/Help";
import Programs from "./pages/Programs";
import OnDemand from "./pages/OnDemand";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoalProvider>
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/account" element={<EditProfile />} />
            <Route path="/profile/settings" element={<Settings />} />
            <Route path="/profile/macros" element={<UpdateMacros />} />
            <Route path="/profile/photos" element={<ProgressPhotos />} />
            <Route path="/profile/membership" element={<Membership />} />
            <Route path="/profile/help" element={<Help />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/on-demand" element={<OnDemand />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </GoalProvider>
  </QueryClientProvider>
);

export default App;
