import { Bell, Menu, User, Wallet, TrendingUp, Target, Gamepad2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";

const StudentNavbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              FinanceAI Student
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/student">
              <Button variant="ghost" className={`text-foreground hover:text-primary transition-colors ${isActive('/student') ? 'bg-primary/10 text-primary' : ''}`}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link to="/student/goals">
              <Button variant="ghost" className={`text-foreground hover:text-primary transition-colors ${isActive('/student/goals') ? 'bg-primary/10 text-primary' : ''}`}>
                <Target className="w-4 h-4 mr-2" />
                Goals
              </Button>
            </Link>
            <Link to="/student/badges">
              <Button variant="ghost" className={`text-foreground hover:text-primary transition-colors ${isActive('/student/badges') ? 'bg-primary/10 text-primary' : ''}`}>
                <Gamepad2 className="w-4 h-4 mr-2" />
                Badges
              </Button>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Link to="/student/notifications">
              <Button variant="ghost" size="icon" className={`relative ${isActive('/student/notifications') ? 'bg-primary/10 text-primary' : ''}`}>
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-500 text-white text-xs notification-badge">
                  2
                </Badge>
              </Button>
            </Link>

            {/* Settings */}
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>

            {/* Profile */}
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;