import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

interface BarcodeScannerProps {
  open: boolean;
  onClose: () => void;
  onScan: (barcode: string) => void;
}

export const BarcodeScanner = ({ open, onClose, onScan }: BarcodeScannerProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const hasScannedRef = useRef(false);

  useEffect(() => {
    if (open) {
      hasScannedRef.current = false;
      startScanner();
    }

    return () => {
      stopScanner();
    };
  }, [open]);

  const startScanner = async () => {
    setError(null);
    setIsStarting(true);

    // Wait for DOM element to be ready
    await new Promise(resolve => setTimeout(resolve, 300));

    const element = document.getElementById('barcode-reader');
    if (!element) {
      setError('Scanner element not found');
      setIsStarting(false);
      return;
    }

    try {
      // Clear any existing scanner
      if (scannerRef.current) {
        try {
          await scannerRef.current.stop();
          scannerRef.current.clear();
        } catch (e) {
          // Ignore
        }
      }

      const scanner = new Html5Qrcode('barcode-reader', {
        formatsToSupport: [
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.QR_CODE,
        ],
        verbose: false,
      });
      scannerRef.current = scanner;

      const cameras = await Html5Qrcode.getCameras();
      console.log('Available cameras:', cameras);
      
      if (cameras.length === 0) {
        throw new Error('No cameras found on this device');
      }

      // Prefer back camera
      const backCamera = cameras.find(c => 
        c.label.toLowerCase().includes('back') || 
        c.label.toLowerCase().includes('rear') ||
        c.label.toLowerCase().includes('environment')
      );
      const cameraId = backCamera?.id || cameras[cameras.length - 1].id;
      console.log('Using camera:', cameraId);

      const config: any = {
        fps: 10,
        // Use full camera frame for more reliable 1D barcode detection
        aspectRatio: 1.7777778,
        disableFlip: true,
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true,
        },
      };

      await scanner.start(
        cameraId,
        config,

        (decodedText) => {
          if (hasScannedRef.current) return;
          hasScannedRef.current = true;
          
          console.log('Barcode detected:', decodedText);
          
          // Vibrate if supported
          if (navigator.vibrate) {
            navigator.vibrate(200);
          }
          
          stopScanner().then(() => {
            onScan(decodedText);
            onClose();
          });
        },
        () => {
          // QR code not found - this is called frequently, ignore
        }
      );
      
      setIsStarting(false);
      console.log('Scanner started successfully');
    } catch (err: any) {
      console.error('Scanner error:', err);
      setError(err.message || 'Failed to start camera. Please allow camera access.');
      setIsStarting(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        const state = scannerRef.current.getState();
        if (state === 2) { // SCANNING
          await scannerRef.current.stop();
        }
        scannerRef.current.clear();
      } catch (e) {
        console.log('Stop scanner error (safe to ignore):', e);
      }
      scannerRef.current = null;
    }
  };

  const handleClose = async () => {
    await stopScanner();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) handleClose(); }}>
      <DialogContent className="max-w-md mx-auto p-0 overflow-hidden bg-background">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="text-center font-serif">
            Scan Barcode
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            Hold the product barcode inside the frame until it is detected.
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 pt-0">
          {error ? (
            <div className="text-center py-8 space-y-4">
              <p className="text-destructive text-sm">{error}</p>
              <Button onClick={startScanner} variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden bg-black">
              <div 
                id="barcode-reader" 
                className="w-full"
                style={{ minHeight: '300px' }}
              />
              {/* Scan overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  <div className="w-64 h-24 border-2 border-primary rounded-lg">
                    {/* Corner accents */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-primary rounded-tl" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-primary rounded-tr" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-primary rounded-bl" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-primary rounded-br" />
                  </div>
                  {/* Scanning line animation */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary animate-pulse" 
                       style={{ animation: 'scan 2s ease-in-out infinite' }} />
                </div>
              </div>
              {isStarting && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <p className="text-white text-sm">Starting camera...</p>
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