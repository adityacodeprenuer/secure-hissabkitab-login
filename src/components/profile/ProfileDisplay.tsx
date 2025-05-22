
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { UserProfile } from "@/types/profile";

interface ProfileDisplayProps {
  profile: UserProfile;
  onLogout: () => void;
  onEdit: () => void;
}

const ProfileDisplay = ({ profile, onLogout, onEdit }: ProfileDisplayProps) => {
  return (
    <div className="space-y-4">
      {profile.name ? (
        <>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Address</h4>
              <p>{profile.address}</p>
            </div>
          </div>
          <div className="pt-4 flex justify-center">
            <Button 
              variant="outline" 
              className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500">Please edit your profile to add your information.</p>
          <Button 
            className="mt-4"
            onClick={onEdit}
          >
            Edit Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileDisplay;
