import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const marketplaces = [
  { id: "facebook", name: "Facebook Marketplace", icon: "🔵" },
  { id: "mercari", name: "Mercari", icon: "🟠" },
  { id: "ebay", name: "eBay", icon: "🟡" },
];

const Post = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selected, setSelected] = useState<string[]>(["facebook", "mercari"]);
  const [isPosting, setIsPosting] = useState(false);

  const handleToggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handlePost = () => {
    setIsPosting(true);
    setTimeout(() => {
      toast({
        title: "Posted successfully!",
        description: `Listed on ${selected.length} marketplace${selected.length > 1 ? 's' : ''}`,
      });
      navigate("/earnings");
      setIsPosting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero pb-24">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/review")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Post to Marketplaces</h1>
        </div>
      </header>

      <main className="p-4 space-y-4">
        <div className="space-y-3">
          {marketplaces.map((marketplace) => (
            <Card
              key={marketplace.id}
              className={`p-4 cursor-pointer transition-all ${
                selected.includes(marketplace.id)
                  ? "ring-2 ring-primary shadow-glow"
                  : "hover:shadow-soft"
              }`}
              onClick={() => handleToggle(marketplace.id)}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-full flex items-center justify-center text-2xl">
                  {marketplace.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{marketplace.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selected.includes(marketplace.id) ? "Selected" : "Tap to select"}
                  </p>
                </div>
                <Checkbox
                  checked={selected.includes(marketplace.id)}
                  className="pointer-events-none"
                />
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-4 bg-primary/5 border-primary/20">
          <p className="text-sm text-foreground">
            <strong>Pro tip:</strong> Posting to multiple marketplaces increases your
            chances of selling faster!
          </p>
        </Card>

        <Button
          onClick={handlePost}
          disabled={selected.length === 0 || isPosting}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-gradient-accent hover:shadow-accent transition-all"
        >
          {isPosting ? (
            "Posting..."
          ) : (
            <>
              <Check className="mr-2 h-5 w-5" />
              Post to {selected.length} Marketplace{selected.length > 1 ? "s" : ""}
            </>
          )}
        </Button>
      </main>
    </div>
  );
};

export default Post;
