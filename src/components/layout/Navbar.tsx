import { Bell, Menu, User, Wallet, TrendingUp, Target, Shield, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent">
              <Wallet className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FinanceAI
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/">
              <Button variant="ghost" className={`text-foreground hover:text-primary transition-colors ${isActive('/') ? 'bg-primary/10 text-primary' : ''}`}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link to="/savings">
              <Button variant="ghost" className={`text-foreground hover:text-primary transition-colors ${isActive('/savings') ? 'bg-primary/10 text-primary' : ''}`}>
                <Target className="w-4 h-4 mr-2" />
                Savings
              </Button>
            </Link>
            <Link to="/bills">
              <Button variant="ghost" className={`text-foreground hover:text-primary transition-colors ${isActive('/bills') ? 'bg-primary/10 text-primary' : ''}`}>
                <Calculator className="w-4 h-4 mr-2" />
                Bills
              </Button>
            </Link>
            <Link to="/budget">
              <Button variant="ghost" className={`text-foreground hover:text-primary transition-colors ${isActive('/budget') ? 'bg-primary/10 text-primary' : ''}`}>
                <Shield className="w-4 h-4 mr-2" />
                Budget
              </Button>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Link to="/notifications">
              <Button variant="ghost" size="icon" className={`relative ${isActive('/notifications') ? 'bg-primary/10 text-primary' : ''}`}>
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs notification-badge">
                  3
                </Badge>
              </Button>
            </Link>

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

export default Navbar;