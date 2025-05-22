import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Home as HomeIcon, Menu, X, Bell, Settings, PlusCircle, Users, Box, Scissors } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Dashboard from "@/components/Dashboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TransactionFormDialog } from "@/components/TransactionForm";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userType, setUserType] = useState("Worker"); // This would come from authentication in a real app

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-sm transform lg:translate-x-0 lg:static transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <HomeIcon className="h-6 w-6 text-hissabkitab-blue" />
              <h1 className="text-xl font-bold text-hissabkitab-blue">HissabKitab</h1>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden" 
              onClick={toggleSidebar}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigateTo('/home')}>
              <HomeIcon className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigateTo('/sales')}>
              <Box className="mr-2 h-4 w-4" />
              Sales
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigateTo('/production')}>
              <Scissors className="mr-2 h-4 w-4" />
              Production
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigateTo('/profile')}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            {userType === "Owner" && (
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Workers
              </Button>
            )}
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
          
          <div className="p-4 border-t">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header/Navigation */}
        <header className="bg-hissabkitab-blue text-white shadow-md">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-white"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold hidden md:inline">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white">
                <Bell className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-2">
                <Avatar className="cursor-pointer" onClick={() => navigate('/profile')}>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">User Name</p>
                  <Badge variant="outline" className="bg-white/10 hover:bg-white/20 text-white text-xs">
                    {userType}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="container mx-auto p-6 md:p-10 flex-1">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-hissabkitab-blue">Welcome back, User</h1>
              <p className="text-gray-600">Here's what's happening with your accounts today.</p>
            </div>
            <TransactionFormDialog />
          </div>
          
          <Dashboard userType={userType} />
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-100 border-t">
          <div className="container mx-auto p-6 text-center text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} HissabKitab. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
