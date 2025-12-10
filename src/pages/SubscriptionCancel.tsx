import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function SubscriptionCancel() {
  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-center"
        >
          <XCircle className="w-20 h-20 text-destructive mx-auto mb-6" />
          <h1 className="text-3xl font-serif mb-4">Payment Cancelled</h1>
          <p className="text-muted-foreground mb-8">
            Your payment was cancelled. No charges were made to your account.
          </p>
          <div className="space-y-3">
            <Link to="/subscribe">
              <Button className="rounded-full px-8 w-full">
                TRY AGAIN
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="rounded-full px-8 w-full">
                GO HOME
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </MobileLayout>
  );
}
