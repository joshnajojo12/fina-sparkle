import { Wallet, TrendingUp, Target, PiggyBank, CreditCard, AlertTriangle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/dashboard/StatsCard";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Main Dashboard */}
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Raj</span>
            </h1>
            <p className="text-muted-foreground">Here's your financial overview for this month</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
            <StatsCard
              title="Monthly Income"
              value="₹75,000"
              change="+5.2% from last month"
              changeType="positive"
              icon={Wallet}
              gradient={true}
            />
            <StatsCard
              title="Total Savings"
              value="₹2,02,000"
              change="+₹12,500 this month"
              changeType="positive"
              icon={PiggyBank}
            />
            <StatsCard
              title="Active Goals"
              value="3"
              change="67% avg progress"
              changeType="positive"
              icon={Target}
            />
            <StatsCard
              title="EMI Due"
              value="₹28,500"
              change="2 payments this month"
              changeType="neutral"
              icon={CreditCard}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Charts */}
            <div className="lg:col-span-2 space-y-8">
              <div className="animate-scale-in">
                <ExpenseChart />
              </div>
            </div>

            {/* Right Column - Quick Actions */}
            <div className="space-y-8">
              <div className="animate-scale-in">
                <QuickActions />
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="animate-fade-in">
            <RecentTransactions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
