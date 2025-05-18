
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface GoogleLoginButtonProps {
  onClick: () => void;
}

const GoogleLoginButton = ({ onClick }: GoogleLoginButtonProps) => {
  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 hover:text-hissabkitab-blue transition-all"
      onClick={onClick}
    >
      <Globe className="h-4 w-4" />
      <span>Continue with Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
