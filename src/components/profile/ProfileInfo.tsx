
import React from "react";
import { Mail, Phone, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProfileInfoProps {
  name: string;
  userType: string;
  email: string;
  phone: string;
  instagram: string;
}

const ProfileInfo = ({ name, userType, email, phone, instagram }: ProfileInfoProps) => {
  return (
    <div className="flex-1 text-center md:text-left">
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
        <h2 className="text-2xl font-bold">{name || "New User"}</h2>
        <Badge className="bg-hissabkitab-blue self-center md:self-auto">{userType}</Badge>
      </div>
      {name && (
        <div className="text-gray-500 flex flex-col gap-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Mail className="h-4 w-4" /> {email}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Phone className="h-4 w-4" /> {phone}
          </div>
          {instagram && (
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Instagram className="h-4 w-4" /> {instagram}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
