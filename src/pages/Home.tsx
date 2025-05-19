
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Home as HomeIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-hissabkitab-blue text-white shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <HomeIcon className="h-6 w-6" />
            <h1 className="text-2xl font-bold">HissabKitab</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="hidden md:inline">Welcome, User</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="bg-transparent border-white hover:bg-white hover:text-hissabkitab-blue"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 md:p-10">
        <div className="animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-hissabkitab-blue">Welcome to your Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Summary Card */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all animate-slideUp">
              <h2 className="text-xl font-bold mb-4 text-hissabkitab-blue">Account Summary</h2>
              <p className="text-gray-700">Welcome to your HissabKitab dashboard. This is your financial management center.</p>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all animate-slideUp" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-xl font-bold mb-4 text-hissabkitab-blue">Recent Activity</h2>
              <p className="text-gray-700">No recent activity to show. Your activities will appear here.</p>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all animate-slideUp" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-xl font-bold mb-4 text-hissabkitab-blue">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full bg-hissabkitab-teal hover:bg-hissabkitab-blue">Create New Entry</Button>
                <Button variant="outline" className="w-full border-hissabkitab-teal text-hissabkitab-teal hover:bg-hissabkitab-teal hover:text-white">
                  View Reports
                </Button>
              </div>
            </div>
          </div>
          
          {/* Additional Content Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6 text-hissabkitab-blue animate-slideUp" style={{ animationDelay: "0.3s" }}>Your Financial Overview</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md animate-slideUp" style={{ animationDelay: "0.4s" }}>
              <p className="text-gray-700 mb-4">
                Your financial data will be displayed here once you start using the application. 
                HissabKitab provides comprehensive tools for managing your finances effectively.
              </p>
              <p className="text-gray-700">
                As a {" "}
                <span className="font-semibold text-hissabkitab-blue">
                  Worker/Owner
                </span>, you have access to specialized features designed for your role.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 border-t mt-auto">
        <div className="container mx-auto p-6 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} HissabKitab. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
