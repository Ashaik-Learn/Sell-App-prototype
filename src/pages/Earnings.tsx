import { TrendingUp, DollarSign, Package, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockListings = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    price: 35,
    status: "active",
    views: 24,
    image: "🧥",
  },
  {
    id: 2,
    title: "Classic White Sneakers",
    price: 45,
    status: "sold",
    views: 67,
    image: "👟",
  },
  {
    id: 3,
    title: "Leather Messenger Bag",
    price: 60,
    status: "active",
    views: 12,
    image: "👜",
  },
];

const Earnings = () => {
  const totalEarnings = mockListings
    .filter((l) => l.status === "sold")
    .reduce((sum, l) => sum + l.price, 0);
  const activeListings = mockListings.filter((l) => l.status === "active").length;

  return (
    <div className="min-h-screen bg-gradient-hero pb-24">
      <header className="bg-background/80 backdrop-blur-lg border-b">
        <div className="p-6">
          <h1 className="text-2xl font-bold">My Earnings</h1>
          <p className="text-muted-foreground">Track your sales and listings</p>
        </div>
      </header>

      <main className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-gradient-primary shadow-glow">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-primary-foreground" />
              <p className="text-xs text-primary-foreground/80">Total Earnings</p>
            </div>
            <p className="text-3xl font-bold text-primary-foreground">${totalEarnings}</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Package className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
            <p className="text-3xl font-bold">{activeListings}</p>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Recent Listings</h2>
          <Badge variant="secondary">{mockListings.length} total</Badge>
        </div>

        <div className="space-y-3">
          {mockListings.map((listing) => (
            <Card key={listing.id} className="p-4 hover:shadow-soft transition-all">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-xl flex items-center justify-center text-3xl">
                  {listing.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold truncate">{listing.title}</h3>
                    <Badge
                      variant={listing.status === "sold" ? "default" : "secondary"}
                      className={
                        listing.status === "sold"
                          ? "bg-success text-success-foreground"
                          : ""
                      }
                    >
                      {listing.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">${listing.price}</span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {listing.views} views
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {mockListings.length === 0 && (
          <Card className="p-12 text-center">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No listings yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start selling to see your earnings here!
            </p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Earnings;
