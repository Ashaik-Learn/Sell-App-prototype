import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const image = location.state?.image;
  const { toast } = useToast();

  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(true);
  const [priceRange, setPriceRange] = useState({ low: 0, recommended: 0, high: 0 });
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");

  useEffect(() => {
    if (!image) return;

    const analyzeImage = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("analyze-item", {
          body: { imageBase64: image },
        });

        if (error) throw error;

        setDescription(data.description);
        setCategory(data.category);
        setCondition(data.condition);
        setPriceRange(data.priceRange);
        setIsGenerating(false);
      } catch (error) {
        console.error("Error analyzing image:", error);
        toast({
          title: "Analysis failed",
          description: "Using default values. Please edit as needed.",
          variant: "destructive",
        });
        // Fallback values
        setDescription("High-quality item in good condition. Edit this description to add more details.");
        setPriceRange({ low: 20, recommended: 35, high: 50 });
        setCategory("General");
        setCondition("Good");
        setIsGenerating(false);
      }
    };

    analyzeImage();
  }, [image, toast]);

  if (!image) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero pb-24">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Review Listing</h1>
        </div>
      </header>

      <main className="p-4 space-y-4">
        <Card className="overflow-hidden shadow-soft">
          <img
            src={image}
            alt="Item to sell"
            className="w-full aspect-square object-cover"
          />
        </Card>

        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg">AI Description</h2>
            {isGenerating && (
              <Badge variant="secondary" className="ml-auto animate-pulse">
                Generating...
              </Badge>
            )}
          </div>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="AI is generating your description..."
            className="min-h-32 resize-none"
            disabled={isGenerating}
          />
        </Card>

        <Card className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-accent" />
            <h2 className="font-semibold text-lg">Price Analysis</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Low</p>
              <p className="text-lg font-bold">${priceRange.low}</p>
            </div>
            <div className="bg-gradient-accent rounded-xl p-3 text-center shadow-accent">
              <p className="text-xs text-accent-foreground/80 mb-1">Recommended</p>
              <p className="text-lg font-bold text-accent-foreground">${priceRange.recommended}</p>
            </div>
            <div className="bg-muted rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">High</p>
              <p className="text-lg font-bold">${priceRange.high}</p>
            </div>
          </div>

          {category && condition && (
            <div className="flex gap-2">
              <Badge variant="secondary">{category}</Badge>
              <Badge variant="outline">{condition}</Badge>
            </div>
          )}

          <div className="flex items-start gap-2 bg-success/10 rounded-lg p-3">
            <TrendingUp className="h-4 w-4 text-success mt-0.5" />
            <p className="text-sm text-success-foreground">
              AI-powered price analysis based on similar items
            </p>
          </div>
        </Card>

        <Button
          onClick={() => navigate("/post")}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:shadow-glow transition-all"
        >
          Continue to Post
        </Button>
      </main>
    </div>
  );
};

export default Review;
