import { ChevronRight, DollarSign, User, CreditCard, Clock, Edit } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const totalEarnings = 842.50;

  const menuItems = [
    { 
      icon: User, 
      label: "Edit Username", 
      action: () => console.log("Edit username") 
    },
    { 
      icon: Edit, 
      label: "Personal Information", 
      action: () => console.log("Edit personal info") 
    },
    { 
      icon: CreditCard, 
      label: "Bank Details", 
      action: () => console.log("Edit bank details") 
    },
    { 
      icon: Clock, 
      label: "Transaction History", 
      action: () => console.log("View transactions") 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero pb-24">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {/* Earnings Card */}
        <Card className="p-6 bg-gradient-accent shadow-accent">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-accent-foreground/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-accent-foreground" />
            </div>
            <span className="text-accent-foreground/80 font-medium">Total Earnings</span>
          </div>
          <p className="text-4xl font-bold text-accent-foreground">
            ${totalEarnings.toFixed(2)}
          </p>
          <p className="text-accent-foreground/70 mt-1 text-sm">
            All time earnings from your sales
          </p>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="p-4 hover:shadow-soft transition-all cursor-pointer"
                onClick={item.action}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Sign Out Button */}
        <Button
          variant="outline"
          className="w-full h-12 text-base font-semibold"
          onClick={() => console.log("Sign out")}
        >
          Sign Out
        </Button>
      </main>
    </div>
  );
};

export default Profile;
