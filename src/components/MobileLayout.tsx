import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface MobileLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export function MobileLayout({ children, showNav = true }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className={showNav ? "pb-20" : ""}>
        {children}
      </div>
      {showNav && <BottomNav />}
    </div>
  );
}
