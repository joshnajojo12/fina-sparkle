import { useState } from "react";
import { GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentDashboard from "./StudentDashboard";
import Index from "../../pages/Index";

const DashboardSelector = () => {
  const [selectedDashboard, setSelectedDashboard] = useState<"student" | "professional" | null>(null);

  if (selectedDashboard === "student") {
    return <StudentDashboard />;
  }

  if (selectedDashboard === "professional") {
    return <Index />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FinanceAI</span> 🚀
          </h1>
          <p className="text-xl text-gray-600 mb-2">Your AI-powered financial companion</p>
          <p className="text-lg text-gray-500">Choose your profile to get started</p>
        </div>

        {/* Dashboard Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 hover:border-blue-400">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-800 mb-2">
                Student Dashboard 🎓
              </CardTitle>
              <p className="text-gray-600">Perfect for managing pocket money and part-time earnings</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💰</span>
                  <span className="text-gray-700">Track pocket money & part-time earnings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎯</span>
                  <span className="text-gray-700">Set fun savings goals (phone, trips, etc.)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🤖</span>
                  <span className="text-gray-700">Get AI feedback on spending habits</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🔔</span>
                  <span className="text-gray-700">College fee reminders & scam alerts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🏆</span>
                  <span className="text-gray-700">Earn badges and achievements</span>
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:shadow-lg"
                onClick={() => setSelectedDashboard("student")}
              >
                I'm a Student
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Professional Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 hover:border-green-400">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-800 mb-2">
                Professional Dashboard 💼
              </CardTitle>
              <p className="text-gray-600">Advanced financial management for working professionals</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📊</span>
                  <span className="text-gray-700">Comprehensive expense analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🏦</span>
                  <span className="text-gray-700">Investment tracking & portfolio</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💳</span>
                  <span className="text-gray-700">Bill management & EMI tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎯</span>
                  <span className="text-gray-700">Advanced savings & retirement goals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🛡️</span>
                  <span className="text-gray-700">Fraud detection & security alerts</span>
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:shadow-lg"
                onClick={() => setSelectedDashboard("professional")}
              >
                I'm a Professional
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Don't worry, you can always switch between dashboards later! 🔄
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSelector;