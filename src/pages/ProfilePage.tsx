
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserProfile, PasswordUpdate } from "@/types/profile";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileDisplay from "@/components/profile/ProfileDisplay";
import * as z from "zod";

// Define schemas outside the component
const profileFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  role: z.string(),
});

const passwordFormSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Get user type from localStorage (in a real app, this would come from auth context)
  const [userType, setUserType] = useState("Worker");
  
  // Load initial data from localStorage if available
  const [initialData, setInitialData] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: userType,
    profileImage: "/placeholder.svg"
  });
  
  useEffect(() => {
    // In a real app, this would be an API call based on authenticated user
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        // Ensure all required fields are present with defaults if needed
        const validProfile: UserProfile = {
          name: parsed.name || "",
          email: parsed.email || "",
          phone: parsed.phone || "",
          address: parsed.address || "",
          role: parsed.role || "Worker",
          profileImage: parsed.profileImage || "/placeholder.svg"
        };
        setInitialData(validProfile);
        setUserType(validProfile.role);
      } catch (e) {
        console.error("Failed to parse saved profile");
      }
    }
  }, []);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const handleSaveProfile = (values: z.infer<typeof profileFormSchema>) => {
    // Create a complete profile object with all required fields
    const updatedProfile: UserProfile = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      role: values.role,
      profileImage: initialData.profileImage
    };
    
    // Save to localStorage (in a real app, this would be sent to an API)
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    
    setInitialData(updatedProfile);
    setIsEditing(false);
    setUserType(values.role);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handlePasswordChange = (values: z.infer<typeof passwordFormSchema>) => {
    // In a real app, this would make an API call to update the password
    console.log("Password update requested:", values);
    
    // For demo purposes, we'll just show a success message
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader />

      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <ProfileAvatar 
                profileImage={initialData.profileImage} 
                name={initialData.name} 
              />
              <ProfileInfo 
                name={initialData.name}
                userType={userType}
                email={initialData.email}
                phone={initialData.phone}
              />
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <ProfileForm 
                initialData={initialData}
                onSave={handleSaveProfile}
                onPasswordChange={handlePasswordChange}
              />
            ) : (
              <ProfileDisplay
                profile={initialData}
                onLogout={handleLogout}
                onEdit={() => setIsEditing(true)}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
