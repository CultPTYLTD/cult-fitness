import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedWorkouts } from "@/components/FeaturedWorkouts";
import { TodayWorkout } from "@/components/TodayWorkout";
import { Stats } from "@/components/Stats";
import { Programs } from "@/components/Programs";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedWorkouts />
      <TodayWorkout />
      <Stats />
      <Programs />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
