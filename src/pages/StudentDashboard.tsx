import { Wallet, Target, TrendingUp, Sparkles } from "lucide-react";
import StudentNavbar from "@/components/student/StudentNavbar";
import StudentIncomeCard from "@/components/student/StudentIncomeCard";
import StudentSavingsGoals from "@/components/student/StudentSavingsGoals";
import StudentExpenses from "@/components/student/StudentExpenses";
import StudentNotifications from "@/components/student/StudentNotifications";
import StudentPredictor from "@/components/student/StudentPredictor";
import StudentBadges from "@/components/student/StudentBadges";
import StatsCard from "@/components/dashboard/StatsCard";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <StudentNavbar />
      
      {/* Main Dashboard */}
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Hey there, <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Student!</span> ✨
            </h1>
            <p className="text-muted-foreground">Let's keep track of your money and reach your goals! 🎯</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
            <StatsCard
              title="Total Balance"
              value="₹4,200"
              change="+₹500 this week"
              changeType="positive"
              icon={Wallet}
              gradient={true}
            />
            <StatsCard
              title="This Month's Savings"
              value="₹1,200"
              change="40% of income saved!"
              changeType="positive"
              icon={Target}
            />
            <StatsCard
              title="Active Goals"
              value="2"
              change="Phone: 20% complete"
              changeType="positive"
              icon={Sparkles}
            />
            <StatsCard
              title="Days Without Overspending"
              value="5"
              change="New record! 🏆"
              changeType="positive"
              icon={TrendingUp}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="animate-scale-in">
                <StudentIncomeCard />
              </div>
              <div className="animate-scale-in">
                <StudentExpenses />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="animate-scale-in">
                <StudentSavingsGoals />
              </div>
              <div className="animate-scale-in">
                <StudentPredictor />
              </div>
              <div className="animate-scale-in">
                <StudentBadges />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="animate-fade-in">
            <StudentNotifications />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;