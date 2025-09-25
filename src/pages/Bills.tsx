import { CreditCard, Zap, Wifi, Phone, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/dashboard/StatsCard";

const bills = [
  {
    id: 1,
    name: "Electricity Bill",
    amount: 2500,
    dueDate: "2024-01-28",
    status: "pending",
    icon: Zap,
    suggestion: "Save ₹200 by switching to LED bulbs"
  },
  {
    id: 2,
    name: "Internet Bill",
    amount: 1200,
    dueDate: "2024-01-25",
    status: "overdue",
    icon: Wifi,
    suggestion: "Consider downgrading plan to save ₹300/month"
  },
  {
    id: 3,
    name: "Water Bill",
    amount: 800,
    dueDate: "2024-02-05",
    status: "upcoming",
    icon: Phone,
    suggestion: "Save ₹10 by paying before due date"
  },
  {
    id: 4,
    name: "Phone Bill",
    amount: 599,
    dueDate: "2024-01-30",
    status: "pending",
    icon: Phone,
    suggestion: "Switch to yearly plan to save ₹720"
  }
];

const Bills = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue": return "bg-destructive text-destructive-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "upcoming": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const overdueBills = bills.filter(bill => bill.status === "overdue").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bills & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Payments</span>
            </h1>
            <p className="text-muted-foreground">Manage your monthly bills and payments</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
            <StatsCard
              title="Total Bills"
              value={`₹${totalBills.toLocaleString()}`}
              change="4 bills this month"
              changeType="neutral"
              icon={CreditCard}
              gradient={true}
            />
            <StatsCard
              title="Overdue Bills"
              value={overdueBills.toString()}
              change="Pay immediately"
              changeType="negative"
              icon={AlertCircle}
            />
            <StatsCard
              title="Next Due"
              value="2 days"
              change="Internet bill due"
              changeType="warning"
              icon={Calendar}
            />
          </div>

          {/* Bills List */}
          <div className="glass-card p-6 rounded-2xl animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Upcoming Bills</h3>
              <Button variant="outline" size="sm" className="btn-glow">
                Add Bill
              </Button>
            </div>

            <div className="space-y-4">
              {bills.map((bill) => {
                const Icon = bill.icon;
                const daysUntilDue = Math.ceil((new Date(bill.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={bill.id} className="p-4 rounded-xl border border-border hover:bg-background-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{bill.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Due: {new Date(bill.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-foreground">₹{bill.amount}</p>
                        <Badge className={getStatusColor(bill.status)}>
                          {bill.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-success">{bill.suggestion}</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button size="sm" className="btn-glow">Pay Now</Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bills;