import { GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoleSelectionProps {
  onRoleSelect: (role: 'student' | 'professional') => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-accent mx-auto mb-6">
            <div className="text-2xl">💰</div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Welcome to FinanceAI
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your financial journey to get personalized insights
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 animate-slide-up">
          {/* Student Card */}
          <div 
            className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer group border-2 hover:border-primary/30"
            onClick={() => onRoleSelect('student')}
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Student</h3>
                <p className="text-muted-foreground mb-4">
                  Perfect for managing pocket money, part-time earnings, and student expenses
                </p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>📱 Track pocket money & earnings</div>
                  <div>🎯 Set fun savings goals</div>
                  <div>🍔 Categorize daily expenses</div>
                  <div>🏆 Earn achievement badges</div>
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                data-testid="button-select-student"
              >
                Start as Student
              </Button>
            </div>
          </div>

          {/* Professional Card */}
          <div 
            className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer group border-2 hover:border-primary/30"
            onClick={() => onRoleSelect('professional')}
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Professional</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced tools for salary management, investments, and financial planning
                </p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>💼 Comprehensive income tracking</div>
                  <div>📊 Investment portfolio insights</div>
                  <div>🏠 EMI & loan management</div>
                  <div>🛡️ Fraud detection & analysis</div>
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                data-testid="button-select-professional"
              >
                Continue as Professional
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground animate-fade-in">
          You can always switch between modes later in settings
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;