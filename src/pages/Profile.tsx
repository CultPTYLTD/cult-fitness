import { MobileLayout } from "@/components/MobileLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  X, 
  ChevronRight, 
  Crown, 
  User, 
  Settings, 
  CircleDot,
  Image as ImageIcon,
  Podcast,
  Facebook,
  MessageCircle,
  FileText,
  Shield,
  Trash2,
  LogOut
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const menuItems = [
  { icon: Crown, label: "Manage My Membership", description: "Renews on December 19, 2025", link: "#" },
  { icon: User, label: "My Account", description: "Update your personal information", link: "#" },
  { icon: Settings, label: "Settings", description: "Update settings and preferences", link: "#" },
  { icon: CircleDot, label: "Update My Macros", description: "Update your goal, restrictions and calories", link: "#" },
  { icon: ImageIcon, label: "My Progress", description: "Compare your progress pictures", link: "/tracking" },
  { icon: Podcast, label: "Podcasts", description: "Listen to behind the scenes updates", link: "#" },
  { icon: Facebook, label: "Join Our Facebook Group", description: "Share your journey with the community", link: "#" },
  { icon: MessageCircle, label: "Chat With Us", description: "Get in touch with us now", link: "#" },
  { icon: FileText, label: "Terms and Conditions", description: "Terms and Conditions documentation", link: "#" },
  { icon: Shield, label: "Privacy Policy", description: "Privacy Policy documentation", link: "#" },
  { icon: Trash2, label: "Delete Account", description: "Delete all your data", link: "#" },
  { icon: LogOut, label: "Sign out", description: "Sign out of your account", link: "#" },
];

export default function Profile() {
  const navigate = useNavigate();

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center pb-6"
        >
          <div className="relative mb-2">
            <Avatar className="h-28 w-28 border-4 border-olive">
              <AvatarImage src="" />
              <AvatarFallback className="bg-secondary text-foreground text-2xl font-medium">
                CF
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-olive text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <Crown className="w-3 h-3" />
              Platinum
            </div>
          </div>
          <h1 className="text-2xl font-serif mt-4">LAUREN</h1>
        </motion.div>

        {/* Active Program */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-4 mb-4"
        >
          <p className="text-sm text-muted-foreground mb-2">My Active Program</p>
          <div className="bg-secondary rounded-2xl p-4 mb-3">
            <h3 className="font-semibold text-foreground">FIT Program Level 4</h3>
            <p className="text-muted-foreground text-sm">4 Weeks</p>
          </div>
          <Link to="/programs">
            <Button variant="olive" className="w-full rounded-full justify-between">
              Change Program
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-4"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link to={item.link} key={item.label}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.03 }}
                  className="flex items-center justify-between py-4 border-b border-border/50"
                >
                  <div className="flex items-center gap-4">
                    <Icon className="w-5 h-5 text-foreground" />
                    <div>
                      <p className="text-foreground font-medium">{item.label}</p>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        {/* Version */}
        <div className="text-center py-6">
          <p className="text-muted-foreground text-sm">v5.6.0 (1)</p>
        </div>
      </div>
    </MobileLayout>
  );
}
