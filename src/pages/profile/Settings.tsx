import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ChevronRight, Dumbbell, Heart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    bodyMeasurements: "metric",
    nutritionMeasurements: "metric",
    socialSharing: false,
    emailMarketing: true
  });

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>

        <div className="px-4">
          <h1 className="text-3xl font-serif mb-6">Settings</h1>

          {/* Body Measurements */}
          <div className="mb-6">
            <h3 className="text-foreground font-semibold mb-3">Body Measurements</h3>
            <div className="flex gap-3">
              <Button
                variant={settings.bodyMeasurements === "metric" ? "olive" : "outline"}
                className="flex-1 rounded-full"
                onClick={() => setSettings({...settings, bodyMeasurements: "metric"})}
              >
                Metric
              </Button>
              <Button
                variant={settings.bodyMeasurements === "us" ? "olive" : "outline"}
                className="flex-1 rounded-full"
                onClick={() => setSettings({...settings, bodyMeasurements: "us"})}
              >
                US Units
              </Button>
            </div>
            <p className="text-muted-foreground text-sm mt-2">
              {settings.bodyMeasurements === "metric" ? "Cm / Kg" : "In / Lbs"}
            </p>
          </div>

          {/* Nutrition Measurements */}
          <div className="mb-6">
            <h3 className="text-foreground font-semibold mb-3">Nutrition Measurements</h3>
            <div className="flex gap-3">
              <Button
                variant={settings.nutritionMeasurements === "metric" ? "olive" : "outline"}
                className="flex-1 rounded-full"
                onClick={() => setSettings({...settings, nutritionMeasurements: "metric"})}
              >
                Metric
              </Button>
              <Button
                variant={settings.nutritionMeasurements === "us" ? "olive" : "outline"}
                className="flex-1 rounded-full"
                onClick={() => setSettings({...settings, nutritionMeasurements: "us"})}
              >
                US Units
              </Button>
            </div>
            <p className="text-muted-foreground text-sm mt-2">
              {settings.nutritionMeasurements === "metric" ? "g / ml" : "Oz / Lb"}
            </p>
          </div>

          {/* Workout Program */}
          <div className="mb-6">
            <h3 className="text-foreground font-semibold mb-3">Workout Program</h3>
            <button 
              className="w-full flex items-center justify-between py-3"
              onClick={() => navigate("/programs")}
            >
              <div className="flex items-center gap-3">
                <Dumbbell className="w-5 h-5 text-foreground" />
                <div className="text-left">
                  <p className="text-foreground font-medium">Update my program details</p>
                  <p className="text-muted-foreground text-sm">Gym • 5 days</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Step Tracking */}
          <div className="mb-6">
            <h3 className="text-foreground font-semibold mb-3">Step Tracking</h3>
            <button 
              className="w-full flex items-center justify-between py-3"
              onClick={() => {/* Apple Health requires native app */}}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Heart className="w-5 h-5 text-red-400" />
                </div>
                <div className="text-left">
                  <p className="text-foreground font-medium">Link Apple Health</p>
                  <p className="text-muted-foreground text-sm">Sync your recorded steps</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Pregnancy */}
          <div className="mb-6">
            <h3 className="text-foreground font-semibold mb-3">Pregnancy</h3>
            <button className="w-full flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-foreground" />
                <div className="text-left">
                  <p className="text-foreground font-medium">Pregnant or recently given birth?</p>
                  <p className="text-muted-foreground text-sm">We only use this information to provide you with prenatal or postnatal friendly exercises across our programs</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Social Sharing */}
          <div className="mb-6">
            <h3 className="text-foreground font-semibold mb-3">Social Sharing</h3>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 border-foreground rounded-full flex items-center justify-center">
                  <span className="text-lg">↑</span>
                </div>
                <div>
                  <p className="text-foreground font-medium">Social Sharing</p>
                  <p className="text-muted-foreground text-sm">Allow consent for Social Sharing of photos</p>
                </div>
              </div>
              <Switch 
                checked={settings.socialSharing}
                onCheckedChange={(checked) => setSettings({...settings, socialSharing: checked})}
              />
            </div>
          </div>

          {/* Email Marketing */}
          <div className="mb-6">
            <h3 className="text-foreground font-semibold mb-3">Email Marketing</h3>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">✉</span>
                <div>
                  <p className="text-foreground font-medium">Opt In/Opt Out</p>
                  <p className="text-muted-foreground text-sm">Allow MWU to send important updates, news and marketing information</p>
                </div>
              </div>
              <Switch 
                checked={settings.emailMarketing}
                onCheckedChange={(checked) => setSettings({...settings, emailMarketing: checked})}
              />
            </div>
          </div>

          {/* Reboot Options */}
          <div className="mb-8">
            <h3 className="text-foreground font-semibold mb-3">Reboot Options</h3>
            <div className="space-y-3">
              <Button variant="olive" className="w-full rounded-full">
                REBOOT MY WORKOUTS
              </Button>
              <Button variant="olive" className="w-full rounded-full">
                REBOOT MY MEALS
              </Button>
              <Button variant="olive" className="w-full rounded-full">
                RESTART PROGRAM
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
