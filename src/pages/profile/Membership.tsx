import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export default function Membership() {
  const navigate = useNavigate();

  const handlePauseMembership = () => {
    toast.info("Pause membership feature coming soon");
  };

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Hero Image */}
        <div className="relative h-32 bg-gradient-to-b from-foreground to-foreground/80">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>

        <div className="px-4 -mt-4">
          <h1 className="text-3xl font-serif mb-1">Platinum Membership</h1>
          <p className="text-muted-foreground mb-4">Renews on December 19, 2025</p>

          <div className="bg-foreground text-background rounded-xl p-4 mb-4">
            <span className="font-medium">Monthly Subscription - R250/month</span>
          </div>

          <Link to="/subscribe">
            <button className="w-full text-center text-red-500 font-medium py-3 border-b border-border/30">
              MANAGE SUBSCRIPTION
            </button>
          </Link>
          
          <button 
            className="w-full text-center text-foreground font-medium py-3 border-b border-border/30"
            onClick={handlePauseMembership}
          >
            PAUSE MEMBERSHIP
          </button>

          {/* What it includes */}
          <div className="mt-6">
            <h2 className="text-2xl font-serif mb-4">What it includes</h2>
            
            <div className="space-y-4 text-foreground">
              <div>
                <h3 className="font-bold">ACCESS TO ALL PROGRAMS AND CHALLENGES</h3>
                <p className="text-sm">
                  Receive access to all 10+ Move with Us Programs and Levels, designed to fit seamlessly into your lifestyle and help you achieve real results. Follow a structured training schedule with guided workouts, exercise swaps, and both home and gym options.
                </p>
              </div>
              
              <p className="text-sm">
                Throughout your membership, you'll have the opportunity to participate in all MWU Challenges. These Challenges encourage our community to come together, progress together and achieve goals.
              </p>
              
              <div>
                <h3 className="font-bold">MEAL GUIDES & NUTRITION TRACKING</h3>
                <p className="text-sm">
                  Enjoy customisable Meal Guides and over 1500+ macro-friendly recipes created by our team of accredited dietitians. Our proven approach to balanced eating has been created to help you achieve results while eating more of the foods you love.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold">7-DAY FREE TRIAL AVAILABLE</h3>
                <p className="text-sm">
                  Experience our Platinum Membership features FREE for 7 days. Access all Training Programs, Customisable Meal Guides, 100+ On-Demand Workouts, 1,500+ recipes, comprehensive tracking features, and more. Take the first step towards a healthier, happier you today and start your free trial.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold">MANAGING YOUR MEMBERSHIP</h3>
                <p className="text-sm">
                  Easily manage, modify, or cancel your membership subscription via the "Manage My Membership" option in your account settings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Restore Button */}
        <div className="p-4 mt-4">
          <Button className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90">
            RESTORE
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
