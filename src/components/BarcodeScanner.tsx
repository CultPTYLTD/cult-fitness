import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, X, Loader2 } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

interface BarcodeScannerProps {
  open: boolean;
  onClose: () => void;
  onScan: (barcode: string) => void;
}

export const BarcodeScanner = ({ open, onClose, onScan }: BarcodeScannerProps) => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (open) {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [open]);

  const startScanner = async () => {
    setError(null);
    setScanning(true);

    try {
      // Small delay to ensure DOM is ready
      await new Promise(resolve => setTimeout(resolve, 100));

      if (!mountedRef.current) return;

      const scanner = new Html5Qrcode('barcode-reader');
      scannerRef.current = scanner;

      const cameras = await Html5Qrcode.getCameras();
      if (cameras.length === 0) {
        throw new Error('No cameras found');
      }

      // Prefer back camera
      const backCamera = cameras.find(c => 
        c.label.toLowerCase().includes('back') || 
        c.label.toLowerCase().includes('rear')
      );
      const cameraId = backCamera?.id || cameras[0].id;

      await scanner.start(
        cameraId,
        {
          fps: 15,
          qrbox: { width: 280, height: 120 },
          aspectRatio: 1.5,
        },
        (decodedText) => {
          console.log('Barcode detected:', decodedText);
          // Stop scanner first to prevent multiple scans
          scanner.stop().then(() => {
            onScan(decodedText);
            onClose();
          }).catch(console.error);
        },
        () => {
          // Ignore scan errors (no code found)
        }
      );
    } catch (err: any) {
      console.error('Scanner error:', err);
      if (mountedRef.current) {
        setError(err.message || 'Failed to start camera');
        setScanning(false);
      }
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (e) {
        // Ignore stop errors
      }
      scannerRef.current = null;
    }
    setScanning(false);
  };

  const handleClose = () => {
    stopScanner();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) handleClose(); }}>
      <DialogContent className="max-w-md mx-auto p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-center font-serif flex items-center justify-between">
            <span>Scan Barcode</span>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="p-4">
          {error ? (
            <div className="text-center py-8 space-y-4">
              <p className="text-destructive">{error}</p>
              <Button onClick={startScanner}>
                <Camera className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          ) : (
            <div className="relative">
              <div 
                id="barcode-reader" 
                className="w-full aspect-square bg-secondary rounded-xl overflow-hidden"
              />
              {scanning && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="border-2 border-primary rounded-lg w-64 h-24 animate-pulse" />
                </div>
              )}
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground mt-4">
            Position the barcode within the frame
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
