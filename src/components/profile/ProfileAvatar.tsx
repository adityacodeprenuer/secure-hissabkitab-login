
import React from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  profileImage: string;
  name: string;
}

const ProfileAvatar = ({ profileImage, name }: ProfileAvatarProps) => {
  return (
    <div className="relative">
      <Avatar className="w-24 h-24 border-4 border-hissabkitab-blue">
        <AvatarImage src={profileImage} alt={name} />
        <AvatarFallback>{name ? name.charAt(0) : "U"}</AvatarFallback>
      </Avatar>
      <Button 
        size="icon" 
        variant="outline"
        className="absolute bottom-0 right-0 rounded-full bg-white"
      >
        <Camera className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProfileAvatar;
