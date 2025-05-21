
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Production from "./pages/Production";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// This would be a proper auth check in a real application
const isAuthenticated = () => {
  // In a real app, check for valid token, user session, etc.
  return false; // Default to not authenticated
};

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Protected routes */}
          <Route 
            path="/home" 
            element={
              <Home />
              /* In a real app, use this instead:
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
              */
            } 
          />
          
          <Route 
            path="/sales" 
            element={
              <Sales />
              /* In a real app, use this instead:
              <ProtectedRoute>
                <Sales />
              </ProtectedRoute>
              */
            } 
          />
          
          <Route 
            path="/production" 
            element={
              <Production />
              /* In a real app, use this instead:
              <ProtectedRoute>
                <Production />
              </ProtectedRoute>
              */
            } 
          />

          <Route 
            path="/profile" 
            element={
              <Profile />
              /* In a real app, use this instead:
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
              */
            } 
          />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
