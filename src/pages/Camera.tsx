import { useState } from "react";
import { Camera as CameraIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "@capacitor/camera";
import { CameraResultType, CameraSource } from "@capacitor/camera";

const CameraPage = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      const base64Image = `data:image/${image.format};base64,${image.base64String}`;
      setCapturedImage(base64Image);
      
      toast({
        title: "Photo captured!",
        description: "Analyzing item with AI...",
      });

      navigate("/review", { state: { image: base64Image } });
    } catch (error) {
      console.error("Error taking picture:", error);
      toast({
        title: "Error",
        description: "Failed to take picture. Please try again.",
        variant: "destructive",
      });
    }
  };

  const uploadFromGallery = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
      });

      const base64Image = `data:image/${image.format};base64,${image.base64String}`;
      setCapturedImage(base64Image);
      
      toast({
        title: "Photo selected!",
        description: "Analyzing item with AI...",
      });

      navigate("/review", { state: { image: base64Image } });
    } catch (error) {
      console.error("Error selecting photo:", error);
      toast({
        title: "Error",
        description: "Failed to select photo. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <header className="p-6 pb-4">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Sell App
        </h1>
        <p className="text-muted-foreground mt-1">Selling now made simple</p>
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
              onClick={takePicture}
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:shadow-glow transition-all"
            >
              <CameraIcon className="mr-2 h-5 w-5" />
              Take Photo
            </Button>

            <Button
              onClick={uploadFromGallery}
              variant="outline"
              size="lg"
              className="w-full h-14 text-lg font-semibold"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload from Gallery
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CameraPage;
