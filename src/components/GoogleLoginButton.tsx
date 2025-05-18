
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface GoogleLoginButtonProps {
  onClick: () => void;
}

const GoogleLoginButton = ({ onClick }: GoogleLoginButtonProps) => {
  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 hover:text-hissabkitab-blue transition-all duration-300 transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <Globe className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
      <span>Continue with Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
