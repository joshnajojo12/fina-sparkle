import { Plus, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import SavingsGoals from "@/components/dashboard/SavingsGoals";
import StatsCard from "@/components/dashboard/StatsCard";

const Savings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Savings <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Goals</span>
            </h1>
            <p className="text-muted-foreground">Track and manage your savings goals</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
            <StatsCard
              title="Total Saved"
              value="₹2,02,000"
              change="+₹12,500 this month"
              changeType="positive"
              icon={TrendingUp}
              gradient={true}
            />
            <StatsCard
              title="Active Goals"
              value="3"
              change="67% avg progress"
              changeType="positive"
              icon={Target}
            />
            <StatsCard
              title="Monthly Target"
              value="₹15,000"
              change="83% completed"
              changeType="positive"
              icon={Plus}
            />
          </div>

          {/* Savings Goals */}
          <div className="animate-scale-in">
            <SavingsGoals />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Savings;