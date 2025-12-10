import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: "Lauren",
    lastName: "",
    dateOfBirth: "1991-06-09",
    height: "164 cm",
    email: "thelauren-@hotmail.com",
    phone: "",
    faceId: true
  });

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-semibold">Edit Profile</h1>
          <div className="w-10" />
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center pb-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" />
              <AvatarFallback className="bg-secondary text-foreground text-xl">
                L
              </AvatarFallback>
            </Avatar>
            <button className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full text-white text-sm">
              Change
            </button>
          </div>
          <h2 className="text-2xl font-serif mt-3">Lauren</h2>
        </div>

        {/* Personal Information */}
        <div className="px-4 space-y-6">
          <div>
            <h3 className="text-muted-foreground text-sm mb-4">Personal Information</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <span className="text-muted-foreground">First name</span>
                <Input 
                  value={profile.firstName}
                  onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                  className="text-right border-none p-0 h-auto w-auto bg-transparent"
                />
              </div>
              
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <span className="text-muted-foreground">Last name</span>
                <div className="text-right">
                  {profile.lastName ? (
                    <Input 
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      className="text-right border-none p-0 h-auto w-auto bg-transparent"
                    />
                  ) : (
                    <span className="text-red-500 text-sm">Please enter your last name</span>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <span className="text-muted-foreground">Date of Birth</span>
                <span className="text-foreground">{profile.dateOfBirth}</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <span className="text-muted-foreground">Height</span>
                <span className="text-foreground">{profile.height}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-muted-foreground text-sm mb-4">Account Information</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <span className="text-muted-foreground">Email</span>
                <span className="text-foreground">{profile.email}</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <span className="text-muted-foreground">Phone</span>
                <span className="text-foreground">{profile.phone || "-"}</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <span className="text-muted-foreground">Password</span>
                <button className="text-foreground font-medium">Change</button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Face ID</h3>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Use Face ID to login</span>
              <Switch 
                checked={profile.faceId}
                onCheckedChange={(checked) => setProfile({...profile, faceId: checked})}
              />
            </div>
          </div>
        </div>

        {/* Update Button */}
        <div className="p-4 mt-8">
          <Button 
            className="w-full rounded-full bg-secondary text-muted-foreground"
            disabled
          >
            UPDATE
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
