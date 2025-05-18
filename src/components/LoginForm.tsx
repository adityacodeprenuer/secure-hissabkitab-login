
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { Mail, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
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
        description: "Login successful! (This is just a demo)",
      });
    }, 1500);
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google Login",
      description: "Google login functionality would be implemented here",
    });
  };

  return (
    <div className="w-full max-w-md animate-fadeIn">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-hissabkitab-blue animate-slideUp">Sign In</h1>
        <p className="text-gray-500 mt-2 animate-slideUp" style={{ animationDelay: "0.1s" }}>Welcome back to HissabKitab</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2 animate-slideUp" style={{ animationDelay: "0.2s" }}>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              className="pl-10 transition-all duration-300 hover:border-hissabkitab-teal focus:border-hissabkitab-teal"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2 animate-slideUp" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a 
              href="#" 
              className="text-sm text-hissabkitab-teal hover:text-hissabkitab-lightBlue transition-colors duration-300"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              className="pl-10 transition-all duration-300 hover:border-hissabkitab-teal focus:border-hissabkitab-teal"
              required
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-hissabkitab-blue hover:bg-hissabkitab-teal transition-colors duration-300 transform hover:scale-[1.02] animate-slideUp"
          style={{ animationDelay: "0.4s" }}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      
      <div className="my-6 flex items-center animate-slideUp" style={{ animationDelay: "0.5s" }}>
        <Separator className="flex-grow" />
        <span className="mx-4 text-sm text-gray-500">OR</span>
        <Separator className="flex-grow" />
      </div>
      
      <div className="animate-slideUp" style={{ animationDelay: "0.6s" }}>
        <GoogleLoginButton onClick={handleGoogleLogin} />
      </div>
      
      <div className="mt-6 text-center text-sm animate-slideUp" style={{ animationDelay: "0.7s" }}>
        <span className="text-gray-500">Don't have an account?</span>{" "}
        <a href="#" className="text-hissabkitab-teal hover:text-hissabkitab-lightBlue font-semibold transition-colors duration-300">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
