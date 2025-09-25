import { TrendingDown, TrendingUp, Calendar, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/dashboard/StatsCard";
import ExpenseChart from "@/components/dashboard/ExpenseChart";

const monthlyExpenses = [
  { category: "Food & Dining", amount: 12500, budget: 15000, icon: "🍽️" },
  { category: "Transportation", amount: 8200, budget: 10000, icon: "🚗" },
  { category: "Shopping", amount: 6800, budget: 8000, icon: "🛍️" },
  { category: "Bills & Utilities", amount: 5100, budget: 5500, icon: "⚡" },
  { category: "Entertainment", amount: 3200, budget: 4000, icon: "🎬" },
  { category: "Healthcare", amount: 2100, budget: 3000, icon: "🏥" }
];

const yearlyComparison = [
  { month: "Jan", spent: 35900, budget: 45500 },
  { month: "Feb", spent: 42100, budget: 45500 },
  { month: "Mar", spent: 38700, budget: 45500 },
  { month: "Apr", spent: 41200, budget: 45500 },
  { month: "May", spent: 44800, budget: 45500 },
  { month: "Jun", spent: 39500, budget: 45500 }
];

const Budget = () => {
  const totalSpent = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBudget = monthlyExpenses.reduce((sum, expense) => sum + expense.budget, 0);
  const savings = totalBudget - totalSpent;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Budget <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Analysis</span>
            </h1>
            <p className="text-muted-foreground">Track your spending patterns and budget performance</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-up">
            <StatsCard
              title="Total Spent"
              value={`₹${totalSpent.toLocaleString()}`}
              change="-5.2% from last month"
              changeType="positive"
              icon={TrendingDown}
              gradient={true}
            />
            <StatsCard
              title="Budget Remaining"
              value={`₹${savings.toLocaleString()}`}
              change={`${((savings/totalBudget)*100).toFixed(1)}% saved`}
              changeType="positive"
              icon={TrendingUp}
            />
            <StatsCard
              title="Categories"
              value="6"
              change="2 over budget"
              changeType="warning"
              icon={PieChart}
            />
            <StatsCard
              title="Avg Daily"
              value={`₹${Math.round(totalSpent/30).toLocaleString()}`}
              change="Within target"
              changeType="positive"
              icon={Calendar}
            />
          </div>

          {/* Budget Analysis Tabs */}
          <div className="animate-scale-in">
            <Tabs defaultValue="monthly" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly View</TabsTrigger>
                <TabsTrigger value="yearly">Yearly View</TabsTrigger>
              </TabsList>

              <TabsContent value="monthly" className="space-y-6">
                {/* Expense Chart */}
                <ExpenseChart />

                {/* Category Breakdown */}
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-foreground">Category Breakdown</h3>
                    <Button variant="outline" size="sm" className="btn-glow">
                      Set Budget
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {monthlyExpenses.map((expense, index) => {
                      const percentage = (expense.amount / expense.budget) * 100;
                      const isOverBudget = percentage > 100;
                      
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-xl">{expense.icon}</span>
                              <div>
                                <h4 className="font-medium text-foreground">{expense.category}</h4>
                                <p className="text-sm text-muted-foreground">
                                  ₹{expense.amount.toLocaleString()} / ₹{expense.budget.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`text-sm font-medium ${isOverBudget ? 'text-destructive' : 'text-success'}`}>
                                {percentage.toFixed(1)}%
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {isOverBudget ? 'Over budget' : 'On track'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${isOverBudget ? 'bg-destructive' : 'bg-primary'} transition-all duration-300`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="yearly" className="space-y-6">
                <div className="glass-card p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-foreground mb-6">Yearly Spending Trend</h3>
                  
                  <div className="space-y-4">
                    {yearlyComparison.map((month, index) => {
                      const percentage = (month.spent / month.budget) * 100;
                      const savings = month.budget - month.spent;
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                              <span className="text-sm font-bold text-primary-foreground">{month.month}</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{month.month} 2024</h4>
                              <p className="text-sm text-muted-foreground">
                                ₹{month.spent.toLocaleString()} spent
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-medium ${savings > 0 ? 'text-success' : 'text-destructive'}`}>
                              {savings > 0 ? `+₹${savings.toLocaleString()}` : `-₹${Math.abs(savings).toLocaleString()}`}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {percentage.toFixed(1)}% of budget
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Budget;