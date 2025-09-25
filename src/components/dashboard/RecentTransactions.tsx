import { ArrowUpRight, ArrowDownLeft, ShoppingBag, Car, Coffee, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const transactions = [
  {
    id: 1,
    type: "expense",
    category: "Food",
    description: "Swiggy Order",
    amount: 450,
    date: "Today",
    icon: Coffee,
    color: "text-orange-500"
  },
  {
    id: 2,
    type: "income",
    category: "Salary",
    description: "Monthly Salary",
    amount: 75000,
    date: "Yesterday",
    icon: ArrowDownLeft,
    color: "text-green-500"
  },
  {
    id: 3,
    type: "expense",
    category: "Transport",
    description: "Uber Ride",
    amount: 180,
    date: "2 days ago",
    icon: Car,
    color: "text-blue-500"
  },
  {
    id: 4,
    type: "expense",
    category: "Shopping",
    description: "Amazon Purchase",
    amount: 2500,
    date: "3 days ago",
    icon: ShoppingBag,
    color: "text-purple-500"
  },
  {
    id: 5,
    type: "expense",
    category: "Bills",
    description: "Electricity Bill",
    amount: 1200,
    date: "4 days ago",
    icon: Home,
    color: "text-yellow-500"
  }
];

const RecentTransactions = () => {
  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => {
          const Icon = transaction.icon;
          const isExpense = transaction.type === "expense";
          
          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-background-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-background-accent flex items-center justify-center ${transaction.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    {transaction.description}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span
                  className={`text-sm font-medium ${
                    isExpense ? "text-destructive" : "text-success"
                  }`}
                >
                  {isExpense ? "-" : "+"}₹{transaction.amount.toLocaleString()}
                </span>
                {isExpense ? (
                  <ArrowUpRight className="w-4 h-4 text-destructive" />
                ) : (
                  <ArrowDownLeft className="w-4 h-4 text-success" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransactions;