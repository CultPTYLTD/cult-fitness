import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function SubscriptionSuccess() {
  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-center"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-serif mb-4">Welcome to CULT Fitness!</h1>
          <p className="text-muted-foreground mb-8">
            Your subscription is now active. You have full access to all workouts and meal plans.
          </p>
          <Link to="/">
            <Button className="rounded-full px-8">
              START YOUR JOURNEY
            </Button>
          </Link>
        </motion.div>
      </div>
    </MobileLayout>
  );
}
