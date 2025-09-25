import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import RoleSelection from "@/components/RoleSelection";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import Savings from "./pages/Savings";
import Bills from "./pages/Bills";
import Budget from "./pages/Budget";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [userRole, setUserRole] = useState<'student' | 'professional' | null>(null);

  useEffect(() => {
    // Check if user has already selected a role (persisted in localStorage)
    const savedRole = localStorage.getItem('financeai_user_role');
    if (savedRole === 'student' || savedRole === 'professional') {
      setUserRole(savedRole);
    }
  }, []);

  const handleRoleSelect = (role: 'student' | 'professional') => {
    setUserRole(role);
    localStorage.setItem('financeai_user_role', role);
  };

  // If no role selected, show role selection screen
  if (!userRole) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <RoleSelection onRoleSelect={handleRoleSelect} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {userRole === 'student' ? (
              // Student Routes
              <>
                <Route path="/" element={<StudentDashboard />} />
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/student/goals" element={<StudentDashboard />} />
                <Route path="/student/badges" element={<StudentDashboard />} />
                <Route path="/student/notifications" element={<StudentDashboard />} />
              </>
            ) : (
              // Professional Routes (unchanged)
              <>
                <Route path="/" element={<Index />} />
                <Route path="/savings" element={<Savings />} />
                <Route path="/bills" element={<Bills />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/notifications" element={<Notifications />} />
              </>
            )}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
