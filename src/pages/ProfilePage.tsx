
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, LogOut, Camera, Save, Instagram } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define the user profile interface to ensure type safety
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  instagram: string;
  profileImage: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Simplified user schema
  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    address: z.string().min(5, { message: "Address must be at least 5 characters." }),
    role: z.string().min(2, { message: "Role is required." }),
    instagram: z.string().optional(),
  });

  // Get user type from localStorage (in a real app, this would come from auth context)
  const [userType, setUserType] = useState("Worker");
  
  // Load initial data from localStorage if available
  const [initialData, setInitialData] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: userType,
    instagram: "",
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
          instagram: parsed.instagram || "",
          profileImage: parsed.profileImage || "/placeholder.svg"
        };
        setInitialData(validProfile);
        setUserType(validProfile.role);
      } catch (e) {
        console.error("Failed to parse saved profile");
      }
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  // Update form values when initialData changes
  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const handleSaveProfile = (values: z.infer<typeof formSchema>) => {
    // Create a complete profile object with all required fields
    const updatedProfile: UserProfile = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      role: values.role,
      instagram: values.instagram || "",
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-hissabkitab-blue text-white shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button variant="ghost" size="icon" className="text-white" onClick={() => navigate('/home')}>
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        {/* Profile Card */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-hissabkitab-blue">
                  <AvatarImage src={initialData.profileImage} alt={initialData.name} />
                  <AvatarFallback>{initialData.name ? initialData.name.charAt(0) : "U"}</AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full bg-white"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">{initialData.name || "New User"}</h2>
                  <Badge className="bg-hissabkitab-blue self-center md:self-auto">{userType}</Badge>
                </div>
                {!isEditing && initialData.name && (
                  <div className="text-gray-500 flex flex-col gap-1">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Mail className="h-4 w-4" /> {initialData.email}
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Phone className="h-4 w-4" /> {initialData.phone}
                    </div>
                    {initialData.instagram && (
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Instagram className="h-4 w-4" /> {initialData.instagram}
                      </div>
                    )}
                  </div>
                )}
              </div>
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSaveProfile)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Instagram handle" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Your address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="Worker">Worker</option>
                              <option value="Owner">Owner</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button 
                      type="submit" 
                      className="gap-2"
                    >
                      <Save className="h-4 w-4" /> Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="space-y-4">
                {initialData.name ? (
                  <>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Address</h4>
                        <p>{initialData.address}</p>
                      </div>
                    </div>
                    <div className="pt-4 flex justify-center">
                      <Button 
                        variant="outline" 
                        className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={handleLogout}
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
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
