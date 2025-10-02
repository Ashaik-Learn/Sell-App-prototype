import { useState, useRef } from "react";
import { Camera as CameraIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Camera = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
        toast({
          title: "Photo captured!",
          description: "Analyzing item...",
        });
        // Navigate to review after a short delay to simulate AI processing
        setTimeout(() => {
          navigate("/review", { state: { image: reader.result as string } });
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <header className="p-6 pb-4">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          SellSnap
        </h1>
        <p className="text-muted-foreground mt-1">AI-powered selling assistant</p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 pb-24">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-3xl shadow-soft overflow-hidden mb-6">
            {capturedImage ? (
              <img
                src={capturedImage}
                alt="Captured item"
                className="w-full aspect-square object-cover"
              />
            ) : (
              <div className="aspect-square bg-muted flex items-center justify-center">
                <CameraIcon className="w-20 h-20 text-muted-foreground/30" />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => fileInputRef.current?.click()}
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:shadow-glow transition-all"
            >
              <CameraIcon className="mr-2 h-5 w-5" />
              Take Photo
            </Button>

            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="lg"
              className="w-full h-14 text-lg font-semibold"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload from Gallery
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageCapture}
            className="hidden"
          />
        </div>
      </main>
    </div>
  );
};

export default Camera;
