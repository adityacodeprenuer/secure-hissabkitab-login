
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const ProfileHeader = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-hissabkitab-blue text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button variant="ghost" size="icon" className="text-white" onClick={() => navigate('/home')}>
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default ProfileHeader;
