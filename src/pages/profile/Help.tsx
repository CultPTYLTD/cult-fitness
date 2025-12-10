import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, MessageSquare, HelpCircle, Send, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Help() {
  const navigate = useNavigate();

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <span className="text-sm font-medium tracking-wider">MOVE.WITHUS</span>
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="px-4 pt-8">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl text-olive mb-1">Hi Lauren 👋</h1>
            <h2 className="text-2xl font-serif">How can we help?</h2>
          </div>

          {/* Menu Options */}
          <div className="bg-white rounded-2xl shadow-sm mb-4">
            <button className="w-full flex items-center justify-between p-4 border-b border-border/30">
              <span className="text-foreground">Messages</span>
              <MessageSquare className="w-5 h-5 text-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-4">
              <span className="text-foreground">Help</span>
              <HelpCircle className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Send Message */}
          <button className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between mb-4">
            <span className="text-foreground">Send us a message</span>
            <Send className="w-5 h-5 text-foreground" />
          </button>

          {/* Search */}
          <div className="relative">
            <Input 
              placeholder="Search for help"
              className="w-full bg-white rounded-2xl pr-12 h-14"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground" />
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
