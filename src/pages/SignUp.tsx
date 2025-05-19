
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mail, User, Home, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    userType: "worker" // Default value
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, userType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username || !formData.email || !formData.password || !formData.address) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Here we would normally connect to a backend
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      navigate("/home");
    }, 1500);
  };

  const handleGoogleSignUp = () => {
    toast({
      title: "Google Sign Up",
      description: "Google sign up functionality would be implemented here",
    });
    // After successful Google signup, navigate to home
    setTimeout(() => navigate("/home"), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="w-full md:w-1/2 bg-hissabkitab-blue text-white p-8 flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
        <div className="text-center max-w-md animate-slideUp">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-pulse-slow">HissabKitab</h1>
          <p className="text-lg md:text-xl opacity-80 mb-6">
            Your ultimate financial management solution
          </p>
          <div className="hidden md:block">
            <div className="mt-10 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <p className="italic text-white/90">
                "Join our platform to manage your finances efficiently. Perfect for both business owners and workers."
              </p>
              <p className="mt-4 font-semibold">— HissabKitab Team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - SignUp Form */}
      <div className="w-full md:w-1/2 p-8 flex justify-center items-center bg-white animate-fadeIn" style={{ animationDelay: "0.3s" }}>
        <div className="w-full max-w-md animate-fadeIn">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-hissabkitab-blue animate-slideUp">Create Account</h1>
            <p className="text-gray-500 mt-2 animate-slideUp" style={{ animationDelay: "0.1s" }}>Join HissabKitab today</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 animate-slideUp" style={{ animationDelay: "0.2s" }}>
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-10 transition-all duration-300"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2 animate-slideUp" style={{ animationDelay: "0.3s" }}>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 transition-all duration-300"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2 animate-slideUp" style={{ animationDelay: "0.4s" }}>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 animate-slideUp" style={{ animationDelay: "0.5s" }}>
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Your address"
                  value={formData.address}
                  onChange={handleChange}
                  className="pl-10 transition-all duration-300"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2 animate-slideUp" style={{ animationDelay: "0.6s" }}>
              <Label>Who are you?</Label>
              <RadioGroup 
                value={formData.userType} 
                onValueChange={handleUserTypeChange}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="worker" id="worker" />
                  <Label htmlFor="worker" className="cursor-pointer">Worker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="owner" id="owner" />
                  <Label htmlFor="owner" className="cursor-pointer">Owner</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-hissabkitab-blue hover:bg-hissabkitab-teal transition-colors duration-300 transform hover:scale-[1.02] animate-slideUp"
              style={{ animationDelay: "0.7s" }}
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </form>
          
          <div className="my-6 flex items-center animate-slideUp" style={{ animationDelay: "0.8s" }}>
            <Separator className="flex-grow" />
            <span className="mx-4 text-sm text-gray-500">OR</span>
            <Separator className="flex-grow" />
          </div>
          
          <div className="animate-slideUp" style={{ animationDelay: "0.9s" }}>
            <GoogleLoginButton onClick={handleGoogleSignUp} />
          </div>
          
          <div className="mt-6 text-center text-sm animate-slideUp" style={{ animationDelay: "1s" }}>
            <span className="text-gray-500">Already have an account?</span>{" "}
            <a href="/" className="text-hissabkitab-teal hover:text-hissabkitab-lightBlue font-semibold transition-colors duration-300">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
