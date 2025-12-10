import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProgressPhotos() {
  const navigate = useNavigate();

  const PhotoPlaceholder = ({ label }: { label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-secondary rounded-2xl aspect-[3/4] w-full flex items-center justify-center">
        <div className="text-olive">
          <ImageIcon className="w-12 h-12" />
        </div>
      </div>
      <span className="text-muted-foreground text-sm mt-2">{label}</span>
    </div>
  );

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
          <h1 className="text-3xl font-serif mb-6">Progress Photos</h1>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-foreground font-semibold text-center mb-3">Before Photos</h3>
              <div className="space-y-4">
                <PhotoPlaceholder label="front" />
                <PhotoPlaceholder label="side" />
              </div>
            </div>
            <div>
              <h3 className="text-foreground font-semibold text-center mb-3">Latest Photos</h3>
              <div className="space-y-4">
                <PhotoPlaceholder label="front" />
                <PhotoPlaceholder label="side" />
              </div>
            </div>
          </div>
        </div>

        {/* Update Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background">
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
