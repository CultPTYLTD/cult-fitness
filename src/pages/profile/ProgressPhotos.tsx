import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ImageIcon, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { toast } from "sonner";

interface PhotoData {
  beforeFront: string | null;
  beforeSide: string | null;
  latestFront: string | null;
  latestSide: string | null;
}

export default function ProgressPhotos() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<PhotoData>({
    beforeFront: null,
    beforeSide: null,
    latestFront: null,
    latestSide: null,
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSlot, setActiveSlot] = useState<keyof PhotoData | null>(null);

  const handlePhotoClick = (slot: keyof PhotoData) => {
    setActiveSlot(slot);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeSlot) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => ({
          ...prev,
          [activeSlot]: reader.result as string
        }));
        toast.success("Photo uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleUpdate = () => {
    toast.success("Progress photos saved!");
  };

  const PhotoPlaceholder = ({ 
    label, 
    slot, 
    photo 
  }: { 
    label: string; 
    slot: keyof PhotoData;
    photo: string | null;
  }) => (
    <div className="flex flex-col items-center">
      <button
        onClick={() => handlePhotoClick(slot)}
        className="bg-secondary rounded-2xl aspect-[3/4] w-full flex items-center justify-center overflow-hidden relative group"
      >
        {photo ? (
          <>
            <img src={photo} alt={label} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </>
        ) : (
          <div className="text-muted-foreground flex flex-col items-center gap-2">
            <ImageIcon className="w-12 h-12" />
            <span className="text-xs">Tap to add</span>
          </div>
        )}
      </button>
      <span className="text-muted-foreground text-sm mt-2">{label}</span>
    </div>
  );

  const hasPhotos = Object.values(photos).some(p => p !== null);

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background pb-24">
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
                <PhotoPlaceholder label="front" slot="beforeFront" photo={photos.beforeFront} />
                <PhotoPlaceholder label="side" slot="beforeSide" photo={photos.beforeSide} />
              </div>
            </div>
            <div>
              <h3 className="text-foreground font-semibold text-center mb-3">Latest Photos</h3>
              <div className="space-y-4">
                <PhotoPlaceholder label="front" slot="latestFront" photo={photos.latestFront} />
                <PhotoPlaceholder label="side" slot="latestSide" photo={photos.latestSide} />
              </div>
            </div>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Update Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background">
          <Button 
            className="w-full rounded-full"
            onClick={handleUpdate}
            disabled={!hasPhotos}
          >
            UPDATE
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
