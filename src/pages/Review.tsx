import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const image = location.state?.image;

  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    // Simulate AI generation
    setTimeout(() => {
      setDescription(
        "Gently used vintage denim jacket in excellent condition. Classic blue wash with button-front closure and chest pockets. Perfect for casual wear, fits true to size. No stains or tears, only minor signs of wear that add to its authentic vintage character."
      );
      setIsGenerating(false);
    }, 2000);
  }, []);

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
              <p className="text-lg font-bold">$25</p>
            </div>
            <div className="bg-gradient-accent rounded-xl p-3 text-center shadow-accent">
              <p className="text-xs text-accent-foreground/80 mb-1">Recommended</p>
              <p className="text-lg font-bold text-accent-foreground">$35</p>
            </div>
            <div className="bg-muted rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">High</p>
              <p className="text-lg font-bold">$45</p>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-success/10 rounded-lg p-3">
            <TrendingUp className="h-4 w-4 text-success mt-0.5" />
            <p className="text-sm text-success-foreground">
              Similar items sold for $32-$38 in the last 30 days
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
