import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Camera, Barcode, Loader2, X, Check, ScanLine, Minus, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { BarcodeScanner } from './BarcodeScanner';

interface FoodScanResult {
  food_name: string;
  serving_size?: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
  fibre_g?: number;
  error?: string;
}

interface FoodScannerProps {
  open: boolean;
  onClose: () => void;
  onScanComplete: (result: FoodScanResult) => void;
}

export const FoodScanner = ({ open, onClose, onScanComplete }: FoodScannerProps) => {
  const [mode, setMode] = useState<'select' | 'camera' | 'barcode' | 'barcode-manual' | 'result'>('select');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [barcode, setBarcode] = useState('');
  const [result, setResult] = useState<FoodScanResult | null>(null);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [servings, setServings] = useState(1);
  const [scanType, setScanType] = useState<'photo' | 'barcode'>('photo');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!preview) return;
    
    setLoading(true);
    setScanType('photo');
    try {
      const { data, error } = await supabase.functions.invoke('analyze-food', {
        body: { imageBase64: preview }
      });

      if (error) throw error;
      
      if (data.error) {
        toast.error(data.error);
        return;
      }

      setResult(data);
      setMode('result');
      setServings(1);
    } catch (error: any) {
      console.error('Error analyzing image:', error);
      toast.error('Failed to analyze food. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const analyzeBarcode = async (code: string) => {
    if (!code.trim()) {
      toast.error('Please enter a barcode');
      return;
    }
    
    setLoading(true);
    setScanType('barcode');
    setMode('barcode');
    try {
      const { data, error } = await supabase.functions.invoke('analyze-food', {
        body: { barcode: code.trim() }
      });

      if (error) throw error;
      
      if (data.error) {
        toast.error(data.error);
        setMode('select');
        return;
      }

      setResult(data);
      setMode('result');
      setServings(1);
    } catch (error: any) {
      console.error('Error analyzing barcode:', error);
      toast.error('Failed to look up barcode. Please try again.');
      setMode('select');
    } finally {
      setLoading(false);
    }
  };

  const handleBarcodeScan = (scannedCode: string) => {
    console.log('Barcode scanned:', scannedCode);
    setBarcode(scannedCode);
    setShowBarcodeScanner(false);
    analyzeBarcode(scannedCode);
  };

  const getAdjustedValue = (value: number) => {
    return Math.round(value * servings);
  };

  const saveResult = async () => {
    if (!result) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to save food scans');
        return;
      }

      const { error } = await supabase.from('food_scans').insert({
        user_id: user.id,
        scan_type: scanType,
        food_name: result.food_name,
        calories: getAdjustedValue(result.calories),
        protein_g: getAdjustedValue(result.protein_g),
        carbs_g: getAdjustedValue(result.carbs_g),
        fats_g: getAdjustedValue(result.fats_g),
        fibre_g: result.fibre_g ? getAdjustedValue(result.fibre_g) : null,
        serving_size: `${servings} × ${result.serving_size || 'serving'}`,
        barcode: scanType === 'barcode' ? barcode : null
      });

      if (error) throw error;
      
      toast.success('Food added to your log!');
      onScanComplete({
        ...result,
        calories: getAdjustedValue(result.calories),
        protein_g: getAdjustedValue(result.protein_g),
        carbs_g: getAdjustedValue(result.carbs_g),
        fats_g: getAdjustedValue(result.fats_g),
        fibre_g: result.fibre_g ? getAdjustedValue(result.fibre_g) : undefined
      });
      handleReset();
      onClose();
    } catch (error: any) {
      console.error('Error saving food scan:', error);
      toast.error('Failed to save. Please try again.');
    }
  };

  const handleReset = () => {
    setMode('select');
    setPreview(null);
    setBarcode('');
    setResult(null);
    setLoading(false);
    setServings(1);
  };

  const adjustServings = (delta: number) => {
    setServings(prev => Math.max(0.25, Math.min(10, prev + delta)));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) { handleReset(); onClose(); } }}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center font-serif">
              {mode === 'result' ? 'Nutrition Info' : mode === 'select' ? 'Scan Food' : mode === 'camera' ? 'Take Photo' : 'Scan Barcode'}
            </DialogTitle>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {mode === 'result' && result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground">{result.food_name}</h3>
                  {result.serving_size && (
                    <p className="text-sm text-muted-foreground">Per serving: {result.serving_size}</p>
                  )}
                </div>

                {/* Serving Size Adjuster */}
                <div className="bg-secondary/50 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground text-center mb-3">How much are you eating?</p>
                  <div className="flex items-center justify-center gap-4">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => adjustServings(-0.25)}
                      disabled={servings <= 0.25}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <div className="text-center min-w-[80px]">
                      <span className="text-2xl font-bold text-foreground">{servings}</span>
                      <p className="text-xs text-muted-foreground">serving{servings !== 1 ? 's' : ''}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => adjustServings(0.25)}
                      disabled={servings >= 10}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <Slider
                    value={[servings]}
                    onValueChange={([val]) => setServings(val)}
                    min={0.25}
                    max={5}
                    step={0.25}
                    className="mt-3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-primary/10 rounded-xl p-4 text-center">
                    <span className="text-2xl font-bold text-primary">{getAdjustedValue(result.calories)}</span>
                    <p className="text-xs text-muted-foreground">CALORIES</p>
                  </div>
                  <div className="bg-secondary rounded-xl p-4 text-center">
                    <span className="text-2xl font-bold text-foreground">{getAdjustedValue(result.protein_g)}g</span>
                    <p className="text-xs text-muted-foreground">PROTEIN</p>
                  </div>
                  <div className="bg-secondary rounded-xl p-4 text-center">
                    <span className="text-2xl font-bold text-foreground">{getAdjustedValue(result.carbs_g)}g</span>
                    <p className="text-xs text-muted-foreground">CARBS</p>
                  </div>
                  <div className="bg-secondary rounded-xl p-4 text-center">
                    <span className="text-2xl font-bold text-foreground">{getAdjustedValue(result.fats_g)}g</span>
                    <p className="text-xs text-muted-foreground">FAT</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={handleReset}>
                    <X className="w-4 h-4 mr-2" />
                    Scan Again
                  </Button>
                  <Button className="flex-1" onClick={saveResult}>
                    <Check className="w-4 h-4 mr-2" />
                    Add to Log
                  </Button>
                </div>
              </motion.div>
            ) : mode === 'select' ? (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <Button
                  variant="outline"
                  className="w-full h-24 flex flex-col gap-2"
                  onClick={() => setMode('camera')}
                >
                  <Camera className="w-8 h-8" />
                  <span>Take Photo of Food</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-24 flex flex-col gap-2"
                  onClick={() => {
                    setShowBarcodeScanner(true);
                  }}
                >
                  <ScanLine className="w-8 h-8" />
                  <span>Scan Barcode with Camera</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setMode('barcode-manual')}
                >
                  <Barcode className="w-4 h-4 mr-2" />
                  Enter Barcode Manually
                </Button>
              </motion.div>
            ) : mode === 'camera' ? (
              <motion.div
                key="camera"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {preview ? (
                  <div className="relative">
                    <img src={preview} alt="Food preview" className="w-full rounded-xl object-cover aspect-square" />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2"
                      onClick={() => setPreview(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="w-full aspect-square bg-secondary rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/80 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="w-12 h-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Tap to take or select photo</p>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageCapture}
                  className="hidden"
                />

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={handleReset}>
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={analyzeImage} 
                    disabled={!preview || loading}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Analyze
                  </Button>
                </div>
              </motion.div>
            ) : mode === 'barcode-manual' ? (
              <motion.div
                key="barcode-manual"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Enter product barcode</label>
                  <Input
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    placeholder="e.g., 5901234123457"
                    className="text-center text-lg tracking-widest"
                    inputMode="numeric"
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={handleReset}>
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={() => analyzeBarcode(barcode)} 
                    disabled={!barcode.trim() || loading}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Look Up
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                  <p className="text-muted-foreground">Looking up barcode...</p>
                </div>
                <Button variant="outline" className="w-full" onClick={handleReset}>
                  Cancel
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <BarcodeScanner 
        open={showBarcodeScanner} 
        onClose={() => {
          setShowBarcodeScanner(false);
        }}
        onScan={handleBarcodeScan}
      />
    </>
  );
};
